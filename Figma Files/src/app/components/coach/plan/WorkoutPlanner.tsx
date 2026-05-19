import { useState, useRef } from 'react';
import {
  ArrowLeft,
  Save,
  Plus,
  FileText,
  Paperclip,
  X,
  ChevronDown,
  ChevronUp,
  Pen,
  Image,
  Users,
  User,
} from 'lucide-react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { SavedPlan, WorkoutPlan, Block, AttachedFile, BLOCK_TYPE_CONFIG, CustomExercise } from './types';
import { WorkoutBlock } from './WorkoutBlock';
import { DrawingBoard } from './DrawingBoard';

interface WorkoutPlannerProps {
  editingPlan: SavedPlan;
  onSave: (plan: SavedPlan) => void;
  onBack: () => void;
  onCreateExercise?: (exercise: CustomExercise) => void;
  exerciseCategories: string[];
  onSetExerciseCategories: (categories: string[]) => void;
}

export function WorkoutPlanner({ editingPlan, onSave, onBack, onCreateExercise, exerciseCategories, onSetExerciseCategories }: WorkoutPlannerProps) {
  const [planName, setPlanName] = useState(editingPlan.plan.planName);
  const [planNotes, setPlanNotes] = useState(editingPlan.plan.planNotes);
  const [blocks, setBlocks] = useState<Block[]>(editingPlan.plan.blocks);
  const [files, setFiles] = useState<AttachedFile[]>(editingPlan.plan.files);
  const [showNotes, setShowNotes] = useState(!!editingPlan.plan.planNotes);
  const [showFiles, setShowFiles] = useState(editingPlan.plan.files.length > 0);
  const [showDrawingBoard, setShowDrawingBoard] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const planType = editingPlan.planType;
  const category = editingPlan.category;

  const addBlock = () => {
    const newBlock: Block = {
      id: crypto.randomUUID(),
      name: '',
      type: 'Cardio',
      exercises: [],
      comments: '',
      collapsed: false,
    };
    setBlocks((prev) => [...prev, newBlock]);
  };

  const updateBlock = (i: number, block: Block) => {
    setBlocks((prev) => prev.map((b, idx) => (idx === i ? block : b)));
  };

  const deleteBlock = (i: number) => {
    setBlocks((prev) => prev.filter((_, idx) => idx !== i));
  };

  const moveBlock = (from: number, to: number) => {
    setBlocks((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(from, 1);
      updated.splice(to, 0, moved);
      return updated;
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const newFile: AttachedFile = {
        id: crypto.randomUUID(),
        name: file.name,
        kind: 'file',
        dataUrl: ev.target?.result as string,
        fileType: file.type,
      };
      setFiles((prev) => [...prev, newFile]);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleDrawingSave = (dataUrl: string, fileName: string) => {
    const newFile: AttachedFile = {
      id: crypto.randomUUID(),
      name: fileName,
      kind: 'drawing',
      dataUrl,
    };
    setFiles((prev) => [...prev, newFile]);
    setShowDrawingBoard(false);
  };

  const handleSave = () => {
    const plan: WorkoutPlan = {
      planName: planName.trim() || 'Plan sin nombre',
      planNotes,
      blocks,
      files,
    };
    onSave({
      ...editingPlan,
      plan,
      updatedAt: new Date(),
    });
  };

  const typeConfig = {
    single: { label: 'Individual', color: 'text-cyan-400 bg-cyan-500/20', Icon: User },
    group: { label: 'Grupo', color: 'text-purple-400 bg-purple-500/20', Icon: Users },
  };
  const typeInfo = typeConfig[planType];

  const totalExercises = blocks.reduce((sum, b) => sum + b.exercises.filter((e) => e.name).length, 0);

  return (
    <DndProvider backend={HTML5Backend}>
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
            <input
              type="text"
              placeholder="Nombre del plan..."
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              className="flex-1 bg-transparent placeholder:text-muted-foreground focus:outline-none min-w-0 text-base"
            />
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors flex-shrink-0"
            >
              <Save className="w-4 h-4" /> Guardar
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${typeInfo.color}`}>
              <typeInfo.Icon className="w-3 h-3" />
              {typeInfo.label}
            </span>
            <span className="text-xs text-muted-foreground">{category}</span>
            {blocks.length > 0 && (
              <span className="text-xs text-muted-foreground ml-auto">
                {blocks.length} bloques · {totalExercises} ejercicios
              </span>
            )}
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-3 space-y-3 pb-8">
            {/* Plan notes section */}
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <button
                onClick={() => setShowNotes(!showNotes)}
                className="w-full flex items-center justify-between p-3 hover:bg-muted/20 transition-colors"
              >
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <span className={planNotes ? 'text-foreground' : 'text-muted-foreground'}>
                    {planNotes ? 'Notas del plan' : 'Agregar notas del plan'}
                  </span>
                </div>
                {showNotes ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                )}
              </button>
              {showNotes && (
                <div className="px-3 pb-3">
                  <textarea
                    placeholder="Descripción general, objetivos, instrucciones especiales..."
                    value={planNotes}
                    onChange={(e) => setPlanNotes(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 bg-input rounded-lg border border-border text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                  />
                </div>
              )}
            </div>

            {/* File attachments section */}
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <button
                onClick={() => setShowFiles(!showFiles)}
                className="w-full flex items-center justify-between p-3 hover:bg-muted/20 transition-colors"
              >
                <div className="flex items-center gap-2 text-sm">
                  <Paperclip className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Archivos adjuntos{files.length > 0 ? ` (${files.length})` : ''}
                  </span>
                </div>
                {showFiles ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                )}
              </button>
              {showFiles && (
                <div className="px-3 pb-3 space-y-2">
                  {files.map((f) => (
                    <div key={f.id} className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                      {f.kind === 'drawing' ? (
                        <Image className="w-4 h-4 text-primary flex-shrink-0" />
                      ) : (
                        <Paperclip className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      )}
                      {f.kind === 'drawing' && f.dataUrl && (
                        <img
                          src={f.dataUrl}
                          alt={f.name}
                          className="w-10 h-7 object-cover rounded flex-shrink-0"
                        />
                      )}
                      <span className="text-xs flex-1 truncate">{f.name}</span>
                      <button
                        onClick={() => setFiles((prev) => prev.filter((file) => file.id !== f.id))}
                        className="text-muted-foreground hover:text-red-400 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex-1 py-2.5 border border-dashed border-border rounded-lg text-xs text-muted-foreground hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-1"
                    >
                      <Paperclip className="w-3.5 h-3.5" /> Adjuntar archivo
                    </button>
                    <button
                      onClick={() => setShowDrawingBoard(true)}
                      className="flex-1 py-2.5 border border-dashed border-border rounded-lg text-xs text-muted-foreground hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-1"
                    >
                      <Pen className="w-3.5 h-3.5" /> Pizarra
                    </button>
                  </div>
                  <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileUpload} />
                </div>
              )}
            </div>

            {/* Workout blocks */}
            {blocks.length > 0 && (
              <div className="space-y-3">
                {blocks.map((block, i) => (
                  <WorkoutBlock
                    key={block.id}
                    block={block}
                    index={i}
                    onUpdate={(b) => updateBlock(i, b)}
                    onDelete={() => deleteBlock(i)}
                    onMove={moveBlock}
                    onCreateExercise={onCreateExercise}
                    exerciseCategories={exerciseCategories}
                    onAddExerciseCategory={(cat) => onSetExerciseCategories([...exerciseCategories, cat])}
                  />
                ))}
              </div>
            )}

            {/* Add block button */}
            <button
              onClick={addBlock}
              className="w-full py-4 border-2 border-dashed border-border rounded-xl text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" /> Agregar Bloque de Entrenamiento
            </button>

            {/* Block type legend */}
            {blocks.length === 0 && (
              <div className="grid grid-cols-3 gap-2 mt-2">
                {Object.entries(BLOCK_TYPE_CONFIG).map(([type, cfg]) => (
                  <div
                    key={type}
                    className={`px-2 py-1.5 rounded-lg ${cfg.bgColor} text-center`}
                  >
                    <span className={`text-xs ${cfg.color}`}>{cfg.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {showDrawingBoard && (
          <DrawingBoard onSave={handleDrawingSave} onClose={() => setShowDrawingBoard(false)} />
        )}
      </div>
    </DndProvider>
  );
}
