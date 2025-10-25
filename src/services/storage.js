/**
 * Servicio para manejar el almacenamiento local (localStorage)
 * Gestiona rankings por tema y progreso del usuario
 */

const STORAGE_KEYS = {
  RANKINGS: 'geohis_rankings',
  PROGRESS: 'geohis_progress',
};

/**
 * Guarda un resultado en el ranking de un tema
 * @param {string} topicId - ID del tema
 * @param {object} result - Objeto con los datos del resultado
 * @param {string} result.initials - Iniciales del jugador
 * @param {object} result.avatar - Avatar del jugador
 * @param {number} result.score - Puntuación (0-100)
 * @param {number} result.correct - Respuestas correctas
 * @param {number} result.total - Total de preguntas
 * @param {number} result.stars - Estrellas obtenidas (0-3)
 * @param {number} result.maxStreak - Racha máxima conseguida
 */
export const saveRanking = (topicId, result) => {
  try {
    // Obtener rankings actuales
    const rankings = getRankings();

    // Crear entrada para el tema si no existe
    if (!rankings[topicId]) {
      rankings[topicId] = [];
    }

    // Crear objeto de resultado con timestamp
    const entry = {
      ...result,
      date: new Date().toISOString(),
      id: `${topicId}-${Date.now()}`,
    };

    // Añadir nuevo resultado
    rankings[topicId].push(entry);

    // Ordenar por puntuación (descendente) y luego por fecha (más reciente primero)
    rankings[topicId].sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return new Date(b.date) - new Date(a.date);
    });

    // Mantener solo los mejores 100 resultados por tema (para no llenar localStorage)
    rankings[topicId] = rankings[topicId].slice(0, 100);

    // Guardar en localStorage
    localStorage.setItem(STORAGE_KEYS.RANKINGS, JSON.stringify(rankings));

    return entry;
  } catch (error) {
    console.error('Error al guardar ranking:', error);
    return null;
  }
};

/**
 * Obtiene todos los rankings guardados
 * @returns {object} Objeto con rankings por tema
 */
export const getRankings = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.RANKINGS);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Error al obtener rankings:', error);
    return {};
  }
};

/**
 * Obtiene el ranking de un tema específico
 * @param {string} topicId - ID del tema
 * @param {number} limit - Número máximo de resultados (por defecto 10)
 * @returns {array} Array de resultados ordenados
 */
export const getTopicRanking = (topicId, limit = 10) => {
  try {
    const rankings = getRankings();
    const topicRanking = rankings[topicId] || [];
    return topicRanking.slice(0, limit);
  } catch (error) {
    console.error('Error al obtener ranking del tema:', error);
    return [];
  }
};

/**
 * Obtiene la posición de un resultado en el ranking de un tema
 * @param {string} topicId - ID del tema
 * @param {string} resultId - ID del resultado
 * @returns {number} Posición en el ranking (1-based) o -1 si no se encuentra
 */
export const getRankPosition = (topicId, resultId) => {
  try {
    const ranking = getTopicRanking(topicId, 100);
    const index = ranking.findIndex(r => r.id === resultId);
    return index !== -1 ? index + 1 : -1;
  } catch (error) {
    console.error('Error al obtener posición en ranking:', error);
    return -1;
  }
};

/**
 * Obtiene las mejores puntuaciones de un jugador en un tema
 * @param {string} topicId - ID del tema
 * @param {string} initials - Iniciales del jugador
 * @param {number} limit - Número máximo de resultados
 * @returns {array} Array de resultados del jugador
 */
export const getPlayerBestScores = (topicId, initials, limit = 5) => {
  try {
    const rankings = getRankings();
    const topicRanking = rankings[topicId] || [];

    return topicRanking
      .filter(r => r.initials.toUpperCase() === initials.toUpperCase())
      .slice(0, limit);
  } catch (error) {
    console.error('Error al obtener mejores puntuaciones del jugador:', error);
    return [];
  }
};

/**
 * Guarda el progreso del jugador
 * @param {object} progress - Objeto con el progreso
 */
export const saveProgress = (progress) => {
  try {
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  } catch (error) {
    console.error('Error al guardar progreso:', error);
  }
};

/**
 * Obtiene el progreso guardado
 * @returns {object} Objeto con el progreso
 */
export const getProgress = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Error al obtener progreso:', error);
    return {};
  }
};

/**
 * Limpia todos los datos guardados
 */
export const clearAllData = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.RANKINGS);
    localStorage.removeItem(STORAGE_KEYS.PROGRESS);
    return true;
  } catch (error) {
    console.error('Error al limpiar datos:', error);
    return false;
  }
};

/**
 * Obtiene estadísticas generales de un tema
 * @param {string} topicId - ID del tema
 * @returns {object} Objeto con estadísticas
 */
export const getTopicStats = (topicId) => {
  try {
    const rankings = getRankings();
    const topicRanking = rankings[topicId] || [];

    if (topicRanking.length === 0) {
      return {
        totalPlays: 0,
        averageScore: 0,
        highestScore: 0,
        uniquePlayers: 0,
      };
    }

    const totalPlays = topicRanking.length;
    const averageScore = Math.round(
      topicRanking.reduce((sum, r) => sum + r.score, 0) / totalPlays
    );
    const highestScore = topicRanking[0].score;
    const uniquePlayers = new Set(topicRanking.map(r => r.initials.toUpperCase())).size;

    return {
      totalPlays,
      averageScore,
      highestScore,
      uniquePlayers,
    };
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    return {
      totalPlays: 0,
      averageScore: 0,
      highestScore: 0,
      uniquePlayers: 0,
    };
  }
};

export default {
  saveRanking,
  getRankings,
  getTopicRanking,
  getRankPosition,
  getPlayerBestScores,
  saveProgress,
  getProgress,
  clearAllData,
  getTopicStats,
};
