/**
 * Barrel export de todos los temas disponibles
 */

import { tema1 } from './topic-tema1';
import { tema2 } from './topic-tema2';

// Array con todos los temas
export const topics = [tema1, tema2];

// Exportar temas individuales
export { tema1, tema2 };

/**
 * Obtener tema por ID
 */
export const getTopicById = (topicId) => {
  return topics.find((topic) => topic.id === topicId);
};

/**
 * Obtener temas por asignatura
 */
export const getTopicsBySubject = (subjectId) => {
  return topics.filter((topic) => topic.subjectId === subjectId);
};

/**
 * Obtener temas disponibles (que tienen contenido)
 */
export const getAvailableTopics = () => {
  return topics.filter((topic) => topic.status === 'available');
};

/**
 * Obtener todos los temas
 */
export const getAllTopics = () => {
  return topics;
};
