/**
 * Configuración de cursos disponibles en la plataforma
 */

export const courses = [
  {
    id: 'eso',
    name: 'ESO',
    fullName: 'Educación Secundaria Obligatoria',
    description: 'Cursos de Educación Secundaria Obligatoria',
    levels: [
      { id: '1-eso', name: '1º ESO', year: 1 },
      { id: '2-eso', name: '2º ESO', year: 2 },
      { id: '3-eso', name: '3º ESO', year: 3 },
      { id: '4-eso', name: '4º ESO', year: 4 },
    ],
    color: '#667eea',
    icon: '🎓',
  },
];

/**
 * Obtener curso por ID
 */
export const getCourseById = (courseId) => {
  return courses.find(course => course.id === courseId);
};

/**
 * Obtener todos los cursos
 */
export const getAllCourses = () => {
  return courses;
};
