/**
 * Configuración de asignaturas disponibles en la plataforma
 */

export const subjects = [
  {
    id: 'geography-history',
    name: 'Geografía e Historia',
    shortName: 'Geo&His',
    description: 'Explora el mundo y su pasado',
    courseId: 'eso',
    color: '#764ba2',
    icon: '🌍',
    topics: [
      'tema1-tierra',
      'tema2-relieve',
      // Futuros temas se añadirán aquí
    ],
  },
  // Futuras asignaturas se añadirán aquí
];

/**
 * Obtener asignatura por ID
 */
export const getSubjectById = (subjectId) => {
  return subjects.find(subject => subject.id === subjectId);
};

/**
 * Obtener asignaturas por curso
 */
export const getSubjectsByCourse = (courseId) => {
  return subjects.filter(subject => subject.courseId === courseId);
};

/**
 * Obtener todas las asignaturas
 */
export const getAllSubjects = () => {
  return subjects;
};
