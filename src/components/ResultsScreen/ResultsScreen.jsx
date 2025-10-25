import { useEffect, useState } from 'react';
import { Box, Button, Typography, Paper, Container } from '@mui/material';
import { motion } from 'framer-motion';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { AvatarIcon } from '../../data/avatars';
import { saveRanking, getRankPosition } from '../../services/storage';
import { useGame } from '../../context/GameContext';

/**
 * Pantalla de resultados finales del juego
 * Muestra puntuación, estrellas obtenidas y mensaje motivador
 */
const ResultsScreen = ({ score, player, onPlayAgain, onExit }) => {
  const { correct, total, percentage, stars } = score;
  const { maxStreak } = useGame();
  const [rankPosition, setRankPosition] = useState(null);

  // Guardar resultado en localStorage al montar el componente
  useEffect(() => {
    const topicId = 'tema2-relieve-terrestre'; // Por ahora hardcodeado

    const result = {
      initials: player.initials,
      avatar: player.avatar,
      score: percentage,
      correct,
      total,
      stars,
      maxStreak,
    };

    const savedEntry = saveRanking(topicId, result);

    if (savedEntry) {
      // Obtener posición en el ranking
      const position = getRankPosition(topicId, savedEntry.id);
      setRankPosition(position);
    }
  }, [player, percentage, correct, total, stars, maxStreak]);

  /**
   * Obtiene el mensaje motivador según el porcentaje
   */
  const getMotivationalMessage = () => {
    if (percentage >= 90) {
      return {
        title: '¡Excelente!',
        message: '¡Eres un maestro! Dominas este tema a la perfección.',
        emoji: '🏆',
      };
    } else if (percentage >= 70) {
      return {
        title: '¡Muy bien!',
        message: 'Buen trabajo. Tienes un gran conocimiento del tema.',
        emoji: '🎉',
      };
    } else if (percentage >= 50) {
      return {
        title: '¡Bien hecho!',
        message: 'Vas por buen camino. Sigue practicando para mejorar.',
        emoji: '👍',
      };
    } else {
      return {
        title: '¡Sigue intentando!',
        message: 'No te desanimes. Cada intento te hace aprender más.',
        emoji: '💪',
      };
    }
  };

  const motivationalMessage = getMotivationalMessage();

  return (
    <Box
      className="min-h-screen flex items-center justify-center"
      sx={{
        background: 'linear-gradient(135deg, #FFE66D 0%, #4ECDC4 50%, #FF6B6B 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 20,
          }}
        >
          <Paper
            elevation={12}
            sx={{
              p: 5,
              borderRadius: 4,
              textAlign: 'center',
            }}
          >
            {/* Avatar del jugador */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Box sx={{ mb: 3 }}>
                <AvatarIcon avatar={player.avatar} size={100} showName={false} />
                <Typography
                  variant="h5"
                  sx={{
                    mt: 2,
                    fontWeight: 700,
                    color: 'text.primary',
                  }}
                >
                  {player.initials}
                </Typography>
              </Box>
            </motion.div>

            {/* Emoji y título */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 15,
                delay: 0.3,
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: '4rem',
                  mb: 2,
                }}
              >
                {motivationalMessage.emoji}
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  color: 'primary.main',
                  mb: 1,
                }}
              >
                {motivationalMessage.title}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: 'text.secondary',
                  mb: 4,
                }}
              >
                {motivationalMessage.message}
              </Typography>
            </motion.div>

            {/* Estrellas */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 250,
                damping: 15,
                delay: 0.4,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 2,
                  mb: 4,
                }}
              >
                {[1, 2, 3].map((star) => (
                  <motion.div
                    key={star}
                    initial={{ rotate: -180, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{
                      type: 'spring',
                      stiffness: 200,
                      damping: 15,
                      delay: 0.5 + star * 0.1,
                    }}
                  >
                    {star <= stars ? (
                      <StarIcon
                        sx={{
                          fontSize: '4rem',
                          color: '#FFD700',
                          filter: 'drop-shadow(0 4px 8px rgba(255, 215, 0, 0.5))',
                        }}
                      />
                    ) : (
                      <StarBorderIcon
                        sx={{
                          fontSize: '4rem',
                          color: '#E0E0E0',
                        }}
                      />
                    )}
                  </motion.div>
                ))}
              </Box>
            </motion.div>

            {/* Puntuación */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  mb: 4,
                  backgroundColor: 'background.default',
                  borderRadius: 3,
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 700,
                    color: 'primary.main',
                    mb: 1,
                  }}
                >
                  {percentage}%
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 500,
                  }}
                >
                  {correct} de {total} respuestas correctas
                </Typography>

                {/* Posición en el ranking */}
                {rankPosition && rankPosition <= 10 && (
                  <Typography
                    variant="body1"
                    sx={{
                      mt: 2,
                      color: 'secondary.main',
                      fontWeight: 600,
                    }}
                  >
                    🏆 ¡Posición #{rankPosition} en el ranking!
                  </Typography>
                )}
              </Paper>
            </motion.div>

            {/* Botones de acción */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                justifyContent: 'center',
              }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ flex: 1 }}
              >
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={onPlayAgain}
                  sx={{
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: 3,
                    textTransform: 'none',
                    background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)',
                    color: 'white',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #FF6B6B 20%, #4ECDC4 120%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(255,107,107,0.4)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Jugar de nuevo
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ flex: 1 }}
              >
                <Button
                  fullWidth
                  variant="outlined"
                  size="large"
                  onClick={onExit}
                  sx={{
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: 3,
                    textTransform: 'none',
                    borderWidth: 2,
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    '&:hover': {
                      borderWidth: 2,
                      backgroundColor: 'primary.light',
                      borderColor: 'primary.dark',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Salir
                </Button>
              </motion.div>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ResultsScreen;
