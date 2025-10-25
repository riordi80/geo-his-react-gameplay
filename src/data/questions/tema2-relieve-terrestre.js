/**
 * BANCO DE PREGUNTAS - TEMA 2: EL RELIEVE TERRESTRE
 *
 * Distribución:
 * - 10 preguntas FÁCILES (conceptos básicos)
 * - 10 preguntas MEDIAS (relaciones y procesos)
 * - 10 preguntas DIFÍCILES (conceptos avanzados)
 *
 * Por tipo:
 * - 6 multipleChoice
 * - 6 trueFalse
 * - 6 fillBlanks
 * - 6 matching
 * - 6 classify
 */

export const tema2Questions = [
  // ========================================
  // PREGUNTAS FÁCILES (1-10)
  // ========================================

  // FÁCIL 1 - multipleChoice
  {
    id: 'tema2-q1',
    type: 'multipleChoice',
    difficulty: 'easy',
    question: '¿Qué es una cordillera?',
    options: [
      'Un conjunto de montañas de gran tamaño',
      'Una montaña de poca altura',
      'Un terreno llano y elevado',
      'Una superficie erosionada entre dos áreas elevadas'
    ],
    correctAnswer: 0,
    explanation: 'Una cordillera es un conjunto de montañas de gran tamaño, mientras que una sierra es un conjunto de montañas de menor tamaño.',
  },

  // FÁCIL 2 - trueFalse
  {
    id: 'tema2-q2',
    type: 'trueFalse',
    difficulty: 'easy',
    question: 'Una meseta es un relieve llano y elevado.',
    correctAnswer: true,
    explanation: 'Correcto. Una meseta es efectivamente un relieve llano y elevado, como la Meseta Central de España.',
  },

  // FÁCIL 3 - fillBlanks
  {
    id: 'tema2-q3',
    type: 'fillBlanks',
    difficulty: 'easy',
    question: 'Una _______ es un terreno rodeado completamente de agua.',
    blanks: ['isla'],
    correctAnswers: ['isla'],
    explanation: 'Una isla es un terreno completamente rodeado de agua. Un conjunto de islas se llama archipiélago.',
  },

  // FÁCIL 4 - multipleChoice
  {
    id: 'tema2-q4',
    type: 'multipleChoice',
    difficulty: 'easy',
    question: '¿Cuál es el océano más grande del planeta?',
    options: [
      'Océano Atlántico',
      'Océano Pacífico',
      'Océano Índico',
      'Océano Glacial Ártico'
    ],
    correctAnswer: 1,
    explanation: 'El Océano Pacífico es el más grande, con 165.000.000 km². Ocupa casi un tercio de la superficie terrestre.',
  },

  // FÁCIL 5 - trueFalse
  {
    id: 'tema2-q5',
    type: 'trueFalse',
    difficulty: 'easy',
    question: 'Un acantilado es una pared vertical elevada junto al mar.',
    correctAnswer: true,
    explanation: 'Correcto. Un acantilado es una formación rocosa vertical que se encuentra en la costa, erosionada por el mar.',
  },

  // FÁCIL 6 - fillBlanks
  {
    id: 'tema2-q6',
    type: 'fillBlanks',
    difficulty: 'easy',
    question: 'Un _______ es un conjunto de islas.',
    blanks: ['archipiélago'],
    correctAnswers: ['archipiélago', 'archipielago'],
    explanation: 'Un archipiélago es un conjunto de islas. Por ejemplo, las Islas Canarias forman un archipiélago.',
  },

  // FÁCIL 7 - matching
  {
    id: 'tema2-q7',
    type: 'matching',
    difficulty: 'easy',
    question: 'Empareja cada continente con su característica:',
    pairs: [
      { left: 'Asia', right: 'Continente más grande (30%)' },
      { left: 'Oceanía', right: 'Continente más pequeño (6%)' },
      { left: 'Europa', right: 'Segundo continente más pequeño (7%)' },
    ],
    explanation: 'Asia es el continente más grande con el 30% de las tierras emergidas. Oceanía es el más pequeño con solo el 6%.',
  },

  // FÁCIL 8 - classify
  {
    id: 'tema2-q8',
    type: 'classify',
    difficulty: 'easy',
    question: 'Clasifica estas formaciones según su ubicación:',
    categories: ['Relieve Interior', 'Relieve Costero'],
    items: [
      { id: 1, text: 'Montaña', category: 'Relieve Interior' },
      { id: 2, text: 'Playa', category: 'Relieve Costero' },
      { id: 3, text: 'Valle', category: 'Relieve Interior' },
      { id: 4, text: 'Golfo', category: 'Relieve Costero' },
    ],
    explanation: 'Las montañas y valles son formaciones del relieve interior. Las playas y golfos pertenecen al relieve costero.',
  },

  // FÁCIL 9 - multipleChoice
  {
    id: 'tema2-q9',
    type: 'multipleChoice',
    difficulty: 'easy',
    question: '¿Qué es un golfo?',
    options: [
      'Un entrante de mar en la costa',
      'Una pared vertical elevada junto al mar',
      'Un depósito de materiales en la desembocadura del río',
      'Un valle fluvial invadido por el mar'
    ],
    correctAnswer: 0,
    explanation: 'Un golfo es un entrante de mar en la costa. Es una porción de mar que se adentra en tierra.',
  },

  // FÁCIL 10 - trueFalse
  {
    id: 'tema2-q10',
    type: 'trueFalse',
    difficulty: 'easy',
    question: 'El continente más grande es América.',
    correctAnswer: false,
    explanation: 'Falso. El continente más grande es Asia, que representa el 30% de las tierras emergidas con 43.748.627 km².',
  },

  // ========================================
  // PREGUNTAS MEDIAS (11-20)
  // ========================================

  // MEDIA 11 - multipleChoice
  {
    id: 'tema2-q11',
    type: 'multipleChoice',
    difficulty: 'medium',
    question: '¿Qué se forma cuando las fuerzas internas de la Tierra actúan sobre materiales BLANDOS?',
    options: [
      'Fallas',
      'Pliegues',
      'Volcanes',
      'Terremotos'
    ],
    correctAnswer: 1,
    explanation: 'Los pliegues se forman cuando las fuerzas actúan sobre materiales blandos, que se ondulan sin romperse. Los materiales rígidos forman fallas al romperse.',
  },

  // MEDIA 12 - trueFalse
  {
    id: 'tema2-q12',
    type: 'trueFalse',
    difficulty: 'medium',
    question: 'Las placas tectónicas coinciden exactamente con los continentes.',
    correctAnswer: false,
    explanation: 'Falso. Las placas tectónicas NO coinciden exactamente con los continentes. Hay placas que incluyen partes de continentes y océanos.',
  },

  // MEDIA 13 - fillBlanks
  {
    id: 'tema2-q13',
    type: 'fillBlanks',
    difficulty: 'medium',
    question: 'La _______ es el proceso por el cual los materiales son arrastrados después de la erosión.',
    blanks: ['transporte'],
    correctAnswers: ['transporte'],
    explanation: 'El transporte arrastra los fragmentos arrancados por la erosión. Luego, estos materiales son sedimentados en otros lugares.',
  },

  // MEDIA 14 - matching
  {
    id: 'tema2-q14',
    type: 'matching',
    difficulty: 'medium',
    question: 'Relaciona cada agente externo con su efecto:',
    pairs: [
      { left: 'Temperatura', right: 'Rompe rocas por cambios bruscos' },
      { left: 'Viento', right: 'Transporta y deposita materiales' },
      { left: 'Agua', right: 'Disuelve componentes y erosiona' },
    ],
    explanation: 'Cada agente externo modifica el relieve de forma diferente: la temperatura fragmenta, el viento transporta y el agua erosiona.',
  },

  // MEDIA 15 - classify
  {
    id: 'tema2-q15',
    type: 'classify',
    difficulty: 'medium',
    question: 'Clasifica según sean océanos o continentes:',
    categories: ['Océano', 'Continente'],
    items: [
      { id: 1, text: 'Pacífico', category: 'Océano' },
      { id: 2, text: 'África', category: 'Continente' },
      { id: 3, text: 'Atlántico', category: 'Océano' },
      { id: 4, text: 'América', category: 'Continente' },
    ],
    explanation: 'Los océanos cubren las tierras sumergidas, mientras que los continentes son tierras emergidas.',
  },

  // MEDIA 16 - multipleChoice
  {
    id: 'tema2-q16',
    type: 'multipleChoice',
    difficulty: 'medium',
    question: '¿Qué es una ría?',
    options: [
      'Un entrante de mar en la costa',
      'Un valle fluvial invadido por el mar',
      'Un depósito de materiales en la desembocadura',
      'Una acumulación de arena junto al mar'
    ],
    correctAnswer: 1,
    explanation: 'Una ría es un valle fluvial (de un río) que ha sido invadido por el mar, creando una entrada de agua marina.',
  },

  // MEDIA 17 - trueFalse
  {
    id: 'tema2-q17',
    type: 'trueFalse',
    difficulty: 'medium',
    question: 'Los volcanes se forman principalmente en las zonas de contacto entre placas tectónicas.',
    correctAnswer: true,
    explanation: 'Correcto. Los volcanes se forman principalmente donde las placas tectónicas chocan o se separan, como en el Cinturón de Fuego del Pacífico.',
  },

  // MEDIA 18 - fillBlanks
  {
    id: 'tema2-q18',
    type: 'fillBlanks',
    difficulty: 'medium',
    question: 'Un _______ es el depósito de materiales que se forma en la desembocadura de un río.',
    blanks: ['delta'],
    correctAnswers: ['delta'],
    explanation: 'Un delta es la acumulación de sedimentos que un río deposita en su desembocadura, creando un terreno triangular.',
  },

  // MEDIA 19 - matching
  {
    id: 'tema2-q19',
    type: 'matching',
    difficulty: 'medium',
    question: 'Relaciona cada parte del volcán con su descripción:',
    pairs: [
      { left: 'Cráter', right: 'Boca por donde sale el magma' },
      { left: 'Chimenea', right: 'Conducto por donde asciende el magma' },
      { left: 'Lava', right: 'Magma que sale al exterior' },
    ],
    explanation: 'El cráter es la abertura superior, la chimenea el conducto interno, y la lava es el magma que ya ha salido del volcán.',
  },

  // MEDIA 20 - classify
  {
    id: 'tema2-q20',
    type: 'classify',
    difficulty: 'medium',
    question: 'Clasifica estas formaciones según sean relieves elevados o hundidos:',
    categories: ['Relieve Elevado', 'Relieve Hundido'],
    items: [
      { id: 1, text: 'Montaña', category: 'Relieve Elevado' },
      { id: 2, text: 'Valle', category: 'Relieve Hundido' },
      { id: 3, text: 'Meseta', category: 'Relieve Elevado' },
      { id: 4, text: 'Depresión', category: 'Relieve Hundido' },
    ],
    explanation: 'Las montañas y mesetas son relieves elevados, mientras que los valles y depresiones son superficies hundidas.',
  },

  // ========================================
  // PREGUNTAS DIFÍCILES (21-30)
  // ========================================

  // DIFÍCIL 21 - multipleChoice
  {
    id: 'tema2-q21',
    type: 'multipleChoice',
    difficulty: 'hard',
    question: '¿Qué diferencia hay entre el hipocentro y el epicentro de un terremoto?',
    options: [
      'El hipocentro está en la superficie y el epicentro en el interior',
      'El hipocentro está en el interior y el epicentro en la superficie',
      'Son lo mismo, solo cambia el nombre',
      'El hipocentro es más destructivo que el epicentro'
    ],
    correctAnswer: 1,
    explanation: 'El hipocentro es el punto en el INTERIOR de la Tierra donde se origina el terremoto. El epicentro es el punto en la SUPERFICIE donde es más destructivo.',
  },

  // DIFÍCIL 22 - trueFalse
  {
    id: 'tema2-q22',
    type: 'trueFalse',
    difficulty: 'hard',
    question: 'Las dorsales oceánicas son montañas en el fondo del océano que suelen ser de origen volcánico.',
    correctAnswer: true,
    explanation: 'Correcto. Las dorsales oceánicas son cordilleras submarinas formadas por actividad volcánica en las zonas donde las placas tectónicas se separan.',
  },

  // DIFÍCIL 23 - fillBlanks
  {
    id: 'tema2-q23',
    type: 'fillBlanks',
    difficulty: 'hard',
    question: 'La profundidad de la llanura abisal es de aproximadamente _______ metros.',
    blanks: ['4000'],
    correctAnswers: ['4000', '4.000'],
    explanation: 'La llanura abisal es la llanura en el fondo del océano con una profundidad media de unos 4000 metros.',
  },

  // DIFÍCIL 24 - matching
  {
    id: 'tema2-q24',
    type: 'matching',
    difficulty: 'hard',
    question: 'Relaciona cada forma de relieve marino con su profundidad:',
    pairs: [
      { left: 'Plataforma continental', right: 'Hasta 200 metros' },
      { left: 'Llanura abisal', right: 'Unos 4000 metros' },
      { left: 'Fosa marina', right: 'Más de 10.000 metros' },
    ],
    explanation: 'La plataforma continental es poco profunda (hasta 200m), la llanura abisal tiene profundidad media (4000m) y las fosas marinas son las más profundas (>10.000m).',
  },

  // DIFÍCIL 25 - classify
  {
    id: 'tema2-q25',
    type: 'classify',
    difficulty: 'hard',
    question: 'Clasifica estos procesos según sean internos o externos de modificación del relieve:',
    categories: ['Fuerzas Internas', 'Agentes Externos'],
    items: [
      { id: 1, text: 'Movimiento de placas', category: 'Fuerzas Internas' },
      { id: 2, text: 'Erosión del viento', category: 'Agentes Externos' },
      { id: 3, text: 'Terremotos', category: 'Fuerzas Internas' },
      { id: 4, text: 'Acción del agua', category: 'Agentes Externos' },
    ],
    explanation: 'Las fuerzas internas (placas, terremotos) vienen del interior de la Tierra. Los agentes externos (viento, agua) actúan desde la superficie.',
  },

  // DIFÍCIL 26 - multipleChoice
  {
    id: 'tema2-q26',
    type: 'multipleChoice',
    difficulty: 'hard',
    question: '¿Cuál es el lugar del planeta con más terremotos?',
    options: [
      'El Mar Mediterráneo',
      'El Cinturón de Fuego del Pacífico',
      'La Cordillera del Himalaya',
      'Las Islas Canarias'
    ],
    correctAnswer: 1,
    explanation: 'El Cinturón de Fuego del Pacífico, en los bordes del Océano Pacífico, es la zona con más terremotos y volcanes del mundo debido al contacto de múltiples placas.',
  },

  // DIFÍCIL 27 - trueFalse
  {
    id: 'tema2-q27',
    type: 'trueFalse',
    difficulty: 'hard',
    question: 'Un tsunami se genera cuando un terremoto o volcán se produce en el fondo del mar.',
    correctAnswer: true,
    explanation: 'Correcto. Un tsunami (o maremoto) se genera cuando hay un terremoto o erupción volcánica submarina, creando olas enormes que crecen al acercarse a la costa.',
  },

  // DIFÍCIL 28 - fillBlanks
  {
    id: 'tema2-q28',
    type: 'fillBlanks',
    difficulty: 'hard',
    question: 'El talud continental es el lugar donde termina la plataforma continental con un descenso muy _______.',
    blanks: ['brusco'],
    correctAnswers: ['brusco'],
    explanation: 'El talud continental marca el final de la plataforma continental con un descenso brusco hacia las profundidades oceánicas.',
  },

  // DIFÍCIL 29 - matching
  {
    id: 'tema2-q29',
    type: 'matching',
    difficulty: 'hard',
    question: 'Relaciona el proceso de modificación del relieve con su descripción:',
    pairs: [
      { left: 'Erosión', right: 'Desgasta las rocas y las fragmenta' },
      { left: 'Transporte', right: 'Arrastra los fragmentos arrancados' },
      { left: 'Sedimentación', right: 'Deposita materiales en otros lugares' },
    ],
    explanation: 'Estos tres procesos trabajan juntos: la erosión desgasta, el transporte mueve y la sedimentación deposita los materiales.',
  },

  // DIFÍCIL 30 - classify
  {
    id: 'tema2-q30',
    type: 'classify',
    difficulty: 'hard',
    question: 'Clasifica estas características según pertenezcan a pliegues o fallas:',
    categories: ['Pliegues', 'Fallas'],
    items: [
      { id: 1, text: 'Se forman en materiales blandos', category: 'Pliegues' },
      { id: 2, text: 'La corteza se rompe en bloques', category: 'Fallas' },
      { id: 3, text: 'Crean ondulaciones', category: 'Pliegues' },
      { id: 4, text: 'Se forman en materiales rígidos', category: 'Fallas' },
    ],
    explanation: 'Los pliegues se forman cuando materiales blandos se ondulan. Las fallas ocurren cuando materiales rígidos se rompen formando bloques.',
  },
];

export default tema2Questions;
