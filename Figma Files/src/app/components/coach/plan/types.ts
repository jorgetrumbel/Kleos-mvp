export type BlockType =
  | 'Cardio'
  | 'Halterofilia'
  | 'Flexibilidad'
  | 'Deporte Específico'
  | 'Recuperación'
  | 'Otro';

export interface ExerciseData {
  id: string;
  name: string;
  sets?: string;
  reps?: string;
  duration?: string;
  intensity?: string;
  notes: string;
  videoUrl?: string;
}

export interface Block {
  id: string;
  name: string;
  type: BlockType;
  exercises: ExerciseData[];
  comments: string;
  collapsed: boolean;
}

export interface AttachedFile {
  id: string;
  name: string;
  kind: 'file' | 'drawing';
  dataUrl?: string;
  fileType?: string;
}

export interface WorkoutPlan {
  planName: string;
  planNotes: string;
  blocks: Block[];
  files: AttachedFile[];
}

export interface WorkoutAssignment {
  id: string;
  planId: string;
  athleteIds: string[];
  startDate: Date;
  frequency: 'once' | 'weekly' | 'daily' | 'custom';
  customDays?: number[];
  notes?: string;
}

export interface CustomExercise {
  id: string;
  name: string;
  videoUrl?: string;
  notes?: string;
  blockType: string;
  isDefault: boolean;
  createdBy?: string;
  createdAt: Date;
}

export const DEFAULT_EXERCISE_CATEGORIES: string[] = [
  'Cardio',
  'Halterofilia',
  'Flexibilidad',
  'Deporte Específico',
  'Recuperación',
  'Otro',
];

export interface SavedPlan {
  id: string;
  plan: WorkoutPlan;
  planType: 'single' | 'group';
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

export const DEFAULT_PLAN_CATEGORIES: string[] = [
  'Entrenamiento Base',
  'Fase de Construcción',
  'Pico / Preparación Carrera',
  'Semana de Recuperación',
  'Entrenamiento de Fuerza',
  'Otro',
];

export const BLOCK_TYPES: BlockType[] = [
  'Cardio',
  'Halterofilia',
  'Flexibilidad',
  'Deporte Específico',
  'Recuperación',
  'Otro',
];

export interface BlockTypeConfig {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  fields: Array<'sets' | 'reps' | 'duration' | 'intensity'>;
}

export const BLOCK_TYPE_CONFIG: Record<BlockType, BlockTypeConfig> = {
  Cardio: {
    label: 'Cardio',
    color: 'text-red-400',
    bgColor: 'bg-red-500/20',
    borderColor: 'border-red-500/40',
    fields: ['duration', 'intensity'],
  },
  Halterofilia: {
    label: 'Halterofilia',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    borderColor: 'border-blue-500/40',
    fields: ['sets', 'reps', 'intensity'],
  },
  Flexibilidad: {
    label: 'Flexibilidad',
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
    borderColor: 'border-green-500/40',
    fields: ['duration', 'intensity'],
  },
  'Deporte Específico': {
    label: 'Dep. Específico',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/20',
    borderColor: 'border-purple-500/40',
    fields: ['sets', 'reps', 'duration', 'intensity'],
  },
  Recuperación: {
    label: 'Recuperación',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20',
    borderColor: 'border-yellow-500/40',
    fields: ['duration', 'intensity'],
  },
  Otro: {
    label: 'Otro',
    color: 'text-gray-400',
    bgColor: 'bg-gray-500/20',
    borderColor: 'border-gray-500/40',
    fields: ['sets', 'reps', 'duration', 'intensity'],
  },
};
