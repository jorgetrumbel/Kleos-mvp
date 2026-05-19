import { useState } from 'react';
import { TrendingUp, Users, Clock, Zap, ChevronRight, Bell, CreditCard } from 'lucide-react';
import { LineChart, Line, XAxis, ResponsiveContainer } from 'recharts';
import CoachPaymentApprovalModal, { type PendingPayment } from './CoachPaymentApprovalModal';

const mockChartData = [
  { day: 'L', hours: 8 },
  { day: 'M', hours: 12 },
  { day: 'M', hours: 10 },
  { day: 'J', hours: 14 },
  { day: 'V', hours: 11 },
  { day: 'S', hours: 15 },
  { day: 'D', hours: 9 },
];

interface CoachHomeProps {
  pendingPayments: PendingPayment[];
  onApprovePayment: (id: string) => void;
  onRejectPayment: (id: string) => void;
}

export default function CoachHome({ pendingPayments, onApprovePayment, onRejectPayment }: CoachHomeProps) {
  const [selectedPayment, setSelectedPayment] = useState<PendingPayment | null>(null);

  return (
    <div className="p-3 sm:p-4 space-y-3 sm:space-y-4 pb-20">
      {/* Header */}
      <div className="flex items-center gap-2 sm:gap-3 mb-2">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary flex items-center justify-center">
          <span className="text-primary-foreground text-sm sm:text-base">T</span>
        </div>
        <div>
          <p className="text-xs sm:text-sm text-muted-foreground">Hola, Tomás 👋</p>
          <h1 className="text-lg sm:text-xl">Bienvenido de nuevo</h1>
        </div>
      </div>

      {/* Pending payments notification */}
      {pendingPayments.length > 0 && (
        <div className="bg-primary/10 border border-primary/30 rounded-2xl p-4">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
              <CreditCard className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-primary">
                {pendingPayments.length === 1
                  ? '1 pago pendiente de aprobación'
                  : `${pendingPayments.length} pagos pendientes de aprobación`}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {pendingPayments[0].athleteName} envió un comprobante
              </p>
            </div>
          </div>
          <div className="space-y-2">
            {pendingPayments.map((payment) => (
              <button
                key={payment.id}
                onClick={() => setSelectedPayment(payment)}
                className="w-full flex items-center justify-between bg-card/60 rounded-xl px-4 py-3 hover:bg-card transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-sm font-medium">
                    {payment.athleteInitial}
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm truncate">{payment.athleteName}</p>
                    <p className="text-xs text-muted-foreground">${payment.amount}</p>
                  </div>
                </div>
                <span className="text-xs text-primary shrink-0 ml-2">Revisar →</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Weekly Summary Card */}
      <div className="bg-card rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-border">
        <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">Esta semana</p>
        <div className="flex gap-1.5 sm:gap-2 mb-2 sm:mb-3">
          {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((day, i) => (
            <div key={day} className="flex-1 flex flex-col items-center">
              <div className={`w-full h-1 rounded-full mb-1 ${i < 4 ? 'bg-primary' : 'bg-muted'}`} />
              <span className="text-[10px] sm:text-xs text-muted-foreground">{day}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 text-primary">
          <Zap className="w-4 h-4 sm:w-5 sm:h-5 fill-primary" />
          <span className="text-sm sm:text-base">4/7 sesiones completadas</span>
        </div>
        <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">Vas en línea con tu plan</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        <div className="bg-card rounded-lg sm:rounded-xl p-2.5 sm:p-3 border border-border">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/20 flex items-center justify-center mb-1.5 sm:mb-2">
            <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
          </div>
          <p className="text-muted-foreground text-[10px] sm:text-xs mb-0.5 sm:mb-1">Sesiones</p>
          <p className="text-xl sm:text-2xl">4</p>
          <p className="text-[10px] sm:text-xs text-muted-foreground">esta semana</p>
        </div>

        <div className="bg-card rounded-lg sm:rounded-xl p-2.5 sm:p-3 border border-border">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/20 flex items-center justify-center mb-1.5 sm:mb-2">
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
          </div>
          <p className="text-muted-foreground text-[10px] sm:text-xs mb-0.5 sm:mb-1">Tiempo</p>
          <p className="text-xl sm:text-2xl">5h 20m</p>
          <p className="text-[10px] sm:text-xs text-muted-foreground">esta semana</p>
        </div>

        <div className="bg-card rounded-lg sm:rounded-xl p-2.5 sm:p-3 border border-border">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/20 flex items-center justify-center mb-1.5 sm:mb-2">
            <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
          </div>
          <p className="text-muted-foreground text-[10px] sm:text-xs mb-0.5 sm:mb-1">Atletas</p>
          <p className="text-xl sm:text-2xl">48h 30m</p>
          <p className="text-[10px] sm:text-xs text-muted-foreground">acumuladas</p>
        </div>
      </div>

      {/* Chart Card */}
      <div className="bg-card rounded-2xl p-4 border border-border">
        <div className="flex items-center justify-between mb-3">
          <p>Tiempo de entrenamiento</p>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </div>
        <ResponsiveContainer width="100%" height={120}>
          <LineChart data={mockChartData}>
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ab5be', fontSize: 12 }}
            />
            <Line
              type="monotone"
              dataKey="hours"
              stroke="#c4ff0e"
              strokeWidth={2}
              dot={{ fill: '#c4ff0e', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* CTA Button */}
      <button className="w-full bg-primary text-primary-foreground py-3 rounded-xl">
        Ver plan
      </button>

      {/* Upcoming Session */}
      <div className="bg-card rounded-2xl p-4 border border-border">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-5 h-5 text-primary" />
          <p>Próxima sesión</p>
          <ChevronRight className="w-5 h-5 text-muted-foreground ml-auto" />
        </div>
        <p className="font-medium mb-1">Intervalos</p>
        <p className="text-sm text-muted-foreground">Mié 06:00 AM · Esta semana</p>
      </div>

      {/* Alert */}
      <div className="bg-card rounded-2xl p-4 border border-border">
        <div className="flex items-start gap-3">
          <Bell className="w-5 h-5 text-primary mt-1" />
          <div className="flex-1">
            <p className="mb-1">Nuevo mensaje del entrenador</p>
            <p className="text-sm text-muted-foreground">
              ¡Excelente trabajo en la sesión de hoy Montaña! 🏔️ Mañana y viernes hiciste el próximo bloque 🏃
            </p>
            <p className="text-xs text-muted-foreground mt-2">Coach Johansson</p>
          </div>
        </div>
      </div>

      {/* Payment approval modal */}
      {selectedPayment && (
        <CoachPaymentApprovalModal
          payment={selectedPayment}
          onApprove={(id) => {
            onApprovePayment(id);
            setSelectedPayment(null);
          }}
          onReject={(id) => {
            onRejectPayment(id);
            setSelectedPayment(null);
          }}
          onClose={() => setSelectedPayment(null)}
        />
      )}
    </div>
  );
}
