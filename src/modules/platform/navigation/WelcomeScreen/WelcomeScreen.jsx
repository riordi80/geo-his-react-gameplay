import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Container } from '@mui/material';
import { motion } from 'framer-motion';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SchoolIcon from '@mui/icons-material/School';

/**
 * WelcomeScreen - Pantalla de bienvenida de la plataforma
 * Primera pantalla que ve el usuario al entrar
 */
const WelcomeScreen = () => {
  const navigate = useNavigate();

  // Variantes de animación
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
      },
    },
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decoración de fondo */}
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: 0.1,
          background: `
            radial-gradient(circle at 20% 50%, white 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, white 0%, transparent 50%)
          `,
        }}
      />

      <Container maxWidth="md">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ textAlign: 'center' }}
        >
          {/* Icono principal */}
          <motion.div variants={iconVariants}>
            <SchoolIcon
              sx={{
                fontSize: 100,
                color: 'white',
                mb: 3,
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
              }}
            />
          </motion.div>

          {/* Título */}
          <motion.div variants={itemVariants}>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                color: 'white',
                fontWeight: 'bold',
                mb: 2,
                fontSize: { xs: '2.5rem', sm: '3rem', md: '3.75rem' },
                textShadow: '0 2px 10px rgba(0,0,0,0.2)',
              }}
            >
              Geo&His Play
            </Typography>
          </motion.div>

          {/* Subtítulo */}
          <motion.div variants={itemVariants}>
            <Typography
              variant="h5"
              component="h2"
              sx={{
                color: 'rgba(255, 255, 255, 0.95)',
                mb: 1,
                fontSize: { xs: '1.25rem', sm: '1.5rem' },
                fontWeight: 300,
              }}
            >
              Aprende jugando
            </Typography>
          </motion.div>

          {/* Descripción */}
          <motion.div variants={itemVariants}>
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255, 255, 255, 0.85)',
                mb: 5,
                maxWidth: 500,
                mx: 'auto',
                fontSize: { xs: '0.9rem', sm: '1rem' },
              }}
            >
              Descubre una forma divertida e interactiva de aprender Geografía e
              Historia con juegos, teoría, esquemas y vídeos educativos.
            </Typography>
          </motion.div>

          {/* Botón de comenzar */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="contained"
              size="large"
              endIcon={<PlayArrowIcon />}
              onClick={() => navigate('/courses')}
              sx={{
                fontSize: '1.2rem',
                px: 5,
                py: 1.5,
                borderRadius: 50,
                backgroundColor: 'white',
                color: '#667eea',
                fontWeight: 'bold',
                textTransform: 'none',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  boxShadow: '0 6px 30px rgba(0,0,0,0.4)',
                },
              }}
            >
              Comenzar
            </Button>
          </motion.div>

          {/* Características */}
          <motion.div variants={itemVariants}>
            <Box
              sx={{
                mt: 6,
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 3,
              }}
            >
              {[
                { emoji: '🎮', text: 'Juegos Interactivos' },
                { emoji: '📚', text: 'Contenido Teórico' },
                { emoji: '🎯', text: 'Sistema de Puntos' },
                { emoji: '🏆', text: 'Rankings' },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.1 }}
                >
                  <Box
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      borderRadius: 2,
                      px: 2,
                      py: 1,
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'white',
                        fontWeight: 500,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      <span style={{ fontSize: '1.2rem' }}>{feature.emoji}</span>
                      {feature.text}
                    </Typography>
                  </Box>
                </motion.div>
              ))}
            </Box>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default WelcomeScreen;
