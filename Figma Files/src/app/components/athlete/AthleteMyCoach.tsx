import { useState, useRef } from 'react';
import {
  ArrowLeft, Star, MapPin, Calendar, MessageCircle,
  UserX, Search, CheckCircle, ChevronRight, X,
} from 'lucide-react';

interface AthleteMyCoachProps {
  onBack: () => void;
  onGoToChat: () => void;
}

const MOCK_COACH = {
  initial: 'T',
  name: 'Tomás Johansson',
  specialty: 'Running & Triatlón',
  location: 'Buenos Aires, AR',
  since: 'Enero 2026',
  rating: 4.9,
  reviews: 38,
  sessions: 24,
  weeks: 18,
  bio: 'Entrenador certificado con más de 10 años de experiencia en running y triatlón. Especializado en planificación de temporadas y preparación para competencias.',
};

type View = 'profile' | 'change' | 'changeSuccess' | 'noCoach';

export default function AthleteMyCoach({ onBack, onGoToChat }: AthleteMyCoachProps) {
  const [view, setView] = useState<View>('profile');
  const [code, setCode] = useState('');
  const [foundCoach, setFoundCoach] = useState<typeof MOCK_COACH | null>(null);
  const [codeError, setCodeError] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSearchCode = () => {
    setCodeError('');
    if (code.trim().toUpperCase() === 'CARL-2026-FZQX') {
      setFoundCoach({
        initial: 'C',
        name: 'Carlos Mendoza',
        specialty: 'Running & Triatlón',
        location: 'Mendoza, AR',
        since: '',
        rating: 4.8,
        reviews: 21,
        sessions: 0,
        weeks: 0,
        bio: 'Coach especializado en running de montaña y competencias de triatlón.',
      });
    } else if (code.trim() !== '') {
      setCodeError('Código no encontrado. Verifica e intenta de nuevo.');
    }
  };

  const handleConfirmChange = () => {
    setShowConfirm(false);
    setView('changeSuccess');
  };

  // ── No coach state ──────────────────────────────────────────────────────────
  if (view === 'noCoach') {
    return (
      <div className="h-full overflow-y-auto pb-20">
        <Header title="Mi entrenador" onBack={onBack} />
        <LinkCoachForm
          code={code}
          setCode={setCode}
          foundCoach={foundCoach}
          codeError={codeError}
          onSearch={handleSearchCode}
          onConfirm={() => setView('changeSuccess')}
        />
      </div>
    );
  }

  // ── Change success ──────────────────────────────────────────────────────────
  if (view === 'changeSuccess') {
    return (
      <div className="h-full overflow-y-auto pb-20">
        <Header title="Mi entrenador" onBack={onBack} />
        <div className="flex flex-col items-center gap-4 p-8 mt-8">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-primary" />
          </div>
          <p className="text-lg text-center">¡Entrenador vinculado!</p>
          <p className="text-sm text-muted-foreground text-center">
            Ahora estás conectado con {foundCoach?.name ?? 'tu nuevo coach'}. Ya puede ver tu perfil y asignarte planes.
          </p>
          <button
            onClick={onBack}
            className="w-full bg-primary text-primary-foreground py-3 rounded-xl"
          >
            Volver a configuración
          </button>
        </div>
      </div>
    );
  }

  // ── Change coach form ───────────────────────────────────────────────────────
  if (view === 'change') {
    return (
      <div className="h-full overflow-y-auto pb-20">
        <Header title="Cambiar entrenador" onBack={() => { setView('profile'); setFoundCoach(null); setCode(''); setCodeError(''); }} />
        <div className="p-4">
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-5 flex gap-3">
            <UserX className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-300 leading-relaxed">
              Al cambiar de entrenador perderás acceso a los planes asignados por Tomás Johansson. Esta acción no se puede deshacer.
            </p>
          </div>
          <LinkCoachForm
            code={code}
            setCode={setCode}
            foundCoach={foundCoach}
            codeError={codeError}
            onSearch={handleSearchCode}
            onConfirm={() => setShowConfirm(true)}
            confirmLabel="Cambiar a este coach"
          />
        </div>

        {/* Confirm modal */}
        {showConfirm && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setShowConfirm(false)}>
            <div className="bg-card rounded-2xl p-5 w-full max-w-xs" onClick={e => e.stopPropagation()}>
              <h3 className="mb-2">¿Confirmar cambio?</h3>
              <p className="text-sm text-muted-foreground mb-5">
                Dejarás de estar vinculado a <span className="text-foreground">Tomás Johansson</span> y te conectarás con <span className="text-foreground">{foundCoach?.name}</span>.
              </p>
              <div className="flex gap-3">
                <button onClick={() => setShowConfirm(false)} className="flex-1 py-2.5 rounded-xl border border-border text-sm">Cancelar</button>
                <button onClick={handleConfirmChange} className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm">Confirmar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── Coach profile ───────────────────────────────────────────────────────────
  return (
    <div className="h-full overflow-y-auto pb-20">
      <Header title="Mi entrenador" onBack={onBack} />

      <div className="p-4 space-y-4">
        {/* Profile card */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="h-20 bg-gradient-to-br from-primary/30 to-primary/5" />
          <div className="px-4 pb-4 -mt-10">
            <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl border-4 border-card mb-3">
              {MOCK_COACH.initial}
            </div>
            <h2 className="text-lg">{MOCK_COACH.name}</h2>
            <p className="text-sm text-primary mb-2">{MOCK_COACH.specialty}</p>

            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{MOCK_COACH.location}</span>
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />Desde {MOCK_COACH.since}</span>
            </div>

            <div className="flex items-center gap-1.5 mb-4">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="text-sm font-medium">{MOCK_COACH.rating}</span>
              <span className="text-xs text-muted-foreground">({MOCK_COACH.reviews} reseñas)</span>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">{MOCK_COACH.bio}</p>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-card rounded-xl p-3 border border-border text-center">
            <p className="text-2xl text-primary">{MOCK_COACH.sessions}</p>
            <p className="text-xs text-muted-foreground mt-0.5">Sesiones juntos</p>
          </div>
          <div className="bg-card rounded-xl p-3 border border-border text-center">
            <p className="text-2xl text-primary">{MOCK_COACH.weeks}</p>
            <p className="text-xs text-muted-foreground mt-0.5">Semanas de entrenamiento</p>
          </div>
        </div>

        {/* Actions */}
        <button
          onClick={onGoToChat}
          className="w-full flex items-center gap-3 bg-primary text-primary-foreground py-3.5 px-5 rounded-xl"
        >
          <MessageCircle className="w-5 h-5" />
          <span>Enviar mensaje</span>
        </button>

        <button
          onClick={() => setView('change')}
          className="w-full flex items-center justify-between p-4 bg-card rounded-xl border border-border hover:bg-muted/40 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
              <UserX className="w-4 h-4 text-muted-foreground" />
            </div>
            <span className="text-sm">Cambiar entrenador</span>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
}

// ── Shared sub-components ─────────────────────────────────────────────────────

function Header({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div className="flex items-center gap-3 p-4 border-b border-border">
      <button onClick={onBack} className="p-2 rounded-full hover:bg-muted transition-colors">
        <ArrowLeft className="w-5 h-5" />
      </button>
      <h1 className="text-lg">{title}</h1>
    </div>
  );
}

interface LinkCoachFormProps {
  code: string;
  setCode: (v: string) => void;
  foundCoach: { initial: string; name: string; specialty: string; location: string; rating: number; reviews: number } | null;
  codeError: string;
  onSearch: () => void;
  onConfirm: () => void;
  confirmLabel?: string;
}

function LinkCoachForm({ code, setCode, foundCoach, codeError, onSearch, onConfirm, confirmLabel = 'Vincular coach' }: LinkCoachFormProps) {
  return (
    <div className="p-4 space-y-4">
      <p className="text-sm text-muted-foreground">
        Ingresa el código único que te compartió tu entrenador para vincularte a su cuenta.
      </p>

      <div className="flex gap-2">
        <div className="flex-1 flex items-center bg-card border border-border rounded-xl px-4 focus-within:border-primary transition-colors">
          <Search className="w-4 h-4 text-muted-foreground shrink-0 mr-2" />
          <input
            type="text"
            placeholder="Ej: CARL-2026-FZQX"
            value={code}
            onChange={e => setCode(e.target.value.toUpperCase())}
            className="flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground/60 tracking-wider"
          />
          {code && (
            <button onClick={() => setCode('')} className="ml-1 text-muted-foreground">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <button
          onClick={onSearch}
          disabled={!code.trim()}
          className="px-4 bg-primary text-primary-foreground rounded-xl text-sm disabled:opacity-40"
        >
          Buscar
        </button>
      </div>

      {codeError && (
        <p className="text-xs text-red-400 px-1">{codeError}</p>
      )}

      {foundCoach && (
        <div className="bg-card rounded-xl border border-primary/40 p-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/30 flex items-center justify-center text-xl font-medium">
              {foundCoach.initial}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium">{foundCoach.name}</p>
              <p className="text-xs text-primary">{foundCoach.specialty}</p>
              <p className="text-xs text-muted-foreground">{foundCoach.location}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <Star className="w-3.5 h-3.5 fill-primary text-primary" />
              <span className="text-sm">{foundCoach.rating}</span>
            </div>
          </div>
          <button
            onClick={onConfirm}
            className="w-full bg-primary text-primary-foreground py-3 rounded-xl text-sm"
          >
            {confirmLabel}
          </button>
        </div>
      )}
    </div>
  );
}
