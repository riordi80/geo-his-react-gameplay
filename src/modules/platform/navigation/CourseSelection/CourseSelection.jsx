import { useNavigate } from 'react-router-dom';
import { Box, Typography, Container, Card, CardContent, CardActionArea } from '@mui/material';
import { motion } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { getAllCourses } from '@data/courses';

/**
 * CourseSelection - Pantalla de selección de curso
 * Muestra los cursos disponibles (ESO)
 */
const CourseSelection = () => {
  const navigate = useNavigate();
  const courses = getAllCourses();

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

  const handleCourseSelect = (courseId) => {
    navigate(`/subjects/${courseId}`);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        {/* Botón de volver */}
        <Box sx={{ mb: 3 }}>
          <IconButton
            onClick={() => navigate('/')}
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
              Selecciona tu curso
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
              Elige el nivel educativo que estás cursando
            </Typography>
          </motion.div>

          {/* Cursos disponibles */}
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
            {courses.map((course) => (
              <motion.div
                key={course.id}
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
                    onClick={() => handleCourseSelect(course.id)}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      p: 4,
                    }}
                  >
                    {/* Icono del curso */}
                    <Box
                      sx={{
                        fontSize: '4rem',
                        mb: 2,
                      }}
                    >
                      {course.icon}
                    </Box>

                    <CardContent sx={{ textAlign: 'center', p: 0 }}>
                      {/* Nombre del curso */}
                      <Typography
                        variant="h5"
                        component="h2"
                        sx={{
                          fontWeight: 'bold',
                          color: course.color,
                          mb: 1,
                        }}
                      >
                        {course.name}
                      </Typography>

                      {/* Nombre completo */}
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        {course.fullName}
                      </Typography>

                      {/* Descripción */}
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: '0.85rem' }}
                      >
                        {course.description}
                      </Typography>

                      {/* Niveles */}
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          gap: 1,
                          mt: 2,
                          flexWrap: 'wrap',
                        }}
                      >
                        {course.levels.map((level) => (
                          <Box
                            key={level.id}
                            sx={{
                              px: 1.5,
                              py: 0.5,
                              borderRadius: 1,
                              backgroundColor: 'rgba(102, 126, 234, 0.1)',
                              fontSize: '0.75rem',
                              fontWeight: 'bold',
                              color: course.color,
                            }}
                          >
                            {level.name}
                          </Box>
                        ))}
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </motion.div>
            ))}
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default CourseSelection;
