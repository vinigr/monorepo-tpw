export const users = [
  { id: 1, label: 'vinicios@teste.com', nome: 'Vinícios G.' },
  { id: 2, label: 'daniel@teste.com', nome: 'Daniel C.' },
  { id: 3, label: 'marllus@teste.com', nome: 'Marllus S.' },
  { id: 4, label: 'stefany@teste.com', nome: 'Stefany A.' },
];

export const articles = [
  {
    id: 'ikfdjsoijfsd',
    titulo: 'Gamificação como estratégia de aprendizagem',
    orientador: { id: '111', nome: 'José Barros Castro' },
    autores: [
      { id: '5da651adf111b311886efa93', nome: 'Estevan Ferreira Martins' },
      { id: 'tpw2', nome: 'Alex Barros Lima' },
    ],
    outrosAutores: ['Eduarda Cunha Barbosa'],
    palavrasChave: ['Gamificação', 'Tecnologia', 'Aprendizagem'],
    resumo: `Phasellus vel viverra neque. Cras vehicula tortor laoreet, 
      eleifend erat quis, vehicula ante. In lectus eros, eleifend 
      sed ligula at, placerat convallis leo. Quisque tristique molestie 
      urna, a gravida magna finibus at. Ut tincidunt orci urna, sit amet 
      eleifend tortor dapibus in. Praesent scelerisque tortor lacus, id 
      placerat nibh egestas ut. Morbi aliquam vestibulum arcu nec iaculis. 
      Proin convallis magna lacus, id consectetur tortor egestas sed. Nam 
      gravida sagittis nibh at vestibulum. Quisque scelerisque ipsum eu 
      augue aliquet convallis. Maecenas tellus nunc, dignissim nec dolor ac, 
      imperdiet ultrices nulla. Nullam gravida mauris ac pellentesque rutrum. 
      Donec tincidunt eu urna ac pellentesque.`,
    caminho:
      'https://americalatina.dint.fgv.br/sites/americalatina.dint.fgv.br/files/teste33.pdf',
    editavel: true,
    publicado: false,
  },
  {
    id: 'eratpurus',
    titulo: `Quisque dapibus malesuada mi in ultricies. Cras consequat tincidunt nibh 
      et tristique. Fusce tempor blandit nisl.`,
    orientador: { id: '111', nome: 'Kai Dias Pereira' },
    autores: [
      { id: '5da651adf111b311886efa93', nome: 'Danilo Goncalves Barros' },
      { id: 'tpw2', nome: 'Rafael Dias Azevedo' },
    ],
    outrosAutores: ['Eduarda Cunha Barbosa'],
    palavrasChave: ['Gamificação', 'Tecnologia', 'Aprendizagem'],
    resumo: `Pellentesque sed scelerisque ex, volutpat imperdiet mi. 
    Aliquam a enim suscipit, viverra mi sed, finibus ligula. Pellentesque 
    ut erat vel diam interdum rutrum vel sit amet nibh. In a pretium sapien, 
    eget vehicula quam. Ut eget dapibus neque. Donec vitae est eget nisi 
    gravida varius. Proin augue lorem, tincidunt ut rutrum quis, malesuada a 
    lorem. Cras a tortor consectetur, pellentesque felis non, volutpat ipsum. 
    Praesent non quam eu magna tempus bibendum eu eget ipsum. Curabitur at 
    sagittis ante. Interdum et malesuada fames ac ante ipsum primis 
    in faucibus.`,
    caminho:
      'https://americalatina.dint.fgv.br/sites/americalatina.dint.fgv.br/files/teste33.pdf',
    editavel: false,
    publicado: true,
  },
  {
    id: 'kjfhnsdjfds',
    titulo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    palavrasChave: ['sfdsfds'],
    autores: [
      { id: '5da651adf111b311886efa93', nome: 'Estevan Ferreira Martins' },
    ],
    publicado: true,
    editavel: false,
  },
  {
    id: 'kjdjfds',
    titulo: 'Aenean cursus sem non metus tincidunt consectetur.',
    autores: [
      { id: '5da651adf111b311886efa93', nome: 'Danilo Goncalves Barros' },
    ],
    palavrasChave: ['dsfsd'],
    publicado: false,
    editavel: true,
  },
];
