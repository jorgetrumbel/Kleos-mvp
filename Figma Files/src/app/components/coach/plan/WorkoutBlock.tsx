import { useRef, useState } from 'react';
import { ChevronDown, ChevronUp, Trash2, GripVertical, Plus, MessageSquare, Sparkles } from 'lucide-react';
import { useDrag, useDrop } from 'react-dnd';
import { Block, BlockType, BLOCK_TYPES, BLOCK_TYPE_CONFIG, ExerciseData, CustomExercise } from './types';
import { ExerciseRow } from './ExerciseRow';
import { CreateExerciseModal } from './CreateExerciseModal';

const DRAG_TYPE = 'WORKOUT_BLOCK';

interface DragItem {
  id: string;
  index: number;
}

interface WorkoutBlockProps {
  block: Block;
  index: number;
  onUpdate: (block: Block) => void;
  onDelete: () => void;
  onMove: (from: number, to: number) => void;
  onCreateExercise?: (exercise: CustomExercise) => void;
  exerciseCategories: string[];
  onAddExerciseCategory: (category: string) => void;
}

export function WorkoutBlock({ block, index, onUpdate, onDelete, onMove, onCreateExercise, exerciseCategories, onAddExerciseCategory }: WorkoutBlockProps) {
  const config = BLOCK_TYPE_CONFIG[block.type];
  const [showComments, setShowComments] = useState(!!block.comments);
  const [showCreateExercise, setShowCreateExercise] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag<DragItem, void, { isDragging: boolean }>({
    type: DRAG_TYPE,
    item: { id: block.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop<DragItem, void, { isOver: boolean }>({
    accept: DRAG_TYPE,
    hover(item) {
      if (item.index === index) return;
      onMove(item.index, index);
      item.index = index;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  drag(handleRef);
  drop(containerRef);

  const addExercise = () => {
    const newExercise: ExerciseData = {
      id: crypto.randomUUID(),
      name: '',
      notes: '',
    };
    onUpdate({ ...block, exercises: [...block.exercises, newExercise] });
  };

  const updateExercise = (i: number, exercise: ExerciseData) => {
    const exercises = [...block.exercises];
    exercises[i] = exercise;
    onUpdate({ ...block, exercises });
  };

  const deleteExercise = (i: number) => {
    onUpdate({ ...block, exercises: block.exercises.filter((_, idx) => idx !== i) });
  };

  const handleCreateExercise = (customExercise: CustomExercise) => {
    // Notify parent component to add to global custom exercises list
    if (onCreateExercise) {
      onCreateExercise(customExercise);
    }

    // Add the new exercise to the current block
    const newExercise: ExerciseData = {
      id: crypto.randomUUID(),
      name: customExercise.name,
      notes: customExercise.notes || '',
      videoUrl: customExercise.videoUrl,
    };
    onUpdate({ ...block, exercises: [...block.exercises, newExercise] });
    setShowCreateExercise(false);
  };

  return (
    <div
      ref={containerRef}
      className={`border rounded-xl overflow-hidden transition-all ${config.borderColor} ${
        isDragging ? 'opacity-40 scale-95' : isOver ? 'scale-[1.01]' : 'opacity-100'
      }`}
    >
      {/* Block header */}
      <div className={`${config.bgColor} p-3`}>
        <div className="flex items-center gap-2">
          {/* Drag handle */}
          <div
            ref={handleRef}
            className="cursor-grab active:cursor-grabbing p-1 -ml-1 touch-none flex-shrink-0"
          >
            <GripVertical className={`w-5 h-5 ${config.color}`} />
          </div>

          {/* Block name input */}
          <input
            type="text"
            placeholder="Nombre del bloque..."
            value={block.name}
            onChange={(e) => onUpdate({ ...block, name: e.target.value })}
            className={`flex-1 bg-transparent text-sm font-medium placeholder:opacity-50 focus:outline-none min-w-0 ${config.color} placeholder:text-current`}
          />

          {/* Type selector */}
          <select
            value={block.type}
            onChange={(e) => onUpdate({ ...block, type: e.target.value as BlockType })}
            className={`text-xs px-2 py-1 rounded-lg bg-black/20 border border-current/20 ${config.color} focus:outline-none cursor-pointer flex-shrink-0 max-w-[90px]`}
          >
            {BLOCK_TYPES.map((type) => (
              <option key={type} value={type} className="bg-card text-foreground">
                {BLOCK_TYPE_CONFIG[type].label}
              </option>
            ))}
          </select>

          {/* Collapse toggle */}
          <button
            onClick={() => onUpdate({ ...block, collapsed: !block.collapsed })}
            className="p-1 hover:bg-black/20 rounded-lg transition-colors flex-shrink-0"
          >
            {block.collapsed ? (
              <ChevronDown className={`w-4 h-4 ${config.color}`} />
            ) : (
              <ChevronUp className={`w-4 h-4 ${config.color}`} />
            )}
          </button>

          {/* Delete block */}
          <button
            onClick={onDelete}
            className="p-1 hover:bg-black/20 rounded-lg transition-colors flex-shrink-0 text-red-400"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Block content */}
      {!block.collapsed && (
        <div className="p-3 space-y-3 bg-card/30">
          {/* Exercise list */}
          {block.exercises.length > 0 && (
            <div className="space-y-2">
              {block.exercises.map((exercise, i) => (
                <ExerciseRow
                  key={exercise.id}
                  exercise={exercise}
                  blockType={block.type}
                  onChange={(ex) => updateExercise(i, ex)}
                  onDelete={() => deleteExercise(i)}
                />
              ))}
            </div>
          )}

          {/* Add exercise buttons */}
          <div className="flex gap-2">
            <button
              onClick={addExercise}
              className="flex-1 py-2.5 border border-dashed border-border rounded-lg text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Agregar Ejercicio
            </button>
            <button
              onClick={() => setShowCreateExercise(true)}
              className="flex-1 py-2.5 border border-dashed border-primary/40 rounded-lg text-sm text-primary hover:border-primary hover:bg-primary/5 transition-colors flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" /> Crear Ejercicio
            </button>
          </div>

          {/* Block comments */}
          <div>
            <button
              onClick={() => setShowComments(!showComments)}
              className={`flex items-center gap-1.5 text-xs transition-colors ${
                showComments || block.comments
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              {showComments ? 'Ocultar comentarios' : 'Comentarios del bloque'}
            </button>
            {showComments && (
              <textarea
                placeholder="Notas sobre este bloque: descansos, instrucciones generales..."
                value={block.comments}
                onChange={(e) => onUpdate({ ...block, comments: e.target.value })}
                rows={2}
                className="mt-2 w-full px-3 py-2 bg-input rounded-lg border border-border text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none"
              />
            )}
          </div>
        </div>
      )}

      {/* Summary when collapsed */}
      {block.collapsed && block.exercises.length > 0 && (
        <div className="px-3 py-2 bg-card/20 border-t border-border/30">
          <p className="text-xs text-muted-foreground">
            {block.exercises.length} ejercicio{block.exercises.length !== 1 ? 's' : ''}
            {block.exercises.filter((e) => e.name).map((e) => e.name).join(', ')
              ? `: ${block.exercises
                  .filter((e) => e.name)
                  .slice(0, 3)
                  .map((e) => e.name)
                  .join(', ')}${block.exercises.length > 3 ? '...' : ''}`
              : ''}
          </p>
        </div>
      )}

      {/* Create Exercise Modal */}
      {showCreateExercise && (
        <CreateExerciseModal
          initialBlockType={block.type}
          exerciseCategories={exerciseCategories}
          onAddExerciseCategory={onAddExerciseCategory}
          onSave={handleCreateExercise}
          onClose={() => setShowCreateExercise(false)}
        />
      )}
    </div>
  );
}
