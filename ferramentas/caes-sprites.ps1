# Gera os sprites dos cachorros para o app (Nossa casinha) a partir dos PNG transparentes 1024x1024 do dono
# (pasta Desktop\Thiago\animacao, fora do Git). Os originais não mudam.
# Para cada sprite: recorta a margem transparente, aplica a ESCALA CALIBRADA da pose (os desenhos vêm enquadrados de jeitos
# diferentes: deitado e correndo vinham bem maiores que em pé) e reduz para o celular (o desenho em pé de referência fica com
# ALT px de altura). Nunca estica: largura e altura usam o mesmo fator.
# Saída: ar/caes/img/sprites/<cão>/<nome>.png e ar/caes/sprites-dados.js (tamanho, ponto dos pés e para que lado olha).
# Uso: powershell -File ferramentas\caes-sprites.ps1
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$origem = 'C:\Users\User\Desktop\Thiago\animacao'
$raiz = Split-Path $PSScriptRoot -Parent
$PAD = 6; $ALTS = @{ elvis = 220; belinha = 260; maya = 320 } # altura do desenho em pe de referencia: o cachorro na tela (tamanho x 1,3) x 3 (tela de alta densidade)

# escala de cada pose em relação ao desenho em pé (16/11/2026): as poses em pé calibradas pelo CORPO e patas sobrepostos ao
# desenho base (o corpo não muda de tamanho quando ele vira a cabeça); as outras pelo tamanho da cabeça
# olha = -1: o desenho olha para a esquerda (o app espelha para todos olharem para a direita)
$CAES = [ordered]@{
  elvis = @{ pasta = 'pincher_malhado'; prefixo = 'malhado_'; ref = '1_pincher_malhado_transparente.png'
    nomes = @{ '1_pincher_malhado_transparente.png' = 'base'; '1_pincher_malhado_boca_aberta_transparente.png' = 'boca_aberta'; '1_pincher_malhado_olhos_fechados_transparente.png' = 'olhos_fechados'; '1_pincher_malhado_lingua_transparente.png' = 'lingua' }
    esc = @{ base = 1; boca_aberta = 0.99; olhos_fechados = 1; lingua = 1.08; andando_1 = 1; andando_2 = 1; bebendo = 1; comendo = 1.15; correndo_1 = 1.5; correndo_2 = 1.05
      deitando_transicao = 0.95; dormindo_deitado = 0.88; encostando_giro_frente = 1.06; fazendo_xixi = 1.05; latindo = 1.04; mexendo_cabeca = 1.08; rosnando = 0.95
      sentado = 1; sentindo_calor = 1; tremendo_frio = 0.95; virando_costas = 1.05 }
    olha = @{} }
  belinha = @{ pasta = 'pincher_caramelo'; prefixo = 'caramelo_'; ref = '2_pincher_caramelo_transparente.png'
    nomes = @{ '2_pincher_caramelo_transparente.png' = 'base'; '2_pincher_caramelo_boca_aberta_transparente.png' = 'boca_aberta'; '2_pincher_caramelo_olhos_fechados_transparente.png' = 'olhos_fechados' }
    esc = @{ base = 1; boca_aberta = 1.03; olhos_fechados = 1; andando_1 = 1; andando_2 = 0.97; andando_frente = 1.03; bebendo = 1; comendo = 1; correndo_1 = 1.25; correndo_2 = 1
      dormindo_deitado = 0.9; encostando_giro_frente = 1.05; fazendo_xixi = 1.05; latindo = 0.99; mexendo_cabeca = 1.06; rosnando = 1.05; sentado = 1.05
      sentindo_calor = 1; tremendo_frio = 0.95; virando_costas = 1.05 }
    olha = @{ dormindo_deitado = -1 } }
  maya = @{ pasta = 'maya'; prefixo = 'maya_'; ref = '4_shih_tzu_de_pe_transparente.png'
    nomes = @{ '4_shih_tzu_de_pe_transparente.png' = 'base'; '4_shih_tzu_de_pe_boca_fechada_transparente.png' = 'boca_fechada'; '4_shih_tzu_de_pe_olhos_fechados_transparente.png' = 'olhos_fechados'
      '3_shih_tzu_transparente.png' = 'sentado'; '3_shih_tzu_olhos_fechados_transparente.png' = 'sentado_olhos_fechados' }
    esc = @{ base = 1; boca_fechada = 1; olhos_fechados = 1; sentado = 0.85; sentado_olhos_fechados = 0.85; andando_1 = 0.92; andando_2 = 0.93; andando_frente = 0.92
      bebendo = 1.05; comendo = 1; correndo_1 = 1.25; correndo_2 = 1.25; deitando_transicao = 0.95; dormindo_deitado = 1; encostando_giro_frente = 0.95
      fazendo_xixi = 1.08; latindo = 0.97; mexendo_cabeca = 1.05; pedindo_patas_no_ar = 1; pedindo_patas_no_ar_2 = 1; rosnando = 1.2; sentindo_calor = 0.85
      tremendo_frio = 1; virando_costas = 1.09 }
    olha = @{ dormindo_deitado = -1; encostando_giro_frente = -1 } }
}

# escalas: calculadas por ferramentas/caes-escalas.mjs (rode antes) e lidas do JSON; valem no lugar das de cima
$escJson = Get-Content (Join-Path $PSScriptRoot 'caes-escalas.json') -Raw | ConvertFrom-Json
foreach ($id in @($CAES.Keys)) { $h = @{}; foreach ($p in $escJson.$id.PSObject.Properties) { $h[$p.Name] = [double]$p.Value }; $CAES[$id].esc = $h }

# caixa do desenho (alfa > 20) e linha dos pés, lendo os pixels
function Caixa($bmp) {
  $r = New-Object System.Drawing.Rectangle 0, 0, $bmp.Width, $bmp.Height
  $d = $bmp.LockBits($r, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $n = $d.Stride * $bmp.Height; $buf = New-Object byte[] $n; [System.Runtime.InteropServices.Marshal]::Copy($d.Scan0, $buf, 0, $n); $bmp.UnlockBits($d)
  $x1 = $bmp.Width; $y1 = $bmp.Height; $x2 = -1; $y2 = -1; $lx = New-Object double[] $bmp.Height; $la = New-Object double[] $bmp.Height
  for ($y = 0; $y -lt $bmp.Height; $y++) { $o = $y * $d.Stride
    for ($x = 0; $x -lt $bmp.Width; $x++) { $a = $buf[$o + $x * 4 + 3]; if ($a -gt 20) { $lx[$y] += $x * $a; $la[$y] += $a; if ($x -lt $x1) { $x1 = $x }; if ($x -gt $x2) { $x2 = $x }; if ($y -lt $y1) { $y1 = $y }; if ($y -gt $y2) { $y2 = $y } } } }
  # centro de massa só do corpo e patas (55% de baixo): a cabeça virada não empurra o encaixe para o lado
  $sx = 0.0; $sa = 0.0; for ($y = [int]($y1 + ($y2 - $y1) * 0.45); $y -le $y2; $y++) { $sx += $lx[$y]; $sa += $la[$y] }
  return @($x1, $y1, $x2, $y2, ($sx / $sa))
}

$dados = [ordered]@{}
foreach ($id in $CAES.Keys) {
  $c = $CAES[$id]; $dir = Join-Path $raiz "ar\caes\img\sprites\$id"
  New-Item -ItemType Directory -Force $dir | Out-Null
  Get-ChildItem $dir -Filter *.png | Remove-Item
  $ref = New-Object System.Drawing.Bitmap (Join-Path $origem "$($c.pasta)\$($c.ref)"); $rb = Caixa $ref; $ref.Dispose()
  $ALT = $ALTS[$id]; $q = $ALT / ($rb[3] - $rb[1] + 1)
  $lista = [ordered]@{}
  foreach ($f in (Get-ChildItem (Join-Path $origem $c.pasta) -Filter *_transparente.png | Sort-Object Name)) {
    $nome = if ($c.nomes.ContainsKey($f.Name)) { $c.nomes[$f.Name] } else { $f.Name.Replace($c.prefixo, '').Replace('_transparente.png', '') }
    if (-not $c.esc.ContainsKey($nome)) { throw "sem escala para $id/$nome" }
    $src = New-Object System.Drawing.Bitmap $f.FullName; $b = Caixa $src
    $sx = [Math]::Max(0, $b[0] - $PAD); $sy = [Math]::Max(0, $b[1] - $PAD); $sw = [Math]::Min($src.Width, $b[2] + $PAD + 1) - $sx; $sh = [Math]::Min($src.Height, $b[3] + $PAD + 1) - $sy
    $k = $q * [double]$c.esc[$nome]
    $w = [int][Math]::Round($sw * $k); $h = [int][Math]::Round($sh * $k)
    $out = New-Object System.Drawing.Bitmap $w, $h, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($out); $g.Clear([System.Drawing.Color]::Transparent)
    $g.InterpolationMode = 'HighQualityBicubic'; $g.PixelOffsetMode = 'HighQuality'; $g.SmoothingMode = 'HighQuality'; $g.CompositingQuality = 'HighQuality'
    $at = New-Object System.Drawing.Imaging.ImageAttributes; $at.SetWrapMode([System.Drawing.Drawing2D.WrapMode]::TileFlipXY) # borda sem halo
    $g.DrawImage($src, (New-Object System.Drawing.Rectangle 0, 0, $w, $h), $sx, $sy, $sw, $sh, [System.Drawing.GraphicsUnit]::Pixel, $at)
    $g.Dispose(); $src.Dispose()
    $out.Save((Join-Path $dir "$nome.png"), [System.Drawing.Imaging.ImageFormat]::Png); $out.Dispose()
    # âncora x = centro de massa do desenho (não pula para o lado ao trocar de passo); y = linha dos pés
    $ax = [Math]::Round(($b[4] - $sx) * $k, 1); $ay = [Math]::Round(($b[3] + 1 - $sy) * $k, 1)
    $olha = if ($c.olha.ContainsKey($nome)) { $c.olha[$nome] } else { 1 }
    $lista[$nome] = @($w, $h, $ax, $ay, $olha)
    $lista['_ref'] = $ALT
  }
  $dados[$id] = $lista
  "$id : $($lista.Count) sprites, $([Math]::Round(((Get-ChildItem $dir -Filter *.png | Measure-Object Length -Sum).Sum) / 1KB)) KB"
}
$js = "// GERADO por ferramentas/caes-sprites.ps1 (nao editar a mao). Sprites dos caes: [largura, altura, x do meio, y dos pes, olha]`n" +
  "// em px do PNG; _ref = altura (px) do desenho em pe de referencia. olha = 1 (direita) ou -1 (esquerda).`n" +
  "export const SPRITES = " + ($dados | ConvertTo-Json -Depth 5 -Compress) + ";`n"
[IO.File]::WriteAllText((Join-Path $raiz 'ar\caes\sprites-dados.js'), $js, (New-Object System.Text.UTF8Encoding $false))
'pronto'
