import { useState, useRef, useEffect } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { motion } from 'framer-motion';

/**
 * Componente para preguntas de rellenar huecos
 * Muestra la pregunta con campos de texto para rellenar
 * Soporta Enter para confirmar la respuesta
 * El primer campo tiene foco automático
 */
const FillBlanks = ({ question, onAnswer, disabled = false }) => {
  const [answers, setAnswers] = useState(
    Array(question.blanks?.length || 1).fill('')
  );
  const [submitted, setSubmitted] = useState(false);
  const firstInputRef = useRef(null);

  /**
   * Enfoca automáticamente el primer campo al montar el componente
   */
  useEffect(() => {
    if (firstInputRef.current && !disabled && !submitted) {
      // Pequeño delay para asegurar que el componente está completamente renderizado
      setTimeout(() => {
        firstInputRef.current?.focus();
      }, 100);
    }
  }, [disabled, submitted]);

  /**
   * Maneja el cambio en un campo de respuesta
   */
  const handleAnswerChange = (index, value) => {
    if (disabled || submitted) return;

    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  /**
   * Maneja el evento Enter en los campos de texto
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  /**
   * Valida las respuestas y envía el resultado
   */
  const handleSubmit = () => {
    if (disabled || submitted) return;

    // Verificar que todos los campos estén llenos
    if (answers.some(answer => !answer.trim())) {
      return;
    }

    setSubmitted(true);

    // Comparar respuestas (case-insensitive, sin espacios extra)
    const normalizedAnswers = answers.map(a =>
      a.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    );
    const normalizedCorrect = question.blanks.map(a =>
      a.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    );

    const isCorrect = normalizedAnswers.every((answer, index) =>
      answer === normalizedCorrect[index]
    );

    onAnswer(answers, isCorrect);
  };

  /**
   * Renderiza el texto de la pregunta con los campos de entrada
   */
  const renderQuestionWithBlanks = () => {
    if (!question.questionTemplate) {
      // Formato simple: una pregunta y N campos
      return (
        <>
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

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {question.blanks.map((_, index) => (
              <TextField
                key={index}
                fullWidth
                value={answers[index]}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={disabled || submitted}
                placeholder={`Respuesta ${index + 1}`}
                variant="outlined"
                inputRef={index === 0 ? firstInputRef : null}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: 'background.default',
                    fontSize: '1.1rem',
                    fontWeight: 500,
                  },
                }}
              />
            ))}
          </Box>
        </>
      );
    }

    // Formato avanzado: texto con placeholders {0}, {1}, etc.
    const parts = question.questionTemplate.split(/(\{\d+\})/g);
    let blankIndex = 0;

    return (
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 1,
          justifyContent: 'center',
          mb: 4,
        }}
      >
        {parts.map((part, index) => {
          const match = part.match(/\{(\d+)\}/);
          if (match) {
            const currentBlankIndex = blankIndex++;
            return (
              <TextField
                key={index}
                value={answers[currentBlankIndex]}
                onChange={(e) =>
                  handleAnswerChange(currentBlankIndex, e.target.value)
                }
                onKeyPress={handleKeyPress}
                disabled={disabled || submitted}
                placeholder="..."
                variant="standard"
                inputRef={currentBlankIndex === 0 ? firstInputRef : null}
                sx={{
                  width: 150,
                  '& .MuiInput-root': {
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    color: 'primary.main',
                    '&:before': {
                      borderBottomColor: 'primary.main',
                      borderBottomWidth: 2,
                    },
                  },
                  '& .MuiInput-input': {
                    textAlign: 'center',
                  },
                }}
              />
            );
          }
          return (
            <Typography
              key={index}
              variant="h5"
              component="span"
              sx={{
                fontWeight: 600,
                color: 'text.primary',
                lineHeight: 1.4,
              }}
            >
              {part}
            </Typography>
          );
        })}
      </Box>
    );
  };

  // Verificar si todos los campos están llenos
  const allFieldsFilled = answers.every(answer => answer.trim() !== '');

  return (
    <Box sx={{ width: '100%' }}>
      {renderQuestionWithBlanks()}

      {!question.questionTemplate && (
        <Typography
          variant="body2"
          sx={{
            mb: 3,
            textAlign: 'center',
            color: 'text.secondary',
            fontWeight: 500,
          }}
        >
          Completa todos los campos y pulsa "Comprobar" o Enter ⏎
        </Typography>
      )}

      {/* Botón de envío */}
      {!submitted && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <motion.div
            whileHover={allFieldsFilled ? { scale: 1.05 } : {}}
            whileTap={allFieldsFilled ? { scale: 0.95 } : {}}
          >
            <Button
              variant="contained"
              size="large"
              onClick={handleSubmit}
              disabled={!allFieldsFilled || disabled}
              sx={{
                py: 2,
                px: 6,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 3,
                textTransform: 'none',
                backgroundColor: 'primary.main',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(255,107,107,0.4)',
                },
                '&:disabled': {
                  backgroundColor: '#E0E0E0',
                  color: '#999',
                },
              }}
            >
              Comprobar
            </Button>
          </motion.div>
        </Box>
      )}
    </Box>
  );
};

export default FillBlanks;
