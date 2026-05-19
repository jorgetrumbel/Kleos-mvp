import { useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Plus, Clock, AlertCircle } from 'lucide-react';
import AddWorkoutModal from '../athlete/AddWorkoutModal';

// Mock data: athlete's workouts
const mockAthleteWorkouts = [
  { date: '2026-05-08', title: 'Intervalos', scored: true, completed: true },
  { date: '2026-05-09', title: 'Core y Estabilidad', scored: true, completed: true },
  { date: '2026-05-10', title: 'Técnica de Carrera', scored: false, completed: true },
  { date: '2026-05-12', title: 'Fuerza', completed: false },
  { date: '2026-05-13', title: 'Trail Running', completed: false },
  { date: '2026-05-15', title: 'Intervalos de Velocidad', completed: false },
];

interface AthleteCalendarPlanProps {
  athleteName: string;
  onBack: () => void;
}

export default function AthleteCalendarPlan({ athleteName, onBack }: AthleteCalendarPlanProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 12)); // May 12, 2026
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const today = new Date(2026, 4, 12);

  const weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  // Generate calendar days
  const getCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    let startOffset = firstDay.getDay() - 1;
    if (startOffset === -1) startOffset = 6;

    const days: Date[] = [];

    for (let i = startOffset - 1; i >= 0; i--) {
      const d = new Date(year, month, 0 - i);
      days.push(d);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push(new Date(year, month + 1, i));
    }

    return days;
  };

  const calendarDays = getCalendarDays();

  const hasCompletedWorkout = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return mockAthleteWorkouts.find(w => w.date === dateStr && w.completed);
  };

  const hasProgrammedWorkout = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return mockAthleteWorkouts.some(w => w.date === dateStr && !w.completed);
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
    return mockAthleteWorkouts.filter(w => w.date === dateStr);
  };

  const handleDayClick = (date: Date) => {
    if (!isCurrentMonth(date)) return;
    setSelectedDate(date);
  };

  const handleAddWorkout = (sport: string, date: string) => {
    console.log('Adding workout for athlete:', sport, date);
    // In real app, would add to backend
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const displayDate = selectedDate || today;
  const displayWorkouts = selectedDate ? getWorkoutsForDate(selectedDate) : getWorkoutsForDate(today);

  return (
    <div className="h-full overflow-y-auto pb-20 relative">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border p-4 flex items-center gap-3 z-10">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-muted transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-lg font-medium">Plan de entrenamiento</h1>
          <p className="text-sm text-muted-foreground">{athleteName}</p>
        </div>
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
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map(day => (
              <div key={day} className="text-center text-xs text-muted-foreground py-2 font-medium">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((date, i) => {
              const completed = hasCompletedWorkout(date);
              const programmed = hasProgrammedWorkout(date);
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

                  <div className="absolute bottom-0.5 flex gap-0.5">
                    {completed && past && (
                      <div className={`w-1.5 h-1.5 rounded-full ${completed.scored ? 'bg-green-500' : 'bg-amber-500'}`} />
                    )}
                    {programmed && !past && (
                      <div className={`w-1.5 h-1.5 rounded-full ${todayDate ? 'bg-primary-foreground' : 'bg-blue-400'}`} />
                    )}
                  </div>

                  {completed && !completed.scored && past && (
                    <div className="absolute top-0.5 right-0.5">
                      <AlertCircle className="w-2.5 h-2.5 text-amber-400" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

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

        {/* Workouts List */}
        {displayWorkouts.length > 0 ? (
          <div>
            {!selectedDate && <h3 className="mb-3 font-medium">Entrenamientos de hoy</h3>}
            <div className="space-y-3">
              {displayWorkouts.map((workout, idx) => (
                <div key={idx} className="bg-card rounded-xl p-4 border border-border">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg shrink-0 ${workout.completed ? 'bg-green-500/20' : 'bg-primary/20'}`}>
                      <Clock className={`w-5 h-5 ${workout.completed ? 'text-green-400' : 'text-primary'}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-medium mb-1">{workout.title}</p>
                        {workout.completed && !workout.scored && (
                          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {workout.completed ? 'Completado' : 'Programado'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-muted/50 rounded-xl p-6 text-center">
            <p className="text-muted-foreground">
              {selectedDate
                ? 'No hay entrenamientos para este día'
                : 'No hay entrenamientos programados para hoy'}
            </p>
          </div>
        )}
      </div>

      {/* Add workout button */}
      <button
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center z-20"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Add Modal */}
      {showAddModal && (
        <AddWorkoutModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddWorkout}
          initialDate={selectedDate || undefined}
        />
      )}
    </div>
  );
}
