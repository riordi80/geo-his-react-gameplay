import { Box, Button, Typography, Paper, Container } from '@mui/material';
import { motion } from 'framer-motion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

/**
 * Pantalla de feedback que muestra si la respuesta fue correcta o incorrecta
 * Incluye explicación educativa y botón para continuar
 */
const FeedbackScreen = ({ isCorrect, question, onContinue, streak = 0 }) => {
  return (
    <Box
      className="min-h-screen flex items-center justify-center"
      sx={{
        background: isCorrect
          ? 'linear-gradient(135deg, #95E1D3 0%, #A8E6CF 100%)'
          : 'linear-gradient(135deg, #FF6B9D 0%, #FFE66D 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
        >
          <Paper
            elevation={8}
            sx={{
              p: 4,
              borderRadius: 4,
              textAlign: 'center',
            }}
          >
            {/* Icono animado */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: isCorrect ? 0 : -10 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 10,
                delay: 0.1,
              }}
            >
              {isCorrect ? (
                <CheckCircleIcon
                  sx={{
                    fontSize: '6rem',
                    color: 'success.main',
                    mb: 2,
                  }}
                />
              ) : (
                <CancelIcon
                  sx={{
                    fontSize: '6rem',
                    color: 'error.main',
                    mb: 2,
                  }}
                />
              )}
            </motion.div>

            {/* Mensaje principal */}
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: isCorrect ? 'success.main' : 'error.main',
                mb: 2,
              }}
            >
              {isCorrect ? '¡Correcto!' : '¡Incorrecto!'}
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: 'text.secondary',
                fontWeight: 500,
                mb: 4,
              }}
            >
              {isCorrect
                ? '¡Muy bien! Sigue así.'
                : 'No te preocupes, aprende de este error.'}
            </Typography>

            {/* Racha de aciertos */}
            {isCorrect && streak > 1 && (
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 15,
                  delay: 0.3,
                }}
              >
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1,
                    backgroundColor: 'warning.main',
                    px: 3,
                    py: 1.5,
                    borderRadius: 3,
                    mb: 4,
                    boxShadow: '0 4px 12px rgba(255,230,109,0.5)',
                  }}
                >
                  <Typography
                    component="span"
                    sx={{
                      fontSize: '2rem',
                    }}
                  >
                    🔥
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: '#000',
                    }}
                  >
                    {streak} seguidas
                  </Typography>
                </Box>
              </motion.div>
            )}

            {/* Explicación */}
            {question.explanation && (
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  mb: 4,
                  backgroundColor: 'background.default',
                  borderRadius: 2,
                  border: '2px solid',
                  borderColor: isCorrect ? 'success.light' : 'error.light',
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    color: 'text.primary',
                    mb: 2,
                  }}
                >
                  📚 Explicación:
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.primary',
                    lineHeight: 1.6,
                    textAlign: 'left',
                  }}
                >
                  {question.explanation}
                </Typography>
              </Paper>
            )}

            {/* Botón continuar */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={onContinue}
                sx={{
                  py: 2,
                  fontSize: '1.2rem',
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
                Siguiente pregunta →
              </Button>
            </motion.div>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default FeedbackScreen;
