import { useState } from 'react';
import { TrendingUp, Clock, Zap, ChevronRight, Trophy, Target, AlertCircle, CheckCircle, Clock3, Play, Star } from 'lucide-react';
import { LineChart, Line, XAxis, ResponsiveContainer } from 'recharts';
import type { ActiveWorkout, CompletedSession } from '../AthleteView';
import type { WorkoutInfo } from './WorkoutScreen';
import WorkoutDetailsModal from './WorkoutDetailsModal';

const mockChartData = [
  { day: 'L', value: 8 },
  { day: 'M', value: 12 },
  { day: 'M', value: 10 },
  { day: 'J', value: 14 },
  { day: 'V', value: 11 },
  { day: 'S', value: 15 },
  { day: 'D', value: 9 },
];

const upcomingTrainings = [
  {
    id: 1,
    date: '2026-05-12',
    time: 'Hoy 18:00',
    title: 'Intervalos de Velocidad',
    type: 'Resistencia',
    stages: ['Calentamiento 15 min', '8x400m a ritmo intenso', 'Recuperación 2 min entre series', 'Enfriamiento 10 min'],
    completed: false,
  },
  {
    id: 2,
    date: '2026-05-13',
    time: 'Mañana 07:00',
    title: 'Fuerza',
    type: 'Fuerza',
    stages: ['Sentadillas 3x12', 'Peso muerto 3x10', 'Plancha 3x60s', 'Estocadas 3x10'],
    completed: false,
  },
  {
    id: 3,
    date: '2026-05-14',
    time: 'Miércoles 06:30',
    title: 'Trail Running',
    type: 'Resistencia',
    stages: ['Calentamiento 10 min', 'Subida Cerro San Cristóbal', 'Ritmo aeróbico constante', 'Bajada técnica'],
    completed: false,
  },
];

// Past completed workouts with full details
const completedWorkoutsDetails = [
  {
    id: 100,
    date: '2026-05-10',
    time: '18:00',
    title: 'Técnica de Carrera',
    type: 'Técnica',
    stages: ['Drills 20 min', 'Técnica de pisada', 'Aceleraciones progresivas', 'Enfriamiento'],
    completed: true,
    metrics: {
      duration: '1h 30m',
      avgHeartRate: 142,
      maxHeartRate: 168,
      calories: 620,
      distance: '8.2 km',
    },
    // No RPE, no feedback (unscored)
  },
  {
    id: 101,
    date: '2026-05-10',
    time: '06:30',
    title: 'Trail Running',
    type: 'Resistencia',
    stages: ['Calentamiento 10 min', 'Subida Cerro San Cristóbal', 'Ritmo aeróbico constante', 'Bajada técnica'],
    completed: true,
    metrics: {
      duration: '1h 30m',
      avgHeartRate: 155,
      maxHeartRate: 172,
      calories: 850,
      distance: '14.2 km',
      pace: '6:20 min/km',
    },
    // No RPE (the pre-existing unscored one)
  },
];

function formatDuration(sec: number) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

function formatElapsed(workout: ActiveWorkout) {
  const now = Date.now();
  const extra = workout.isPaused && workout.pausedAt ? 0 : 0;
  const sec = Math.floor((now - workout.startedAt - workout.pausedMs) / 1000);
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

interface AthleteHomeProps {
  hasDuePayment: boolean;
  paymentInReview: boolean;
  paymentApproved: boolean;
  onOpenPayment: () => void;
  activeWorkout: ActiveWorkout | null;
  onContinueWorkout: () => void;
  unscoredSessions: CompletedSession[];
  onOpenRPE: (session: CompletedSession) => void;
  onStartWorkout: (info: WorkoutInfo) => void;
}

export default function AthleteHome({
  hasDuePayment, paymentInReview, paymentApproved, onOpenPayment,
  activeWorkout, onContinueWorkout,
  unscoredSessions, onOpenRPE,
  onStartWorkout,
}: AthleteHomeProps) {
  const [selectedWorkout, setSelectedWorkout] = useState<typeof upcomingTrainings[0] | typeof completedWorkoutsDetails[0] | null>(null);

  const handleStartFromModal = () => {
    if (selectedWorkout && !selectedWorkout.completed) {
      onStartWorkout({
        id: `w-${selectedWorkout.id}`,
        name: selectedWorkout.title,
        category: selectedWorkout.type,
        stages: selectedWorkout.stages,
      });
      setSelectedWorkout(null);
    }
  };

  const handleOpenRPEForWorkout = () => {
    if (selectedWorkout && selectedWorkout.completed) {
      const session = unscoredSessions.find(s => s.name === selectedWorkout.title);
      if (session) {
        onOpenRPE(session);
        setSelectedWorkout(null);
      }
    }
  };

  const handleUnscoredClick = (session: CompletedSession) => {
    // Find the full workout details
    const workoutDetails = completedWorkoutsDetails.find(w => w.title === session.name);
    if (workoutDetails) {
      setSelectedWorkout(workoutDetails);
    } else {
      // Fallback to just opening RPE modal
      onOpenRPE(session);
    }
  };

  return (
    <div className="p-3 sm:p-4 space-y-3 sm:space-y-4 pb-20">
      {/* Header */}
      <div className="flex items-center gap-2 sm:gap-3 mb-2">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary flex items-center justify-center">
          <span className="text-primary-foreground text-sm sm:text-base">M</span>
        </div>
        <div>
          <p className="text-xs sm:text-sm text-muted-foreground">Hola, María 👋</p>
          <h1 className="text-lg sm:text-xl">¡Listo para entrenar!</h1>
        </div>
      </div>

      {/* ── Active workout alert ── */}
      {activeWorkout && (
        <div className="bg-primary/10 border border-primary/40 rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-primary truncate">
                {activeWorkout.isPaused ? '⏸ Entrenamiento pausado' : '▶ Entrenamiento en curso'}
              </p>
              <p className="text-xs text-muted-foreground truncate">{activeWorkout.info.name}</p>
            </div>
            <span className="text-primary font-mono text-sm shrink-0">
              {formatElapsed(activeWorkout)}
            </span>
          </div>
          <button
            onClick={onContinueWorkout}
            className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-xl text-sm font-medium"
          >
            <Play className="w-4 h-4" />
            Volver al entrenamiento
          </button>
        </div>
      )}

      {/* ── Unscored sessions alert ── */}
      {unscoredSessions.length > 0 && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
              <Star className="w-4 h-4 text-amber-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-amber-300">
                {unscoredSessions.length === 1
                  ? '1 sesión sin puntuar'
                  : `${unscoredSessions.length} sesiones sin puntuar`}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Registra tu esfuerzo percibido (RPE) para que tu coach pueda ajustar tu plan.
              </p>
            </div>
          </div>
          <div className="space-y-2">
            {unscoredSessions.slice(0, 2).map(s => (
              <button
                key={s.id}
                onClick={() => handleUnscoredClick(s)}
                className="w-full flex items-center justify-between bg-card/60 rounded-xl px-3 py-2.5 hover:bg-card transition-colors"
              >
                <div className="text-left min-w-0">
                  <p className="text-sm truncate">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.date} · {formatDuration(s.durationSec)}</p>
                </div>
                <span className="text-xs text-amber-400 shrink-0 ml-2">Ver detalles →</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Payment notifications ── */}
      {hasDuePayment && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
              <AlertCircle className="w-4 h-4 text-amber-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-amber-300">Pago pendiente</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Tienes un pago vencido de <span className="text-amber-300 font-medium">$29.00</span> a Coach Tomás Johansson.
              </p>
            </div>
          </div>
          <button onClick={onOpenPayment} className="w-full bg-amber-500 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-amber-400 transition-colors">
            Realizar pago
          </button>
        </div>
      )}

      {paymentInReview && (
        <div className="bg-sky-500/10 border border-sky-500/30 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-sky-500/20 flex items-center justify-center shrink-0">
            <Clock3 className="w-4 h-4 text-sky-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-sky-300">Pago en revisión</p>
            <p className="text-xs text-muted-foreground mt-0.5">Tu comprobante fue enviado. El coach lo revisará pronto.</p>
          </div>
        </div>
      )}

      {paymentApproved && (
        <div className="bg-primary/10 border border-primary/30 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
            <CheckCircle className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-primary">Pago aprobado</p>
            <p className="text-xs text-muted-foreground mt-0.5">Tu pago fue confirmado por el coach.</p>
          </div>
        </div>
      )}

      {/* Progress Summary */}
      <div className="bg-card rounded-2xl p-4 border border-border">
        <div className="flex items-center justify-between mb-3">
          <p>Progreso semanal</p>
          <span className="text-primary">85%</span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-3">
          <div className="h-full bg-primary" style={{ width: '85%' }} />
        </div>
        <div className="flex gap-2">
          {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((day, i) => (
            <div key={day} className="flex-1 flex flex-col items-center">
              <div className={`w-full h-1 rounded-full mb-1 ${i < 5 ? 'bg-primary' : 'bg-muted'}`} />
              <span className="text-xs text-muted-foreground">{day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-card rounded-xl p-3 border border-border">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mb-2">
            <Zap className="w-4 h-4 text-primary" />
          </div>
          <p className="text-2xl mb-1">12</p>
          <p className="text-xs text-muted-foreground">Sesiones</p>
        </div>
        <div className="bg-card rounded-xl p-3 border border-border">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mb-2">
            <Clock className="w-4 h-4 text-primary" />
          </div>
          <p className="text-2xl mb-1">8h 45m</p>
          <p className="text-xs text-muted-foreground">Tiempo total</p>
        </div>
        <div className="bg-card rounded-xl p-3 border border-border">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mb-2">
            <Trophy className="w-4 h-4 text-primary" />
          </div>
          <p className="text-2xl mb-1">5</p>
          <p className="text-xs text-muted-foreground">Objetivos</p>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-card rounded-2xl p-4 border border-border">
        <div className="flex items-center justify-between mb-3">
          <p>Rendimiento</p>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </div>
        <ResponsiveContainer width="100%" height={120}>
          <LineChart data={mockChartData}>
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#9ab5be', fontSize: 12 }} />
            <Line type="monotone" dataKey="value" stroke="#c4ff0e" strokeWidth={2} dot={{ fill: '#c4ff0e', r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Upcoming Trainings */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3>Próximos entrenamientos</h3>
          <button className="text-sm text-primary hover:underline">Ver todos</button>
        </div>
        <div className="space-y-3">
          {upcomingTrainings.map(training => (
            <button
              key={training.id}
              onClick={() => setSelectedWorkout(training)}
              className="w-full bg-card rounded-xl p-4 border border-border hover:bg-muted/30 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/20">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium mb-1">{training.title}</p>
                  <p className="text-sm text-muted-foreground">{training.time}</p>
                </div>
                <span className="px-3 py-1 bg-muted rounded-full text-xs">{training.type}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => onStartWorkout({
            id: `w-${Date.now()}`,
            name: upcomingTrainings[0].title,
            category: upcomingTrainings[0].type,
            stages: upcomingTrainings[0].stages,
          })}
          className="bg-primary text-primary-foreground py-4 rounded-xl flex flex-col items-center gap-2"
        >
          <Zap className="w-6 h-6" />
          <span>Iniciar entrenamiento</span>
        </button>
        <button className="bg-card border border-border py-4 rounded-xl flex flex-col items-center gap-2">
          <TrendingUp className="w-6 h-6 text-muted-foreground" />
          <span>Ver progreso</span>
        </button>
      </div>

      {/* Workout Details Modal */}
      {selectedWorkout && (
        <WorkoutDetailsModal
          workout={{
            ...selectedWorkout,
            time: selectedWorkout.completed
              ? selectedWorkout.time
              : selectedWorkout.time.split(' ').slice(1).join(' '), // Remove "Hoy", "Mañana", etc. for future workouts
          }}
          onClose={() => setSelectedWorkout(null)}
          onStart={!selectedWorkout.completed ? handleStartFromModal : undefined}
          onOpenRPE={selectedWorkout.completed && !selectedWorkout.rpe ? handleOpenRPEForWorkout : undefined}
        />
      )}
    </div>
  );
}
