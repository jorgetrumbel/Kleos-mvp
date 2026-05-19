import { ChevronLeft, ChevronRight, Plus, Clock } from 'lucide-react';
import { useState } from 'react';

const mockEvents = [
  { id: 1, date: '2026-05-11', time: '06:00', title: 'Sesión de Intervalos', athlete: 'María González' },
  { id: 2, date: '2026-05-11', time: '18:00', title: 'Entrenamiento de Fuerza', athlete: 'Carlos Rodríguez' },
  { id: 3, date: '2026-05-12', time: '07:00', title: 'Trail Running', athlete: 'Ana Martínez' },
  { id: 4, date: '2026-05-13', time: '06:30', title: 'Resistencia', athlete: 'Luis Fernández' },
  { id: 5, date: '2026-05-14', time: '19:00', title: 'Técnica de Carrera', athlete: 'Patricia López' },
];

export default function CoachCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 11));
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');

  const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  const currentWeekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - date.getDay() + i + 1);
    return date;
  });

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return mockEvents.filter((event) => event.date === dateStr);
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="p-3 sm:p-4 border-b border-border sticky top-0 bg-background z-10">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h1 className="text-xl sm:text-2xl">Calendario</h1>
          <button className="p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* View Mode Toggle */}
        <div className="flex gap-2 mb-3 sm:mb-4">
          <button
            onClick={() => setViewMode('week')}
            className={`flex-1 py-2 rounded-lg transition-colors text-sm sm:text-base ${
              viewMode === 'week'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            Semana
          </button>
          <button
            onClick={() => setViewMode('month')}
            className={`flex-1 py-2 rounded-lg transition-colors text-sm sm:text-base ${
              viewMode === 'month'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            Mes
          </button>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              const newDate = new Date(currentDate);
              newDate.setMonth(newDate.getMonth() - 1);
              setCurrentDate(newDate);
            }}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <p className="font-medium text-sm sm:text-base">
            {currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
          </p>
          <button
            onClick={() => {
              const newDate = new Date(currentDate);
              newDate.setMonth(newDate.getMonth() + 1);
              setCurrentDate(newDate);
            }}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Week View */}
      {viewMode === 'week' && (
        <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
          {/* Week Days Header */}
          <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
            {weekDays.map((day, i) => {
              const date = currentWeekDates[i];
              const hasEvents = getEventsForDate(date).length > 0;
              const isToday = date.toDateString() === new Date().toDateString();

              return (
                <div
                  key={day}
                  className={`text-center p-2 sm:p-3 rounded-lg sm:rounded-xl ${
                    isToday
                      ? 'bg-primary text-primary-foreground'
                      : hasEvents
                      ? 'bg-card border border-border'
                      : 'bg-muted/50'
                  }`}
                >
                  <p className="text-[10px] sm:text-xs mb-0.5 sm:mb-1">{day}</p>
                  <p className="text-base sm:text-lg">{date.getDate()}</p>
                  {hasEvents && !isToday && (
                    <div className="w-1 h-1 bg-primary rounded-full mx-auto mt-0.5 sm:mt-1" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Today's Events */}
          <div>
            <h3 className="mb-3">Actividades de hoy</h3>
            <div className="space-y-3">
              {getEventsForDate(new Date(2026, 4, 11)).map((event) => (
                <div key={event.id} className="bg-card rounded-xl p-4 border border-border">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/20">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium mb-1">{event.title}</p>
                      <p className="text-sm text-muted-foreground mb-2">{event.athlete}</p>
                      <p className="text-xs text-primary">{event.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div>
            <h3 className="mb-3">Próximas actividades</h3>
            <div className="space-y-3">
              {mockEvents.filter((e) => e.date !== '2026-05-11').map((event) => {
                const eventDate = new Date(event.date);
                return (
                  <div key={event.id} className="bg-card rounded-xl p-4 border border-border">
                    <div className="flex items-start gap-3">
                      <div className="text-center min-w-[50px]">
                        <p className="text-xs text-muted-foreground">
                          {eventDate.toLocaleDateString('es-ES', { weekday: 'short' })}
                        </p>
                        <p className="text-2xl">{eventDate.getDate()}</p>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium mb-1">{event.title}</p>
                        <p className="text-sm text-muted-foreground mb-2">{event.athlete}</p>
                        <p className="text-xs text-primary">{event.time}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Month View */}
      {viewMode === 'month' && (
        <div className="p-4">
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="grid grid-cols-7 gap-2 mb-2">
              {weekDays.map((day) => (
                <div key={day} className="text-center text-xs text-muted-foreground py-2">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 35 }, (_, i) => {
                const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i - 6);
                const hasEvents = getEventsForDate(date).length > 0;
                const isCurrentMonth = date.getMonth() === currentDate.getMonth();

                return (
                  <div
                    key={i}
                    className={`aspect-square flex flex-col items-center justify-center rounded-lg ${
                      isCurrentMonth
                        ? hasEvents
                          ? 'bg-primary/20 text-primary'
                          : 'bg-muted/50'
                        : 'text-muted-foreground/50'
                    }`}
                  >
                    <span className="text-sm">{date.getDate()}</span>
                    {hasEvents && (
                      <div className="w-1 h-1 bg-primary rounded-full mt-1" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
