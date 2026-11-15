// Os 3 cachorros. A aparência vem dos desenhos em ar/caes/img (elvis.png, belinha.png, maya.png; *-olhos.png = olhos fechados, para
// piscar e dormir; maya-sentada.png = Maya sentada): para mudar o visual, troque o PNG
// (fundo transparente, cachorro olhando para a direita). Aqui se ajusta nome, tamanho e jeito de cada um.
// nome/artigo aparecem nos balões e nos avisos ("O Elvis está com fome!").
export const CACHORROS = [
  {
    id: 'elvis', nome: 'Elvis', artigo: 'o', sexo: 'M', raca: 'pinscher', imagem: 'elvis.png', olhos: 'elvis-olhos.png', boca2: { imagem: 'elvis-boca.png', aberta: true }, pernaPintas: '#8c7068', // pinscher macho branco malhado, sem rabo, o menor
    tamanho: 54,          // tamanho em pixels (o desenho tem 1,3 vez isso de altura)
    energia: 0.85,        // 0 calmo … 1 agitado (velocidade, frequência dos eventos)
    voz: 1.35,            // agudo do latido
    corpo: { perna: 0.50 },
    ossos: { // articulações no desenho (pixels da imagem): p = ponto onde gira, r = região que acompanha [x1, y1, x2, y2], f = (sem uso)
      // cada peça é recortada pela região r e gira em volta de p (peça rígida, sem esticar). (joelho j e pulso w de cada pata são achados sozinhos no desenho; dá para fixar com j: [x, y] e w: [x, y]. rabo.p2 = onde a ponta dobra)
      pescoco: { p: [112, 172], r: [84, 100, 160, 182], f: 8 }, // base do pescoço (ombros)
      cabeca: { p: [128, 128], r: [66, -60, 240, 135], f: 8 },
      boca: { p: [152, 112], r: [150, 111, 230, 134], f: 3 }, // mandíbula: gira no canto da boca
      orelhas: [{ p: [118, 78], r: [70, 22, 120, 84], f: 4 }, { p: [166, 56], r: [158, -20, 220, 62], f: 4 }],
      rabo: { p: [0, 0], r: [-10, -10, -5, -5], f: 1 }, // sem rabo
      pernas: [{ p: [113, 198], r: [96, 196, 130, 400], f: 4 }, { p: [146, 205], r: [130, 203, 170, 400], f: 4 }, // 0 frente perto, 1 frente longe
        { p: [30, 188], r: [-4, 186, 42, 400], f: 4 }, { p: [62, 192], r: [40, 190, 80, 400], f: 4 }],               // 2 trás perto, 3 trás longe
    },
  },
  {
    id: 'belinha', nome: 'Belinha', artigo: 'a', sexo: 'F', raca: 'pinscher', imagem: 'belinha.png', olhos: 'belinha-olhos.png', // pinscher fêmea caramela, média
    tamanho: 66,
    energia: 1.0,         // a mais agitada de todas (pedido do dono)
    voz: 1.15,
    corpo: { perna: 0.56 },
    ossos: {
      pescoco: { p: [120, 172], r: [95, 100, 152, 182], f: 8 },
      cabeca: { p: [130, 125], r: [90, -60, 260, 130], f: 8 },
      boca: { p: [138, 106], r: [136, 105, 230, 128], f: 3 },
      orelhas: [{ p: [116, 72], r: [66, -10, 120, 78], f: 4 }, { p: [162, 64], r: [154, -20, 240, 70], f: 4 }],
      rabo: { p: [36, 152], p2: [26, 140], r: [-40, 124, 40, 158], f: 4 },
      pernas: [{ p: [128, 192], r: [108, 190, 146, 400], f: 4 }, { p: [152, 198], r: [140, 196, 172, 400], f: 4 },
        { p: [40, 175], r: [-10, 173, 54, 400], f: 4 }, { p: [62, 190], r: [52, 188, 80, 400], f: 4 }],
    },
  },
  {
    id: 'maya', nome: 'Maya', artigo: 'a', sexo: 'F', raca: 'shihtzu', imagem: 'maya.png', bandaCabeca: 26, olhos: 'maya-olhos.png', boca2: { imagem: 'maya-boca.png', aberta: false }, // shih tzu em pé com laços rosa, a maior
    tamanho: 80,
    energia: 0.35,        // calma
    voz: 0.95,
    corpo: { perna: 0.34 },
    ossos: { // em pé (imagem 280x300)
      cabeca: { p: [184, 156], r: [95, -60, 330, 160], f: 10 },
      boca: { p: [190, 100], r: [180, 99, 245, 140], f: 4 },
      orelhas: [{ p: [130, 44], r: [90, 35, 152, 165], f: 6 }, { p: [248, 30], r: [232, 15, 330, 152], f: 6 }],
      rabo: { p: [78, 140], p2: [36, 108], r: [-40, 70, 88, 158], f: 6 },
      pernas: [{ p: [153, 177], r: [124, 178, 180, 400], f: 5, corte: 26 }, { p: [208, 172], r: [182, 176, 234, 400], f: 5, corte: 26 }, // Maya: só a parte de baixo das patas se mexe (o pelo da barriga fica)
        { p: [51, 177], r: [16, 175, 70, 400], f: 5, corte: 26 }, { p: [95, 180], r: [74, 180, 114, 400], f: 5, corte: 26 }],
    },    poseSentada: { // desenho dela sentada (265x300): usado ao sentar e deitar; mexe cabeça, orelhas e rabo
      imagem: 'maya-sentada.png',
      ossos: {
        cabeca: { p: [150, 190], r: [40, -60, 330, 205], f: 18 },
        orelhas: [{ p: [92, 70], r: [40, 40, 128, 190], f: 12 }, { p: [238, 50], r: [212, 10, 330, 175], f: 10 }],
        rabo: { p: [55, 228], r: [-40, 175, 62, 270], f: 12 },
        pernas: [0, 1, 2, 3].map(() => ({ p: [0, 0], r: [-10, -10, -5, -5], f: 1 })),
      },
    },

  },
];
