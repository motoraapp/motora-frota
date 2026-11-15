// Os 3 cachorros (fotos em refs/: Elvis = pinscher macho branco, Belinha = pinscher fêmea caramelo do vídeo, Maya = shih tzu branca). Para ajustar: mude cores (hexadecimal), tamanho (pixels de comprimento) e marcas aqui.
// nome/artigo aparecem nos balões e nos avisos ("O Elvis está com fome!").
export const CACHORROS = [
  {
    id: 'elvis', nome: 'Elvis', artigo: 'o', sexo: 'M', raca: 'pinscher',
    tamanho: 54,          // o menor
    energia: 1.0,         // 0 calmo … 1 agitado (velocidade, rabo, frequência dos eventos)
    voz: 1.35,            // agudo do latido
    corpo: { perna: 0.50, largura: 0.82, cabeca: 1.4, orelha: 1.35, focinho: 0.62 },
    cores: {
      pelo: '#f4efe8', mancha: '#c98a4b', orelha: '#c98a4b', orelhaDentro: '#e9b3a6',
      pintas: '#8a6a5c', nariz: '#2a2223', olho: '#1a1414', lingua: '#e0707e', unha: '#d9cfc4',
    },
    marcas: { mascaraOlhos: true, pintasPeito: true, faixaTesta: true, manchaCostas: true },
    rabo: false,          // os dois pinschers não têm rabo
  },
  {
    id: 'belinha', nome: 'Belinha', artigo: 'a', sexo: 'F', raca: 'pinscher',
    tamanho: 66,          // médio
    energia: 0.75,        // atrevida
    voz: 1.15,
    corpo: { perna: 0.56, largura: 0.86, cabeca: 1.25, orelha: 1.3, focinho: 0.8 },
    cores: {
      pelo: '#c99459', mancha: '#a8743f', orelha: '#c08a52', orelhaDentro: '#e4b994', focinhoEscuro: '#3b302b',
      pintas: '#8a6a5c', nariz: '#2a2223', olho: '#1a1414', lingua: '#e0707e', unha: '#4a3f38',
    },
    marcas: { mascaraOlhos: false, pintasPeito: false, faixaTesta: false, mancaDorso: true, focinhoEscuro: true },
    rabo: false,
  },
  {
    id: 'maya', nome: 'Maya', artigo: 'a', sexo: 'F', raca: 'shihtzu',
    tamanho: 80,          // a maior
    energia: 0.35,        // calma
    voz: 0.95,
    corpo: { perna: 0.34, largura: 1.05, cabeca: 1.35, orelha: 1.0, focinho: 0.5 },
    cores: {
      pelo: '#e2dacb', pelo2: '#ece6da', orelha: '#b8a48d', topo: '#c9b8a2', barba: '#f8f5ef', mascara: '#857464',
      nariz: '#1e1a1a', olho: '#120e0e', lingua: '#df6f7e', unha: '#3a2f28',
    },
    marcas: { tufos: 30 },
  },
];
