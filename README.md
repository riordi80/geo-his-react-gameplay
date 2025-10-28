# Geo&His Play

Interactive educational platform that combines learning and gamification to make studying more engaging and effective.

## Description

Geo&His Play is a web application designed to reinforce knowledge through a complete gaming experience that includes theory, visual resources, and interactive activities. The platform uses gamification techniques to maintain student motivation while learning.

### Main Features

- **5 types of interactive activities**
  - Multiple choice
  - True or False
  - Fill in the blanks
  - Match concepts
  - Classify elements (drag & drop)

- **Scoring and star system**
  - Immediate feedback on each answer
  - Streak system to maintain motivation
  - Personalized motivational messages based on performance

- **Player customization**
  - Personalized initials
  - Selection of 8 unique avatars
  - Locally saved data

- **Local ranking**
  - Top 10 per topic
  - Persistent storage in localStorage
  - Personal progress tracking

- **Attractive interface**
  - Colorful cartoon-style design
  - Smooth animations with Framer Motion
  - Responsive (Mobile First)
  - Smooth transitions between screens

## Tech Stack

### Core
- **React 19** - UI Framework
- **Vite 7** - Build tool and development server
- **JavaScript ES6+** - Programming language

### UI/UX
- **Material-UI (MUI) v7** - UI components with custom theme
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **@dnd-kit** - Modern drag & drop system

### Navigation and State
- **React Router DOM** - Routing (prepared for future phases)
- **React Context API** - Global state management

### Storage
- **localStorage** - Local data persistence (rankings, progress)

## Installation

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone [REPOSITORY_URL]
   cd learngaming
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build application for production
npm run preview      # Preview production build

# Code quality
npm run lint         # Run ESLint
```

## Project Structure

The project uses a **modular architecture** for scalability:

```
learngaming/
├── docs/                        # Project documentation
│   ├── README.md               # 📚 Documentation index
│   ├── STRUCTURE.md            # ⭐ Current structure (START HERE)
│   ├── ARCHITECTURE.md         # 🏗️ Architecture guide
│   ├── MIGRATION_COMPLETED.md  # 🔄 Migration summary
│   ├── PROJECT_PLAN.md         # 📋 Original plan (historical)
│   ├── DEVELOPMENT_GUIDE.md    # 🛠️ Dev guide (historical)
│   └── contenido/              # Educational materials (PDFs)
│
├── public/                      # Static files
│
├── src/
│   ├── modules/                # 🎮 Independent modules
│   │   ├── games/
│   │   │   └── quiz-game/      # Quiz game (self-contained)
│   │   │       ├── components/ # All quiz components
│   │   │       ├── context/    # Game state
│   │   │       ├── data/       # Questions bank
│   │   │       └── index.js    # Barrel export
│   │   │
│   │   └── platform/           # 🏫 Educational platform (future)
│   │       ├── navigation/
│   │       ├── topic-hub/
│   │       └── layout/
│   │
│   ├── shared/                 # 🔧 Shared resources
│   │   ├── hooks/              # useSound
│   │   ├── services/           # storage
│   │   ├── components/         # UI components (future)
│   │   └── index.js            # Barrel export
│   │
│   ├── data/                   # 📚 Global data
│   │   ├── avatars.jsx         # Avatar configuration
│   │   ├── courses/            # Course config
│   │   ├── subjects/           # Subject config
│   │   └── topics/             # Topic config
│   │
│   ├── App.jsx                 # Main component
│   ├── main.jsx                # Entry point
│   └── theme.js                # Custom MUI theme
│
├── .gitignore
├── package.json
├── vite.config.js              # With path aliases configured
├── tailwind.config.js
└── README.md
```

### Path Aliases

The project uses clean imports with path aliases:

```javascript
// Import complete game module
import { GameProvider, PlayerConfigScreen } from '@modules/games/quiz-game';

// Import shared hooks
import { useSound } from '@shared/hooks';

// Import shared services
import { saveRanking } from '@shared/services';

// Import global data
import avatars from '@data/avatars';
```

## How to Play

1. **Initial setup**
   - Enter your initials (1-3 letters)
   - Select your favorite avatar
   - Click "Start Game!"

2. **During the game**
   - Answer 10 randomly selected questions
   - Each question type has its own interface
   - Receive immediate feedback after each answer
   - Maintain answer streaks to stand out

3. **Results**
   - Check your final score
   - Get 1 to 3 stars based on your performance
   - Review your ranking position
   - Play again to improve

## Activity Types

### 1. Multiple Choice
Choose the correct answer from 4 options.

### 2. True or False
Evaluate whether a statement is true or false.

### 3. Fill in the Blanks
Complete sentences by writing the correct words.

### 4. Matching
Connect concepts with their definitions using drag & drop.

### 5. Classify
Drag elements to their corresponding categories.

## Scoring System

- **3 stars**: 90-100% correct answers
- **2 stars**: 70-89% correct answers
- **1 star**: 50-69% correct answers
- **No stars**: 0-49% correct answers

### Streaks
- Increases with each consecutive correct answer
- Resets on first mistake
- Displayed visually during the game
- Maximum streak is recorded

## Development

### Technologies and Conventions

- **Functional components** with React hooks
- **Context API** for global state
- **Material-UI** for base components
- **Tailwind CSS** for custom styles
- **Framer Motion** for declarative animations

### Adding New Questions

Questions are located in `src/data/questions/`. Each question must follow this structure:

```javascript
{
  id: 'unique-id',
  type: 'multipleChoice', // or 'trueFalse', 'fillBlanks', 'matching', 'classify'
  difficulty: 'easy', // or 'medium', 'hard'
  question: 'Question text',
  // ... type-specific fields
  explanation: 'Explanation of the correct answer'
}
```

### localStorage Data Structure

```javascript
// Ranking per topic
{
  "rankings": {
    "topic-id": [
      {
        id: "uuid",
        initials: "ABC",
        avatar: 1,
        score: 90,
        stars: 3,
        maxStreak: 8,
        date: "2025-10-25"
      }
      // ... top 10
    ]
  }
}
```

## Current Status

- ✅ **Sound system** - Complete with Web Audio API
- ✅ **Modular architecture** - Scalable and maintainable
- ✅ **5 question types** - Fully implemented
- ✅ **Scoring system** - With stars and streaks
- ✅ **Local rankings** - Persistent storage
- ✅ **Responsive design** - Mobile First

## Future Features

- [ ] Confetti animation for high scores
- [ ] Complete Netflix-style navigation
- [ ] Topic hub with theory, diagrams, and videos
- [ ] Multiple topics and subjects
- [ ] More game types (memory, puzzles, etc.)
- [ ] Local multiplayer mode
- [ ] Achievement and badge system
- [ ] Dark mode
- [ ] Backend integration

## Additional Documentation

📚 For detailed information about the project:

### Start Here
- **`docs/README.md`** - Documentation index and navigation guide
- **`docs/STRUCTURE.md`** - ⭐ Current structure (RECOMMENDED)
- **`docs/ARCHITECTURE.md`** - How to add new games and scale

### Reference
- **`docs/MIGRATION_COMPLETED.md`** - Summary of architecture migration
- **`docs/PROJECT_PLAN.md`** - Original vision (historical reference)
- **`docs/DEVELOPMENT_GUIDE.md`** - Original dev guide (historical reference)

## License

[To be defined]

## Contributing

This is an educational project. To contribute or report issues, contact the development team.

---

**Developed with care to make learning more fun and interactive**
