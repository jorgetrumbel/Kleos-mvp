import { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, Play, AlertCircle, Plus, Users } from 'lucide-react';
import type { CompletedSession } from '../AthleteView';
import type { WorkoutInfo } from './WorkoutScreen';
import WorkoutDetailsModal from './WorkoutDetailsModal';
import AddWorkoutModal from './AddWorkoutModal';

// Mock data: all workouts (past and future) with full details
const mockAllWorkouts = [
  {
    id: 1,
    date: '2026-05-08',
    time: '18:00',
    title: 'Intervalos',
    type: 'Resistencia',
    stages: ['Calentamiento 15 min', '8x400m a ritmo intenso', 'Recuperación 2 min entre series', 'Enfriamiento 10 min'],
    completed: true,
    metrics: {
      duration: '1h 15m',
      avgHeartRate: 165,
      maxHeartRate: 182,
      calories: 720,
      distance: '12.5 km',
      pace: '5:20 min/km',
    },
    rpe: 8,
    feedback: 'Excelente sesión, mantuviste muy bien el ritmo en los intervalos. La próxima vez intenta reducir 5 segundos el tiempo de recuperación.',
  },
  {
    id: 2,
    date: '2026-05-09',
    time: '07:00',
    title: 'Core y Estabilidad',
    type: 'Fuerza',
    stages: ['Plancha 3x60s', 'Abdominales 3x20', 'Superman 3x15', 'Dead bug 3x12'],
    completed: true,
    metrics: {
      duration: '45m',
      avgHeartRate: 125,
      maxHeartRate: 145,
      calories: 280,
    },
    rpe: 6,
    feedback: 'Buena forma en los ejercicios. Recuerda mantener el core activado durante toda la plancha.',
  },
  {
    id: 3,
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
    id: 4,
    date: '2026-05-12',
    time: '07:00',
    title: 'Fuerza',
    type: 'Fuerza',
    stages: ['Sentadillas 3x12', 'Peso muerto 3x10', 'Plancha 3x60s', 'Estocadas 3x10'],
    completed: false,
  },
  {
    id: 5,
    date: '2026-05-13',
    time: '06:30',
    title: 'Trail Running',
    type: 'Resistencia',
    stages: ['Calentamiento 10 min', 'Subida Cerro San Cristóbal', 'Ritmo aeróbico constante', 'Bajada técnica'],
    completed: false,
  },
  {
    id: 6,
    date: '2026-05-15',
    time: '18:00',
    title: 'Intervalos de Velocidad',
    type: 'Resistencia',
    stages: ['Calentamiento 15 min', '8x400m a ritmo intenso', 'Recuperación 2 min entre series', 'Enfriamiento 10 min'],
    completed: false,
  },
];

// Mock data: group events from coach
const mockGroupEvents = [
  {
    id: 101,
    date: '2026-05-14',
    time: '07:00',
    title: 'Trail Running Grupal',
    location: 'Cerro San Cristóbal',
    participants: 8,
    maxParticipants: 12,
  },
  {
    id: 102,
    date: '2026-05-17',
    time: '08:00',
    title: 'Sesión de Técnica',
    location: 'Parque Forestal',
    participants: 5,
    maxParticipants: 10,
  },
];

interface AthleteCalendarProps {
  onStartWorkout: (info: WorkoutInfo) => void;
  unscoredSessions: CompletedSession[];
  onOpenRPE: (session: CompletedSession) => void;
}

export default function AthleteCalendar({ onStartWorkout, unscoredSessions, onOpenRPE }: AthleteCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 12)); // May 12, 2026
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState<typeof mockAllWorkouts[0] | null>(null);
  const today = new Date(2026, 4, 12);

  const weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  // Generate calendar days
  const getCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Monday = 1, Sunday = 0 -> we want Monday first
    let startOffset = firstDay.getDay() - 1;
    if (startOffset === -1) startOffset = 6; // Sunday becomes 6

    const days: Date[] = [];

    // Previous month days
    for (let i = startOffset - 1; i >= 0; i--) {
      const d = new Date(year, month, 0 - i);
      days.push(d);
    }

    // Current month days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    // Next month days to fill grid
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push(new Date(year, month + 1, i));
    }

    return days;
  };

  const calendarDays = getCalendarDays();

  const hasCompletedWorkout = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return mockAllWorkouts.find(w => w.date === dateStr && w.completed);
  };

  const hasProgrammedWorkout = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return mockAllWorkouts.some(w => w.date === dateStr && !w.completed);
  };

  const hasGroupEvent = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return mockGroupEvents.some(e => e.date === dateStr);
  };

  const isPast = (date: Date) => {
    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return dateOnly < todayOnly;
  };

  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const getWorkoutsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return mockAllWorkouts.filter(w => w.date === dateStr);
  };

  const getGroupEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return mockGroupEvents.filter(e => e.date === dateStr);
  };

  const getTodayWorkouts = () => {
    const todayStr = today.toISOString().split('T')[0];
    return mockAllWorkouts.filter(w => w.date === todayStr && !w.completed);
  };

  const getUpcomingWorkouts = () => {
    const todayStr = today.toISOString().split('T')[0];
    return mockAllWorkouts.filter(w => w.date > todayStr && !w.completed);
  };

  const getUpcomingGroupEvents = () => {
    const todayStr = today.toISOString().split('T')[0];
    return mockGroupEvents.filter(e => e.date >= todayStr);
  };

  const handleStart = (workout: typeof mockAllWorkouts[0]) => {
    onStartWorkout({
      id: `cal-${workout.id}`,
      name: workout.title,
      category: workout.type,
      stages: workout.stages,
    });
    setSelectedWorkout(null);
  };

  const handleDayClick = (date: Date) => {
    if (!isCurrentMonth(date)) return;
    setSelectedDate(date);
  };

  const handleAddWorkout = (sport: string, date: string) => {
    console.log('Adding workout:', sport, date);
    // In real app, would add to backend
  };

  const handleWorkoutClick = (workout: typeof mockAllWorkouts[0]) => {
    if (workout.completed && !workout.rpe) {
      const session = unscoredSessions.find(s => s.name === workout.title) ?? {
        id: `cal-${workout.id}`,
        name: workout.title,
        date: workout.date,
        durationSec: 0,
        scored: false,
      };
      onOpenRPE(session);
      return;
    }
    setSelectedWorkout(workout);
  };

  const handleOpenRPEForWorkout = () => {
    if (selectedWorkout) {
      const session = unscoredSessions.find(s => s.name === selectedWorkout.title) ?? {
        id: `cal-${selectedWorkout.id}`,
        name: selectedWorkout.title,
        date: selectedWorkout.date,
        durationSec: 0,
        scored: false,
      };
      onOpenRPE(session);
      setSelectedWorkout(null);
    }
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Determine what to show in the list
  const displayDate = selectedDate || today;
  const isDisplayingToday = displayDate.toDateString() === today.toDateString();
  const displayWorkouts = selectedDate ? getWorkoutsForDate(selectedDate) : getTodayWorkouts();
  const displayGroupEvents = selectedDate ? getGroupEventsForDate(selectedDate) : getUpcomingGroupEvents();
  const upcomingWorkouts = !selectedDate ? getUpcomingWorkouts() : [];

  return (
    <div className="pb-20 relative">
      {/* Header */}
      <div className="p-3 sm:p-4 border-b border-border sticky top-0 bg-background z-10">
        <h1 className="text-xl sm:text-2xl mb-1 sm:mb-2">Calendario</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Tus entrenamientos programados</p>
      </div>

      <div className="p-4 space-y-4">
        {/* Month Selector */}
        <div className="flex items-center justify-between bg-card rounded-xl p-3 border border-border">
          <button
            onClick={handlePrevMonth}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <p className="font-medium capitalize">
            {currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
          </p>
          <button
            onClick={handleNextMonth}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Calendar */}
        <div className="bg-card rounded-xl p-3 border border-border">
          {/* Week day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map(day => (
              <div key={day} className="text-center text-xs text-muted-foreground py-2 font-medium">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((date, i) => {
              const completed = hasCompletedWorkout(date);
              const programmed = hasProgrammedWorkout(date);
              const groupEvent = hasGroupEvent(date);
              const past = isPast(date);
              const todayDate = isToday(date);
              const currentMonth = isCurrentMonth(date);

              const isSelected = selectedDate?.toDateString() === date.toDateString();

              return (
                <button
                  key={i}
                  onClick={() => handleDayClick(date)}
                  disabled={!currentMonth}
                  className={`aspect-square flex flex-col items-center justify-center rounded-lg relative transition-all ${
                    todayDate
                      ? 'bg-primary text-primary-foreground font-medium'
                      : isSelected
                      ? 'bg-primary/20 text-primary ring-2 ring-primary'
                      : currentMonth
                      ? 'bg-muted/30 hover:bg-muted/50'
                      : 'bg-transparent cursor-default'
                  }`}
                >
                  <span className={`text-sm ${!currentMonth && !todayDate ? 'text-muted-foreground/40' : ''}`}>
                    {date.getDate()}
                  </span>

                  {/* Indicators */}
                  <div className="absolute bottom-0.5 flex gap-0.5">
                    {/* Past completed workout */}
                    {completed && past && (
                      <div className={`w-1.5 h-1.5 rounded-full ${completed.scored ? 'bg-green-500' : 'bg-amber-500'}`} />
                    )}

                    {/* Future programmed workout */}
                    {programmed && !past && (
                      <div className={`w-1.5 h-1.5 rounded-full ${todayDate ? 'bg-primary-foreground' : 'bg-blue-400'}`} />
                    )}

                    {/* Group event */}
                    {groupEvent && !past && (
                      <div className={`w-1.5 h-1.5 rounded-full ${todayDate ? 'bg-primary-foreground' : 'bg-purple-400'}`} />
                    )}
                  </div>

                  {/* Unscored indicator (!) */}
                  {completed && !completed.scored && past && (
                    <div className="absolute top-0.5 right-0.5">
                      <AlertCircle className="w-2.5 h-2.5 text-amber-400" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-4 pt-3 border-t border-border flex flex-wrap gap-x-4 gap-y-2 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-muted-foreground">Completado</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-muted-foreground">Sin puntuar</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <span className="text-muted-foreground">Programado</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-purple-400" />
              <span className="text-muted-foreground">Evento grupal</span>
            </div>
          </div>
        </div>

        {/* Selected day header */}
        {selectedDate && (
          <div className="flex items-center justify-between">
            <h3 className="font-medium">
              {displayDate.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
            </h3>
            <button
              onClick={() => setSelectedDate(null)}
              className="text-sm text-primary hover:underline"
            >
              Ver todos
            </button>
          </div>
        )}

        {/* Workouts for selected/today */}
        {displayWorkouts.length > 0 && (
          <div>
            {!selectedDate && <h3 className="mb-3 font-medium">Hoy</h3>}
            <div className="space-y-3">
              {displayWorkouts.map(workout => (
                <button
                  key={workout.id}
                  onClick={() => handleWorkoutClick(workout)}
                  className="w-full bg-card rounded-xl p-4 border border-border hover:bg-muted/30 transition-colors text-left"
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg shrink-0 ${workout.completed ? 'bg-green-500/20' : 'bg-primary/20'}`}>
                      <Clock className={`w-5 h-5 ${workout.completed ? 'text-green-400' : 'text-primary'}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-medium mb-1">{workout.title}</p>
                        {workout.completed && !workout.rpe && (
                          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {workout.time} · {workout.type}
                        {workout.completed && ' · Completado'}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming workouts (only when not viewing a specific day) */}
        {!selectedDate && upcomingWorkouts.length > 0 && (
          <div>
            <h3 className="mb-3 font-medium">Próximos entrenamientos</h3>
            <div className="space-y-3">
              {upcomingWorkouts.map(workout => {
                const workoutDate = new Date(workout.date);
                return (
                  <button
                    key={workout.id}
                    onClick={() => handleWorkoutClick(workout)}
                    className="w-full bg-card rounded-xl p-4 border border-border hover:bg-muted/30 transition-colors text-left"
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-center min-w-[50px]">
                        <p className="text-xs text-muted-foreground capitalize">
                          {workoutDate.toLocaleDateString('es-ES', { weekday: 'short' })}
                        </p>
                        <p className="text-2xl">{workoutDate.getDate()}</p>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium mb-1">{workout.title}</p>
                        <p className="text-sm text-muted-foreground">{workout.time} · {workout.type}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Group Events */}
        {displayGroupEvents.length > 0 && (
          <div>
            {!selectedDate && <h3 className="mb-3 font-medium">Eventos grupales del coach</h3>}
            <div className="space-y-3">
              {displayGroupEvents.map(event => {
                const eventDate = new Date(event.date);
                return (
                  <div key={event.id} className="bg-card rounded-xl p-4 border border-border">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-purple-500/20 shrink-0">
                        <Users className="w-5 h-5 text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium mb-1">{event.title}</p>
                        {!selectedDate && (
                          <p className="text-sm text-muted-foreground mb-1">
                            {eventDate.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' })} · {event.time}
                          </p>
                        )}
                        {selectedDate && (
                          <p className="text-sm text-muted-foreground mb-1">{event.time}</p>
                        )}
                        <p className="text-sm text-muted-foreground mb-3">
                          {event.location} · {event.participants}/{event.maxParticipants} participantes
                        </p>
                        <button className="w-full py-2 bg-purple-500/20 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-colors font-medium">
                          Unirse
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty state */}
        {selectedDate && displayWorkouts.length === 0 && displayGroupEvents.length === 0 && (
          <div className="bg-muted/50 rounded-xl p-6 text-center">
            <p className="text-muted-foreground">No hay entrenamientos programados para este día</p>
          </div>
        )}
      </div>

      {/* Add workout button (floating) */}
      <button
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center z-20"
        style={{ maxWidth: '480px' }}
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Modals */}
      {showAddModal && (
        <AddWorkoutModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddWorkout}
          initialDate={selectedDate || undefined}
        />
      )}

      {selectedWorkout && (
        <WorkoutDetailsModal
          workout={selectedWorkout}
          onClose={() => setSelectedWorkout(null)}
          onStart={!selectedWorkout.completed ? () => handleStart(selectedWorkout) : undefined}
          onOpenRPE={selectedWorkout.completed && !selectedWorkout.rpe ? handleOpenRPEForWorkout : undefined}
        />
      )}
    </div>
  );
}
