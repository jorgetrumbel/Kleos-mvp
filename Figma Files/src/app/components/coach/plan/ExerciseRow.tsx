import { useState, useRef, useEffect } from 'react';
import { Video, MessageSquare, Trash2, ChevronDown, Plus, PlayCircle, X } from 'lucide-react';
import { ExerciseData, BlockType, BLOCK_TYPE_CONFIG } from './types';
import { exerciseDatabase, ExerciseTemplate } from './exerciseDatabase';
import { VideoPlayer } from './VideoPlayer';

interface ExerciseRowProps {
  exercise: ExerciseData;
  blockType: BlockType;
  onChange: (exercise: ExerciseData) => void;
  onDelete: () => void;
}

export function ExerciseRow({ exercise, blockType, onChange, onDelete }: ExerciseRowProps) {
  const config = BLOCK_TYPE_CONFIG[blockType];
  const [showNotes, setShowNotes] = useState(!!exercise.notes);
  const [showVideo, setShowVideo] = useState(false);
  const [showSelector, setShowSelector] = useState(false);
  const [search, setSearch] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newName, setNewName] = useState('');
  const selectorRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showSelector && searchRef.current) {
      searchRef.current.focus();
    }
  }, [showSelector]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectorRef.current && !selectorRef.current.contains(e.target as Node)) {
        setShowSelector(false);
        setIsAddingNew(false);
        setSearch('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const exercises = exerciseDatabase[blockType] || [];
  const filtered = exercises.filter((ex) =>
    ex.name.toLowerCase().includes(search.toLowerCase())
  );

  const selectExercise = (template: ExerciseTemplate) => {
    onChange({
      ...exercise,
      name: template.name,
      sets: template.defaultSets !== undefined ? template.defaultSets : exercise.sets,
      reps: template.defaultReps !== undefined ? template.defaultReps : exercise.reps,
      duration: template.defaultDuration !== undefined ? template.defaultDuration : exercise.duration,
      intensity: template.defaultIntensity !== undefined ? template.defaultIntensity : exercise.intensity,
    });
    setShowSelector(false);
    setSearch('');
  };

  const addCustomExercise = () => {
    const name = newName.trim() || search.trim();
    if (!name) return;
    onChange({ ...exercise, name });
    setShowSelector(false);
    setIsAddingNew(false);
    setNewName('');
    setSearch('');
  };

  const fieldLabel: Record<string, string> = {
    sets: 'Series',
    reps: 'Reps',
    duration: 'Duración',
    intensity: 'Intensidad',
  };

  const fieldValue: Record<string, string> = {
    sets: exercise.sets || '',
    reps: exercise.reps || '',
    duration: exercise.duration || '',
    intensity: exercise.intensity || '',
  };

  const fieldPlaceholder: Record<string, string> = {
    sets: 'ej. 3',
    reps: 'ej. 10',
    duration: 'ej. 30 min',
    intensity: 'ej. RPE 7',
  };

  const updateField = (field: string, value: string) => {
    onChange({ ...exercise, [field]: value });
  };

  return (
    <div className="border border-border/60 rounded-lg p-3 space-y-2.5 bg-background/20">
      {/* Exercise name selector */}
      <div className="relative" ref={selectorRef}>
        <button
          onClick={() => setShowSelector(!showSelector)}
          className="w-full flex items-center justify-between px-3 py-2.5 bg-input rounded-lg border border-border text-sm text-left hover:border-primary/50 transition-colors"
        >
          <span className={exercise.name ? 'text-foreground' : 'text-muted-foreground'}>
            {exercise.name || 'Seleccionar ejercicio...'}
          </span>
          <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0 ml-2" />
        </button>

        {showSelector && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl z-30 shadow-2xl overflow-hidden flex flex-col max-h-56">
            <div className="p-2 border-b border-border flex-shrink-0">
              <input
                ref={searchRef}
                type="text"
                placeholder="Buscar ejercicio..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-3 py-1.5 bg-input rounded-lg border border-border text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="overflow-y-auto flex-1">
              {filtered.map((ex) => (
                <button
                  key={ex.name}
                  onClick={() => selectExercise(ex)}
                  className="w-full text-left px-3 py-2.5 text-sm hover:bg-muted transition-colors border-b border-border/30 last:border-0"
                >
                  {ex.name}
                </button>
              ))}
              {filtered.length === 0 && !isAddingNew && (
                <div className="px-3 py-4 text-center">
                  <p className="text-xs text-muted-foreground mb-2">No encontrado</p>
                  <button
                    onClick={() => setIsAddingNew(true)}
                    className="text-sm text-primary flex items-center gap-1 mx-auto"
                  >
                    <Plus className="w-4 h-4" />
                    Agregar "{search}"
                  </button>
                </div>
              )}
              {isAddingNew && (
                <div className="p-2 space-y-2">
                  <input
                    autoFocus
                    type="text"
                    placeholder="Nombre del ejercicio"
                    value={newName || search}
                    onChange={(e) => setNewName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addCustomExercise()}
                    className="w-full px-3 py-1.5 bg-input rounded-lg border border-border text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsAddingNew(false)}
                      className="flex-1 py-1.5 text-sm bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={addCustomExercise}
                      className="flex-1 py-1.5 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Dynamic fields */}
      {exercise.name && (
        <div className={`grid gap-2 ${config.fields.length === 4 ? 'grid-cols-2' : config.fields.length >= 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {config.fields.map((field) => (
            <div key={field}>
              <label className="text-xs text-muted-foreground mb-0.5 block">
                {fieldLabel[field]}
              </label>
              <input
                type="text"
                placeholder={fieldPlaceholder[field]}
                value={fieldValue[field]}
                onChange={(e) => updateField(field, e.target.value)}
                className="w-full px-2.5 py-1.5 bg-input rounded-lg border border-border text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          ))}
        </div>
      )}

      {/* Notes */}
      {showNotes && (
        <textarea
          placeholder="Indicaciones de forma, progresión, descanso..."
          value={exercise.notes}
          onChange={(e) => onChange({ ...exercise, notes: e.target.value })}
          rows={2}
          className="w-full px-3 py-2 bg-input rounded-lg border border-border text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none"
        />
      )}

      {/* Video preview */}
      {exercise.videoUrl && (
        <div className="flex items-center gap-2 px-2.5 py-1.5 bg-muted rounded-lg">
          <PlayCircle className="w-4 h-4 text-primary flex-shrink-0" />
          <span className="text-xs text-muted-foreground flex-1 truncate">Video adjunto</span>
          <button
            onClick={() => onChange({ ...exercise, videoUrl: undefined })}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Action row */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => setShowVideo(true)}
          className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg transition-colors ${
            exercise.videoUrl
              ? 'text-primary bg-primary/10'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
          }`}
        >
          <Video className="w-3.5 h-3.5" /> Video
        </button>
        <button
          onClick={() => setShowNotes(!showNotes)}
          className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg transition-colors ${
            showNotes || exercise.notes
              ? 'text-primary bg-primary/10'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" /> Nota
        </button>
        <button
          onClick={onDelete}
          className="ml-auto p-1.5 text-muted-foreground hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/10"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {showVideo && (
        <VideoPlayer
          initialUrl={exercise.videoUrl}
          onSave={(url) => onChange({ ...exercise, videoUrl: url })}
          onClose={() => setShowVideo(false)}
        />
      )}
    </div>
  );
}
