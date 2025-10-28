import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Paper,
  Button,
  Alert,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import IconButton from '@mui/material/IconButton';
import { getTopicById } from '@data/topics';
import { getSubjectById } from '@data/subjects';

/**
 * TabPanel - Panel de contenido para cada pestaña
 */
function TabPanel({ children, value, index }) {
  return (
    <AnimatePresence mode="wait">
      {value === index && (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Box sx={{ py: 3 }}>{children}</Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * TopicHub - Hub del tema con 4 pestañas
 * Teoría, Esquema, Vídeo, Juego
 */
const TopicHub = () => {
  const navigate = useNavigate();
  const { topicId } = useParams();
  const [tabValue, setTabValue] = useState(0);

  const topic = getTopicById(topicId);
  const subject = topic ? getSubjectById(topic.subjectId) : null;

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleStartGame = () => {
    navigate(`/game/${topicId}`);
  };

  if (!topic) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <Typography variant="h5" color="white">
          Tema no encontrado
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <IconButton
            onClick={() => navigate(`/topics/${subject?.id || 'geography-history'}`)}
            sx={{
              color: 'white',
              mb: 2,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <ArrowBackIcon />
          </IconButton>

          {/* Breadcrumb */}
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              mb: 1,
            }}
          >
            {subject?.name} / Tema {topic.number}
          </Typography>

          {/* Título del tema */}
          <Typography
            variant="h3"
            component="h1"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              mb: 1,
            }}
          >
            {topic.title}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.8)',
            }}
          >
            {topic.description}
          </Typography>
        </Box>

        {/* Tabs de navegación */}
        <Paper
          elevation={3}
          sx={{
            backgroundColor: '#0f3460',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              borderBottom: 1,
              borderColor: 'rgba(255, 255, 255, 0.1)',
              '& .MuiTab-root': {
                color: 'rgba(255, 255, 255, 0.7)',
                fontWeight: 'bold',
                '&.Mui-selected': {
                  color: 'white',
                },
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#667eea',
                height: 3,
              },
            }}
          >
            <Tab icon={<MenuBookIcon />} label="Teoría" />
            <Tab icon={<AccountTreeIcon />} label="Esquema" />
            <Tab icon={<OndemandVideoIcon />} label="Vídeo" />
            <Tab icon={<SportsEsportsIcon />} label="Juego" />
          </Tabs>

          {/* Contenido de las pestañas */}
          <Box sx={{ p: 3 }}>
            {/* Pestaña 1: Teoría */}
            <TabPanel value={tabValue} index={0}>
              {topic.content.theory.available ? (
                <Box>
                  <Typography variant="h5" color="white" gutterBottom>
                    📖 Contenido teórico
                  </Typography>
                  <Typography variant="body1" color="rgba(255, 255, 255, 0.8)">
                    {topic.content.theory.description}
                  </Typography>
                  {/* TODO: Añadir contenido teórico desde markdown o HTML */}
                </Box>
              ) : (
                <Alert severity="info" sx={{ backgroundColor: 'rgba(2, 136, 209, 0.1)' }}>
                  El contenido teórico estará disponible próximamente.
                </Alert>
              )}
            </TabPanel>

            {/* Pestaña 2: Esquema */}
            <TabPanel value={tabValue} index={1}>
              {topic.content.diagram.available ? (
                <Box>
                  <Typography variant="h5" color="white" gutterBottom>
                    🗺️ Esquemas y mapas conceptuales
                  </Typography>
                  <Typography variant="body1" color="rgba(255, 255, 255, 0.8)">
                    {topic.content.diagram.description}
                  </Typography>
                  {/* TODO: Añadir esquemas e imágenes */}
                </Box>
              ) : (
                <Alert severity="info" sx={{ backgroundColor: 'rgba(2, 136, 209, 0.1)' }}>
                  Los esquemas estarán disponibles próximamente.
                </Alert>
              )}
            </TabPanel>

            {/* Pestaña 3: Vídeo */}
            <TabPanel value={tabValue} index={2}>
              {topic.content.video.available ? (
                <Box>
                  <Typography variant="h5" color="white" gutterBottom>
                    🎥 Vídeos educativos
                  </Typography>
                  <Typography variant="body1" color="rgba(255, 255, 255, 0.8)">
                    {topic.content.video.description}
                  </Typography>
                  {/* TODO: Añadir reproductor de vídeos de YouTube */}
                </Box>
              ) : (
                <Alert severity="info" sx={{ backgroundColor: 'rgba(2, 136, 209, 0.1)' }}>
                  Los vídeos estarán disponibles próximamente.
                </Alert>
              )}
            </TabPanel>

            {/* Pestaña 4: Juego */}
            <TabPanel value={tabValue} index={3}>
              {topic.content.game.available ? (
                <Box sx={{ textAlign: 'center' }}>
                  <SportsEsportsIcon sx={{ fontSize: 80, color: '#667eea', mb: 2 }} />
                  <Typography variant="h5" color="white" gutterBottom>
                    🎮 {topic.content.game.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="rgba(255, 255, 255, 0.8)"
                    sx={{ mb: 3 }}
                  >
                    {topic.content.game.description}
                  </Typography>

                  {/* Información del quiz */}
                  {topic.content.game.gameType === 'quiz' && (
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 2,
                        mb: 3,
                        flexWrap: 'wrap',
                      }}
                    >
                      <Paper
                        sx={{
                          px: 3,
                          py: 1.5,
                          backgroundColor: 'rgba(102, 126, 234, 0.2)',
                        }}
                      >
                        <Typography variant="body2" color="white">
                          📝 {topic.content.game.questionsCount} preguntas
                        </Typography>
                      </Paper>
                      <Paper
                        sx={{
                          px: 3,
                          py: 1.5,
                          backgroundColor: 'rgba(102, 126, 234, 0.2)',
                        }}
                      >
                        <Typography variant="body2" color="white">
                          🎯 5 tipos de actividades
                        </Typography>
                      </Paper>
                    </Box>
                  )}

                  {/* Botón para iniciar el juego */}
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<SportsEsportsIcon />}
                    onClick={handleStartGame}
                    sx={{
                      fontSize: '1.1rem',
                      px: 4,
                      py: 1.5,
                      borderRadius: 50,
                      backgroundColor: '#667eea',
                      fontWeight: 'bold',
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: '#5568d3',
                      },
                    }}
                  >
                    Jugar Quiz
                  </Button>
                </Box>
              ) : (
                <Alert severity="warning" sx={{ backgroundColor: 'rgba(237, 108, 2, 0.1)' }}>
                  El juego para este tema estará disponible próximamente.
                </Alert>
              )}
            </TabPanel>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default TopicHub;
