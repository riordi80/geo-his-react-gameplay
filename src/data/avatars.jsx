/**
 * Avatares para la configuración del jugador
 * Cada avatar es una configuración de colores y forma para renderizar un SVG
 */

export const avatars = [
  {
    id: 'avatar-1',
    name: 'Alegre',
    colors: {
      primary: '#FF6B6B',   // Rojo coral
      secondary: '#FFE66D', // Amarillo
      accent: '#FF9E9E'
    },
    emoji: '😊'
  },
  {
    id: 'avatar-2',
    name: 'Aventurero',
    colors: {
      primary: '#4ECDC4',   // Turquesa
      secondary: '#95E1D3', // Verde menta
      accent: '#7FE3DB'
    },
    emoji: '🚀'
  },
  {
    id: 'avatar-3',
    name: 'Sabio',
    colors: {
      primary: '#A8E6CF',   // Verde claro
      secondary: '#FFE66D', // Amarillo
      accent: '#C8F7DC'
    },
    emoji: '🧠'
  },
  {
    id: 'avatar-4',
    name: 'Estrella',
    colors: {
      primary: '#FF6B9D',   // Rosa
      secondary: '#FFE66D', // Amarillo
      accent: '#FF9EBF'
    },
    emoji: '⭐'
  },
  {
    id: 'avatar-5',
    name: 'Genio',
    colors: {
      primary: '#FFE66D',   // Amarillo
      secondary: '#FF6B6B', // Rojo coral
      accent: '#FFF0A0'
    },
    emoji: '🎯'
  },
  {
    id: 'avatar-6',
    name: 'Rayo',
    colors: {
      primary: '#4ECDC4',   // Turquesa
      secondary: '#FF6B6B', // Rojo coral
      accent: '#7FE3DB'
    },
    emoji: '⚡'
  },
  {
    id: 'avatar-7',
    name: 'Campeón',
    colors: {
      primary: '#95E1D3',   // Verde menta
      secondary: '#FFE66D', // Amarillo
      accent: '#AAEEDD'
    },
    emoji: '🏆'
  },
  {
    id: 'avatar-8',
    name: 'Explorador',
    colors: {
      primary: '#FF6B6B',   // Rojo coral
      secondary: '#4ECDC4', // Turquesa
      accent: '#FF9E9E'
    },
    emoji: '🌍'
  }
];

/**
 * Componente React para renderizar un avatar
 * Usa los colores del avatar seleccionado para crear un círculo colorido con emoji
 */
export const AvatarIcon = ({ avatar, size = 80, showName = false, className = '' }) => {
  if (!avatar) return null;

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <div
        className="rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105"
        style={{
          width: size,
          height: size,
          background: `linear-gradient(135deg, ${avatar.colors.primary} 0%, ${avatar.colors.secondary} 100%)`,
          border: `3px solid ${avatar.colors.accent}`
        }}
      >
        <span style={{ fontSize: size * 0.5 }}>
          {avatar.emoji}
        </span>
      </div>
      {showName && (
        <span className="text-sm font-semibold text-gray-700">
          {avatar.name}
        </span>
      )}
    </div>
  );
};

export default avatars;
