import { createContext, useContext, useState, useCallback, useMemo } from 'react';

const GameContext = createContext();

/**
 * Hook personalizado para usar el contexto del juego
 */
export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame debe usarse dentro de un GameProvider');
  }
  return context;
};

/**
 * Estados del juego
 */
export const GAME_STATES = {
  PLAYER_CONFIG: 'PLAYER_CONFIG',     // Configuración del jugador
  PLAYING: 'PLAYING',                 // Jugando
  FEEDBACK: 'FEEDBACK',               // Mostrando feedback de respuesta
  RESULTS: 'RESULTS',                 // Pantalla de resultados finales
};

/**
 * Provider del contexto del juego
 */
export const GameProvider = ({ children }) => {
  // Estado del jugador
  const [player, setPlayer] = useState({
    initials: '',
    avatar: null,
  });

  // Estado del juego
  const [gameState, setGameState] = useState(GAME_STATES.PLAYER_CONFIG);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState(null);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  /**
   * Selecciona 10 preguntas aleatorias de un banco de preguntas
   * Distribuye por dificultad: 4 fáciles, 4 medias, 2 difíciles
   */
  const selectRandomQuestions = useCallback((questionBank) => {
    const easy = questionBank.filter(q => q.difficulty === 'easy');
    const medium = questionBank.filter(q => q.difficulty === 'medium');
    const hard = questionBank.filter(q => q.difficulty === 'hard');

    // Función para seleccionar N elementos aleatorios de un array
    const getRandomItems = (arr, count) => {
      const shuffled = [...arr].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, Math.min(count, arr.length));
    };

    const selected = [
      ...getRandomItems(easy, 4),
      ...getRandomItems(medium, 4),
      ...getRandomItems(hard, 2),
    ];

    // Mezclar el orden final
    return selected.sort(() => Math.random() - 0.5);
  }, []);

  /**
   * Inicia un nuevo juego con las preguntas seleccionadas
   */
  const startGame = useCallback((questionBank) => {
    const questions = selectRandomQuestions(questionBank);
    setSelectedQuestions(questions);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setCurrentAnswer(null);
    setStreak(0);
    setMaxStreak(0);
    setGameState(GAME_STATES.PLAYING);
  }, [selectRandomQuestions]);

  /**
   * Configura el jugador
   */
  const configurePlayer = useCallback((initials, avatar) => {
    setPlayer({ initials, avatar });
  }, []);

  /**
   * Envía una respuesta para la pregunta actual
   */
  const submitAnswer = useCallback((answer, isCorrect) => {
    const newAnswer = {
      questionId: selectedQuestions[currentQuestionIndex].id,
      answer,
      isCorrect,
      timestamp: Date.now(),
    };

    setCurrentAnswer(newAnswer);
    setAnswers(prev => [...prev, newAnswer]);

    // Actualizar racha
    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setMaxStreak(prev => Math.max(prev, newStreak));
    } else {
      setStreak(0);
    }

    // Cambiar a estado de feedback
    setGameState(GAME_STATES.FEEDBACK);
  }, [selectedQuestions, currentQuestionIndex, streak]);

  /**
   * Continúa a la siguiente pregunta
   */
  const nextQuestion = useCallback(() => {
    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex >= selectedQuestions.length) {
      // Fin del juego
      setGameState(GAME_STATES.RESULTS);
    } else {
      setCurrentQuestionIndex(nextIndex);
      setCurrentAnswer(null);
      setGameState(GAME_STATES.PLAYING);
    }
  }, [currentQuestionIndex, selectedQuestions.length]);

  /**
   * Reinicia el juego
   */
  const resetGame = useCallback(() => {
    setGameState(GAME_STATES.PLAYER_CONFIG);
    setSelectedQuestions([]);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setCurrentAnswer(null);
    setStreak(0);
    setMaxStreak(0);
  }, []);

  /**
   * Calcula la puntuación final
   */
  const score = useMemo(() => {
    const correctAnswers = answers.filter(a => a.isCorrect).length;
    const totalQuestions = selectedQuestions.length;
    const percentage = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;

    return {
      correct: correctAnswers,
      total: totalQuestions,
      percentage: Math.round(percentage),
      stars: percentage >= 90 ? 3 : percentage >= 70 ? 2 : percentage >= 50 ? 1 : 0,
    };
  }, [answers, selectedQuestions.length]);

  /**
   * Obtiene la pregunta actual
   */
  const currentQuestion = useMemo(() => {
    if (selectedQuestions.length === 0) return null;
    return selectedQuestions[currentQuestionIndex];
  }, [selectedQuestions, currentQuestionIndex]);

  // Valor del contexto
  const value = {
    // Estado del jugador
    player,
    configurePlayer,

    // Estado del juego
    gameState,
    setGameState,

    // Preguntas
    selectedQuestions,
    currentQuestion,
    currentQuestionIndex,

    // Respuestas
    answers,
    currentAnswer,
    submitAnswer,

    // Navegación
    nextQuestion,

    // Racha
    streak,
    maxStreak,

    // Puntuación
    score,

    // Control del juego
    startGame,
    resetGame,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
