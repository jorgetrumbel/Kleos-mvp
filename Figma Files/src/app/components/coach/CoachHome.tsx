import { useState } from 'react';
import {
  TrendingUp, TrendingDown, Users, MessageSquare, CreditCard,
  CheckCircle2, ChevronRight, Zap, Calendar,
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip,
  BarChart, Bar, Cell,
} from 'recharts';
import CoachPaymentApprovalModal, { type PendingPayment } from './CoachPaymentApprovalModal';

// ─── Mock data ────────────────────────────────────────────────────────────────

const revenueData = [
  { month: 'Ene', revenue: 480000 },
  { month: 'Feb', revenue: 520000 },
  { month: 'Mar', revenue: 590000 },
  { month: 'Abr', revenue: 610000 },
  { month: 'May', revenue: 650000 },
];

const completionData = [
  { week: 'S1', pct: 72 },
  { week: 'S2', pct: 85 },
  { week: 'S3', pct: 68 },
  { week: 'S4', pct: 78 },
];

const PENDING_MESSAGES = [
  { id: 'm1', name: 'María González', initial: 'M', preview: '¿Puedo cambiar la sesión del martes?', unread: 2 },
  { id: 'm2', name: 'Carlos Rodríguez', initial: 'C', preview: 'Tengo una duda sobre los ejercicios', unread: 1 },
  { id: 'm3', name: 'Luis Fernández', initial: 'L', preview: 'Siento un dolor en la rodilla...', unread: 3 },
];

const UPCOMING_SESSIONS = [
  { id: 1, athlete: 'Ana Martínez', title: 'Trail Running', time: 'Hoy · 18:00' },
  { id: 2, athlete: 'Patricia López', title: 'Fuerza Base', time: 'Mañana · 07:00' },
  { id: 3, athlete: 'María González', title: 'Técnica de Carrera', time: 'Jue · 06:30' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return '$' + (n / 1000).toFixed(0) + 'K';
}

function fmtFull(n: number) {
  return '$' + n.toLocaleString('es-CL');
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function NotificationBanner({
  icon: Icon,
  iconBg,
  iconColor,
  title,
  subtitle,
  onClick,
  badge,
}: {
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle: string;
  onClick: () => void;
  badge: number;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 bg-card border border-border rounded-xl p-3.5 hover:bg-muted/30 transition-colors text-left"
    >
      <div className={`w-9 h-9 rounded-full ${iconBg} flex items-center justify-center shrink-0 relative`}>
        <Icon className={`w-4 h-4 ${iconColor}`} />
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
          {badge}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground truncate">{subtitle}</p>
      </div>
      <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
    </button>
  );
}

// ─── Pending messages panel ────────────────────────────────────────────────────

function MessagesPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full sm:max-w-md bg-background rounded-t-2xl sm:rounded-2xl border border-border overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            <h2>Mensajes pendientes</h2>
          </div>
          <button onClick={onClose} className="text-xs text-muted-foreground hover:text-foreground">
            Cerrar
          </button>
        </div>
        <div className="divide-y divide-border max-h-80 overflow-y-auto">
          {PENDING_MESSAGES.map(msg => (
            <div key={msg.id} className="flex items-center gap-3 p-4 hover:bg-muted/30 transition-colors">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium shrink-0">
                {msg.initial}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{msg.name}</p>
                <p className="text-xs text-muted-foreground truncate">{msg.preview}</p>
              </div>
              <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center shrink-0">
                {msg.unread}
              </span>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-border">
          <button
            onClick={onClose}
            className="w-full py-3 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Ir a mensajes
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Custom tooltip for revenue chart ────────────────────────────────────────

function RevenueTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-lg px-3 py-2 text-xs shadow-lg">
      <p className="text-muted-foreground mb-0.5">{label}</p>
      <p className="font-medium text-primary">{fmtFull(payload[0].value)}</p>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface CoachHomeProps {
  pendingPayments: PendingPayment[];
  onApprovePayment: (id: string) => void;
  onRejectPayment: (id: string) => void;
}

export default function CoachHome({ pendingPayments, onApprovePayment, onRejectPayment }: CoachHomeProps) {
  const [selectedPayment, setSelectedPayment] = useState<PendingPayment | null>(null);
  const [showMessages, setShowMessages] = useState(false);

  const currentRevenue = 650000;
  const projectedRevenue = 800000;
  const revenueGrowth = ((currentRevenue - 610000) / 610000 * 100).toFixed(1);
  const totalAthletes = 12;
  const planCapacity = 25;
  const newThisMonth = 2;
  const completionRate = 78;
  const lastMonthCompletion = 68;
  const completionDelta = completionRate - lastMonthCompletion;

  return (
    <div className="p-3 sm:p-4 space-y-3 sm:space-y-4 pb-20">

      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium shrink-0">
            T
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Hola, Tomás 👋</p>
            <h1 className="text-xl leading-tight">Tu negocio hoy</h1>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Mayo 2026</p>
          <p className="text-xs text-primary font-medium">Plan Pro</p>
        </div>
      </div>

      {/* ── Notification banners ── */}
      <div className="space-y-2">
        {/* Pending messages */}
        {PENDING_MESSAGES.length > 0 && (
          <NotificationBanner
            icon={MessageSquare}
            iconBg="bg-blue-500/20"
            iconColor="text-blue-400"
            title={`${PENDING_MESSAGES.length} atletas requieren atención`}
            subtitle={PENDING_MESSAGES.map(m => m.name.split(' ')[0]).join(', ')}
            badge={PENDING_MESSAGES.reduce((s, m) => s + m.unread, 0)}
            onClick={() => setShowMessages(true)}
          />
        )}

        {/* Pending payments */}
        {pendingPayments.length > 0 && (
          <NotificationBanner
            icon={CreditCard}
            iconBg="bg-amber-500/20"
            iconColor="text-amber-400"
            title={`${pendingPayments.length} pago${pendingPayments.length > 1 ? 's' : ''} por aprobar`}
            subtitle={pendingPayments.map(p => p.athleteName.split(' ')[0]).join(', ')}
            badge={pendingPayments.length}
            onClick={() => setSelectedPayment(pendingPayments[0])}
          />
        )}
      </div>

      {/* ── Revenue cards ── */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Current revenue */}
        <div className="bg-card rounded-xl border border-border p-4">
          <p className="text-xs text-muted-foreground mb-1">Ingresos este mes</p>
          <p className="text-2xl font-medium tracking-tight">{fmt(currentRevenue)}</p>
          <div className="flex items-center gap-1 mt-1.5">
            <TrendingUp className="w-3 h-3 text-green-400" />
            <span className="text-xs text-green-400">+{revenueGrowth}%</span>
            <span className="text-xs text-muted-foreground">vs mes ant.</span>
          </div>
        </div>

        {/* Projected revenue */}
        <div className="bg-card rounded-xl border border-border p-4">
          <p className="text-xs text-muted-foreground mb-1">Proyección mensual</p>
          <p className="text-2xl font-medium tracking-tight">{fmt(projectedRevenue)}</p>
          <div className="flex items-center gap-1 mt-1.5">
            <TrendingUp className="w-3 h-3 text-primary" />
            <span className="text-xs text-primary">+{fmt(projectedRevenue - currentRevenue)}</span>
            <span className="text-xs text-muted-foreground">esperado</span>
          </div>
        </div>
      </div>

      {/* ── Revenue chart ── */}
      <div className="bg-card rounded-xl border border-border p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm font-medium">Ingresos mensuales</p>
            <p className="text-xs text-muted-foreground">Últimos 5 meses</p>
          </div>
          <span className="text-xs bg-green-500/15 text-green-400 px-2 py-0.5 rounded-full font-medium">
            ↑ {revenueGrowth}%
          </span>
        </div>
        <ResponsiveContainer width="100%" height={110}>
          <AreaChart data={revenueData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#c4ff0e" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#c4ff0e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ab5be', fontSize: 11 }}
            />
            <YAxis hide domain={['auto', 'auto']} />
            <Tooltip content={<RevenueTooltip />} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#c4ff0e"
              strokeWidth={2}
              fill="url(#revenueGrad)"
              dot={false}
              activeDot={{ r: 4, fill: '#c4ff0e', strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* ── Athletes + Completion row ── */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Athletes */}
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-xs bg-primary/15 text-primary px-1.5 py-0.5 rounded-full">
              +{newThisMonth} nuevo{newThisMonth > 1 ? 's' : ''}
            </span>
          </div>
          <p className="text-2xl font-medium">{totalAthletes}</p>
          <p className="text-xs text-muted-foreground mb-2">atletas activos</p>
          {/* Capacity bar */}
          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${(totalAthletes / planCapacity) * 100}%` }}
            />
          </div>
          <p className="text-[10px] text-muted-foreground mt-1">
            {totalAthletes}/{planCapacity} del plan
          </p>
        </div>

        {/* Workout completion */}
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${
              completionDelta >= 0
                ? 'bg-green-500/15 text-green-400'
                : 'bg-red-500/15 text-red-400'
            }`}>
              {completionDelta >= 0 ? '↑' : '↓'} {Math.abs(completionDelta)}%
            </span>
          </div>
          <p className="text-2xl font-medium">{completionRate}%</p>
          <p className="text-xs text-muted-foreground mb-2">completitud mes</p>
          {/* Completion bar */}
          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${completionRate}%`,
                background: completionRate >= 75 ? '#c4ff0e' : completionRate >= 50 ? '#f59e0b' : '#ef4444',
              }}
            />
          </div>
          <p className="text-[10px] text-muted-foreground mt-1">
            vs {lastMonthCompletion}% mes anterior
          </p>
        </div>
      </div>

      {/* ── Weekly completion chart ── */}
      <div className="bg-card rounded-xl border border-border p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm font-medium">Completitud semanal</p>
            <p className="text-xs text-muted-foreground">Sesiones completadas por atletas</p>
          </div>
          <Zap className="w-4 h-4 text-primary" />
        </div>
        <ResponsiveContainer width="100%" height={90}>
          <BarChart data={completionData} barSize={28} margin={{ top: 0, right: 4, left: -20, bottom: 0 }}>
            <XAxis
              dataKey="week"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ab5be', fontSize: 11 }}
            />
            <YAxis hide domain={[0, 100]} />
            <Tooltip
              cursor={{ fill: 'rgba(255,255,255,0.04)' }}
              content={({ active, payload, label }) =>
                active && payload?.length ? (
                  <div className="bg-card border border-border rounded-lg px-3 py-2 text-xs shadow-lg">
                    <p className="text-muted-foreground">{label}</p>
                    <p className="font-medium text-primary">{payload[0].value}% completado</p>
                  </div>
                ) : null
              }
            />
            <Bar dataKey="pct" radius={[4, 4, 0, 0]}>
              {completionData.map((entry, i) => (
                <Cell
                  key={i}
                  fill={entry.pct >= 75 ? '#c4ff0e' : entry.pct >= 60 ? '#f59e0b' : '#ef4444'}
                  fillOpacity={0.85}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ── Upcoming sessions ── */}
      <div className="bg-card rounded-xl border border-border">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            <p className="text-sm font-medium">Próximas sesiones</p>
          </div>
          <button className="text-xs text-primary hover:underline">Ver todas</button>
        </div>
        <div className="divide-y divide-border">
          {UPCOMING_SESSIONS.map(session => (
            <div key={session.id} className="flex items-center gap-3 px-4 py-3">
              <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-primary text-xs font-medium shrink-0">
                {session.athlete.split(' ').map(w => w[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{session.title}</p>
                <p className="text-xs text-muted-foreground">{session.athlete} · {session.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Modals ── */}
      {showMessages && <MessagesPanel onClose={() => setShowMessages(false)} />}

      {selectedPayment && (
        <CoachPaymentApprovalModal
          payment={selectedPayment}
          onApprove={id => { onApprovePayment(id); setSelectedPayment(null); }}
          onReject={id => { onRejectPayment(id); setSelectedPayment(null); }}
          onClose={() => setSelectedPayment(null)}
        />
      )}
    </div>
  );
}
