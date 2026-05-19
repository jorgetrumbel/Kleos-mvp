import { useState } from 'react';
import {
  ArrowLeft, CheckCircle, Clock, CreditCard, ChevronRight,
  Zap, Star, Check,
} from 'lucide-react';
import PaymentModal from './PaymentModal';
import type { SubmittedPayment } from './PaymentModal';

interface AthleteSubscriptionPlanProps {
  onBack: () => void;
  onSubmitPayment: (data: SubmittedPayment) => void;
}

interface CoachPlan {
  id: string;
  name: string;
  price: number;
  sessions: number;
  frequency: string;
  sport: string;
  features: string[];
  popular?: boolean;
}

interface PaymentRecord {
  id: string;
  date: string;
  amount: number;
  status: 'approved' | 'pending' | 'rejected';
  description: string;
}

const COACH_PLANS: CoachPlan[] = [
  {
    id: 'basic',
    name: 'Plan Básico',
    price: 29,
    sessions: 8,
    frequency: 'mensual',
    sport: 'Running',
    features: ['8 sesiones/mes', 'Plan de entrenamiento', 'Seguimiento básico'],
  },
  {
    id: 'advanced',
    name: 'Plan Avanzado',
    price: 59,
    sessions: 16,
    frequency: 'mensual',
    sport: 'Running + Triatlón',
    features: ['16 sesiones/mes', 'Plan personalizado', 'Análisis de rendimiento', 'Chat directo'],
    popular: true,
  },
  {
    id: 'elite',
    name: 'Plan Elite',
    price: 99,
    sessions: 24,
    frequency: 'mensual',
    sport: 'Full Coaching',
    features: ['24 sesiones/mes', 'Plan 100% personalizado', 'Análisis avanzado', 'Soporte prioritario', 'Nutrición básica'],
  },
];

const MOCK_HISTORY: PaymentRecord[] = [
  { id: 'p3', date: 'Mayo 2026', amount: 29, status: 'approved', description: 'Plan Básico · Mayo' },
  { id: 'p2', date: 'Abril 2026', amount: 29, status: 'approved', description: 'Plan Básico · Abril' },
  { id: 'p1', date: 'Marzo 2026', amount: 29, status: 'approved', description: 'Plan Básico · Marzo' },
];

const STATUS_LABEL: Record<PaymentRecord['status'], { label: string; color: string }> = {
  approved: { label: 'Aprobado', color: 'text-primary' },
  pending:  { label: 'En revisión', color: 'text-sky-400' },
  rejected: { label: 'Rechazado', color: 'text-red-400' },
};

export default function AthleteSubscriptionPlan({ onBack, onSubmitPayment }: AthleteSubscriptionPlanProps) {
  const [currentPlanId, setCurrentPlanId] = useState('basic');
  const [selectedPlanId, setSelectedPlanId] = useState('basic');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showChangeConfirm, setShowChangeConfirm] = useState(false);
  const [history, setHistory] = useState<PaymentRecord[]>(MOCK_HISTORY);

  const currentPlan = COACH_PLANS.find(p => p.id === currentPlanId)!;
  const selectedPlan = COACH_PLANS.find(p => p.id === selectedPlanId)!;
  const isPlanChanged = selectedPlanId !== currentPlanId;

  const handlePaymentSubmit = (data: SubmittedPayment) => {
    const newRecord: PaymentRecord = {
      id: `p-${Date.now()}`,
      date: new Date().toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }),
      amount: data.amount,
      status: 'pending',
      description: `${currentPlan.name} · ${new Date().toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}`,
    };
    setHistory(prev => [newRecord, ...prev]);
    onSubmitPayment(data);
    setShowPaymentModal(false);
  };

  const handleConfirmChange = () => {
    setCurrentPlanId(selectedPlanId);
    setShowChangeConfirm(false);
  };

  return (
    <div className="h-full overflow-y-auto pb-20">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-muted transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg">Plan de suscripción</h1>
      </div>

      <div className="p-4 space-y-5">
        {/* Current plan summary */}
        <div className="bg-primary/10 border border-primary/30 rounded-2xl p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Plan actual</p>
              <p className="text-lg font-medium text-primary">{currentPlan.name}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl text-primary">${currentPlan.price}</p>
              <p className="text-xs text-muted-foreground">/{currentPlan.frequency}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-primary" />{currentPlan.sessions} sesiones/mes</span>
            <span>{currentPlan.sport}</span>
          </div>
        </div>

        {/* Plans selection */}
        <div>
          <p className="text-sm text-muted-foreground mb-3">Planes disponibles del coach</p>
          <div className="space-y-3">
            {COACH_PLANS.map(plan => {
              const isSelected = selectedPlanId === plan.id;
              const isCurrent = currentPlanId === plan.id;
              return (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlanId(plan.id)}
                  className={`w-full text-left rounded-2xl p-4 border-2 transition-all ${
                    isSelected
                      ? 'border-primary bg-primary/10'
                      : 'border-border bg-card hover:border-primary/40'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{plan.name}</span>
                      {plan.popular && (
                        <span className="px-2 py-0.5 bg-primary text-primary-foreground rounded-full text-[10px] flex items-center gap-1">
                          <Star className="w-2.5 h-2.5 fill-current" /> Popular
                        </span>
                      )}
                      {isCurrent && (
                        <span className="px-2 py-0.5 bg-muted text-muted-foreground rounded-full text-[10px]">
                          Actual
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-primary font-medium">${plan.price}<span className="text-xs text-muted-foreground font-normal">/mes</span></span>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-primary bg-primary' : 'border-border'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-1">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CheckCircle className="w-3 h-3 text-primary shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>
        </div>

        {/* Change plan CTA */}
        {isPlanChanged && (
          <button
            onClick={() => setShowChangeConfirm(true)}
            className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl"
          >
            Cambiar a {selectedPlan.name} · ${selectedPlan.price}/mes
          </button>
        )}

        {/* Make payment */}
        <div className="bg-card rounded-2xl border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-primary" />
              <p className="text-sm">Próximo pago</p>
            </div>
            <span className="text-primary font-medium">${currentPlan.price}</span>
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            Vencimiento: <span className="text-foreground">1 de Junio 2026</span>
          </p>
          <button
            onClick={() => setShowPaymentModal(true)}
            className="w-full flex items-center justify-between bg-muted/50 hover:bg-muted rounded-xl px-4 py-3 transition-colors"
          >
            <span className="text-sm">Realizar pago</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Payment history */}
        <div>
          <p className="text-sm text-muted-foreground mb-3">Historial de pagos</p>
          {history.length === 0 ? (
            <p className="text-xs text-muted-foreground text-center py-6">Sin pagos registrados aún</p>
          ) : (
            <div className="bg-card rounded-2xl border border-border overflow-hidden divide-y divide-border">
              {history.map(record => {
                const { label, color } = STATUS_LABEL[record.status];
                return (
                  <div key={record.id} className="flex items-center gap-3 p-4">
                    <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center shrink-0">
                      {record.status === 'approved' ? (
                        <CheckCircle className="w-4 h-4 text-primary" />
                      ) : record.status === 'pending' ? (
                        <Clock className="w-4 h-4 text-sky-400" />
                      ) : (
                        <CreditCard className="w-4 h-4 text-red-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">{record.description}</p>
                      <p className="text-xs text-muted-foreground">{record.date}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm">${record.amount}</p>
                      <p className={`text-xs ${color}`}>{label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Change plan confirm modal */}
      {showChangeConfirm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setShowChangeConfirm(false)}>
          <div className="bg-card rounded-2xl p-5 w-full max-w-xs" onClick={e => e.stopPropagation()}>
            <h3 className="mb-2">¿Cambiar de plan?</h3>
            <p className="text-sm text-muted-foreground mb-1">
              Pasarás de <span className="text-foreground">{currentPlan.name} (${currentPlan.price}/mes)</span> a{' '}
              <span className="text-primary">{selectedPlan.name} (${selectedPlan.price}/mes)</span>.
            </p>
            <p className="text-xs text-muted-foreground mb-5">El cambio se aplicará en tu próximo ciclo de facturación.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowChangeConfirm(false)} className="flex-1 py-2.5 rounded-xl border border-border text-sm">Cancelar</button>
              <button onClick={handleConfirmChange} className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm">Confirmar</button>
            </div>
          </div>
        </div>
      )}

      {/* Payment modal */}
      {showPaymentModal && (
        <PaymentModal
          onClose={() => setShowPaymentModal(false)}
          onSubmit={handlePaymentSubmit}
        />
      )}
    </div>
  );
}
