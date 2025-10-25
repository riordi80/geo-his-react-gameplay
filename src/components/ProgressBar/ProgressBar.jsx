import { Box, Typography, LinearProgress } from '@mui/material';
import { motion } from 'framer-motion';

/**
 * Componente de barra de progreso del juego
 * Muestra el número de pregunta actual, progreso visual y racha de aciertos
 */
const ProgressBar = ({ current, total, streak = 0 }) => {
  const progress = total > 0 ? (current / total) * 100 : 0;

  return (
    <Box
      sx={{
        width: '100%',
        mb: 3,
      }}
    >
      {/* Header: Número de pregunta y racha */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 1,
        }}
      >
        {/* Número de pregunta */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: 'text.primary',
          }}
        >
          Pregunta {current} de {total}
        </Typography>

        {/* Racha de aciertos */}
        {streak > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                backgroundColor: 'warning.main',
                px: 1.5,
                py: 0.5,
                borderRadius: 2,
                boxShadow: '0 2px 8px rgba(255,230,109,0.4)',
              }}
            >
              <Typography
                component="span"
                sx={{
                  fontSize: '1.2rem',
                }}
              >
                🔥
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 700,
                  color: '#000',
                }}
              >
                {streak} seguida{streak !== 1 ? 's' : ''}
              </Typography>
            </Box>
          </motion.div>
        )}
      </Box>

      {/* Barra de progreso */}
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 12,
          borderRadius: 2,
          backgroundColor: '#E0E0E0',
          '& .MuiLinearProgress-bar': {
            borderRadius: 2,
            background: 'linear-gradient(90deg, #4ECDC4 0%, #95E1D3 100%)',
            transition: 'transform 0.4s ease',
          },
        }}
      />

      {/* Indicador de porcentaje */}
      <Typography
        variant="caption"
        sx={{
          display: 'block',
          mt: 0.5,
          textAlign: 'right',
          color: 'text.secondary',
          fontWeight: 500,
        }}
      >
        {Math.round(progress)}% completado
      </Typography>
    </Box>
  );
};

export default ProgressBar;
