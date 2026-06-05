import { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, Plus, Users, MapPin, AlertCircle } from 'lucide-react';
import CreateGroupSessionModal, { type GroupSession } from './CreateGroupSessionModal';

// Individual athlete sessions (assigned plans)
const mockAthleteSessions = [
  { id: 1, date: '2026-05-20', time: '06:00', title: 'Sesión de Intervalos', athlete: 'María González', type: 'Resistencia', completed: true },
  { id: 2, date: '2026-05-20', time: '18:00', title: 'Entrenamiento de Fuerza', athlete: 'Carlos Rodríguez', type: 'Fuerza', completed: true },
  { id: 3, date: '2026-05-22', time: '07:00', title: 'Trail Running', athlete: 'Ana Martínez', type: 'Resistencia', completed: false },
  { id: 4, date: '2026-05-23', time: '06:30', title: 'Resistencia', athlete: 'Luis Fernández', type: 'Resistencia', completed: false },
  { id: 5, date: '2026-05-26', time: '19:00', title: 'Técnica de Carrera', athlete: 'Patricia López', type: 'Técnica', completed: false },
  { id: 6, date: '2026-05-27', time: '08:00', title: 'Core y Estabilidad', athlete: 'María González', type: 'Fuerza', completed: false },
  { id: 7, date: '2026-05-29', time: '07:30', title: 'Fuerza Base', athlete: 'Carlos Rodríguez', type: 'Fuerza', completed: false },
  { id: 8, date: '2026-05-29', time: '18:00', title: 'Fuerza Base', athlete: 'Ana Martínez', type: 'Fuerza', completed: false },
];

// Group sessions created by the coach
const initialGroupSessions: GroupSession[] = [
  {
    id: 101,
    date: '2026-05-31',
    time: '07:00',
    title: 'Trail Running Grupal',
    type: 'Trail Running',
    location: 'Cerro San Cristóbal',
    participants: 8,
    maxParticipants: 12,
    allowedPlanIds: ['plan-1', 'plan-2', 'plan-3'],
    notes: 'Traer agua y calzado de trail.',
  },
  {
    id: 102,
    date: '2026-06-07',
    time: '08:00',
    title: 'Sesión de Técnica',
    type: 'Técnica',
    location: 'Parque Forestal',
    participants: 5,
    maxParticipants: 10,
    allowedPlanIds: ['plan-1', 'plan-3'],
    notes: '',
  },
];

const MOCK_PLANS: Record<string, string> = {
  'plan-1': 'Plan Mensual',
  'plan-2': 'Plan Semanal',
  'plan-3': 'Plan Premium',
};

export default function CoachCalendar() {
  const today = new Date(2026, 4, 29); // May 29, 2026
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 29));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [groupSessions, setGroupSessions] = useState<GroupSession[]>(initialGroupSessions);

  const weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

  // Build calendar grid (always 6 rows = 42 cells, Monday-first)
  const getCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    let startOffset = firstDay.getDay() - 1;
    if (startOffset === -1) startOffset = 6;

    const days: Date[] = [];
    for (let i = startOffset - 1; i >= 0; i--) {
      days.push(new Date(year, month, 0 - i));
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

  const dateStr = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const hasAthleteSession = (date: Date) =>
    mockAthleteSessions.some(s => s.date === dateStr(date));

  const hasGroupSession = (date: Date) =>
    groupSessions.some(s => s.date === dateStr(date));

  const isToday = (date: Date) => date.toDateString() === today.toDateString();
  const isCurrentMonth = (date: Date) => date.getMonth() === currentDate.getMonth();

  const getSessionsForDate = (date: Date) =>
    mockAthleteSessions.filter(s => s.date === dateStr(date));

  const getGroupSessionsForDate = (date: Date) =>
    groupSessions.filter(s => s.date === dateStr(date));

  const handleDayClick = (date: Date) => {
    if (!isCurrentMonth(date)) return;
    setSelectedDate(prev => prev?.toDateString() === date.toDateString() ? null : date);
  };

  const handleCreateSession = (session: GroupSession) => {
    setGroupSessions(prev => [...prev, session]);
    // If new session date is in current month, select it
    const sessionDate = new Date(session.date);
    if (sessionDate.getMonth() === currentDate.getMonth() &&
        sessionDate.getFullYear() === currentDate.getFullYear()) {
      setSelectedDate(sessionDate);
    }
  };

  // What to display below the calendar
  const displayDate = selectedDate || today;
  const displayDateStr = dateStr(displayDate);
  const isDisplayingToday = displayDate.toDateString() === today.toDateString();

  const displayAthleteSessions = getSessionsForDate(displayDate);
  const displayGroupSessions = getGroupSessionsForDate(displayDate);
  const hasAnything = displayAthleteSessions.length > 0 || displayGroupSessions.length > 0;

  // Upcoming: sessions not on displayDate when no day is selected — replaced by "all upcoming"
  const upcomingAthleteSessions = !selectedDate
    ? mockAthleteSessions.filter(s => s.date > dateStr(today))
    : [];
  const upcomingGroupSessions = !selectedDate
    ? groupSessions.filter(s => s.date >= dateStr(today) && s.date !== dateStr(today))
    : [];

  const planLabel = (planIds: string[]) => {
    if (planIds.length === Object.keys(MOCK_PLANS).length) return 'Todos los planes';
    return planIds.map(id => MOCK_PLANS[id] ?? id).join(', ');
  };

  return (
    <div className="pb-20 relative">
      {/* Header */}
      <div className="p-3 sm:p-4 border-b border-border sticky top-0 bg-background z-10">
        <h1 className="text-xl sm:text-2xl mb-0.5">Calendario</h1>
        <p className="text-sm text-muted-foreground">Sesiones y eventos de tus atletas</p>
      </div>

      <div className="p-4 space-y-4">
        {/* Month navigation */}
        <div className="flex items-center justify-between bg-card rounded-xl p-3 border border-border">
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <p className="font-medium capitalize">
            {currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
          </p>
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Calendar grid */}
        <div className="bg-card rounded-xl p-3 border border-border">
          {/* Week day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day, i) => (
              <div key={i} className="text-center text-xs text-muted-foreground py-2 font-medium">
                {day}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((date, i) => {
              const athleteSession = hasAthleteSession(date);
              const groupSession = hasGroupSession(date);
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
                      ? 'bg-muted/30 hover:bg-muted/60 cursor-pointer'
                      : 'bg-transparent cursor-default'
                  }`}
                >
                  <span className={`text-sm ${!currentMonth ? 'text-muted-foreground/40' : ''}`}>
                    {date.getDate()}
                  </span>

                  {/* Dots */}
                  <div className="absolute bottom-0.5 flex gap-0.5 justify-center">
                    {athleteSession && (
                      <div className={`w-1.5 h-1.5 rounded-full ${todayDate ? 'bg-primary-foreground' : 'bg-primary'}`} />
                    )}
                    {groupSession && (
                      <div className={`w-1.5 h-1.5 rounded-full ${todayDate ? 'bg-primary-foreground' : 'bg-purple-400'}`} />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-4 pt-3 border-t border-border flex flex-wrap gap-x-4 gap-y-1.5 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-muted-foreground">Sesión individual</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-purple-400" />
              <span className="text-muted-foreground">Sesión grupal</span>
            </div>
          </div>
        </div>

        {/* Selected / today header */}
        <div className="flex items-center justify-between">
          <h3 className="font-medium capitalize">
            {isDisplayingToday && !selectedDate
              ? 'Hoy'
              : displayDate.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
          </h3>
          {selectedDate && (
            <button
              onClick={() => setSelectedDate(null)}
              className="text-sm text-primary hover:underline"
            >
              Ver todos
            </button>
          )}
        </div>

        {/* Athlete sessions for selected/today */}
        {displayAthleteSessions.length > 0 && (
          <div className="space-y-3">
            {displayAthleteSessions.map(session => (
              <div key={session.id} className="bg-card rounded-xl p-4 border border-border">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg shrink-0 ${session.completed ? 'bg-green-500/20' : 'bg-primary/20'}`}>
                    <Clock className={`w-5 h-5 ${session.completed ? 'text-green-400' : 'text-primary'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <p className="font-medium truncate">{session.title}</p>
                      {session.completed && (
                        <span className="text-xs text-green-400 shrink-0">Completado</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{session.athlete}</p>
                    <p className="text-xs text-primary mt-1">{session.time} · {session.type}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Group sessions for selected/today */}
        {displayGroupSessions.length > 0 && (
          <div className="space-y-3">
            {displayGroupSessions.map(session => (
              <GroupSessionCard key={session.id} session={session} planLabel={planLabel} />
            ))}
          </div>
        )}

        {/* Empty state for selected day */}
        {selectedDate && !hasAnything && (
          <div className="bg-muted/50 rounded-xl p-6 text-center">
            <p className="text-muted-foreground">No hay sesiones programadas para este día</p>
          </div>
        )}

        {/* Empty state for today with no sessions */}
        {!selectedDate && displayAthleteSessions.length === 0 && displayGroupSessions.length === 0 && (
          <div className="bg-muted/50 rounded-xl p-5 text-center">
            <p className="text-muted-foreground">Sin sesiones programadas para hoy</p>
          </div>
        )}

        {/* Upcoming athlete sessions */}
        {!selectedDate && upcomingAthleteSessions.length > 0 && (
          <div>
            <h3 className="font-medium mb-3">Próximas sesiones</h3>
            <div className="space-y-3">
              {upcomingAthleteSessions.map(session => {
                const d = new Date(session.date);
                return (
                  <div key={session.id} className="bg-card rounded-xl p-4 border border-border">
                    <div className="flex items-start gap-3">
                      <div className="text-center min-w-[44px]">
                        <p className="text-xs text-muted-foreground capitalize">
                          {d.toLocaleDateString('es-ES', { weekday: 'short' })}
                        </p>
                        <p className="text-xl font-medium">{d.getDate()}</p>
                        <p className="text-xs text-muted-foreground">
                          {d.toLocaleDateString('es-ES', { month: 'short' })}
                        </p>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium mb-0.5">{session.title}</p>
                        <p className="text-sm text-muted-foreground">{session.athlete}</p>
                        <p className="text-xs text-primary mt-1">{session.time} · {session.type}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Upcoming group sessions */}
        {!selectedDate && upcomingGroupSessions.length > 0 && (
          <div>
            <h3 className="font-medium mb-3">Próximos eventos grupales</h3>
            <div className="space-y-3">
              {upcomingGroupSessions.map(session => (
                <GroupSessionCard key={session.id} session={session} planLabel={planLabel} showDate />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Floating add button */}
      <button
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-500 transition-all flex items-center justify-center z-20"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Create group session modal */}
      {showAddModal && (
        <CreateGroupSessionModal
          onClose={() => setShowAddModal(false)}
          onCreate={handleCreateSession}
          initialDate={selectedDate || undefined}
        />
      )}
    </div>
  );
}

// ── Sub-component ──────────────────────────────────────────────────────────────

interface GroupSessionCardProps {
  session: GroupSession;
  planLabel: (ids: string[]) => string;
  showDate?: boolean;
}

function GroupSessionCard({ session, planLabel, showDate }: GroupSessionCardProps) {
  const [expanded, setExpanded] = useState(false);
  const d = new Date(session.date);

  return (
    <button
      onClick={() => setExpanded(e => !e)}
      className="w-full bg-card rounded-xl border border-purple-500/30 hover:border-purple-400/50 transition-colors text-left overflow-hidden"
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-purple-500/20 shrink-0">
            <Users className="w-5 h-5 text-purple-400" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-0.5">
              <p className="font-medium truncate">{session.title}</p>
              <span className="text-xs text-purple-400 shrink-0">
                {session.participants}/{session.maxParticipants}
              </span>
            </div>
            {showDate && (
              <p className="text-sm text-muted-foreground">
                {d.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' })} · {session.time}
              </p>
            )}
            {!showDate && (
              <p className="text-sm text-muted-foreground">{session.time} · {session.type}</p>
            )}
            {session.location && (
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3" /> {session.location}
              </p>
            )}
          </div>
        </div>

        {expanded && (
          <div className="mt-3 pt-3 border-t border-border space-y-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <AlertCircle className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>Acceso: {planLabel(session.allowedPlanIds)}</span>
            </div>
            {session.notes && (
              <p className="text-xs text-muted-foreground">{session.notes}</p>
            )}
            <div className="flex gap-2 mt-1">
              <div className="flex-1 py-1.5 rounded-lg bg-purple-500/20 text-purple-300 text-xs text-center">
                {session.participants} participantes
              </div>
              <div className="flex-1 py-1.5 rounded-lg bg-muted/50 text-muted-foreground text-xs text-center">
                {session.maxParticipants - session.participants} lugares libres
              </div>
            </div>
          </div>
        )}
      </div>
    </button>
  );
}
