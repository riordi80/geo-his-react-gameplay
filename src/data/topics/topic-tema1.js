/**
 * TEMA 1: La Tierra y su Representación
 * Geografía e Historia - ESO
 */

export const tema1 = {
  id: 'tema1-tierra',
  number: 1,
  title: 'La Tierra y su Representación',
  shortTitle: 'La Tierra',
  description: 'Descubre cómo representamos nuestro planeta y sus características',
  subjectId: 'geography-history',

  // Color del tema
  color: '#4CAF50',

  // Thumbnail para carrusel Netflix
  thumbnail: '/images/topics/tema1-thumbnail.jpg', // TODO: Añadir imagen

  // Contenido del tema dividido en pestañas
  content: {
    theory: {
      available: false, // Pendiente de implementar
      title: 'Teoría',
      description: 'Contenido teórico sobre la Tierra y su representación',
      // TODO: Añadir contenido teórico (markdown/HTML)
    },
    diagram: {
      available: false, // Pendiente de implementar
      title: 'Esquema',
      description: 'Esquemas y mapas conceptuales del tema',
      // TODO: Añadir esquemas
    },
    video: {
      available: false, // Pendiente de implementar
      title: 'Vídeo',
      description: 'Vídeos educativos sobre el tema',
      videos: [
        // TODO: Añadir vídeos
      ],
    },
    game: {
      available: false, // No hay quiz implementado aún
      title: 'Juego',
      description: 'Quiz interactivo para practicar',
      gameType: 'quiz', // Tipo de juego
      gameId: 'tema1-tierra', // ID para cargar el juego
    },
  },

  // Estado del tema
  status: 'coming-soon', // 'available', 'coming-soon', 'locked'

  // Metadatos
  difficulty: 'medium',
  estimatedTime: '45 min',

  // Keywords para búsqueda (futuro)
  keywords: ['tierra', 'representación', 'mapas', 'coordenadas', 'geografía'],
};

export default tema1;
