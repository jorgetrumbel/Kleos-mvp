import { useState, useMemo } from 'react';
import { X, Search, Calendar, Dumbbell, BookOpen, Check, ChevronDown, Layers } from 'lucide-react';
import type { SavedPlan } from './plan/types';
import { BLOCK_TYPE_CONFIG } from './plan/types';

// ─── Mock library (mirrors CoachPlan INITIAL_PLANS) ───────────────────────────

const LIBRARY_PLANS: SavedPlan[] = [
  {
    id: 'p1',
    plan: {
      planName: 'Plan Base - Semana 1',
      planNotes: 'Primera semana de entrenamiento base. Foco en aeróbico y técnica básica.',
      blocks: [
        {
          id: 'b1', name: 'Calentamiento', type: 'Cardio', comments: '', collapsed: false,
          exercises: [
            { id: 'e1', name: 'Caminata Rápida', duration: '10 min', intensity: 'Zona 1', notes: '' },
            { id: 'e2', name: 'Stretching Dinámico', duration: '5 min', intensity: 'Suave', notes: '' },
          ],
        },
        {
          id: 'b2', name: 'Bloque Principal', type: 'Cardio', comments: '', collapsed: false,
          exercises: [
            { id: 'e3', name: 'Carrera Continua', duration: '30 min', intensity: 'Zona 2', notes: '' },
          ],
        },
        {
          id: 'b3', name: 'Vuelta a la Calma', type: 'Flexibilidad', comments: '', collapsed: false,
          exercises: [
            { id: 'e4', name: 'Foam Roller General', duration: '10 min', intensity: 'Suave', notes: '' },
            { id: 'e5', name: 'Estiramiento Isquiotibiales', duration: '60 seg', intensity: 'Suave', notes: '' },
          ],
        },
      ],
      files: [],
    },
    planType: 'group',
    category: 'Entrenamiento Base',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: 'p2',
    plan: {
      planName: 'Fuerza - Ciclo 4 Semanas',
      planNotes: 'Ciclo de fuerza con progresión lineal.',
      blocks: [
        {
          id: 'b4', name: 'Tren Inferior', type: 'Halterofilia', comments: '', collapsed: false,
          exercises: [
            { id: 'e6', name: 'Sentadilla Trasera', sets: '4', reps: '8', intensity: 'RPE 7', notes: '' },
            { id: 'e7', name: 'Peso Muerto Rumano', sets: '3', reps: '10', intensity: 'RPE 7', notes: '' },
          ],
        },
        {
          id: 'b5', name: 'Core', type: 'Halterofilia', comments: '', collapsed: false,
          exercises: [
            { id: 'e8', name: 'Plancha', duration: '3x60s', intensity: 'RPE 6', notes: '' },
          ],
        },
      ],
      files: [],
    },
    planType: 'single',
    category: 'Entrenamiento de Fuerza',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-10'),
  },
  {
    id: 'p3',
    plan: {
      planName: 'Preparación 10K',
      planNotes: 'Semana de velocidad e intervalos.',
      blocks: [
        {
          id: 'b6', name: 'Velocidad e Intervalos', type: 'Deporte Específico', comments: '', collapsed: false,
          exercises: [
            { id: 'e9', name: '8x400m', duration: '400m', intensity: 'Ritmo objetivo 10K', notes: '' },
            { id: 'e10', name: 'Recuperación 90s entre series', duration: '90 seg', intensity: 'Suave', notes: '' },
          ],
        },
        {
          id: 'b7', name: 'Recuperación Activa', type: 'Recuperación', comments: '', collapsed: false,
          exercises: [
            { id: 'e11', name: 'Trote Suave', duration: '15 min', intensity: 'Zona 1', notes: '' },
          ],
        },
      ],
      files: [],
    },
    planType: 'group',
    category: 'Pico / Preparación Carrera',
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-20'),
  },
  {
    id: 'p4',
    plan: {
      planName: 'Semana de Descarga',
      planNotes: 'Reducción de volumen, movilidad y recuperación activa.',
      blocks: [
        {
          id: 'b8', name: 'Movilidad y Recuperación', type: 'Recuperación', comments: '', collapsed: false,
          exercises: [
            { id: 'e12', name: 'Yoga Restaurativo', duration: '30 min', intensity: 'Suave', notes: '' },
          ],
        },
        {
          id: 'b9', name: 'Flexibilidad', type: 'Flexibilidad', comments: '', collapsed: false,
          exercises: [
            { id: 'e13', name: 'Stretching Global', duration: '20 min', intensity: 'Suave', notes: '' },
          ],
        },
      ],
      files: [],
    },
    planType: 'single',
    category: 'Semana de Recuperación',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-05'),
  },
];

const SPORTS = [
  'Trail Running', 'Carrera', 'Ciclismo', 'Natación',
  'Fuerza', 'Yoga', 'CrossFit', 'Escalada', 'Remo', 'Caminata',
];

type Frequency = 'once' | 'daily' | 'weekly';

const FREQ_LABELS: Record<Frequency, string> = {
  once: 'Una vez',
  daily: 'Diario',
  weekly: 'Semanal',
};

// ─── Props ────────────────────────────────────────────────────────────────────

interface CoachAddWorkoutModalProps {
  onClose: () => void;
  onAddManual: (sport: string, date: string) => void;
  onAssignPlan: (plan: SavedPlan, date: string, frequency: Frequency) => void;
  athleteName: string;
  initialDate?: Date;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function totalExercises(plan: SavedPlan) {
  return plan.plan.blocks.reduce((sum, b) => sum + b.exercises.length, 0);
}

function dateStr(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function CoachAddWorkoutModal({
  onClose, onAddManual, onAssignPlan, athleteName, initialDate,
}: CoachAddWorkoutModalProps) {
  const [tab, setTab] = useState<'library' | 'manual'>('library');

  // Library tab state
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<SavedPlan | null>(null);
  const [assignDate, setAssignDate] = useState(initialDate ? dateStr(initialDate) : dateStr(new Date(2026, 4, 29)));
  const [frequency, setFrequency] = useState<Frequency>('once');

  // Manual tab state
  const [selectedSport, setSelectedSport] = useState('');
  const [manualDate, setManualDate] = useState(initialDate ? dateStr(initialDate) : dateStr(new Date(2026, 4, 29)));

  // All unique categories
  const categories = useMemo(
    () => Array.from(new Set(LIBRARY_PLANS.map(p => p.category))),
    []
  );

  // Filtered plans
  const filteredPlans = useMemo(() => {
    return LIBRARY_PLANS.filter(p => {
      const matchesSearch = p.plan.planName.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !categoryFilter || p.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [search, categoryFilter]);

  const handleAssign = () => {
    if (!selectedPlan) return;
    onAssignPlan(selectedPlan, assignDate, frequency);
    onClose();
  };

  const handleManualAdd = () => {
    if (!selectedSport || !manualDate) return;
    onAddManual(selectedSport, manualDate);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full sm:max-w-md bg-background rounded-t-2xl sm:rounded-2xl border border-border flex flex-col max-h-[92vh] overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border shrink-0">
          <div>
            <h2 className="text-base font-medium">Agregar entrenamiento</h2>
            <p className="text-xs text-muted-foreground">{athleteName}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-muted transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border shrink-0">
          <button
            onClick={() => setTab('library')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors border-b-2 ${
              tab === 'library'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Desde biblioteca
          </button>
          <button
            onClick={() => setTab('manual')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors border-b-2 ${
              tab === 'manual'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Dumbbell className="w-4 h-4" />
            Manual
          </button>
        </div>

        {/* ── LIBRARY TAB ── */}
        {tab === 'library' && (
          <>
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 space-y-3">

                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Buscar plan..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-muted/50 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>

                {/* Category chips */}
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                  <button
                    onClick={() => setCategoryFilter(null)}
                    className={`px-3 py-1 rounded-full text-xs font-medium shrink-0 transition-colors ${
                      !categoryFilter
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    Todos
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat === categoryFilter ? null : cat)}
                      className={`px-3 py-1 rounded-full text-xs font-medium shrink-0 transition-colors ${
                        categoryFilter === cat
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Plan list */}
                {filteredPlans.length === 0 ? (
                  <div className="py-8 text-center">
                    <p className="text-sm text-muted-foreground">No se encontraron planes</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredPlans.map(plan => {
                      const isSelected = selectedPlan?.id === plan.id;
                      const exerciseCount = totalExercises(plan);

                      return (
                        <button
                          key={plan.id}
                          onClick={() => setSelectedPlan(isSelected ? null : plan)}
                          className={`w-full text-left rounded-xl border-2 p-4 transition-all ${
                            isSelected
                              ? 'border-primary bg-primary/5'
                              : 'border-border bg-card hover:border-primary/40'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <p className="text-sm font-medium leading-snug">{plan.plan.planName}</p>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                              isSelected ? 'border-primary bg-primary' : 'border-muted-foreground'
                            }`}>
                              {isSelected && <Check className="w-3 h-3 text-primary-foreground" strokeWidth={3} />}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 flex-wrap mb-2">
                            <span className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground">
                              {plan.category}
                            </span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              plan.planType === 'group' ? 'bg-purple-500/15 text-purple-400' : 'bg-primary/15 text-primary'
                            }`}>
                              {plan.planType === 'group' ? 'Grupal' : 'Individual'}
                            </span>
                          </div>

                          {/* Blocks preview */}
                          <div className="flex flex-wrap gap-1.5">
                            {plan.plan.blocks.map(block => {
                              const cfg = BLOCK_TYPE_CONFIG[block.type] ?? {
                                label: block.type, color: 'text-gray-400', bgColor: 'bg-gray-500/20',
                              };
                              return (
                                <span
                                  key={block.id}
                                  className={`text-[10px] px-2 py-0.5 rounded-full ${cfg.bgColor} ${cfg.color}`}
                                >
                                  {block.name}
                                </span>
                              );
                            })}
                          </div>

                          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Layers className="w-3 h-3" />
                              {plan.plan.blocks.length} bloques
                            </span>
                            <span className="flex items-center gap-1">
                              <Dumbbell className="w-3 h-3" />
                              {exerciseCount} ejercicios
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Assignment options — shown when a plan is selected */}
                {selectedPlan && (
                  <div className="bg-card rounded-xl border border-border p-4 space-y-3">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      Configuración de asignación
                    </p>

                    {/* Date */}
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> Fecha de inicio
                      </label>
                      <input
                        type="date"
                        value={assignDate}
                        onChange={e => setAssignDate(e.target.value)}
                        className="w-full bg-muted/50 rounded-xl px-4 py-2.5 text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/40"
                        style={{ colorScheme: 'dark' }}
                      />
                    </div>

                    {/* Frequency */}
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Frecuencia</label>
                      <div className="grid grid-cols-3 gap-2">
                        {(Object.keys(FREQ_LABELS) as Frequency[]).map(f => (
                          <button
                            key={f}
                            onClick={() => setFrequency(f)}
                            className={`py-2 rounded-xl text-xs font-medium transition-all ${
                              frequency === f
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-muted-foreground border border-border hover:border-primary/50'
                            }`}
                          >
                            {FREQ_LABELS[f]}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
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
                onClick={handleAssign}
                disabled={!selectedPlan}
                className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm font-medium"
              >
                Asignar plan
              </button>
            </div>
          </>
        )}

        {/* ── MANUAL TAB ── */}
        {tab === 'manual' && (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Date */}
              <div>
                <label className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Fecha
                </label>
                <input
                  type="date"
                  value={manualDate}
                  onChange={e => setManualDate(e.target.value)}
                  className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
                  style={{ colorScheme: 'dark' }}
                />
              </div>

              {/* Sport grid */}
              <div>
                <label className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                  <Dumbbell className="w-4 h-4" /> Tipo de actividad
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {SPORTS.map(sport => (
                    <button
                      key={sport}
                      onClick={() => setSelectedSport(sport)}
                      className={`p-3 rounded-xl border transition-all text-sm ${
                        selectedSport === sport
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-card border-border hover:bg-muted/50'
                      }`}
                    >
                      {sport}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border flex gap-3 shrink-0">
              <button
                onClick={onClose}
                className="flex-1 py-3 bg-muted text-foreground rounded-xl hover:bg-muted/80 transition-colors text-sm font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleManualAdd}
                disabled={!selectedSport}
                className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Agregar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
