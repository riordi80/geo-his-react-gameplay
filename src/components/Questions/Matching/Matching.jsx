import { useState } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

/**
 * Item arrastrable individual
 */
const SortableItem = ({ id, value, disabled }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Paper
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      elevation={isDragging ? 4 : 1}
      sx={{
        p: 2,
        mb: 1.5,
        cursor: disabled ? 'default' : 'grab',
        userSelect: 'none',
        touchAction: 'none', // Previene el scroll en móvil durante el drag
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        backgroundColor: 'background.paper',
        borderRadius: 2,
        border: '2px solid',
        borderColor: isDragging ? 'primary.main' : 'transparent',
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: disabled ? 'transparent' : 'primary.light',
          transform: disabled ? 'none' : 'translateX(4px)',
        },
        '&:active': {
          cursor: disabled ? 'default' : 'grabbing',
        },
      }}
    >
      {!disabled && (
        <DragIndicatorIcon
          sx={{
            color: 'text.secondary',
            flexShrink: 0,
          }}
        />
      )}
      <Typography
        variant="body1"
        sx={{
          fontWeight: 600,
          color: 'text.primary',
          flex: 1,
        }}
      >
        {value}
      </Typography>
    </Paper>
  );
};

/**
 * Componente para preguntas de emparejar
 * Los usuarios arrastran items de la izquierda para emparejarlos con la columna derecha
 */
const Matching = ({ question, onAnswer, disabled = false }) => {
  // Mezclar el orden inicial de las opciones
  const [leftItems] = useState(() => {
    return [...question.pairs.map((p, i) => ({ id: `left-${i}`, value: p.left, originalIndex: i }))]
      .sort(() => Math.random() - 0.5);
  });

  const [rightItems, setRightItems] = useState(
    question.pairs.map((p, i) => ({ id: `right-${i}`, value: p.right, originalIndex: i }))
  );

  const [activeId, setActiveId] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // El drag se activa después de mover 8px
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200, // 200ms de delay antes de activar el drag
        tolerance: 5, // Permite 5px de movimiento durante el delay
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event) => {
    if (disabled || submitted) return;
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setRightItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        if (oldIndex !== -1 && newIndex !== -1) {
          return arrayMove(items, oldIndex, newIndex);
        }
        return items;
      });
    }

    setActiveId(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  /**
   * Valida el emparejamiento y envía el resultado
   */
  const handleSubmit = () => {
    if (disabled || submitted) return;

    setSubmitted(true);

    // Verificar si el orden de rightItems coincide con leftItems
    const isCorrect = leftItems.every((leftItem, index) => {
      const rightItem = rightItems[index];
      return leftItem.originalIndex === rightItem.originalIndex;
    });

    // Crear array de respuestas para guardar
    const userAnswers = leftItems.map((leftItem, index) => ({
      left: leftItem.value,
      right: rightItems[index].value,
    }));

    onAnswer(userAnswers, isCorrect);
  };

  const activeItem = activeId
    ? rightItems.find((item) => item.id === activeId)
    : null;

  return (
    <Box sx={{ width: '100%' }}>
      {/* Pregunta */}
      <Typography
        variant="h5"
        sx={{
          mb: 1,
          fontWeight: 600,
          color: 'text.primary',
          textAlign: 'center',
          lineHeight: 1.4,
        }}
      >
        {question.question}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          mb: 4,
          textAlign: 'center',
          color: 'text.secondary',
          fontWeight: 500,
        }}
      >
        Arrastra los elementos de la derecha para emparejarlos correctamente
      </Typography>

      {/* Área de emparejamiento */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 4,
          mb: 4,
        }}
      >
        {/* Columna izquierda (fija) */}
        <Box>
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              fontWeight: 600,
              color: 'secondary.main',
              textAlign: 'center',
            }}
          >
            Conceptos
          </Typography>
          {leftItems.map((item) => (
            <SortableItem
              key={item.id}
              id={item.id}
              value={item.value}
              disabled={true}
            />
          ))}
        </Box>

        {/* Columna derecha (arrastrable) */}
        <Box>
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              fontWeight: 600,
              color: 'primary.main',
              textAlign: 'center',
            }}
          >
            Definiciones
          </Typography>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
          >
            <SortableContext
              items={rightItems.map(item => item.id)}
              strategy={verticalListSortingStrategy}
              disabled={disabled || submitted}
            >
              {rightItems.map((item) => (
                <SortableItem
                  key={item.id}
                  id={item.id}
                  value={item.value}
                  disabled={disabled || submitted}
                />
              ))}
            </SortableContext>
            <DragOverlay>
              {activeItem ? (
                <Paper
                  elevation={4}
                  sx={{
                    p: 2,
                    backgroundColor: 'primary.light',
                    borderRadius: 2,
                    opacity: 0.9,
                  }}
                >
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {activeItem.value}
                  </Typography>
                </Paper>
              ) : null}
            </DragOverlay>
          </DndContext>
        </Box>
      </Box>

      {/* Botón de envío */}
      {!submitted && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={handleSubmit}
              disabled={disabled}
              sx={{
                py: 2,
                px: 6,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 2,
                textTransform: 'none',
                backgroundColor: 'primary.main',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(255,107,107,0.4)',
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

export default Matching;
