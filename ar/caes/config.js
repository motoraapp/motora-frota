// Os 3 cachorros. A aparência vem dos desenhos em ar/caes/img (elvis.png, belinha.png, maya.png): para mudar o visual, troque o PNG
// (fundo transparente, cachorro olhando para a direita). Aqui se ajusta nome, tamanho e jeito de cada um.
// nome/artigo aparecem nos balões e nos avisos ("O Elvis está com fome!").
export const CACHORROS = [
  {
    id: 'elvis', nome: 'Elvis', artigo: 'o', sexo: 'M', raca: 'pinscher', imagem: 'elvis.png', // pinscher macho branco malhado, sem rabo, o menor
    tamanho: 54,          // tamanho em pixels (o desenho tem 1,3 vez isso de altura)
    energia: 1.0,         // 0 calmo … 1 agitado (velocidade, frequência dos eventos)
    voz: 1.35,            // agudo do latido
    corpo: { perna: 0.50 },
    ossos: { // articulações no desenho (pixels da imagem): p = ponto onde gira, r = região que acompanha [x1, y1, x2, y2], f = suavidade
      cabeca: { p: [128, 128], r: [66, -60, 240, 135], f: 14 },
      orelhas: [{ p: [120, 78], r: [70, 22, 130, 100], f: 8 }, { p: [170, 52], r: [154, -20, 220, 72], f: 6 }],
      rabo: { p: [0, 0], r: [-10, -10, -5, -5], f: 1 }, // sem rabo
      pernas: [{ p: [113, 198], r: [96, 198, 130, 400], f: 10 }, { p: [146, 205], r: [130, 205, 170, 400], f: 10 },
        { p: [30, 188], r: [-4, 188, 42, 400], f: 10 }, { p: [62, 192], r: [40, 192, 80, 400], f: 10 }],
    },
  },
  {
    id: 'belinha', nome: 'Belinha', artigo: 'a', sexo: 'F', raca: 'pinscher', imagem: 'belinha.png', // pinscher fêmea caramela, média
    tamanho: 66,
    energia: 0.75,        // atrevida
    voz: 1.15,
    corpo: { perna: 0.56 },
    ossos: {
      cabeca: { p: [130, 125], r: [90, -60, 260, 130], f: 14 },
      orelhas: [{ p: [100, 70], r: [66, -10, 124, 85], f: 8 }, { p: [175, 60], r: [152, -20, 240, 78], f: 6 }],
      rabo: { p: [40, 150], r: [-40, 124, 42, 162], f: 8 },
      pernas: [{ p: [128, 192], r: [108, 192, 146, 400], f: 10 }, { p: [152, 198], r: [140, 198, 172, 400], f: 10 },
        { p: [40, 175], r: [-10, 175, 54, 400], f: 10 }, { p: [62, 190], r: [52, 190, 80, 400], f: 10 }],
    },
  },
  {
    id: 'maya', nome: 'Maya', artigo: 'a', sexo: 'F', raca: 'shihtzu', imagem: 'maya.png', // shih tzu com laços rosa, a maior
    tamanho: 80,
    energia: 0.35,        // calma
    voz: 0.95,
    corpo: { perna: 0.34 },
    ossos: { // sentada: só cabeça, orelhas e rabo (as patas não se mexem; ela anda "pulando")
      cabeca: { p: [150, 190], r: [40, -60, 330, 205], f: 18 },
      orelhas: [{ p: [92, 70], r: [40, 40, 128, 190], f: 12 }, { p: [238, 50], r: [212, 10, 330, 175], f: 10 }],
      rabo: { p: [55, 228], r: [-40, 175, 62, 270], f: 12 },
      pernas: [{ p: [0, 0], r: [-10, -10, -5, -5], f: 1 }, { p: [0, 0], r: [-10, -10, -5, -5], f: 1 }, { p: [0, 0], r: [-10, -10, -5, -5], f: 1 }, { p: [0, 0], r: [-10, -10, -5, -5], f: 1 }],
    },
  },
];
