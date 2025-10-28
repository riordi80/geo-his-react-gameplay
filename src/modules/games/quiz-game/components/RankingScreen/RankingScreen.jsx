import { Box, Typography, Paper, Container, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StarIcon from '@mui/icons-material/Star';
import { AvatarIcon } from '@data/avatars';

/**
 * Componente de Ranking que muestra el Top 10 de un tema
 */
const RankingScreen = ({ ranking, topicTitle = 'Tema', highlightId = null }) => {
  /**
   * Obtiene el color de la medalla según la posición
   */
  const getMedalColor = (position) => {
    switch (position) {
      case 1:
        return '#FFD700'; // Oro
      case 2:
        return '#C0C0C0'; // Plata
      case 3:
        return '#CD7F32'; // Bronce
      default:
        return 'transparent';
    }
  };

  /**
   * Formatea la fecha
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Hoy';
    } else if (diffDays === 1) {
      return 'Ayer';
    } else if (diffDays < 7) {
      return `Hace ${diffDays} días`;
    } else {
      return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #4ECDC4 0%, #95E1D3 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Título */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <EmojiEventsIcon
              sx={{
                fontSize: '4rem',
                color: '#FFD700',
                mb: 2,
                filter: 'drop-shadow(0 4px 8px rgba(255, 215, 0, 0.5))',
              }}
            />
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: 'white',
                mb: 1,
                textShadow: '0 2px 4px rgba(0,0,0,0.2)',
              }}
            >
              Ranking
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 500,
                color: 'white',
                opacity: 0.9,
              }}
            >
              {topicTitle}
            </Typography>
          </Box>

          {/* Lista de ranking */}
          <Paper
            elevation={8}
            sx={{
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            {ranking.length === 0 ? (
              <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary">
                  Aún no hay resultados en el ranking
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  ¡Sé el primero en aparecer aquí!
                </Typography>
              </Box>
            ) : (
              <Box>
                {ranking.map((entry, index) => {
                  const position = index + 1;
                  const isHighlighted = entry.id === highlightId;
                  const medalColor = getMedalColor(position);

                  return (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          p: 2,
                          borderBottom:
                            index < ranking.length - 1
                              ? '1px solid'
                              : 'none',
                          borderColor: 'divider',
                          backgroundColor: isHighlighted
                            ? 'primary.light'
                            : position <= 3
                            ? `${medalColor}15`
                            : 'transparent',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            backgroundColor: isHighlighted
                              ? 'primary.light'
                              : 'background.default',
                          },
                        }}
                      >
                        {/* Posición y medalla */}
                        <Box
                          sx={{
                            width: 50,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          {position <= 3 ? (
                            <EmojiEventsIcon
                              sx={{
                                fontSize: '2rem',
                                color: medalColor,
                              }}
                            />
                          ) : (
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 700,
                                color: 'text.secondary',
                              }}
                            >
                              {position}
                            </Typography>
                          )}
                        </Box>

                        {/* Avatar */}
                        <Box sx={{ mx: 2 }}>
                          <AvatarIcon
                            avatar={entry.avatar}
                            size={50}
                            showName={false}
                          />
                        </Box>

                        {/* Iniciales y fecha */}
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              color: 'text.primary',
                            }}
                          >
                            {entry.initials}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              color: 'text.secondary',
                            }}
                          >
                            {formatDate(entry.date)}
                          </Typography>
                        </Box>

                        {/* Estrellas */}
                        <Box sx={{ display: 'flex', gap: 0.5, mr: 2 }}>
                          {[1, 2, 3].map((star) => (
                            <StarIcon
                              key={star}
                              sx={{
                                fontSize: '1.2rem',
                                color:
                                  star <= entry.stars
                                    ? '#FFD700'
                                    : '#E0E0E0',
                              }}
                            />
                          ))}
                        </Box>

                        {/* Puntuación */}
                        <Chip
                          label={`${entry.score}%`}
                          sx={{
                            fontWeight: 700,
                            fontSize: '1rem',
                            backgroundColor: 'primary.main',
                            color: 'white',
                            minWidth: 70,
                          }}
                        />
                      </Box>
                    </motion.div>
                  );
                })}
              </Box>
            )}
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default RankingScreen;
