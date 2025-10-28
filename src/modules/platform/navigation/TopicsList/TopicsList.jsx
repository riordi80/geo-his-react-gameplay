import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, Container, Card, CardContent, CardActionArea, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import { getTopicsBySubject } from '@data/topics';
import { getSubjectById } from '@data/subjects';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

/**
 * TopicsList - Lista de temas estilo Netflix con carrusel
 * Muestra los temas disponibles para la asignatura seleccionada
 */
const TopicsList = () => {
  const navigate = useNavigate();
  const { subjectId } = useParams();

  const subject = getSubjectById(subjectId);
  const topics = getTopicsBySubject(subjectId);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const handleTopicSelect = (topicId) => {
    navigate(`/topic/${topicId}`);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      available: { label: 'Disponible', color: 'success' },
      'coming-soon': { label: 'Próximamente', color: 'warning' },
      locked: { label: 'Bloqueado', color: 'error' },
    };

    return statusConfig[status] || statusConfig['coming-soon'];
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <IconButton
            onClick={() => navigate(`/subjects/${subject?.courseId || 'eso'}`)}
            sx={{
              color: 'white',
              mb: 2,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <ArrowBackIcon />
          </IconButton>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Breadcrumb */}
            {subject && (
              <motion.div variants={itemVariants}>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    mb: 1,
                  }}
                >
                  {subject.name}
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
                }}
              >
                Temas de {subject?.shortName || 'la asignatura'}
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  mb: 4,
                }}
              >
                Explora los temas disponibles y comienza a aprender
              </Typography>
            </motion.div>
          </motion.div>
        </Box>

        {/* Carrusel de temas estilo Netflix */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Swiper
            cssMode={false}
            navigation={true}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            mousewheel={false}
            keyboard={true}
            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 25,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
            style={{
              paddingBottom: '50px',
              paddingTop: '10px',
            }}
          >
            {topics.map((topic) => {
              const statusBadge = getStatusBadge(topic.status);
              return (
                <SwiperSlide key={topic.id}>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -10 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Card
                      sx={{
                        height: 350,
                        backgroundColor: '#0f3460',
                        borderRadius: 2,
                        overflow: 'hidden',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        position: 'relative',
                        '&:hover': {
                          boxShadow: '0 12px 48px rgba(0,0,0,0.6)',
                        },
                      }}
                    >
                      <CardActionArea
                        onClick={() => handleTopicSelect(topic.id)}
                        disabled={topic.status === 'locked'}
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          justifyContent: 'space-between',
                          p: 0,
                        }}
                      >
                        {/* Thumbnail / Color de fondo */}
                        <Box
                          sx={{
                            width: '100%',
                            height: 180,
                            background: `linear-gradient(135deg, ${topic.color} 0%, ${topic.color}dd 100%)`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                          }}
                        >
                          {/* Badge de estado */}
                          <Chip
                            label={statusBadge.label}
                            color={statusBadge.color}
                            size="small"
                            sx={{
                              position: 'absolute',
                              top: 12,
                              right: 12,
                              fontWeight: 'bold',
                            }}
                          />

                          {/* Número del tema */}
                          <Typography
                            variant="h1"
                            sx={{
                              fontSize: '4rem',
                              fontWeight: 'bold',
                              color: 'rgba(255, 255, 255, 0.3)',
                            }}
                          >
                            {topic.number}
                          </Typography>
                        </Box>

                        {/* Contenido */}
                        <CardContent sx={{ width: '100%', flexGrow: 1, p: 2.5 }}>
                          {/* Título del tema */}
                          <Typography
                            variant="h6"
                            component="h3"
                            sx={{
                              color: 'white',
                              fontWeight: 'bold',
                              mb: 1,
                              lineHeight: 1.3,
                            }}
                          >
                            {topic.title}
                          </Typography>

                          {/* Descripción */}
                          <Typography
                            variant="body2"
                            sx={{
                              color: 'rgba(255, 255, 255, 0.7)',
                              mb: 2,
                              fontSize: '0.85rem',
                              lineHeight: 1.5,
                            }}
                          >
                            {topic.description}
                          </Typography>

                          {/* Metadatos */}
                          <Box
                            sx={{
                              display: 'flex',
                              gap: 1,
                              flexWrap: 'wrap',
                              mt: 'auto',
                            }}
                          >
                            <Chip
                              label={topic.difficulty}
                              size="small"
                              sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                color: 'rgba(255, 255, 255, 0.9)',
                                fontSize: '0.7rem',
                              }}
                            />
                            <Chip
                              label={topic.estimatedTime}
                              size="small"
                              sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                color: 'rgba(255, 255, 255, 0.9)',
                                fontSize: '0.7rem',
                              }}
                            />
                          </Box>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </motion.div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </motion.div>

        {/* Mensaje si no hay temas */}
        {topics.length === 0 && (
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255, 255, 255, 0.6)',
              }}
            >
              No hay temas disponibles para esta asignatura aún
            </Typography>
          </Box>
        )}
      </Container>

      {/* Estilos personalizados para Swiper */}
      <style>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: white;
          background-color: rgba(0, 0, 0, 0.5);
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 20px;
        }

        .swiper-pagination-bullet {
          background-color: white;
          opacity: 0.5;
        }

        .swiper-pagination-bullet-active {
          opacity: 1;
          background-color: #667eea;
        }
      `}</style>
    </Box>
  );
};

export default TopicsList;
