---
name: ver-motora
description: Use quando o dono perguntar como está algo do MOTORA: se o robô está rodando, se o WhatsApp conectou, quantas mensagens estão paradas, se o Asaas está pronto, quem está em atraso. Responde com uma consulta só, sem ler código.
---

# Ver a situação do MOTORA com uma consulta

Rode só o que a pergunta pede, com `execute_sql` no projeto `epswrtcwszhbapaxdpzz`. Traga contagens e datas, nunca CPF, telefone, chaves ou o conteúdo das mensagens, porque o dono não precisa disso e gasta contexto.

**Robô**
```sql
select value->>'ativo' envio_ligado, value->>'conectado' whatsapp, value->>'visto_em' ultimo_sinal,
 (select count(*) from whatsapp_queue where status='pendente') fila,
 (select max(sent_at) from whatsapp_queue) ultimo_envio
from app_settings where key='whatsapp_robo';
```
No computador: processo `node.exe` com `robo.js`. "Ligado" não é o mesmo que "enviando": confira `envio_ligado` e `whatsapp`.

**Asaas**
```sql
select (select count(*) from profiles where role='driver' and asaas_auto_charge_enabled) motoristas_ligados,
 exists(select 1 from app_secrets where key='asaas_key') api, exists(select 1 from app_secrets where key='asaas_chave_pix') chave_pix,
 (select count(*) from receipts where ai_result->>'origem'='asaas' and created_at >= date_trunc('month', now())) pix_no_mes;
```

**Cobranças**
```sql
select payment_status, count(*) from profiles where role='driver' group by 1;
select count(*) aguardando_dono from receipts where ai_status='confere' and confirmed_at is null and rejected_at is null;
```

Responda em duas ou três frases, em português simples.
