import { useState } from 'react';
import { Box, Button, Typography, Paper, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import {
  useSortable,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useDroppable } from '@dnd-kit/core';

/**
 * Item arrastrable (palabra/concepto)
 */
const DraggableItem = ({ id, value, disabled }) => {
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
    <Chip
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      label={value}
      sx={{
        cursor: disabled ? 'default' : 'grab',
        userSelect: 'none',
        touchAction: 'none', // Previene el scroll en móvil durante el drag
        fontSize: '0.95rem',
        fontWeight: 600,
        py: 2.5,
        px: 1.5,
        height: 'auto',
        backgroundColor: isDragging ? 'primary.light' : 'primary.main',
        color: 'white',
        '&:hover': {
          backgroundColor: disabled ? 'primary.main' : 'primary.dark',
        },
        '&:active': {
          cursor: disabled ? 'default' : 'grabbing',
        },
      }}
    />
  );
};

/**
 * Zona de drop para una categoría
 */
const CategoryZone = ({ id, category, items, disabled }) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
    disabled,
  });

  return (
    <Paper
      ref={setNodeRef}
      elevation={isOver ? 8 : 2}
      sx={{
        p: 2,
        minHeight: 120,
        backgroundColor: isOver ? 'secondary.light' : 'background.paper',
        border: '2px dashed',
        borderColor: isOver ? 'secondary.main' : 'grey.300',
        borderRadius: 2,
        transition: 'all 0.3s ease',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          fontWeight: 600,
          color: 'secondary.main',
          textAlign: 'center',
        }}
      >
        {category}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          justifyContent: 'center',
          minHeight: 60,
        }}
      >
        <SortableContext
          items={items.map(item => item.id)}
          strategy={rectSortingStrategy}
          disabled={disabled}
        >
          {items.map((item) => (
            <DraggableItem
              key={item.id}
              id={item.id}
              value={item.value}
              disabled={disabled}
            />
          ))}
        </SortableContext>
      </Box>
    </Paper>
  );
};

/**
 * Componente para preguntas de clasificación
 * Los usuarios arrastran palabras a las categorías correctas
 */
const Classify = ({ question, onAnswer, disabled = false }) => {
  // Inicializar items mezclados
  const [itemPool, setItemPool] = useState(() => {
    const allItems = question.items.map((item) => ({
      id: `item-${item.id}`, // Convertir a string con prefijo
      value: item.text,
      correctCategory: item.category,
    }));
    return allItems.sort(() => Math.random() - 0.5);
  });

  // Estado de categorías (inicialmente vacías)
  const [categoryItems, setCategoryItems] = useState(
    question.categories.reduce((acc, cat) => {
      acc[cat] = [];
      return acc;
    }, {})
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

    if (!over) {
      setActiveId(null);
      return;
    }

    const activeItem = findItem(active.id);
    if (!activeItem) return;

    // Determinar la categoría de destino
    let targetCategory = null;
    const overId = String(over.id); // Convertir a string para usar startsWith

    // Si over.id es una categoría
    if (overId.startsWith('category-')) {
      targetCategory = overId.replace('category-', '');
    } else {
      // Si over.id es un item, encontrar su categoría
      for (const [catName, items] of Object.entries(categoryItems)) {
        if (items.some(item => item.id === over.id)) {
          targetCategory = catName;
          break;
        }
      }
    }

    if (targetCategory) {
      moveItem(activeItem, targetCategory);
    }

    setActiveId(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  /**
   * Encuentra un item por su ID en el pool o en las categorías
   */
  const findItem = (id) => {
    let found = itemPool.find(item => item.id === id);
    if (found) return found;

    for (const items of Object.values(categoryItems)) {
      found = items.find(item => item.id === id);
      if (found) return found;
    }
    return null;
  };

  /**
   * Mueve un item al destino especificado
   */
  const moveItem = (item, targetCategory) => {
    // Remover del pool
    setItemPool(prev => prev.filter(i => i.id !== item.id));

    // Remover de cualquier categoría anterior
    setCategoryItems(prev => {
      const newState = { ...prev };
      for (const catName in newState) {
        newState[catName] = newState[catName].filter(i => i.id !== item.id);
      }
      // Añadir a la nueva categoría
      if (newState[targetCategory]) {
        newState[targetCategory] = [...newState[targetCategory], item];
      }
      return newState;
    });
  };

  /**
   * Valida la clasificación y envía el resultado
   */
  const handleSubmit = () => {
    if (disabled || submitted) return;

    // Verificar que todos los items estén clasificados
    if (itemPool.length > 0) {
      return;
    }

    setSubmitted(true);

    // Verificar si todos los items están en su categoría correcta
    let correctCount = 0;
    let totalCount = 0;

    for (const [catName, items] of Object.entries(categoryItems)) {
      for (const item of items) {
        totalCount++;
        if (item.correctCategory === catName) {
          correctCount++;
        }
      }
    }

    const isCorrect = correctCount === totalCount;

    onAnswer(categoryItems, isCorrect);
  };

  const activeItem = activeId ? findItem(activeId) : null;

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
        Arrastra cada elemento a su categoría correspondiente
      </Typography>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        {/* Pool de items */}
        {itemPool.length > 0 && (
          <Paper
            elevation={2}
            sx={{
              p: 2,
              mb: 4,
              backgroundColor: 'background.default',
              borderRadius: 2,
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                mb: 2,
                fontWeight: 600,
                color: 'text.secondary',
                textAlign: 'center',
              }}
            >
              Elementos para clasificar ({itemPool.length})
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
                justifyContent: 'center',
              }}
            >
              <SortableContext
                items={itemPool.map(item => item.id)}
                strategy={rectSortingStrategy}
                disabled={disabled || submitted}
              >
                {itemPool.map((item) => (
                  <DraggableItem
                    key={item.id}
                    id={item.id}
                    value={item.value}
                    disabled={disabled || submitted}
                  />
                ))}
              </SortableContext>
            </Box>
          </Paper>
        )}

        {/* Categorías */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: `repeat(${Math.min(question.categories.length, 3)}, 1fr)`,
            },
            gap: 3,
            mb: 4,
          }}
        >
          {question.categories.map((category) => (
            <CategoryZone
              key={category}
              id={`category-${category}`}
              category={category}
              items={categoryItems[category] || []}
              disabled={disabled || submitted}
            />
          ))}
        </Box>

        <DragOverlay>
          {activeItem ? (
            <Chip
              label={activeItem.value}
              sx={{
                fontSize: '0.95rem',
                fontWeight: 600,
                py: 2.5,
                px: 1.5,
                height: 'auto',
                backgroundColor: 'primary.light',
                color: 'white',
                opacity: 0.9,
                boxShadow: 4,
              }}
            />
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Botón de envío */}
      {!submitted && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <motion.div
            whileHover={itemPool.length === 0 ? { scale: 1.05 } : {}}
            whileTap={itemPool.length === 0 ? { scale: 0.95 } : {}}
          >
            <Button
              variant="contained"
              size="large"
              onClick={handleSubmit}
              disabled={itemPool.length > 0 || disabled}
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

      {itemPool.length > 0 && !submitted && (
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            mt: 2,
            textAlign: 'center',
            color: 'text.secondary',
          }}
        >
          Clasifica todos los elementos antes de comprobar
        </Typography>
      )}
    </Box>
  );
};

export default Classify;
