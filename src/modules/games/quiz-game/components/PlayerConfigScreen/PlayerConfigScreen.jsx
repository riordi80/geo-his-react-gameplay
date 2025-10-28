import { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Card } from '@mui/material';
import { motion } from 'framer-motion';
import { useGame, GAME_STATES } from '../../context/GameContext';
import avatars, { AvatarIcon } from '@data/avatars';
import { tema2Questions } from '../../data/questions/tema2-relieve-terrestre';
import { useSound } from '@shared/hooks';

/**
 * Pantalla de configuración del jugador
 * Permite al usuario ingresar sus iniciales y seleccionar un avatar
 */
const PlayerConfigScreen = () => {
  const { configurePlayer, startGame, setGameState } = useGame();
  const { playClick } = useSound();
  const [initials, setInitials] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [error, setError] = useState('');

  /**
   * Maneja el cambio en el campo de iniciales
   */
  const handleInitialsChange = (e) => {
    const value = e.target.value.toUpperCase().slice(0, 3);
    setInitials(value);
    if (error) setError('');
  };

  /**
   * Maneja la selección de avatar
   */
  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
    if (error) setError('');
  };

  /**
   * Valida y confirma la configuración del jugador
   */
  const handleStartGame = () => {
    // Validar iniciales (2-3 caracteres)
    if (initials.length < 2) {
      setError('Las iniciales deben tener al menos 2 letras');
      return;
    }

    // Validar que se haya seleccionado un avatar
    if (!selectedAvatar) {
      setError('Debes seleccionar un avatar');
      return;
    }

    // Reproducir sonido y configurar jugador
    playClick();
    configurePlayer(initials, selectedAvatar);
    startGame(tema2Questions);
  };

  return (
    <Box
      className="min-h-screen flex items-center justify-center"
      sx={{
        background: 'linear-gradient(135deg, #FFE66D 0%, #4ECDC4 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card
            sx={{
              p: 4,
              borderRadius: 2,
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            }}
          >
            {/* Título */}
            <Typography
              variant="h4"
              component="h1"
              align="center"
              gutterBottom
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                mb: 1,
              }}
            >
              ¡Vamos a jugar!
            </Typography>

            <Typography
              variant="body1"
              align="center"
              color="text.secondary"
              sx={{ mb: 4 }}
            >
              Configura tu perfil de jugador
            </Typography>

            {/* Campo de iniciales */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h6"
                sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}
              >
                Tus iniciales
              </Typography>
              <TextField
                fullWidth
                value={initials}
                onChange={handleInitialsChange}
                placeholder="Ej: ABC"
                inputProps={{
                  maxLength: 3,
                  style: {
                    textTransform: 'uppercase',
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    textAlign: 'center',
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: 'background.default',
                  },
                }}
              />
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: 'block', mt: 1, textAlign: 'center' }}
              >
                2 o 3 letras
              </Typography>
            </Box>

            {/* Selección de avatar */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}
              >
                Elige tu avatar
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 2,
                  mb: 2,
                }}
              >
                {avatars.map((avatar) => (
                  <motion.div
                    key={avatar.id}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Box
                      onClick={() => handleAvatarSelect(avatar)}
                      sx={{
                        cursor: 'pointer',
                        opacity: selectedAvatar?.id === avatar.id ? 1 : 0.6,
                        transform:
                          selectedAvatar?.id === avatar.id
                            ? 'scale(1.1)'
                            : 'scale(1)',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          opacity: 1,
                        },
                      }}
                    >
                      <AvatarIcon
                        avatar={avatar}
                        size={60}
                        showName={false}
                      />
                    </Box>
                  </motion.div>
                ))}
              </Box>
              {selectedAvatar && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Typography
                    variant="body2"
                    align="center"
                    sx={{
                      color: 'secondary.main',
                      fontWeight: 600,
                    }}
                  >
                    Has elegido: {selectedAvatar.name}
                  </Typography>
                </motion.div>
              )}
            </Box>

            {/* Mensaje de error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Typography
                  variant="body2"
                  color="error"
                  align="center"
                  sx={{ mb: 2, fontWeight: 500 }}
                >
                  {error}
                </Typography>
              </motion.div>
            )}

            {/* Botón de inicio */}
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleStartGame}
              disabled={initials.length < 2 || !selectedAvatar}
              color="primary"
              sx={{
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 2,
                textTransform: 'none',
                color: 'white',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(255,107,107,0.4)',
                },
                '&:disabled': {
                  background: '#E0E0E0',
                  color: '#999',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Empezar a jugar
            </Button>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
};

export default PlayerConfigScreen;
