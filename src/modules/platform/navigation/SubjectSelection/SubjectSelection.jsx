import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, Container, Card, CardContent, CardActionArea } from '@mui/material';
import { motion } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { getSubjectsByCourse } from '@data/subjects';
import { getCourseById } from '@data/courses';

/**
 * SubjectSelection - Pantalla de selección de asignatura
 * Muestra las asignaturas disponibles para el curso seleccionado
 */
const SubjectSelection = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const course = getCourseById(courseId);
  const subjects = getSubjectsByCourse(courseId);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const handleSubjectSelect = (subjectId) => {
    navigate(`/topics/${subjectId}`);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        {/* Botón de volver */}
        <Box sx={{ mb: 3 }}>
          <IconButton
            onClick={() => navigate('/courses')}
            sx={{
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Box>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Breadcrumb */}
          {course && (
            <motion.div variants={itemVariants}>
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  mb: 2,
                  textAlign: 'center',
                }}
              >
                {course.name}
              </Typography>
            </motion.div>
          )}

          {/* Título */}
          <motion.div variants={itemVariants}>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                color: 'white',
                fontWeight: 'bold',
                mb: 1,
                textAlign: 'center',
              }}
            >
              Selecciona tu asignatura
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                mb: 5,
                textAlign: 'center',
              }}
            >
              Elige la materia que quieres estudiar
            </Typography>
          </motion.div>

          {/* Asignaturas disponibles */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              },
              gap: 3,
              mt: 4,
            }}
          >
            {subjects.map((subject) => (
              <motion.div
                key={subject.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    backgroundColor: 'white',
                    borderRadius: 3,
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                  }}
                >
                  <CardActionArea
                    onClick={() => handleSubjectSelect(subject.id)}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      p: 4,
                      minHeight: 250,
                    }}
                  >
                    {/* Icono de la asignatura */}
                    <Box
                      sx={{
                        fontSize: '5rem',
                        mb: 2,
                      }}
                    >
                      {subject.icon}
                    </Box>

                    <CardContent sx={{ textAlign: 'center', p: 0 }}>
                      {/* Nombre de la asignatura */}
                      <Typography
                        variant="h5"
                        component="h2"
                        sx={{
                          fontWeight: 'bold',
                          color: subject.color,
                          mb: 1,
                        }}
                      >
                        {subject.name}
                      </Typography>

                      {/* Nombre corto */}
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: subject.color,
                          opacity: 0.8,
                          mb: 2,
                          fontWeight: 'bold',
                        }}
                      >
                        {subject.shortName}
                      </Typography>

                      {/* Descripción */}
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: '0.9rem' }}
                      >
                        {subject.description}
                      </Typography>

                      {/* Número de temas */}
                      <Box
                        sx={{
                          mt: 2,
                          px: 2,
                          py: 0.5,
                          borderRadius: 1,
                          backgroundColor: 'rgba(118, 75, 162, 0.1)',
                          display: 'inline-block',
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            fontWeight: 'bold',
                            color: subject.color,
                          }}
                        >
                          {subject.topics.length} temas disponibles
                        </Typography>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </motion.div>
            ))}
          </Box>

          {/* Mensaje si no hay asignaturas */}
          {subjects.length === 0 && (
            <motion.div variants={itemVariants}>
              <Box
                sx={{
                  textAlign: 'center',
                  py: 8,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                  }}
                >
                  No hay asignaturas disponibles para este curso aún
                </Typography>
              </Box>
            </motion.div>
          )}
        </motion.div>
      </Container>
    </Box>
  );
};

export default SubjectSelection;
