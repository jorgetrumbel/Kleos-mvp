import { useState } from 'react';
import { Dumbbell, Timer, Zap, Play, CheckCircle2, ChevronRight, Star } from 'lucide-react';
import type { CompletedSession } from '../AthleteView';
import type { WorkoutInfo } from './WorkoutScreen';

const EXERCISES = [
  {
    id: 1,
    name: 'Intervalos de Velocidad',
    category: 'Resistencia',
    duration: '45 min',
    difficulty: 'Intermedio',
    completed: false,
    description: '8x400m a ritmo de 5k con 2 min de recuperación',
    stages: [
      'Calentamiento: 15 min trote suave',
      '8 repeticiones de 400m a ritmo intenso',
      '2 minutos de recuperación activa entre series',
      'Enfriamiento: 10 min trote suave',
    ],
  },
  {
    id: 2,
    name: 'Entrenamiento de Fuerza',
    category: 'Fuerza',
    duration: '60 min',
    difficulty: 'Avanzado',
    completed: false,
    description: 'Circuito de fuerza para corredores',
    stages: [
      'Sentadillas: 3x12 reps',
      'Peso muerto: 3x10 reps',
      'Plancha: 3x60 segundos',
      'Estocadas: 3x10 por pierna',
    ],
  },
  {
    id: 3,
    name: 'Trail Running',
    category: 'Resistencia',
    duration: '90 min',
    difficulty: 'Avanzado',
    completed: true,
    description: 'Carrera larga en montaña con desnivel positivo',
    stages: [
      'Ruta: Cerro San Cristóbal',
      'Mantener ritmo aeróbico',
      'Hidratación cada 20 minutos',
      'No forzar en las subidas',
    ],
  },
];

interface AthletePlanProps {
  onStartWorkout: (info: WorkoutInfo) => void;
  unscoredSessions: CompletedSession[];
  onOpenRPE: (session: CompletedSession) => void;
}

export default function AthletePlan({ onStartWorkout, unscoredSessions, onOpenRPE }: AthletePlanProps) {
  const [exercises, setExercises] = useState(EXERCISES);

  const pending = exercises.filter(e => !e.completed);
  const completed = exercises.filter(e => e.completed);

  const handleStart = (ex: typeof EXERCISES[0]) => {
    onStartWorkout({
      id: `plan-${ex.id}`,
      name: ex.name,
      category: ex.category,
      stages: ex.stages,
    });
  };

  // Find unscored session that matches a completed exercise by name
  const getUnscoredForExercise = (name: string) =>
    unscoredSessions.find(s => s.name === name);

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="p-3 sm:p-4 border-b border-border sticky top-0 bg-background z-10">
        <h1 className="text-xl sm:text-2xl mb-1 sm:mb-2">Plan de Entrenamiento</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Ejercicios asignados por tu entrenador</p>
      </div>

      {/* Unscored sessions banner */}
      {unscoredSessions.length > 0 && (
        <div className="mx-3 mt-3 bg-amber-500/10 border border-amber-500/30 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 text-amber-400 shrink-0" />
            <p className="text-sm text-amber-300">
              {unscoredSessions.length === 1
                ? '1 sesión sin puntuar'
                : `${unscoredSessions.length} sesiones sin puntuar`}
            </p>
          </div>
          <div className="space-y-1.5">
            {unscoredSessions.map(s => (
              <button
                key={s.id}
                onClick={() => onOpenRPE(s)}
                className="w-full flex items-center justify-between bg-card/60 rounded-lg px-3 py-2 hover:bg-card transition-colors"
              >
                <p className="text-xs truncate text-left">{s.name} · {s.date}</p>
                <span className="text-xs text-amber-400 shrink-0 ml-2">Puntuar →</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="p-3 sm:p-4">
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <div className="bg-card rounded-lg sm:rounded-xl p-2.5 sm:p-3 border border-border text-center">
            <p className="text-xl sm:text-2xl mb-0.5 sm:mb-1">{exercises.length}</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground">Asignados</p>
          </div>
          <div className="bg-card rounded-lg sm:rounded-xl p-2.5 sm:p-3 border border-border text-center">
            <p className="text-xl sm:text-2xl mb-0.5 sm:mb-1">{completed.length}</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground">Completados</p>
          </div>
          <div className="bg-card rounded-lg sm:rounded-xl p-2.5 sm:p-3 border border-border text-center">
            <p className="text-xl sm:text-2xl mb-0.5 sm:mb-1">{pending.length}</p>
            <p className="text-[10px] sm:text-xs text-muted-foreground">Pendientes</p>
          </div>
        </div>
      </div>

      <div className="px-3 sm:px-4 space-y-6">
        {/* Pending */}
        <div>
          <h3 className="mb-3">Pendientes</h3>
          <div className="space-y-3">
            {pending.map(exercise => (
              <div key={exercise.id} className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-primary/20 shrink-0">
                      {exercise.category === 'Fuerza'
                        ? <Dumbbell className="w-5 h-5 text-primary" />
                        : exercise.category === 'Resistencia'
                        ? <Zap className="w-5 h-5 text-primary" />
                        : <Timer className="w-5 h-5 text-primary" />
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium mb-1">{exercise.name}</p>
                      <p className="text-sm text-muted-foreground mb-2">{exercise.description}</p>
                      <div className="flex flex-wrap items-center gap-2 text-sm">
                        <span className="px-2 py-1 bg-muted rounded text-xs">{exercise.category}</span>
                        <span className="text-muted-foreground text-xs">{exercise.duration}</span>
                        <span className="text-muted-foreground text-xs">{exercise.difficulty}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3 mb-3">
                    <p className="text-sm font-medium mb-2">Instrucciones:</p>
                    <ul className="space-y-1">
                      {exercise.stages.map((s, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary shrink-0">•</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleStart(exercise)}
                      className="flex-1 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                    >
                      <Play className="w-4 h-4" />
                      Iniciar
                    </button>
                    <button className="px-4 py-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Completed */}
        <div>
          <h3 className="mb-3">Completados</h3>
          <div className="space-y-3">
            {completed.map(exercise => {
              const unscored = getUnscoredForExercise(exercise.name);
              return (
                <div key={exercise.id} className="bg-card rounded-xl border border-border overflow-hidden">
                  <div className={`p-4 ${!unscored ? 'opacity-75' : ''}`}>
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/20 shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium mb-1">{exercise.name}</p>
                        <p className="text-sm text-muted-foreground mb-2">{exercise.description}</p>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-muted rounded text-xs">{exercise.category}</span>
                          <span className="text-muted-foreground text-xs">{exercise.duration}</span>
                        </div>
                      </div>
                    </div>
                    {unscored && (
                      <button
                        onClick={() => onOpenRPE(unscored)}
                        className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-sm text-amber-300 hover:bg-amber-500/20 transition-colors"
                      >
                        <Star className="w-4 h-4" />
                        Puntuar esfuerzo (RPE)
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
