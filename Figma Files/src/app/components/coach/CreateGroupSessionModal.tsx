import { useState } from 'react';
import { X, Users, MapPin, Clock, Calendar } from 'lucide-react';

const MOCK_PLANS = [
  { id: 'plan-1', nombre: 'Plan Mensual', precio: 50000, frecuencia: 'mensual' },
  { id: 'plan-2', nombre: 'Plan Semanal', precio: 15000, frecuencia: 'semanal' },
  { id: 'plan-3', nombre: 'Plan Premium', precio: 80000, frecuencia: 'mensual' },
];

const ACTIVITY_TYPES = [
  'Trail Running', 'Running', 'Ciclismo', 'Natación', 'Fuerza', 'Yoga',
  'CrossFit', 'Escalada', 'Remo', 'Técnica', 'Otro',
];

interface CreateGroupSessionModalProps {
  onClose: () => void;
  onCreate: (session: GroupSession) => void;
  initialDate?: Date;
}

export interface GroupSession {
  id: number;
  date: string;
  time: string;
  title: string;
  type: string;
  location: string;
  maxParticipants: number;
  participants: number;
  allowedPlanIds: string[];
  notes: string;
}

export default function CreateGroupSessionModal({ onClose, onCreate, initialDate }: CreateGroupSessionModalProps) {
  const todayStr = initialDate
    ? `${initialDate.getFullYear()}-${String(initialDate.getMonth() + 1).padStart(2, '0')}-${String(initialDate.getDate()).padStart(2, '0')}`
    : '2026-05-29';

  const [title, setTitle] = useState('');
  const [type, setType] = useState(ACTIVITY_TYPES[0]);
  const [date, setDate] = useState(todayStr);
  const [time, setTime] = useState('08:00');
  const [location, setLocation] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('10');
  const [notes, setNotes] = useState('');
  const [selectedPlanIds, setSelectedPlanIds] = useState<string[]>(MOCK_PLANS.map(p => p.id));
  const [allTiers, setAllTiers] = useState(true);

  const togglePlan = (id: string) => {
    setSelectedPlanIds(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleToggleAll = () => {
    if (allTiers) {
      setAllTiers(false);
      setSelectedPlanIds([]);
    } else {
      setAllTiers(true);
      setSelectedPlanIds(MOCK_PLANS.map(p => p.id));
    }
  };

  const handleCreate = () => {
    if (!title.trim() || !date || !time) return;
    onCreate({
      id: Date.now(),
      date,
      time,
      title: title.trim(),
      type,
      location: location.trim(),
      maxParticipants: Math.max(1, parseInt(maxParticipants) || 10),
      participants: 0,
      allowedPlanIds: allTiers ? MOCK_PLANS.map(p => p.id) : selectedPlanIds,
      notes: notes.trim(),
    });
    onClose();
  };

  const isValid = title.trim().length > 0 && date && time && (allTiers || selectedPlanIds.length > 0);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full sm:max-w-md bg-background rounded-t-2xl sm:rounded-2xl border border-border overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <Users className="w-5 h-5 text-purple-400" />
            </div>
            <h2>Nueva sesión grupal</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-muted transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-4 space-y-4 flex-1">
          {/* Title */}
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Título *</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Ej: Trail Running Grupal"
              className="w-full bg-muted/50 rounded-xl px-4 py-3 text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* Type */}
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Tipo de actividad</label>
            <select
              value={type}
              onChange={e => setType(e.target.value)}
              className="w-full bg-muted/50 rounded-xl px-4 py-3 text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {ACTIVITY_TYPES.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Fecha *
              </label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full bg-muted/50 rounded-xl px-3 py-3 text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Hora *
              </label>
              <input
                type="time"
                value={time}
                onChange={e => setTime(e.target.value)}
                className="w-full bg-muted/50 rounded-xl px-3 py-3 text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> Lugar
            </label>
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="Ej: Parque Forestal"
              className="w-full bg-muted/50 rounded-xl px-4 py-3 text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* Max participants */}
          <div>
            <label className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
              <Users className="w-3.5 h-3.5" /> Máximo de participantes
            </label>
            <input
              type="number"
              min="1"
              max="200"
              value={maxParticipants}
              onChange={e => setMaxParticipants(e.target.value)}
              className="w-full bg-muted/50 rounded-xl px-4 py-3 text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* Tier access */}
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Acceso por plan de suscripción</label>
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              {/* All tiers toggle */}
              <button
                onClick={handleToggleAll}
                className="w-full flex items-center justify-between p-3 hover:bg-muted/30 transition-colors border-b border-border"
              >
                <span className="text-sm font-medium">Todos los planes</span>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  allTiers ? 'bg-primary border-primary' : 'border-muted-foreground'
                }`}>
                  {allTiers && <div className="w-2 h-2 rounded-full bg-primary-foreground" />}
                </div>
              </button>

              {/* Individual plans */}
              {!allTiers && MOCK_PLANS.map((plan, i) => (
                <button
                  key={plan.id}
                  onClick={() => togglePlan(plan.id)}
                  className={`w-full flex items-center justify-between p-3 hover:bg-muted/30 transition-colors ${
                    i < MOCK_PLANS.length - 1 ? 'border-b border-border' : ''
                  }`}
                >
                  <div className="text-left">
                    <p className="text-sm">{plan.nombre}</p>
                    <p className="text-xs text-muted-foreground">
                      ${plan.precio.toLocaleString('es-CL')} / {plan.frecuencia}
                    </p>
                  </div>
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    selectedPlanIds.includes(plan.id) ? 'bg-primary border-primary' : 'border-muted-foreground'
                  }`}>
                    {selectedPlanIds.includes(plan.id) && (
                      <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {!allTiers && selectedPlanIds.length === 0 && (
              <p className="text-xs text-amber-400 mt-1">Selecciona al menos un plan</p>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Notas (opcional)</label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Indicaciones para los atletas..."
              rows={3}
              className="w-full bg-muted/50 rounded-xl px-4 py-3 text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border flex gap-3 shrink-0">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-border hover:bg-muted/50 transition-colors text-sm"
          >
            Cancelar
          </button>
          <button
            onClick={handleCreate}
            disabled={!isValid}
            className="flex-1 py-3 rounded-xl bg-purple-600 text-white hover:bg-purple-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm font-medium"
          >
            Crear sesión
          </button>
        </div>
      </div>
    </div>
  );
}
