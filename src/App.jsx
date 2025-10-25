import { GameProvider, useGame, GAME_STATES } from './context/GameContext';
import PlayerConfigScreen from './components/PlayerConfigScreen';
import GameScreen from './components/GameScreen';

/**
 * Componente interno que maneja el enrutamiento basado en el estado del juego
 */
const AppContent = () => {
  const { gameState } = useGame();

  // Mostrar PlayerConfigScreen si el estado es PLAYER_CONFIG
  if (gameState === GAME_STATES.PLAYER_CONFIG) {
    return <PlayerConfigScreen />;
  }

  // Mostrar GameScreen para los demás estados (PLAYING, FEEDBACK, RESULTS)
  return <GameScreen />;
};

/**
 * Componente principal de la aplicación
 * Envuelve todo en el GameProvider
 */
function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}

export default App;
