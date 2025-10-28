/**
 * Quiz Game Module - Barrel Export
 *
 * Este módulo exporta todos los componentes, contextos y utilidades
 * del juego de preguntas y respuestas (quiz game).
 */

// Componentes principales
export { default as PlayerConfigScreen } from './components/PlayerConfigScreen';
export { default as GameScreen } from './components/GameScreen';
export { default as FeedbackScreen } from './components/FeedbackScreen';
export { default as ResultsScreen } from './components/ResultsScreen';
export { default as RankingScreen } from './components/RankingScreen';
export { default as ProgressBar } from './components/ProgressBar';

// Tipos de preguntas
export { default as MultipleChoice } from './components/QuestionTypes/MultipleChoice';
export { default as TrueFalse } from './components/QuestionTypes/TrueFalse';
export { default as FillBlanks } from './components/QuestionTypes/FillBlanks';
export { default as Matching } from './components/QuestionTypes/Matching';
export { default as Classify } from './components/QuestionTypes/Classify';

// Context y hooks
export { GameProvider, useGame, GAME_STATES } from './context/GameContext';

// Datos
export { tema2Questions } from './data/questions/tema2-relieve-terrestre';
