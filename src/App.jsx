import { Routes, Route } from 'react-router-dom';
import { GameProvider, useGame, GAME_STATES, PlayerConfigScreen, GameScreen } from '@modules/games/quiz-game';
import { WelcomeScreen, CourseSelection, SubjectSelection, TopicsList } from '@modules/platform/navigation';
import { TopicHub } from '@modules/platform/topic-hub';

/**
 * Componente del Quiz Game integrado en las rutas
 */
const QuizGameRoute = () => {
  const { gameState } = useGame();

  if (gameState === GAME_STATES.PLAYER_CONFIG) {
    return <PlayerConfigScreen />;
  }

  return <GameScreen />;
};

/**
 * Componente principal de la aplicación con rutas
 */
function App() {
  return (
    <Routes>
      {/* Pantalla de bienvenida */}
      <Route path="/" element={<WelcomeScreen />} />

      {/* Selección de curso */}
      <Route path="/courses" element={<CourseSelection />} />

      {/* Selección de asignatura */}
      <Route path="/subjects/:courseId" element={<SubjectSelection />} />

      {/* Lista de temas (carrusel Netflix) */}
      <Route path="/topics/:subjectId" element={<TopicsList />} />

      {/* Hub del tema (4 pestañas) */}
      <Route path="/topic/:topicId" element={<TopicHub />} />

      {/* Quiz Game */}
      <Route
        path="/game/:topicId"
        element={
          <GameProvider>
            <QuizGameRoute />
          </GameProvider>
        }
      />
    </Routes>
  );
}

export default App;
