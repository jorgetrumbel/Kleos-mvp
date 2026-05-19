import { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';

export interface RPEResult {
  sessionId: string;
  rpe: number;
  comment: string;
}

interface RPEModalProps {
  sessionId: string;
  sessionName: string;
  duration: string;
  onSubmit: (result: RPEResult) => void;
  onSkip: (sessionId: string) => void;
}

const RPE_LEVELS = [
  { value: 1,  label: 'Muy suave',    color: '#22d3ee', bg: 'rgba(34,211,238,0.15)' },
  { value: 2,  label: 'Suave',        color: '#22d3ee', bg: 'rgba(34,211,238,0.15)' },
  { value: 3,  label: 'Moderado',     color: '#4ade80', bg: 'rgba(74,222,128,0.15)' },
  { value: 4,  label: 'Moderado',     color: '#4ade80', bg: 'rgba(74,222,128,0.15)' },
  { value: 5,  label: 'Algo intenso', color: '#c4ff0e', bg: 'rgba(196,255,14,0.15)' },
  { value: 6,  label: 'Algo intenso', color: '#c4ff0e', bg: 'rgba(196,255,14,0.15)' },
  { value: 7,  label: 'Intenso',      color: '#fb923c', bg: 'rgba(251,146,60,0.15)' },
  { value: 8,  label: 'Muy intenso',  color: '#fb923c', bg: 'rgba(251,146,60,0.15)' },
  { value: 9,  label: 'Extremo',      color: '#f87171', bg: 'rgba(248,113,113,0.15)' },
  { value: 10, label: 'Máximo',       color: '#ef4444', bg: 'rgba(239,68,68,0.15)' },
];

const ZONE_LABELS = [
  { range: [1,2],  label: 'Recuperación', color: '#22d3ee' },
  { range: [3,4],  label: 'Aeróbico',     color: '#4ade80' },
  { range: [5,6],  label: 'Umbral',       color: '#c4ff0e' },
  { range: [7,8],  label: 'Anaeróbico',   color: '#fb923c' },
  { range: [9,10], label: 'VO₂ máx',      color: '#ef4444' },
];

function getZone(rpe: number) {
  return ZONE_LABELS.find(z => rpe >= z.range[0] && rpe <= z.range[1])!;
}

export default function RPEModal({ sessionId, sessionName, duration, onSubmit, onSkip }: RPEModalProps) {
  const [rpe, setRpe] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const selected = rpe !== null ? RPE_LEVELS[rpe - 1] : null;
  const zone = rpe !== null ? getZone(rpe) : null;

  const handleSubmit = () => {
    if (rpe === null) return;
    setSubmitted(true);
    setTimeout(() => {
      onSubmit({ sessionId, rpe, comment });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-end justify-center z-50">
      <div
        className="bg-card rounded-t-3xl w-full max-w-md max-h-[90vh] overflow-y-auto"
        style={{ boxShadow: '0 -8px 40px rgba(0,0,0,0.6)' }}
      >
        {/* Handle */}
        <div className="w-10 h-1 bg-muted rounded-full mx-auto mt-4 mb-1" />

        {submitted ? (
          <div className="flex flex-col items-center gap-4 px-6 py-10">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <p className="text-lg text-center">¡Esfuerzo registrado!</p>
            <p className="text-sm text-muted-foreground text-center">
              RPE <span className="text-primary font-medium">{rpe}/10</span> guardado para {sessionName}.
            </p>
          </div>
        ) : (
          <div className="px-5 pb-8 pt-3">
            {/* Header */}
            <div className="flex items-start justify-between mb-1">
              <div className="flex-1 min-w-0">
                <h2 className="text-base">¿Cómo fue el esfuerzo?</h2>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">{sessionName} · {duration}</p>
              </div>
              <button
                onClick={() => onSkip(sessionId)}
                className="ml-3 shrink-0 text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 pt-0.5"
              >
                <X className="w-3.5 h-3.5" /> Omitir
              </button>
            </div>

            {/* RPE description */}
            <p className="text-xs text-muted-foreground mb-4">
              Escala de Percepción del Esfuerzo (RPE) — selecciona del 1 (muy suave) al 10 (máximo esfuerzo).
            </p>

            {/* RPE selector */}
            <div className="grid grid-cols-5 gap-2 mb-3">
              {RPE_LEVELS.map(level => {
                const isSelected = rpe === level.value;
                return (
                  <button
                    key={level.value}
                    onClick={() => setRpe(level.value)}
                    className="flex flex-col items-center gap-1 py-3 rounded-xl transition-all border-2"
                    style={{
                      borderColor: isSelected ? level.color : 'transparent',
                      background: isSelected ? level.bg : 'rgba(255,255,255,0.04)',
                    }}
                  >
                    <span
                      className="text-xl font-bold"
                      style={{
                        fontFamily: 'Montserrat,sans-serif',
                        color: isSelected ? level.color : 'rgba(255,255,255,0.4)',
                      }}
                    >
                      {level.value}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected label */}
            <div className="h-8 flex items-center justify-center mb-4">
              {selected && zone && (
                <div className="flex items-center gap-2">
                  <span className="text-sm" style={{ color: selected.color }}>{selected.label}</span>
                  <span className="text-xs text-muted-foreground">·</span>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ color: zone.color, background: `${zone.color}15` }}>
                    {zone.label}
                  </span>
                </div>
              )}
            </div>

            {/* Zone bar */}
            <div className="flex gap-1 mb-5 h-1.5 rounded-full overflow-hidden">
              {ZONE_LABELS.map(z => (
                <div
                  key={z.label}
                  className="flex-1 rounded-full transition-opacity"
                  style={{
                    background: z.color,
                    opacity: rpe !== null && rpe >= z.range[0] && rpe <= z.range[1] ? 1 : 0.25,
                  }}
                />
              ))}
            </div>

            {/* Comment */}
            <div className="mb-5">
              <label className="text-xs text-muted-foreground mb-1.5 block">Comentario (opcional)</label>
              <textarea
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="¿Cómo te sentiste? ¿Algo a destacar del entrenamiento?"
                rows={3}
                className="w-full px-4 py-3 bg-muted/40 rounded-xl border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => onSkip(sessionId)}
                className="flex-1 py-3 rounded-xl border border-border text-muted-foreground text-sm hover:bg-muted/40 transition-colors"
              >
                Omitir
              </button>
              <button
                onClick={handleSubmit}
                disabled={rpe === null}
                className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
              >
                Guardar RPE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
