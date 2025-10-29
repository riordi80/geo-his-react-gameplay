import { Box, Container } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { useGame, GAME_STATES } from '../../context/GameContext';
import ProgressBar from '../ProgressBar';
import FeedbackScreen from '../FeedbackScreen';
import ResultsScreen from '../ResultsScreen';
import { MultipleChoice, TrueFalse, FillBlanks, Matching, Classify } from '../QuestionTypes';

/**
 * Pantalla principal del juego
 * Gestiona el flujo completo del juego y renderiza el componente apropiado según el estado
 */
const GameScreen = () => {
  const navigate = useNavigate();
  const { topicId } = useParams();
  const {
    gameState,
    currentQuestion,
    currentQuestionIndex,
    selectedQuestions,
    player,
    streak,
    score,
    currentAnswer,
    submitAnswer,
    nextQuestion,
    resetGame,
  } = useGame();

  /**
   * Renderiza el componente de pregunta correcto según el tipo
   */
  const renderQuestion = () => {
    if (!currentQuestion) return null;

    const questionProps = {
      question: currentQuestion,
      onAnswer: submitAnswer,
      disabled: gameState === GAME_STATES.FEEDBACK,
    };

    switch (currentQuestion.type) {
      case 'multipleChoice':
        return <MultipleChoice {...questionProps} />;
      case 'trueFalse':
        return <TrueFalse {...questionProps} />;
      case 'fillBlanks':
        return <FillBlanks {...questionProps} />;
      case 'matching':
        return <Matching {...questionProps} />;
      case 'classify':
        return <Classify {...questionProps} />;
      default:
        return (
          <Box sx={{ textAlign: 'center', color: 'error.main' }}>
            Tipo de pregunta no reconocido: {currentQuestion.type}
          </Box>
        );
    }
  };

  /**
   * Maneja el click en "Jugar de nuevo"
   */
  const handlePlayAgain = () => {
    resetGame();
  };

  /**
   * Maneja el click en "Salir"
   * Navega al TopicHub del tema actual
   */
  const handleExit = () => {
    resetGame();
    navigate(`/topic/${topicId}`);
  };

  // Renderizar según el estado del juego
  return (
    <AnimatePresence mode="wait">
      {gameState === GAME_STATES.PLAYING && (
        <motion.div
          key="playing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Box
            sx={{
              minHeight: '100vh',
              backgroundColor: 'background.default',
              py: 4,
            }}
          >
            <Container maxWidth="md">
              {/* Barra de progreso */}
              <ProgressBar
                current={currentQuestionIndex + 1}
                total={selectedQuestions.length}
                streak={streak}
              />

              {/* Pregunta actual */}
              <Box
                sx={{
                  backgroundColor: 'background.paper',
                  borderRadius: 2,
                  p: 4,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                }}
              >
                {renderQuestion()}
              </Box>
            </Container>
          </Box>
        </motion.div>
      )}

      {gameState === GAME_STATES.FEEDBACK && (
        <motion.div
          key="feedback"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <FeedbackScreen
            isCorrect={currentAnswer?.isCorrect || false}
            question={currentQuestion}
            onContinue={nextQuestion}
            streak={streak}
          />
        </motion.div>
      )}

      {gameState === GAME_STATES.RESULTS && (
        <motion.div
          key="results"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <ResultsScreen
            score={score}
            player={player}
            onPlayAgain={handlePlayAgain}
            onExit={handleExit}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GameScreen;
