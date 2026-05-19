import { useState } from 'react';
import {
  ArrowLeft,
  Plus,
  Search,
  Video,
  FileText,
  Trash2,
  Edit3,
  Filter,
  Dumbbell,
  X,
} from 'lucide-react';
import { BlockType, BLOCK_TYPE_CONFIG, CustomExercise } from './types';
import { exerciseDatabase } from './exerciseDatabase';
import { CreateExerciseModal } from './CreateExerciseModal';

const getBlockConfig = (type: string) =>
  BLOCK_TYPE_CONFIG[type as BlockType] || {
    label: type,
    color: 'text-gray-400',
    bgColor: 'bg-gray-500/20',
    borderColor: 'border-gray-500/40',
    fields: [] as Array<'sets' | 'reps' | 'duration' | 'intensity'>,
  };

interface ExercisesLibraryProps {
  customExercises: CustomExercise[];
  onSetCustomExercises: (exercises: CustomExercise[]) => void;
  onBack: () => void;
  exerciseCategories: string[];
  onSetExerciseCategories: (categories: string[]) => void;
}

export function ExercisesLibrary({
  customExercises,
  onSetCustomExercises,
  onBack,
  exerciseCategories,
  onSetExerciseCategories,
}: ExercisesLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | 'all'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingExercise, setEditingExercise] = useState<CustomExercise | null>(null);
  const [viewingExercise, setViewingExercise] = useState<{
    name: string;
    type: string;
    isDefault: boolean;
    videoUrl?: string;
    notes?: string;
  } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Combine default and custom exercises
  const allExercises = [
    ...Object.entries(exerciseDatabase).flatMap(([type, exercises]) =>
      exercises.map((ex) => ({
        name: ex.name,
        type: type as BlockType,
        isDefault: true,
        videoUrl: undefined as string | undefined,
        notes: undefined as string | undefined,
      }))
    ),
    ...customExercises.map((ex) => ({
      id: ex.id,
      name: ex.name,
      type: ex.blockType,
      isDefault: false,
      videoUrl: ex.videoUrl,
      notes: ex.notes,
    })),
  ];

  const filtered = allExercises.filter((ex) => {
    const matchSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchType = selectedType === 'all' || ex.type === selectedType;
    return matchSearch && matchType;
  });

  const handleDeleteCustom = (id: string) => {
    onSetCustomExercises(customExercises.filter((ex) => ex.id !== id));
    setDeleteConfirm(null);
  };

  const handleSaveExercise = (exercise: CustomExercise) => {
    if (editingExercise) {
      onSetCustomExercises(
        customExercises.map((ex) => (ex.id === editingExercise.id ? exercise : ex))
      );
      setEditingExercise(null);
    } else {
      onSetCustomExercises([...customExercises, exercise]);
    }
    setShowCreateModal(false);
  };

  const handleUpdateExercise = (exercise: CustomExercise) => {
    onSetCustomExercises(
      customExercises.map((ex) => (ex.id === exercise.id ? exercise : ex))
    );
    setViewingExercise(null);
  };

  const defaultCount = allExercises.filter((ex) => ex.isDefault).length;
  const customCount = customExercises.length;

  // All categories to show in the filter (default + any custom added by coach)
  const allFilterCategories = exerciseCategories;

  return (
    <div className="flex flex-col h-screen max-h-screen">
      {/* Header */}
      <div className="p-3 border-b border-border bg-background z-10 flex-shrink-0">
        <div className="flex items-center gap-2 mb-2">
          <button
            onClick={onBack}
            className="p-2 -ml-1 hover:bg-muted rounded-lg transition-colors flex-shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl">Biblioteca de Ejercicios</h1>
            <p className="text-xs text-muted-foreground">
              {defaultCount} predeterminados · {customCount} personalizados
            </p>
          </div>
          <button
            onClick={() => {
              setEditingExercise(null);
              setShowCreateModal(true);
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm flex-shrink-0"
          >
            <Plus className="w-4 h-4" /> Nuevo
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="px-3 pt-3 pb-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar ejercicios..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 bg-input rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
        </div>
      </div>

      {/* Type filter */}
      <div className="px-3 pb-3">
        <div className="flex items-center gap-2 mb-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Categoría</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setSelectedType('all')}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap text-xs transition-colors flex-shrink-0 ${
              selectedType === 'all'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Todos ({allExercises.length})
          </button>
          {allFilterCategories.map((type) => {
            const count = allExercises.filter((ex) => ex.type === type).length;
            const cfg = getBlockConfig(type);
            return (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1.5 rounded-full whitespace-nowrap text-xs transition-colors flex-shrink-0 ${
                  selectedType === type
                    ? `${cfg.bgColor} ${cfg.color}`
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {cfg.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Exercise list */}
      <div className="flex-1 overflow-y-auto px-3 pb-6">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <Dumbbell className="w-14 h-14 text-muted-foreground mx-auto mb-4 opacity-30" />
            <p className="text-muted-foreground text-sm mb-1">
              {searchQuery ? 'No hay ejercicios que coincidan' : 'No hay ejercicios en esta categoría'}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((exercise, idx) => {
              const config = getBlockConfig(exercise.type);
              const customEx = !exercise.isDefault
                ? customExercises.find((ex) => ex.id === (exercise as any).id)
                : null;

              return (
                <div
                  key={exercise.isDefault ? `${exercise.type}-${exercise.name}` : (exercise as any).id}
                  className="bg-card rounded-xl border border-border overflow-hidden"
                >
                  <button
                    onClick={() => setViewingExercise(exercise)}
                    className="w-full text-left p-3 hover:bg-muted/10 transition-colors"
                  >
                    <div className="flex items-start gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium truncate mb-1">{exercise.name}</h3>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-md text-xs ${config.bgColor} ${config.color}`}
                          >
                            {config.label}
                          </span>
                          {!exercise.isDefault && (
                            <span className="text-xs px-2 py-0.5 bg-primary/20 text-primary rounded-full">
                              Personalizado
                            </span>
                          )}
                          {exercise.videoUrl && (
                            <Video className="w-3.5 h-3.5 text-primary" />
                          )}
                          {exercise.notes && (
                            <FileText className="w-3.5 h-3.5 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                  {!exercise.isDefault && customEx && (
                    <div className="flex items-center border-t border-border">
                      <button
                        onClick={() => {
                          setEditingExercise(customEx);
                          setShowCreateModal(true);
                        }}
                        className="flex-1 py-2 text-xs text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors flex items-center justify-center gap-1"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> Editar
                      </button>
                      <div className="w-px h-8 bg-border" />
                      <button
                        onClick={() => setDeleteConfirm((exercise as any).id)}
                        className="flex-1 py-2 text-xs text-muted-foreground hover:text-red-400 hover:bg-red-500/5 transition-colors flex items-center justify-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Eliminar
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* View exercise modal */}
      {viewingExercise && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end">
          <div className="w-full bg-card rounded-t-2xl border-t border-border p-4 max-w-[480px] mx-auto max-h-[80vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h2 className="font-medium mb-2">{viewingExercise.name}</h2>
                {(() => {
                  const cfg = getBlockConfig(viewingExercise.type);
                  return (
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${cfg.bgColor}`}>
                      <span className={`text-xs ${cfg.color}`}>{cfg.label}</span>
                    </div>
                  );
                })()}
              </div>
              <button
                onClick={() => setViewingExercise(null)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {viewingExercise.videoUrl && (
              <div className="mb-4">
                <label className="text-sm font-medium mb-2 flex items-center gap-1.5">
                  <Video className="w-4 h-4" />
                  Video
                </label>
                <a
                  href={viewingExercise.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline break-all"
                >
                  {viewingExercise.videoUrl}
                </a>
              </div>
            )}

            {viewingExercise.notes && (
              <div className="mb-4">
                <label className="text-sm font-medium mb-2 flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />
                  Notas
                </label>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {viewingExercise.notes}
                </p>
              </div>
            )}

            {viewingExercise.isDefault && (
              <p className="text-xs text-muted-foreground italic">
                Este es un ejercicio predeterminado del sistema
              </p>
            )}

            <button
              onClick={() => setViewingExercise(null)}
              className="w-full py-3 bg-muted rounded-xl text-sm hover:bg-muted/80 transition-colors mt-4"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Create/Edit modal */}
      {showCreateModal && (
        <CreateExerciseModal
          initialBlockType={editingExercise?.blockType}
          editingExercise={editingExercise || undefined}
          exerciseCategories={exerciseCategories}
          onAddExerciseCategory={(cat) => onSetExerciseCategories([...exerciseCategories, cat])}
          onSave={handleSaveExercise}
          onClose={() => {
            setShowCreateModal(false);
            setEditingExercise(null);
          }}
        />
      )}

      {/* Delete confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6">
          <div className="bg-card rounded-2xl border border-border p-5 w-full max-w-xs">
            <h3 className="font-medium mb-1">¿Eliminar ejercicio?</h3>
            <p className="text-sm text-muted-foreground mb-4">Esta acción no se puede deshacer.</p>
            <div className="flex gap-2">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2.5 bg-muted rounded-xl text-sm hover:bg-muted/80 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDeleteCustom(deleteConfirm)}
                className="flex-1 py-2.5 bg-red-500 text-white rounded-xl text-sm hover:bg-red-600 transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
