import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

/**
 * Componente para preguntas de Verdadero o Falso
 * Muestra la pregunta y dos botones grandes para seleccionar
 */
const TrueFalse = ({ question, onAnswer, disabled = false }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  /**
   * Maneja la selección de verdadero o falso
   */
  const handleOptionSelect = (option) => {
    if (disabled) return;

    setSelectedOption(option);
    const isCorrect = option === question.correctAnswer;
    onAnswer(option, isCorrect);
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Pregunta */}
      <Typography
        variant="h5"
        sx={{
          mb: 4,
          fontWeight: 600,
          color: 'text.primary',
          textAlign: 'center',
          lineHeight: 1.4,
        }}
      >
        {question.question}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          mb: 4,
          textAlign: 'center',
          color: 'text.secondary',
          fontWeight: 500,
        }}
      >
        ¿Es verdadero o falso?
      </Typography>

      {/* Botones Verdadero/Falso */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 3,
          justifyContent: 'center',
        }}
      >
        {/* Botón Verdadero */}
        <motion.div
          whileHover={!disabled ? { scale: 1.05 } : {}}
          whileTap={!disabled ? { scale: 0.95 } : {}}
          style={{ flex: 1, maxWidth: '280px' }}
        >
          <Button
            fullWidth
            variant={selectedOption === true ? 'contained' : 'outlined'}
            onClick={() => handleOptionSelect(true)}
            disabled={disabled}
            sx={{
              py: 4,
              borderRadius: 4,
              border: selectedOption === true ? 'none' : '3px solid #95E1D3',
              backgroundColor:
                selectedOption === true ? 'success.main' : 'background.paper',
              color: selectedOption === true ? 'white' : 'success.main',
              fontWeight: 700,
              fontSize: '1.5rem',
              textTransform: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor:
                  selectedOption === true ? 'success.dark' : '#F0FFF4',
                borderColor: 'success.main',
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 16px rgba(149, 225, 211, 0.3)',
              },
              '&:disabled': {
                backgroundColor:
                  selectedOption === true ? 'success.main' : 'background.paper',
                color:
                  selectedOption === true ? 'white' : 'text.disabled',
                opacity: disabled && selectedOption !== true ? 0.5 : 1,
              },
            }}
          >
            <CheckCircleIcon
              sx={{
                fontSize: '3rem',
              }}
            />
            <Typography
              variant="h4"
              component="span"
              sx={{
                fontWeight: 700,
              }}
            >
              Verdadero
            </Typography>
          </Button>
        </motion.div>

        {/* Botón Falso */}
        <motion.div
          whileHover={!disabled ? { scale: 1.05 } : {}}
          whileTap={!disabled ? { scale: 0.95 } : {}}
          style={{ flex: 1, maxWidth: '280px' }}
        >
          <Button
            fullWidth
            variant={selectedOption === false ? 'contained' : 'outlined'}
            onClick={() => handleOptionSelect(false)}
            disabled={disabled}
            sx={{
              py: 4,
              borderRadius: 4,
              border: selectedOption === false ? 'none' : '3px solid #FF6B9D',
              backgroundColor:
                selectedOption === false ? 'error.main' : 'background.paper',
              color: selectedOption === false ? 'white' : 'error.main',
              fontWeight: 700,
              fontSize: '1.5rem',
              textTransform: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor:
                  selectedOption === false ? 'error.dark' : '#FFF0F5',
                borderColor: 'error.main',
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 16px rgba(255, 107, 157, 0.3)',
              },
              '&:disabled': {
                backgroundColor:
                  selectedOption === false ? 'error.main' : 'background.paper',
                color:
                  selectedOption === false ? 'white' : 'text.disabled',
                opacity: disabled && selectedOption !== false ? 0.5 : 1,
              },
            }}
          >
            <CancelIcon
              sx={{
                fontSize: '3rem',
              }}
            />
            <Typography
              variant="h4"
              component="span"
              sx={{
                fontWeight: 700,
              }}
            >
              Falso
            </Typography>
          </Button>
        </motion.div>
      </Box>
    </Box>
  );
};

export default TrueFalse;
