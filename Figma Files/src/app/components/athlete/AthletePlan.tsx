import { useState } from 'react';
import { Dumbbell, Timer, Zap, Play, Clock, AlertCircle, ChevronRight, Star } from 'lucide-react';
import type { CompletedSession } from '../AthleteView';
import type { WorkoutInfo } from './WorkoutScreen';
import WorkoutDetailsModal from './WorkoutDetailsModal';

const EXERCISES = [
  {
    id: 1,
    name: 'Intervalos de Velocidad',
    category: 'Resistencia',
    duration: '45 min',
    difficulty: 'Intermedio',
    completed: false,
    date: '',
    time: '',
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
    date: '',
    time: '',
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
    date: '2026-05-10',
    time: '06:30',
    description: 'Carrera larga en montaña con desnivel positivo',
    stages: [
      'Ruta: Cerro San Cristóbal',
      'Mantener ritmo aeróbico',
      'Hidratación cada 20 minutos',
      'No forzar en las subidas',
    ],
    metrics: {
      duration: '1h 30m',
      avgHeartRate: 155,
      maxHeartRate: 172,
      calories: 850,
      distance: '14.2 km',
      pace: '6:20 min/km',
    },
    // No rpe (unscored)
  },
  {
    id: 4,
    name: 'Intervalos',
    category: 'Resistencia',
    duration: '75 min',
    difficulty: 'Intermedio',
    completed: true,
    date: '2026-05-08',
    time: '18:00',
    description: '8x400m a ritmo de 5k con 2 min de recuperación',
    stages: [
      'Calentamiento 15 min',
      '8x400m a ritmo intenso',
      'Recuperación 2 min entre series',
      'Enfriamiento 10 min',
    ],
    metrics: {
      duration: '1h 15m',
      avgHeartRate: 165,
      maxHeartRate: 182,
      calories: 720,
      distance: '12.5 km',
      pace: '5:20 min/km',
    },
    rpe: 8,
    feedback: 'Excelente sesión, mantuviste muy bien el ritmo en los intervalos.',
  },
  {
    id: 5,
    name: 'Core y Estabilidad',
    category: 'Fuerza',
    duration: '45 min',
    difficulty: 'Básico',
    completed: true,
    date: '2026-05-09',
    time: '07:00',
    description: 'Sesión de core para mejorar la postura y estabilidad',
    stages: [
      'Plancha 3x60s',
      'Abdominales 3x20',
      'Superman 3x15',
      'Dead bug 3x12',
    ],
    metrics: {
      duration: '45m',
      avgHeartRate: 125,
      maxHeartRate: 145,
      calories: 280,
    },
    rpe: 6,
    feedback: 'Buena forma en los ejercicios. Recuerda mantener el core activado.',
  },
];

type Exercise = typeof EXERCISES[0];

interface AthletePlanProps {
  onStartWorkout: (info: WorkoutInfo) => void;
  unscoredSessions: CompletedSession[];
  onOpenRPE: (session: CompletedSession) => void;
}

export default function AthletePlan({ onStartWorkout, unscoredSessions, onOpenRPE }: AthletePlanProps) {
  const [selectedWorkout, setSelectedWorkout] = useState<Exercise | null>(null);

  const pending = EXERCISES.filter(e => !e.completed);
  const completed = EXERCISES.filter(e => e.completed);

  const handleStart = (ex: Exercise) => {
    onStartWorkout({
      id: `plan-${ex.id}`,
      name: ex.name,
      category: ex.category,
      stages: ex.stages,
    });
  };

  const handleCompletedClick = (exercise: Exercise) => {
    if (!exercise.rpe) {
      const session = unscoredSessions.find(s => s.name === exercise.name) ?? {
        id: `plan-${exercise.id}`,
        name: exercise.name,
        date: exercise.date,
        durationSec: 0,
        scored: false,
      };
      onOpenRPE(session);
      return;
    }
    setSelectedWorkout(exercise);
  };

  const handleOpenRPEFromModal = () => {
    if (selectedWorkout) {
      const session = unscoredSessions.find(s => s.name === selectedWorkout.name) ?? {
        id: `plan-${selectedWorkout.id}`,
        name: selectedWorkout.name,
        date: selectedWorkout.date,
        durationSec: 0,
        scored: false,
      };
      onOpenRPE(session);
      setSelectedWorkout(null);
    }
  };

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
            <p className="text-xl sm:text-2xl mb-0.5 sm:mb-1">{EXERCISES.length}</p>
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
            {completed.map(exercise => (
              <button
                key={exercise.id}
                onClick={() => handleCompletedClick(exercise)}
                className="w-full bg-card rounded-xl p-4 border border-border hover:bg-muted/30 transition-colors text-left"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg shrink-0 bg-green-500/20">
                    <Clock className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium mb-1">{exercise.name}</p>
                      {!exercise.rpe && (
                        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {exercise.time} · {exercise.category} · Completado
                      {exercise.rpe && <span className="ml-2 text-green-400">RPE {exercise.rpe}</span>}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Workout Details Modal */}
      {selectedWorkout && (
        <WorkoutDetailsModal
          workout={{
            id: selectedWorkout.id,
            date: selectedWorkout.date,
            time: selectedWorkout.time,
            title: selectedWorkout.name,
            type: selectedWorkout.category,
            stages: selectedWorkout.stages,
            completed: selectedWorkout.completed,
            metrics: selectedWorkout.metrics,
            rpe: selectedWorkout.rpe,
            feedback: selectedWorkout.feedback,
          }}
          onClose={() => setSelectedWorkout(null)}
          onOpenRPE={selectedWorkout.completed && !selectedWorkout.rpe ? handleOpenRPEFromModal : undefined}
        />
      )}
    </div>
  );
}
