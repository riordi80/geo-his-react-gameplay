/**
 * TEMA 2: El Relieve Terrestre
 * Geografía e Historia - ESO
 * ✅ Quiz implementado con 30 preguntas
 */

export const tema2 = {
  id: 'tema2-relieve',
  number: 2,
  title: 'El Relieve Terrestre',
  shortTitle: 'El Relieve',
  description: 'Aprende sobre las formas del relieve y los agentes que lo modelan',
  subjectId: 'geography-history',

  // Color del tema
  color: '#FF9800',

  // Thumbnail para carrusel Netflix
  thumbnail: '/images/topics/tema2-thumbnail.jpg', // TODO: Añadir imagen

  // Contenido del tema dividido en pestañas
  content: {
    theory: {
      available: false, // Pendiente de implementar
      title: 'Teoría',
      description: 'Contenido teórico sobre el relieve terrestre',
      sections: [
        {
          title: 'Introducción al Relieve',
          content: 'El relieve terrestre es el conjunto de formas que presenta la superficie de la Tierra...',
        },
        {
          title: 'Tipos de Relieve',
          content: 'Montañas, llanuras, mesetas, valles, depresiones...',
        },
        {
          title: 'Agentes Modeladores',
          content: 'Erosión, sedimentación, meteorización...',
        },
        // TODO: Añadir contenido completo desde PDF
      ],
    },
    diagram: {
      available: false, // Pendiente de implementar
      title: 'Esquema',
      description: 'Esquemas y mapas conceptuales del relieve',
      diagrams: [
        {
          title: 'Tipos de Relieve',
          image: '/images/diagrams/tema2-tipos-relieve.png',
        },
        {
          title: 'Agentes Modeladores',
          image: '/images/diagrams/tema2-agentes.png',
        },
      ],
    },
    video: {
      available: false, // Pendiente de implementar
      title: 'Vídeo',
      description: 'Vídeos educativos sobre el relieve terrestre',
      videos: [
        {
          title: 'El Relieve Terrestre - Introducción',
          url: '', // TODO: Añadir URL de YouTube
          duration: '10:30',
        },
        {
          title: 'Agentes Modeladores del Relieve',
          url: '', // TODO: Añadir URL de YouTube
          duration: '12:15',
        },
      ],
    },
    game: {
      available: true, // ✅ Quiz implementado
      title: 'Juego',
      description: 'Quiz interactivo con 30 preguntas sobre el relieve terrestre',
      gameType: 'quiz', // Tipo de juego
      gameId: 'tema2-relieve', // ID para cargar el juego
      questionsCount: 30,
      questionTypes: [
        'multipleChoice',
        'trueFalse',
        'fillBlanks',
        'matching',
        'classify',
      ],
    },
  },

  // Estado del tema
  status: 'available', // ✅ Disponible (al menos el juego)

  // Metadatos
  difficulty: 'medium',
  estimatedTime: '45 min',

  // Keywords para búsqueda (futuro)
  keywords: [
    'relieve',
    'montañas',
    'llanuras',
    'erosión',
    'sedimentación',
    'geografía',
    'meseta',
    'cordillera',
  ],
};

export default tema2;
