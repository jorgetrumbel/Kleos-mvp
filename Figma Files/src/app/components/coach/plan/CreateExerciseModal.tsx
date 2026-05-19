import { useState } from 'react';
import { X, Dumbbell, Video, FileText, ChevronDown, Plus } from 'lucide-react';
import { BlockType, BLOCK_TYPE_CONFIG, CustomExercise } from './types';

interface CreateExerciseModalProps {
  initialBlockType?: string;
  editingExercise?: CustomExercise;
  exerciseCategories: string[];
  onAddExerciseCategory: (category: string) => void;
  onSave: (exercise: CustomExercise) => void;
  onClose: () => void;
}

export function CreateExerciseModal({
  initialBlockType = 'Cardio',
  editingExercise,
  exerciseCategories,
  onAddExerciseCategory,
  onSave,
  onClose,
}: CreateExerciseModalProps) {
  const [name, setName] = useState(editingExercise?.name || '');
  const [blockType, setBlockType] = useState<string>(editingExercise?.blockType || initialBlockType);
  const [videoUrl, setVideoUrl] = useState(editingExercise?.videoUrl || '');
  const [notes, setNotes] = useState(editingExercise?.notes || '');
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleSave = () => {
    if (!name.trim()) {
      alert('El nombre del ejercicio es obligatorio');
      return;
    }

    const exercise: CustomExercise = {
      id: editingExercise?.id || crypto.randomUUID(),
      name: name.trim(),
      blockType,
      videoUrl: videoUrl.trim() || undefined,
      notes: notes.trim() || undefined,
      isDefault: false,
      createdAt: editingExercise?.createdAt || new Date(),
    };

    onSave(exercise);
    onClose();
  };

  const handleAddCategory = () => {
    const trimmed = newCategoryName.trim();
    if (!trimmed) return;
    if (exerciseCategories.includes(trimmed)) {
      alert('Esta categoría ya existe');
      return;
    }
    onAddExerciseCategory(trimmed);
    setBlockType(trimmed);
    setNewCategoryName('');
    setShowNewCategory(false);
  };

  const knownConfig = BLOCK_TYPE_CONFIG[blockType as BlockType];

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-end">
      <div className="w-full bg-card rounded-t-2xl border-t border-border max-w-[480px] mx-auto max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border flex-shrink-0">
          <div className="flex items-center justify-between">
            <h2 className="font-medium flex items-center gap-2">
              <Dumbbell className="w-5 h-5" />
              {editingExercise ? 'Editar Ejercicio' : 'Crear Ejercicio'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 -mr-2 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 p-4 space-y-4">
          {/* Exercise name */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Nombre del ejercicio <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="ej. Sentadilla Búlgara"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              className="w-full px-3 py-2.5 bg-input rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-sm font-medium mb-2 block">Categoría</label>
            {!showNewCategory ? (
              <div className="space-y-2">
                <div className="relative">
                  <select
                    value={blockType}
                    onChange={(e) => setBlockType(e.target.value)}
                    className="w-full appearance-none px-3 py-2.5 pr-10 bg-input rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  >
                    {exerciseCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
                <button
                  onClick={() => setShowNewCategory(true)}
                  className="w-full py-2 px-3 rounded-xl border border-dashed border-border text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Nueva categoría
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Nombre de la nueva categoría..."
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
                  autoFocus
                  className="w-full px-3 py-2.5 bg-input rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setShowNewCategory(false);
                      setNewCategoryName('');
                    }}
                    className="flex-1 py-2 bg-muted rounded-lg text-sm hover:bg-muted/80 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleAddCategory}
                    disabled={!newCategoryName.trim()}
                    className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Agregar
                  </button>
                </div>
              </div>
            )}
            {knownConfig && !showNewCategory && (
              <div className="mt-2">
                <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${knownConfig.bgColor}`}>
                  <span className={`text-xs ${knownConfig.color}`}>{knownConfig.label}</span>
                </div>
              </div>
            )}
          </div>

          {/* Video URL */}
          <div>
            <label className="text-sm font-medium mb-2 flex items-center gap-1.5">
              <Video className="w-4 h-4" />
              URL de video (opcional)
            </label>
            <input
              type="url"
              placeholder="https://youtube.com/watch?v=..."
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="w-full px-3 py-2.5 bg-input rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            />
            <p className="text-xs text-muted-foreground mt-1.5">
              YouTube, Vimeo, o cualquier URL de video
            </p>
          </div>

          {/* Notes */}
          <div>
            <label className="text-sm font-medium mb-2 flex items-center gap-1.5">
              <FileText className="w-4 h-4" />
              Notas (opcional)
            </label>
            <textarea
              placeholder="Descripción de la técnica, grupos musculares involucrados, variaciones..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="w-full px-3 py-2.5 bg-input rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border flex gap-2 flex-shrink-0">
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-muted rounded-xl text-sm hover:bg-muted/80 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={!name.trim()}
            className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl text-sm hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {editingExercise ? 'Guardar Cambios' : 'Crear Ejercicio'}
          </button>
        </div>
      </div>
    </div>
  );
}
