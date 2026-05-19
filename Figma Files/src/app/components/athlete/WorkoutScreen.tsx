import { useState, useEffect, useRef, useCallback } from 'react';
import { X, Pause, Play, Flag, ChevronRight, Heart, Zap, Timer, Flame } from 'lucide-react';

export interface WorkoutInfo {
  id: string;
  name: string;
  category: string;
  stages: string[];
}

interface WorkoutScreenProps {
  workout: WorkoutInfo;
  startedAt: number;   // Date.now() at start
  pausedMs: number;    // ms already paused before this session
  isPaused: boolean;
  pausedAt: number | null;
  onPause: () => void;
  onResume: () => void;
  onExit: () => void;
  onFinish: (durationSec: number) => void;
}

// Simulated wearable base values that drift slightly each second
function useMetrics(running: boolean) {
  const [metrics, setMetrics] = useState({ hr: 142, pace: 5.28, cadence: 172, calories: 64 });
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setMetrics(prev => ({
        hr:       clamp(prev.hr       + jitter(3),    60, 195),
        pace:     clamp(prev.pace     + jitter(0.05), 4,  8),
        cadence:  clamp(prev.cadence  + jitter(2),    140, 200),
        calories: prev.calories + 0.18 + Math.random() * 0.1,
      }));
    }, 1000);
    return () => clearInterval(id);
  }, [running]);
  return metrics;
}

function clamp(v: number, min: number, max: number) { return Math.min(max, Math.max(min, v)); }
function jitter(range: number) { return (Math.random() - 0.5) * 2 * range; }

function formatTime(totalSec: number) {
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (h > 0) return `${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

function formatPace(paceDecimal: number) {
  const min = Math.floor(paceDecimal);
  const sec = Math.round((paceDecimal - min) * 60);
  return `${min}:${String(sec).padStart(2,'0')}`;
}

export default function WorkoutScreen({
  workout, startedAt, pausedMs, isPaused, pausedAt,
  onPause, onResume, onExit, onFinish,
}: WorkoutScreenProps) {
  const [elapsed, setElapsed] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const [showFinishConfirm, setShowFinishConfirm] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const metrics = useMetrics(!isPaused);

  // Tick the stopwatch
  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      const now = Date.now();
      const paused = pausedMs + (pausedAt ? 0 : 0); // pausedAt is null when running
      setElapsed(Math.floor((now - startedAt - pausedMs) / 1000));
    }, 500);
    return () => clearInterval(id);
  }, [isPaused, startedAt, pausedMs, pausedAt]);

  const hrZone = metrics.hr < 120 ? { label: 'Zona 1', color: 'text-blue-400' }
               : metrics.hr < 140 ? { label: 'Zona 2', color: 'text-green-400' }
               : metrics.hr < 160 ? { label: 'Zona 3', color: 'text-primary' }
               : metrics.hr < 175 ? { label: 'Zona 4', color: 'text-orange-400' }
               :                    { label: 'Zona 5', color: 'text-red-400' };

  const handleFinish = () => {
    setShowFinishConfirm(false);
    onFinish(elapsed);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: '#0d1f26', maxWidth: '480px', margin: '0 auto' }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <button
          onClick={() => setShowExitConfirm(true)}
          className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          <X className="w-4 h-4 text-white" />
        </button>

        <div className="text-center">
          <p className="text-xs text-white/50 uppercase tracking-wider">{workout.category}</p>
          <p className="text-sm text-white/80 max-w-[180px] truncate">{workout.name}</p>
        </div>

        <button
          onClick={isPaused ? onResume : onPause}
          className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          {isPaused ? <Play className="w-4 h-4 text-white" /> : <Pause className="w-4 h-4 text-white" />}
        </button>
      </div>

      {/* Paused banner */}
      {isPaused && (
        <div className="mx-5 bg-amber-500/20 border border-amber-500/40 rounded-xl px-4 py-2 text-center">
          <p className="text-xs text-amber-300">⏸ Entrenamiento pausado</p>
        </div>
      )}

      {/* Stopwatch */}
      <div className="flex flex-col items-center justify-center py-6">
        <div
          className="text-7xl tracking-tight tabular-nums"
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 700,
            color: isPaused ? 'rgba(196,255,14,0.5)' : '#c4ff0e',
            textShadow: isPaused ? 'none' : '0 0 30px rgba(196,255,14,0.35)',
          }}
        >
          {formatTime(elapsed)}
        </div>
        <p className="text-xs text-white/40 mt-1 uppercase tracking-widest">Tiempo activo</p>
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 gap-3 px-5 mb-4">
        <MetricCard
          icon={<Heart className="w-4 h-4" />}
          label="Frec. cardíaca"
          value={`${Math.round(metrics.hr)}`}
          unit="bpm"
          sublabel={hrZone.label}
          sublabelColor={hrZone.color}
          accent="#f43f5e"
        />
        <MetricCard
          icon={<Timer className="w-4 h-4" />}
          label="Ritmo"
          value={formatPace(metrics.pace)}
          unit="min/km"
          accent="#38bdf8"
        />
        <MetricCard
          icon={<Zap className="w-4 h-4" />}
          label="Cadencia"
          value={`${Math.round(metrics.cadence)}`}
          unit="spm"
          accent="#c4ff0e"
        />
        <MetricCard
          icon={<Flame className="w-4 h-4" />}
          label="Calorías"
          value={`${Math.round(metrics.calories)}`}
          unit="kcal"
          accent="#f97316"
        />
      </div>

      {/* Current workout plan */}
      <div className="mx-5 mb-4 bg-white/5 rounded-2xl p-4 border border-white/10 flex-1 overflow-y-auto">
        <p className="text-xs text-white/40 uppercase tracking-wider mb-3">Etapas del entrenamiento</p>
        <div className="space-y-2">
          {workout.stages.map((stage, i) => {
            const isActive = i === currentStage;
            const isDone = i < currentStage;
            return (
              <button
                key={i}
                onClick={() => setCurrentStage(i)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                  isActive ? 'bg-primary/20 border border-primary/40'
                  : isDone  ? 'bg-white/5 opacity-50'
                  :           'bg-white/5'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                  isActive ? 'bg-primary text-black'
                  : isDone  ? 'bg-white/20 text-white/50'
                  :           'border border-white/20 text-white/30'
                }`}>
                  {isDone ? '✓' : i + 1}
                </div>
                <p className={`text-sm flex-1 ${isActive ? 'text-white' : 'text-white/50'}`}>{stage}</p>
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-primary shrink-0" />}
              </button>
            );
          })}
        </div>
        {currentStage < workout.stages.length - 1 && (
          <button
            onClick={() => setCurrentStage(s => Math.min(s + 1, workout.stages.length - 1))}
            className="mt-3 w-full text-xs text-primary/70 hover:text-primary py-1 transition-colors"
          >
            Siguiente etapa →
          </button>
        )}
      </div>

      {/* Finish button */}
      <div className="px-5 pb-8 pt-2">
        <button
          onClick={() => setShowFinishConfirm(true)}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-white font-semibold"
          style={{ background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', boxShadow: '0 4px 20px rgba(239,68,68,0.35)' }}
        >
          <Flag className="w-5 h-5" />
          Finalizar entrenamiento
        </button>
      </div>

      {/* Finish confirm overlay */}
      {showFinishConfirm && (
        <Overlay onClose={() => setShowFinishConfirm(false)}>
          <p className="text-white mb-1">¿Finalizar entrenamiento?</p>
          <p className="text-sm text-white/50 mb-5">Tiempo: <span className="text-primary">{formatTime(elapsed)}</span></p>
          <div className="flex gap-3">
            <button onClick={() => setShowFinishConfirm(false)} className="flex-1 py-3 rounded-xl bg-white/10 text-white text-sm">Continuar</button>
            <button onClick={handleFinish} className="flex-1 py-3 rounded-xl text-white text-sm font-semibold" style={{ background: '#ef4444' }}>Finalizar</button>
          </div>
        </Overlay>
      )}

      {/* Exit confirm overlay */}
      {showExitConfirm && (
        <Overlay onClose={() => setShowExitConfirm(false)}>
          <p className="text-white mb-1">¿Salir del entrenamiento?</p>
          <p className="text-sm text-white/50 mb-5">El cronómetro seguirá corriendo en segundo plano. Verás una alerta en el inicio.</p>
          <div className="flex gap-3">
            <button onClick={() => setShowExitConfirm(false)} className="flex-1 py-3 rounded-xl bg-white/10 text-white text-sm">Cancelar</button>
            <button onClick={onExit} className="flex-1 py-3 rounded-xl bg-amber-500 text-black text-sm font-semibold">Salir</button>
          </div>
        </Overlay>
      )}
    </div>
  );
}

function MetricCard({
  icon, label, value, unit, sublabel, sublabelColor = 'text-muted-foreground', accent,
}: {
  icon: React.ReactNode; label: string; value: string; unit: string;
  sublabel?: string; sublabelColor?: string; accent: string;
}) {
  return (
    <div className="rounded-2xl p-4 border border-white/10" style={{ background: `${accent}12` }}>
      <div className="flex items-center gap-1.5 mb-2" style={{ color: accent }}>
        {icon}
        <p className="text-xs text-white/50">{label}</p>
      </div>
      <p className="text-2xl tabular-nums text-white" style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 700 }}>
        {value}
      </p>
      <div className="flex items-center justify-between mt-0.5">
        <p className="text-xs text-white/40">{unit}</p>
        {sublabel && <p className={`text-xs ${sublabelColor}`}>{sublabel}</p>}
      </div>
    </div>
  );
}

function Overlay({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/70" onClick={onClose}>
      <div className="bg-[#0d1f26] border border-white/10 rounded-2xl p-5 mx-6 w-full max-w-xs" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
