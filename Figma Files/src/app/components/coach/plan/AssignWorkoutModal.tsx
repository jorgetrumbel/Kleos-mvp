import { useState } from 'react';
import { X, Calendar, Users, Check } from 'lucide-react';
import { SavedPlan, WorkoutAssignment } from './types';

interface AssignWorkoutModalProps {
  plan: SavedPlan;
  onAssign: (assignment: WorkoutAssignment) => void;
  onClose: () => void;
}

// Mock athletes data
const MOCK_ATHLETES = [
  { id: 'a1', name: 'Ana Martínez', image: null },
  { id: 'a2', name: 'Carlos Ruiz', image: null },
  { id: 'a3', name: 'Laura González', image: null },
  { id: 'a4', name: 'Diego Fernández', image: null },
  { id: 'a5', name: 'María López', image: null },
  { id: 'a6', name: 'Pedro Sánchez', image: null },
];

const WEEKDAYS = [
  { id: 0, label: 'Dom', full: 'Domingo' },
  { id: 1, label: 'Lun', full: 'Lunes' },
  { id: 2, label: 'Mar', full: 'Martes' },
  { id: 3, label: 'Mié', full: 'Miércoles' },
  { id: 4, label: 'Jue', full: 'Jueves' },
  { id: 5, label: 'Vie', full: 'Viernes' },
  { id: 6, label: 'Sáb', full: 'Sábado' },
];

export function AssignWorkoutModal({ plan, onAssign, onClose }: AssignWorkoutModalProps) {
  const [selectedAthletes, setSelectedAthletes] = useState<string[]>([]);
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [frequency, setFrequency] = useState<'once' | 'weekly' | 'daily' | 'custom'>('once');
  const [customDays, setCustomDays] = useState<number[]>([]);
  const [notes, setNotes] = useState('');

  const toggleAthlete = (athleteId: string) => {
    setSelectedAthletes((prev) =>
      prev.includes(athleteId)
        ? prev.filter((id) => id !== athleteId)
        : [...prev, athleteId]
    );
  };

  const toggleDay = (dayId: number) => {
    setCustomDays((prev) =>
      prev.includes(dayId)
        ? prev.filter((id) => id !== dayId)
        : [...prev, dayId].sort()
    );
  };

  const selectAllAthletes = () => {
    setSelectedAthletes(MOCK_ATHLETES.map((a) => a.id));
  };

  const deselectAllAthletes = () => {
    setSelectedAthletes([]);
  };

  const handleAssign = () => {
    if (selectedAthletes.length === 0) {
      alert('Selecciona al menos un atleta');
      return;
    }

    const assignment: WorkoutAssignment = {
      id: crypto.randomUUID(),
      planId: plan.id,
      athleteIds: selectedAthletes,
      startDate: new Date(startDate),
      frequency,
      customDays: frequency === 'custom' ? customDays : undefined,
      notes: notes.trim() || undefined,
    };

    onAssign(assignment);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-end">
      <div className="w-full bg-card rounded-t-2xl border-t border-border max-w-[480px] mx-auto max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border flex-shrink-0">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-medium">Asignar Entrenamiento</h2>
            <button
              onClick={onClose}
              className="p-2 -mr-2 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-1">{plan.plan.planName}</p>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 p-4 space-y-4">
          {/* Athletes selection */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                Atletas ({selectedAthletes.length})
              </label>
              <div className="flex gap-2">
                <button
                  onClick={selectAllAthletes}
                  className="text-xs text-primary hover:underline"
                >
                  Todos
                </button>
                <button
                  onClick={deselectAllAthletes}
                  className="text-xs text-muted-foreground hover:underline"
                >
                  Ninguno
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {MOCK_ATHLETES.map((athlete) => {
                const isSelected = selectedAthletes.includes(athlete.id);
                return (
                  <button
                    key={athlete.id}
                    onClick={() => toggleAthlete(athlete.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/40'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                          isSelected ? 'border-primary bg-primary' : 'border-muted-foreground'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                      </div>
                      <span className="text-sm truncate">{athlete.name}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Start date */}
          <div>
            <label className="text-sm font-medium mb-2 block flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              Fecha de inicio
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2.5 bg-input rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            />
          </div>

          {/* Frequency */}
          <div>
            <label className="text-sm font-medium mb-2 block">Frecuencia</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'once', label: 'Una vez' },
                { value: 'daily', label: 'Diario' },
                { value: 'weekly', label: 'Semanal' },
                { value: 'custom', label: 'Personalizado' },
              ].map((freq) => (
                <button
                  key={freq.value}
                  onClick={() => setFrequency(freq.value as typeof frequency)}
                  className={`py-2.5 px-3 rounded-xl border text-sm transition-colors ${
                    frequency === freq.value
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border text-muted-foreground hover:border-primary/40'
                  }`}
                >
                  {freq.label}
                </button>
              ))}
            </div>
          </div>

          {/* Custom days selector */}
          {frequency === 'custom' && (
            <div>
              <label className="text-sm font-medium mb-2 block">Días de la semana</label>
              <div className="flex gap-1.5">
                {WEEKDAYS.map((day) => {
                  const isSelected = customDays.includes(day.id);
                  return (
                    <button
                      key={day.id}
                      onClick={() => toggleDay(day.id)}
                      className={`flex-1 py-2.5 rounded-lg border text-xs transition-colors ${
                        isSelected
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border text-muted-foreground hover:border-primary/40'
                      }`}
                      title={day.full}
                    >
                      {day.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="text-sm font-medium mb-2 block">Notas (opcional)</label>
            <textarea
              placeholder="Instrucciones adicionales para los atletas..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full px-3 py-2.5 bg-input rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border flex gap-2 flex-shrink-0">
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-muted rounded-xl text-sm hover:bg-muted/80 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleAssign}
            disabled={selectedAthletes.length === 0}
            className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl text-sm hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Asignar
          </button>
        </div>
      </div>
    </div>
  );
}
