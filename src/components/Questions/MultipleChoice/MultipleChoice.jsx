import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { motion } from 'framer-motion';

/**
 * Componente para preguntas de selección múltiple
 * Muestra la pregunta y 4 opciones para elegir
 */
const MultipleChoice = ({ question, onAnswer, disabled = false }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  /**
   * Maneja la selección de una opción
   */
  const handleOptionSelect = (optionIndex) => {
    if (disabled) return;

    setSelectedOption(optionIndex);
    const isCorrect = optionIndex === question.correctAnswer;
    onAnswer(optionIndex, isCorrect);
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

      {/* Opciones */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {question.options.map((option, index) => {
          const isSelected = selectedOption === index;
          const letter = String.fromCharCode(65 + index); // A, B, C, D

          return (
            <motion.div
              key={index}
              whileHover={!disabled ? { scale: 1.02 } : {}}
              whileTap={!disabled ? { scale: 0.98 } : {}}
            >
              <Button
                fullWidth
                variant={isSelected ? 'contained' : 'outlined'}
                onClick={() => handleOptionSelect(index)}
                disabled={disabled}
                sx={{
                  py: 2,
                  px: 3,
                  justifyContent: 'flex-start',
                  textAlign: 'left',
                  borderRadius: 3,
                  border: isSelected ? 'none' : '2px solid #E0E0E0',
                  backgroundColor: isSelected
                    ? 'primary.main'
                    : 'background.paper',
                  color: isSelected ? 'white' : 'text.primary',
                  fontWeight: 600,
                  fontSize: '1rem',
                  textTransform: 'none',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: isSelected
                      ? 'primary.dark'
                      : 'background.default',
                    borderColor: isSelected ? 'primary.dark' : 'primary.main',
                    transform: 'translateX(4px)',
                  },
                  '&:disabled': {
                    backgroundColor: isSelected
                      ? 'primary.main'
                      : 'background.paper',
                    color: isSelected ? 'white' : 'text.disabled',
                    opacity: disabled && !isSelected ? 0.5 : 1,
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    width: '100%',
                  }}
                >
                  {/* Letra de la opción */}
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      backgroundColor: isSelected ? 'white' : 'primary.main',
                      color: isSelected ? 'primary.main' : 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      flexShrink: 0,
                    }}
                  >
                    {letter}
                  </Box>

                  {/* Texto de la opción */}
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 600,
                      flex: 1,
                    }}
                  >
                    {option}
                  </Typography>
                </Box>
              </Button>
            </motion.div>
          );
        })}
      </Box>
    </Box>
  );
};

export default MultipleChoice;
