// Placa do ar-condicionado (projeto gree-esp32), versão 2.
// ESP32 DevKit v1, núcleo Arduino-ESP32 2.0.17, partições "min_spiffs" (2 x 1,9 MB, para a atualização sem fio).
// Pinos: emissor infravermelho D4, receptor infravermelho D27, sensor DHT22 do quarto D25.
// Compilar: ver ar/firmware/LEIA.md. Regras do automático em regras.h (testadas por .github/scripts/teste-ar-auto.mjs).
//
// Reescrita em 13/11/2026 a partir do que a versão 1 fazia (o código da versão 1 se perdeu). Para a placa não
// perder a ligação com a conta nem o Wi-Fi, ela procura os dados da versão 1 na memória (chave "ckey") e usa a
// mesma gaveta. Identidade da placa = número de fábrica do chip, como antes.
#include <WiFi.h>
#include <WebServer.h>
#include <ESPmDNS.h>
#include <HTTPClient.h>
#include <HTTPUpdate.h>
#include <WiFiClientSecure.h>
#include <ArduinoJson.h>
#include <IRremoteESP8266.h>
#include <IRsend.h>
#include <IRrecv.h>
#include <IRac.h>
#include <IRutils.h>
#include <DHT.h>
#include <nvs.h>
#include <nvs_flash.h>
#include <time.h>
#include "estado.h"
#include "regras.h"
#include "web.h"
#include "certs.h"

#define FW_VERSAO 2
const int PINO_TX = 4, PINO_RX = 27, PINO_DHT = 25;
const char *URL_APP = "https://motoraapp.github.io/motora-frota/ar/";
const char *URL_SYNC = "https://epswrtcwszhbapaxdpzz.supabase.co/rest/v1/rpc/ar_device_sync";
const char *URL_VERSAO = "https://motoraapp.github.io/motora-frota/ar/firmware/versao.json";
const char *SB_CHAVE = "sb_publishable__oIByVcuA-IHdsxR9rgY9Q_Iersnb3R";  // chave pública (a mesma do app)
const char *AP_NOME = "GreeCtl", *AP_SENHA = "12345678";

// ---------- Memória (NVS) ----------
nvs_handle_t NV = 0;
String gaveta = "gree";

// Acha a gaveta onde a versão 1 guardou a chave da nuvem ("ckey"). Sem ela, usa "gree".
String acharGaveta() {
  nvs_iterator_t it = nvs_entry_find("nvs", NULL, NVS_TYPE_ANY);
  while (it) {
    nvs_entry_info_t info;
    nvs_entry_info(it, &info);
    if (strcmp(info.key, "ckey") == 0) { String g = info.namespace_name; nvs_release_iterator(it); return g; }
    it = nvs_entry_next(it);
  }
  return "gree";
}
// Lê número guardado com qualquer tipo (a versão 1 pode ter usado outro tamanho).
long lerNum(const char *k, long padrao) {
  int32_t i32; uint32_t u32; int16_t i16; uint16_t u16; int8_t i8; uint8_t u8;
  if (nvs_get_i32(NV, k, &i32) == ESP_OK) return i32;
  if (nvs_get_u8(NV, k, &u8) == ESP_OK) return u8;
  if (nvs_get_i8(NV, k, &i8) == ESP_OK) return i8;
  if (nvs_get_u16(NV, k, &u16) == ESP_OK) return u16;
  if (nvs_get_i16(NV, k, &i16) == ESP_OK) return i16;
  if (nvs_get_u32(NV, k, &u32) == ESP_OK) return (long)u32;
  return padrao;
}
String lerTxt(const char *k) {
  size_t n = 0;
  if (nvs_get_str(NV, k, NULL, &n) == ESP_OK && n > 1) {
    char *b = (char *)malloc(n); String s;
    if (b && nvs_get_str(NV, k, b, &n) == ESP_OK) s = b;
    free(b); return s;
  }
  if (nvs_get_blob(NV, k, NULL, &n) == ESP_OK && n > 0 && n < 4000) {
    char *b = (char *)calloc(n + 1, 1); String s;
    if (b && nvs_get_blob(NV, k, b, &n) == ESP_OK) s = b;
    free(b); return s;
  }
  return "";
}
void gravaNum(const char *k, long v) {
  int32_t atual;
  if (nvs_get_i32(NV, k, &atual) == ESP_OK) { if (atual == v) return; }
  else nvs_erase_key(NV, k);
  nvs_set_i32(NV, k, v); nvs_commit(NV);
}
void gravaTxt(const char *k, const String &v) {
  if (lerTxt(k) == v) return;
  nvs_erase_key(NV, k);
  nvs_set_str(NV, k, v.c_str()); nvs_commit(NV);
}

// ---------- Estado do ar ----------
Estado S;
Horario H[8]; int nH = 0;
Automatico A;
AutoMem AM = {false, false};

void salvarEstado() {
  gravaNum("power", S.power); gravaNum("mode", S.mode); gravaNum("temp", S.temp); gravaNum("fan", S.fan);
  gravaNum("swing", S.swing); gravaNum("light", S.light); gravaNum("turbo", S.turbo); gravaNum("xfan", S.xfan);
  gravaNum("sleep", S.sleep); gravaNum("model", S.model); gravaNum("proto", S.proto);
}
void salvarAuto() {
  gravaNum("a_on", A.on); gravaNum("a_alvo", A.alvo); gravaNum("a_de", A.de); gravaNum("a_ate", A.ate);
  gravaNum("a_ligou", AM.ligou); gravaNum("a_esp", AM.espera);
}
void salvarHorarios() {
  JsonDocument d; JsonArray a = d.to<JsonArray>();
  for (int i = 0; i < nH; i++) {
    JsonObject o = a.add<JsonObject>();
    o["d"] = H[i].d; o["h"] = H[i].h; o["m"] = H[i].m; o["a"] = H[i].a; o["t"] = H[i].t; o["o"] = H[i].o; o["e"] = H[i].e;
  }
  String s; serializeJson(d, s); gravaTxt("sched", s);
}
int faixa(long v, int a, int b) { return v < a ? a : (v > b ? b : (int)v); }
void lerHorarios(JsonArray l) {
  nH = 0;
  for (JsonObject x : l) {
    if (nH >= 8) break;
    Horario h;
    h.d = faixa(x["d"] | 127, 1, 127); h.h = faixa(x["h"] | 0, 0, 23); h.m = faixa(x["m"] | 0, 0, 59);
    h.a = (x["a"] | 0) ? 1 : 0; h.t = faixa(x["t"] | 24, 16, 30); h.o = faixa(x["o"] | 1, 0, 4); h.e = (x["e"] | 1) ? 1 : 0;
    H[nH++] = h;
  }
}
void carregar() {
  S.power = lerNum("power", 0); S.mode = faixa(lerNum("mode", 1), 0, 4); S.temp = faixa(lerNum("temp", 24), 16, 30);
  S.fan = faixa(lerNum("fan", 0), 0, 3); S.swing = lerNum("swing", 0); S.light = lerNum("light", 1); S.turbo = lerNum("turbo", 0);
  S.xfan = lerNum("xfan", 0); S.sleep = lerNum("sleep", 0); S.model = faixa(lerNum("model", 1), 1, 3); S.proto = lerNum("proto", 24);
  if (!IRac::isProtocolSupported((decode_type_t)S.proto)) S.proto = 24;
  A.on = lerNum("a_on", 0); A.alvo = faixa(lerNum("a_alvo", 24), 16, 30);
  A.de = faixa(lerNum("a_de", 480), 0, 1439); A.ate = faixa(lerNum("a_ate", 1200), 0, 1439);
  AM.ligou = lerNum("a_ligou", 0); AM.espera = lerNum("a_esp", 0);
  JsonDocument d;
  if (!deserializeJson(d, lerTxt("sched")) && d.is<JsonArray>()) lerHorarios(d.as<JsonArray>());
}

// ---------- Infravermelho ----------
IRac ac(PINO_TX);
IRrecv irrecv(PINO_RX, 1024, 50, true);
decode_results res;
stdAc::opmode_t modoStd(int m) {
  switch (m) { case 0: return stdAc::opmode_t::kAuto; case 2: return stdAc::opmode_t::kDry;
    case 3: return stdAc::opmode_t::kFan; case 4: return stdAc::opmode_t::kHeat; default: return stdAc::opmode_t::kCool; }
}
int modoUi(stdAc::opmode_t m) {
  switch (m) { case stdAc::opmode_t::kAuto: return 0; case stdAc::opmode_t::kDry: return 2;
    case stdAc::opmode_t::kFan: return 3; case stdAc::opmode_t::kHeat: return 4; default: return 1; }
}
stdAc::fanspeed_t ventStd(int f) {
  return f == 1 ? stdAc::fanspeed_t::kLow : f == 2 ? stdAc::fanspeed_t::kMedium : f == 3 ? stdAc::fanspeed_t::kHigh : stdAc::fanspeed_t::kAuto;
}
int ventUi(stdAc::fanspeed_t f) {
  switch (f) { case stdAc::fanspeed_t::kAuto: return 0; case stdAc::fanspeed_t::kMin: case stdAc::fanspeed_t::kLow: return 1;
    case stdAc::fanspeed_t::kMedium: return 2; default: return 3; }
}
void enviar(const Estado &e, int proto) {
  stdAc::state_t st; IRac::initState(&st);
  st.protocol = (decode_type_t)proto; st.model = e.model; st.power = e.power; st.mode = modoStd(e.mode);
  st.celsius = true; st.degrees = e.temp; st.fanspeed = ventStd(e.fan);
  st.swingv = e.swing ? stdAc::swingv_t::kAuto : stdAc::swingv_t::kOff; st.swingh = stdAc::swingh_t::kOff;
  st.light = e.light; st.turbo = e.turbo; st.clean = e.xfan; st.sleep = e.sleep ? 0 : -1; st.beep = true;
  irrecv.disableIRIn();  // não ler o próprio sinal
  ac.sendAc(st, nullptr);
  irrecv.enableIRIn();
  Serial.printf("TX: %s %s %d\n", typeToString((decode_type_t)proto).c_str(), e.power ? "liga" : "desliga", e.temp);
}

Leitura LIDO;  // último sinal lido do controle original
void lerControle() {
  if (!irrecv.decode(&res)) return;
  LIDO.n++; LIDO.pid = res.decode_type; LIDO.proto = typeToString(res.decode_type, res.repeat);
  LIDO.hex = resultToHexidecimal(&res); LIDO.text = IRAcUtils::resultAcToString(&res);
  if (LIDO.hex.length() > 120) LIDO.hex = LIDO.hex.substring(0, 120);
  if (LIDO.text.length() > 300) LIDO.text = LIDO.text.substring(0, 300);
  stdAc::state_t st; IRac::initState(&st);
  LIDO.ac = IRac::isProtocolSupported(res.decode_type) && IRAcUtils::decodeToState(&res, &st);
  LIDO.model = (LIDO.ac && res.decode_type == decode_type_t::GREE) ? st.model : 0;
  Serial.printf("RX bytes: %s %s\n", LIDO.proto.c_str(), LIDO.hex.c_str());
  // Controle do mesmo aparelho em uso: a placa passa a saber o que o controle mandou.
  if (LIDO.ac && LIDO.pid == S.proto) {
    bool antes = S.power;
    S.power = st.power;
    if (st.power) {
      S.mode = modoUi(st.mode); S.temp = faixa(lround(st.degrees), 16, 30); S.fan = ventUi(st.fanspeed);
      S.swing = st.swingv != stdAc::swingv_t::kOff; S.light = st.light; S.turbo = st.turbo; S.xfan = st.clean; S.sleep = st.sleep >= 0;
    }
    if (antes != S.power) { autoManual(AM, S.power, A.on); salvarAuto(); }
    salvarEstado();
  }
  LIDO.paraNuvem = true;
  irrecv.resume();
}
void rxJson(JsonObject r) {
  r["n"] = LIDO.n; r["proto"] = LIDO.proto; r["hex"] = LIDO.hex; r["text"] = LIDO.text; r["ac"] = LIDO.ac; r["pid"] = LIDO.pid; r["model"] = LIDO.model;
}

// ---------- Busca automática do aparelho (controle universal) ----------
const uint8_t ORD[] = {24, 109, 79, 69, 27, 120, 84, 15, 86, 16, 68, 70, 65, 67, 53, 61, 78, 80, 98, 48, 33, 63, 38, 115, 101, 44, 40, 41, 111, 113, 85, 73, 103, 18, 10, 51, 34, 94, 20, 72, 71, 60, 59, 66, 49, 96, 108, 46, 89, 105, 62, 57, 93, 55, 102, 32, 92, 28, 104, 100, 54, 90, 45, 126};
const int NORD = sizeof(ORD);
struct { bool on = false; int i = 0; bool sozinho = false; unsigned long em = 0; } BU;
void buscaTestar() {
  Estado t = S; t.power = true; t.mode = 1; t.temp = 24; t.fan = 0; t.model = 1;
  enviar(t, ORD[BU.i]); BU.em = millis();
  Serial.printf("busca: %d de %d (%d)\n", BU.i + 1, NORD, ORD[BU.i]);
}
void buscaCmd(const String &c) {
  if (c == "start") { BU.on = true; BU.i = 0; BU.sozinho = true; buscaTestar(); return; }
  if (!BU.on) return;
  if (c == "next") { BU.sozinho = false; if (BU.i < NORD - 1) BU.i++; buscaTestar(); }
  else if (c == "prev") { BU.sozinho = false; if (BU.i > 0) BU.i--; buscaTestar(); }
  else if (c == "again") { BU.sozinho = false; buscaTestar(); }
  else if (c == "ok") {
    S.proto = ORD[BU.i]; S.model = 1; S.power = true; S.mode = 1; S.temp = 24; S.fan = 0; BU.on = false;
    autoManual(AM, true, A.on); salvarAuto(); salvarEstado();
  }
  else if (c == "stop") BU.on = false;
}

// ---------- Sensor do quarto ----------
DHT dht(PINO_DHT, DHT22);
float salaT = NAN; int salaU = 0; unsigned long salaEm = 0, ultSensor = 0;
bool temSala() { return salaEm && millis() - salaEm < 120000; }
void lerSensor() {
  if (millis() - ultSensor < 5000) return;
  ultSensor = millis();
  float t = dht.readTemperature(), u = dht.readHumidity();
  if (!isnan(t) && !isnan(u) && t > -20 && t < 60) { salaT = roundf(t * 10) / 10; salaU = lroundf(u); salaEm = millis(); }
}

// ---------- Atualização sem fio ----------
int fwNova = 0; String fwUrl, fwMsg; int otaPedido = 0; unsigned long ultOta = 0; int otaDia = -1;
WiFiClientSecure tlsNuvem, tlsGh;  // um para o Supabase e outro para o GitHub (não misturar conexões)

// ---------- Estado em JSON (app de casa e nuvem) ----------
void estadoJson(JsonObject d) {
  d["power"] = S.power; d["mode"] = S.mode; d["temp"] = S.temp; d["fan"] = S.fan; d["swing"] = S.swing; d["light"] = S.light;
  d["turbo"] = S.turbo; d["xfan"] = S.xfan; d["sleep"] = S.sleep; d["model"] = S.model; d["proto"] = S.proto;
  d["pname"] = typeToString((decode_type_t)S.proto);
  JsonArray l = d["sched"].to<JsonArray>();
  for (int i = 0; i < nH; i++) {
    JsonObject o = l.add<JsonObject>();
    o["d"] = H[i].d; o["h"] = H[i].h; o["m"] = H[i].m; o["a"] = H[i].a; o["t"] = H[i].t; o["o"] = H[i].o; o["e"] = H[i].e;
  }
  JsonObject a = d["auto"].to<JsonObject>();
  a["on"] = A.on; a["alvo"] = A.alvo; a["de"] = A.de; a["ate"] = A.ate; a["ligou"] = AM.ligou;
  d["fw"] = FW_VERSAO;
  if (fwNova > FW_VERSAO) d["fwNova"] = fwNova;
  if (fwMsg.length()) d["fwMsg"] = fwMsg;
  if (BU.on) { JsonObject b = d["scan"].to<JsonObject>(); b["i"] = BU.i + 1; b["n"] = NORD; b["p"] = ORD[BU.i]; b["auto"] = BU.sozinho; }
  if (temSala()) { JsonObject q = d["sala"].to<JsonObject>(); q["t"] = serialized(String(salaT, 1)); q["u"] = salaU; }
  struct tm tm;
  if (getLocalTime(&tm, 0)) { char h[6]; snprintf(h, 6, "%02d:%02d", tm.tm_hour, tm.tm_min); d["hora"] = h; }
}

// Comando do app de casa ou de fora (mesmo formato).
void aplicar(JsonObject p) {
  bool mandar = false, antes = S.power;
  if (p["power"].is<bool>()) { S.power = p["power"]; mandar = true; }
  if (p["mode"].is<int>()) { S.mode = faixa(p["mode"], 0, 4); mandar = true; }
  if (p["temp"].is<int>()) { S.temp = faixa(p["temp"], 16, 30); mandar = true; }
  if (p["fan"].is<int>()) { S.fan = faixa(p["fan"], 0, 3); mandar = true; }
  if (p["swing"].is<bool>()) { S.swing = p["swing"]; mandar = true; }
  if (p["light"].is<bool>()) { S.light = p["light"]; mandar = true; }
  if (p["turbo"].is<bool>()) { S.turbo = p["turbo"]; mandar = true; }
  if (p["xfan"].is<bool>()) { S.xfan = p["xfan"]; mandar = true; }
  if (p["sleep"].is<bool>()) { S.sleep = p["sleep"]; mandar = true; }
  if (p["model"].is<int>()) { S.model = faixa(p["model"], 1, 3); mandar = true; }
  if (p["proto"].is<int>()) {
    int v = p["proto"];
    if (IRac::isProtocolSupported((decode_type_t)v)) { S.proto = v; mandar = true; }
  }
  if (p["sched"].is<JsonArray>()) { lerHorarios(p["sched"].as<JsonArray>()); salvarHorarios(); }
  if (p["auto"].is<JsonObject>()) {
    JsonObject a = p["auto"];
    bool on = a["on"] | A.on;
    A.alvo = faixa(a["alvo"] | A.alvo, 16, 30); A.de = faixa(a["de"] | A.de, 0, 1439); A.ate = faixa(a["ate"] | A.ate, 0, 1439);
    if (!on) { AM.ligou = false; AM.espera = false; }
    A.on = on; salvarAuto();
  }
  if (p["scan"].is<const char *>()) buscaCmd(p["scan"].as<String>());
  if (p["ota"].is<const char *>()) { String o = p["ota"].as<String>(); otaPedido = o == "now" ? 2 : (o == "check" ? 1 : 0); }
  if (mandar) {
    if (S.power != antes) { autoManual(AM, S.power, A.on); salvarAuto(); }
    enviar(S, S.proto); salvarEstado();
  }
}

// ---------- Horários programados e automático ----------
int ultMinuto = -1; unsigned long ultAuto = 0;
void checarHorarios() {
  struct tm tm;
  if (!getLocalTime(&tm, 0)) return;
  int agora = tm.tm_hour * 60 + tm.tm_min;
  if (agora == ultMinuto) return;
  ultMinuto = agora;
  for (int i = 0; i < nH; i++) {
    Horario &x = H[i];
    if (!x.e || !((x.d >> tm.tm_wday) & 1) || x.h != tm.tm_hour || x.m != tm.tm_min) continue;
    if (x.a) { S.power = true; S.temp = x.t; S.mode = x.o; } else S.power = false;
    autoManual(AM, S.power, A.on); salvarAuto();
    enviar(S, S.proto); salvarEstado();
    Serial.println("horario programado");
  }
  // Atualização nova instala sozinha de madrugada (03:00 a 03:59), uma vez por dia.
  if (fwNova > FW_VERSAO && tm.tm_hour == 3 && otaDia != tm.tm_yday) { otaDia = tm.tm_yday; otaPedido = 2; }
}
void checarAuto() {
  if (millis() - ultAuto < 60000) return;
  ultAuto = millis();
  struct tm tm;
  bool horaOk = getLocalTime(&tm, 0);
  bool noHorario = horaOk && dentroHorario(tm.tm_hour * 60 + tm.tm_min, A.de, A.ate);
  AutoMem antes = AM;
  int r = regraAuto(AM, A.on, temSala(), salaT, A.alvo, noHorario, S.power);
  if (r == AUTO_LIGAR) {
    S.power = true; S.mode = 1; S.temp = A.alvo; enviar(S, S.proto); salvarEstado();
    Serial.println("automatico: quarto quente, ligando");
  } else if (r == AUTO_DESLIGAR) {
    S.power = false; enviar(S, S.proto); salvarEstado();
    Serial.println("automatico: quarto frio, desligando");
  }
  if (AM.ligou != antes.ligou || AM.espera != antes.espera) salvarAuto();
}

// ---------- Nuvem (acesso de fora de casa) ----------
String ID, CHAVE, codigo; unsigned long codigoAte = 0, ultSync = 0;
bool nuvemOk = false, dono = false, mandarCodigo = false;
void sincronizar() {
  if (WiFi.status() != WL_CONNECTED) { nuvemOk = false; return; }
  JsonDocument d;
  d["p_id"] = ID; d["p_key"] = CHAVE;
  estadoJson(d["p_state"].to<JsonObject>());
  if (LIDO.paraNuvem) rxJson(d["p_rx"].to<JsonObject>());
  if (mandarCodigo) d["p_pair"] = codigo;
  String corpo; serializeJson(d, corpo);
  HTTPClient http; http.setReuse(true); http.setTimeout(8000);
  if (!http.begin(tlsNuvem, URL_SYNC)) { nuvemOk = false; return; }
  http.addHeader("apikey", SB_CHAVE); http.addHeader("Content-Type", "application/json");
  int c = http.POST(corpo);
  if (c == 200) {
    nuvemOk = true; mandarCodigo = false; LIDO.paraNuvem = false;
    JsonDocument r;
    if (!deserializeJson(r, http.getString())) {
      dono = r["dono"] | false;
      for (JsonObject cmd : r["cmds"].as<JsonArray>()) { Serial.println("cmd de fora de casa"); aplicar(cmd); }
    }
  } else { nuvemOk = false; Serial.printf("cloud erro %d\n", c); tlsNuvem.stop(); }
  http.end();
}
void nuvemJson(JsonObject j) {
  j["ok"] = nuvemOk; j["dono"] = dono; j["url"] = URL_APP;
  if (codigo.length() && millis() < codigoAte && !dono) j["code"] = codigo;
}

void otaChecar(bool avisar) {
  HTTPClient http; http.setTimeout(10000);
  bool ok = false;
  if (http.begin(tlsGh, URL_VERSAO) && http.GET() == 200) {
    JsonDocument d;
    if (!deserializeJson(d, http.getString())) {
      ok = true; int v = d["versao"] | 0; String u = d["url"] | "";
      if (v > FW_VERSAO && u.startsWith("https://")) { fwNova = v; fwUrl = u; } else fwNova = 0;
    }
  }
  http.end(); tlsGh.stop();
  if (avisar) fwMsg = !ok ? "Não deu para procurar atualização agora." : (fwNova ? "" : "A placa já está na versão mais nova.");
}
void otaInstalar() {
  fwMsg = "Atualizando… a placa reinicia sozinha em cerca de 1 minuto.";
  sincronizar();
  Serial.printf("atualizando para a versao %d\n", fwNova);
  httpUpdate.rebootOnUpdate(true);
  httpUpdate.update(tlsGh, fwUrl);  // se der certo, reinicia aqui
  tlsGh.stop();
  fwMsg = "A atualização falhou e a placa continuou na versão atual. Tente de novo mais tarde.";
}
void cuidarOta() {
  if (WiFi.status() != WL_CONNECTED) return;
  if (otaPedido == 1) { otaPedido = 0; otaChecar(true); }
  else if (otaPedido == 2) { otaPedido = 0; if (fwNova <= FW_VERSAO) otaChecar(true); if (fwNova > FW_VERSAO) otaInstalar(); }
  else if (millis() - ultOta > 6UL * 3600000UL || (ultOta == 0 && millis() > 60000)) { ultOta = millis(); otaChecar(false); }
}

// ---------- Wi-Fi ----------
String ssid, senha;
bool apLigado = false, conectado = false; unsigned long ultTentativa = 0, conectadoEm = 0, caiuEm = 0;
void abrirAP() {
  if (apLigado) return;
  WiFi.mode(WIFI_AP_STA); WiFi.softAP(AP_NOME, AP_SENHA); apLigado = true;
  Serial.println("AP GreeCtl -> http://192.168.4.1 (Wi-Fi em /wifi)");
}
void cuidarWifi() {
  if (WiFi.status() == WL_CONNECTED) {
    if (!conectado) {
      conectado = true; conectadoEm = millis();
      Serial.print("Wi-Fi voltou. IP: "); Serial.println(WiFi.localIP());
      MDNS.end(); if (MDNS.begin("gree")) MDNS.addService("http", "tcp", 80);
      configTzTime("<-03>3", "time.google.com", "pool.ntp.org");
      ultSync = 0;
    }
    if (apLigado && millis() - conectadoEm > 300000) { WiFi.softAPdisconnect(true); WiFi.mode(WIFI_STA); apLigado = false; }
    return;
  }
  if (conectado) { conectado = false; caiuEm = millis(); }
  if (!apLigado && millis() - caiuEm > 60000) abrirAP();  // 1 minuto sem rede: abre a rede GreeCtl para configurar
  if (millis() - ultTentativa > 60000) {
    ultTentativa = millis();
    if (ssid.length()) WiFi.begin(ssid.c_str(), senha.c_str()); else WiFi.begin();
  }
}

// ---------- Servidor do app de casa ----------
WebServer srv(80);
String esc(const String &s) { String r = s; r.replace("&", "&amp;"); r.replace("<", "&lt;"); r.replace(">", "&gt;"); return r; }
void responderEstado() { JsonDocument d; estadoJson(d.to<JsonObject>()); String s; serializeJson(d, s); srv.send(200, "application/json", s); }
void responderNuvem() { JsonDocument d; nuvemJson(d.to<JsonObject>()); String s; serializeJson(d, s); srv.send(200, "application/json", s); }
void mandarApp() { srv.send_P(200, "text/html; charset=utf-8", PAGINA_APP); }
void rotas() {
  srv.on("/", HTTP_GET, [] {
    if (!conectado && !ssid.length() && apLigado) { srv.sendHeader("Location", "/wifi"); srv.send(302, "text/plain", ""); return; }
    mandarApp();
  });
  srv.on("/app", HTTP_GET, mandarApp);
  srv.on("/wifi", HTTP_GET, [] { srv.send_P(200, "text/html; charset=utf-8", PAGINA_WIFI); });
  srv.on("/wifi", HTTP_POST, [] {
    String s = srv.arg("ssid"), p = srv.arg("pass");
    if (!s.length() || s.length() > 32 || (p.length() && (p.length() < 8 || p.length() > 63))) { srv.send(400, "text/plain", "rede invalida"); return; }
    gravaTxt("ssid", s); gravaTxt("pass", p);
    srv.send(200, "text/html; charset=utf-8", String("<meta name=viewport content='width=device-width'><body style='font-family:system-ui;padding:20px'>Salvo. O aparelho vai reiniciar e entrar na rede <b>") +
      esc(s) + "</b>.<br>Depois abra <b>http://gree.local</b> (ou o IP mostrado no roteador).");
    delay(1500); ESP.restart();
  });
  srv.on("/manifest.json", HTTP_GET, [] { srv.send_P(200, "application/manifest+json", MANIFEST); });
  srv.on("/icon.svg", HTTP_GET, [] { srv.send_P(200, "image/svg+xml", ICONE); });
  srv.on("/api/state", HTTP_GET, responderEstado);
  srv.on("/api/state", HTTP_POST, [] {
    JsonDocument d;
    if (deserializeJson(d, srv.arg("plain")) || !d.is<JsonObject>()) { srv.send(400, "text/plain", "bad json"); return; }
    aplicar(d.as<JsonObject>()); responderEstado();
  });
  srv.on("/api/cloud", HTTP_GET, responderNuvem);
  srv.on("/api/pair", HTTP_POST, [] {
    char c[7]; snprintf(c, 7, "%06u", (unsigned)(esp_random() % 1000000));
    codigo = c; codigoAte = millis() + 9UL * 60000UL; mandarCodigo = true; dono = false; ultSync = 0;
    sincronizar(); responderNuvem();
  });
  srv.on("/api/rx", HTTP_GET, [] { JsonDocument d; rxJson(d.to<JsonObject>()); String s; serializeJson(d, s); srv.send(200, "application/json", s); });
  srv.onNotFound([] { srv.sendHeader("Location", "/"); srv.send(302, "text/plain", ""); });
  srv.begin();
}

// ---------- Início ----------
void setup() {
  Serial.begin(115200);
  nvs_flash_init();
  gaveta = acharGaveta();
  nvs_open(gaveta.c_str(), NVS_READWRITE, &NV);
  carregar();
  char b[17]; snprintf(b, 17, "%016llx", (unsigned long long)ESP.getEfuseMac()); ID = b;
  CHAVE = lerTxt("ckey");
  bool chaveOk = CHAVE.length() == 32;
  for (char c : CHAVE) if (!isxdigit(c) || isupper(c)) chaveOk = false;
  if (!chaveOk) {
    char k[33]; snprintf(k, 33, "%08x%08x%08x%08x", esp_random(), esp_random(), esp_random(), esp_random());
    CHAVE = k; gravaTxt("ckey", CHAVE);
  }
  Serial.printf("Gree AC versao %d, placa %s, gaveta %s\n", FW_VERSAO, ID.c_str(), gaveta.c_str());
  tlsNuvem.setCACert(CERTS); tlsGh.setCACert(CERTS);
  dht.begin();
  irrecv.setUnknownThreshold(12);
  irrecv.enableIRIn();
  ssid = lerTxt("ssid"); senha = lerTxt("pass");
  WiFi.mode(WIFI_STA); WiFi.setHostname("gree");
  if (ssid.length()) WiFi.begin(ssid.c_str(), senha.c_str()); else WiFi.begin();
  for (int i = 0; i < 40 && WiFi.status() != WL_CONNECTED; i++) delay(500);
  if (WiFi.status() != WL_CONNECTED) abrirAP();
  ultTentativa = millis();
  rotas();
}

void loop() {
  srv.handleClient();
  cuidarWifi();
  lerControle();
  lerSensor();
  checarHorarios();
  checarAuto();
  if (BU.on && BU.sozinho && millis() - BU.em > 8000) { if (BU.i < NORD - 1) { BU.i++; buscaTestar(); } else BU.sozinho = false; }
  if (conectado && millis() - ultSync > 3000) { ultSync = millis(); sincronizar(); }
  cuidarOta();
  delay(2);
}
