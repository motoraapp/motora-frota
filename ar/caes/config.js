// Os 3 cachorros. A aparência vem dos desenhos em ar/caes/img (elvis.png, belinha.png, maya.png): para mudar o visual, troque o PNG
// (fundo transparente, cachorro olhando para a direita). Aqui se ajusta nome, tamanho e jeito de cada um.
// nome/artigo aparecem nos balões e nos avisos ("O Elvis está com fome!").
export const CACHORROS = [
  {
    id: 'elvis', nome: 'Elvis', artigo: 'o', sexo: 'M', raca: 'pinscher', imagem: 'elvis.png', // pinscher macho branco malhado, o menor
    tamanho: 54,          // tamanho em pixels (o desenho tem 1,3 vez isso de altura)
    energia: 1.0,         // 0 calmo … 1 agitado (velocidade, frequência dos eventos)
    voz: 1.35,            // agudo do latido
    corpo: { perna: 0.50 },
  },
  {
    id: 'belinha', nome: 'Belinha', artigo: 'a', sexo: 'F', raca: 'pinscher', imagem: 'belinha.png', // pinscher fêmea caramela, média
    tamanho: 66,
    energia: 0.75,        // atrevida
    voz: 1.15,
    corpo: { perna: 0.56 },
  },
  {
    id: 'maya', nome: 'Maya', artigo: 'a', sexo: 'F', raca: 'shihtzu', imagem: 'maya.png', // shih tzu com laços rosa, a maior
    tamanho: 80,
    energia: 0.35,        // calma
    voz: 0.95,
    corpo: { perna: 0.34 },
  },
];
