import { ArrowLeft, TrendingUp, Activity, Heart, Target } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from 'recharts';

const mockPerformanceData = [
  { week: 'Sem 1', value: 65 },
  { week: 'Sem 2', value: 72 },
  { week: 'Sem 3', value: 68 },
  { week: 'Sem 4', value: 78 },
  { week: 'Sem 5', value: 82 },
  { week: 'Sem 6', value: 85 },
];

const mockRPEData = [
  { day: 'Lun', rpe: 6 },
  { day: 'Mar', rpe: 7 },
  { day: 'Mié', rpe: 5 },
  { day: 'Jue', rpe: 8 },
  { day: 'Vie', rpe: 6 },
  { day: 'Sáb', rpe: 9 },
  { day: 'Dom', rpe: 4 },
];

const mockHeartRateData = [
  { session: 'S1', avg: 142, max: 168 },
  { session: 'S2', avg: 138, max: 162 },
  { session: 'S3', avg: 155, max: 178 },
  { session: 'S4', avg: 148, max: 172 },
  { session: 'S5', avg: 152, max: 180 },
];

interface AthleteMetricsProps {
  athleteName: string;
  onBack: () => void;
}

export default function AthleteMetrics({ athleteName, onBack }: AthleteMetricsProps) {
  return (
    <div className="h-full overflow-y-auto pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border p-4 flex items-center gap-3 z-10">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-muted transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-lg font-medium">Métricas de rendimiento</h1>
          <p className="text-sm text-muted-foreground">{athleteName}</p>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">Sesiones</span>
            </div>
            <p className="text-2xl font-medium mb-1">12</p>
            <p className="text-xs text-green-400">+3 esta semana</p>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground">Adherencia</span>
            </div>
            <p className="text-2xl font-medium mb-1">92%</p>
            <p className="text-xs text-green-400">+5% vs mes pasado</p>
          </div>
        </div>

        {/* Performance Trend */}
        <div className="bg-card rounded-xl p-4 border border-border">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="font-medium">Tendencia de rendimiento</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={mockPerformanceData}>
              <XAxis
                dataKey="week"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ab5be', fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ab5be', fontSize: 12 }}
                domain={[0, 100]}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#c4ff0e"
                strokeWidth={3}
                dot={{ fill: '#c4ff0e', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Progreso semanal basado en cumplimiento y métricas
          </p>
        </div>

        {/* RPE Distribution */}
        <div className="bg-card rounded-xl p-4 border border-border">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-primary" />
            <h3 className="font-medium">Esfuerzo percibido (RPE) - Última semana</h3>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={mockRPEData}>
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ab5be', fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ab5be', fontSize: 12 }}
                domain={[0, 10]}
              />
              <Bar dataKey="rpe" fill="#c4ff0e" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-between mt-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-muted-foreground">RPE promedio: 6.4/10</span>
            </div>
          </div>
        </div>

        {/* Heart Rate Analysis */}
        <div className="bg-card rounded-xl p-4 border border-border">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-primary" />
            <h3 className="font-medium">Frecuencia cardíaca</h3>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={mockHeartRateData}>
              <XAxis
                dataKey="session"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ab5be', fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ab5be', fontSize: 12 }}
                domain={[120, 190]}
              />
              <Line
                type="monotone"
                dataKey="avg"
                stroke="#38bdf8"
                strokeWidth={2}
                dot={{ fill: '#38bdf8', r: 4 }}
                name="Promedio"
              />
              <Line
                type="monotone"
                dataKey="max"
                stroke="#f87171"
                strokeWidth={2}
                dot={{ fill: '#f87171', r: 4 }}
                name="Máxima"
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-around mt-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#38bdf8]" />
              <span className="text-muted-foreground">FC Promedio</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#f87171]" />
              <span className="text-muted-foreground">FC Máxima</span>
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="bg-card rounded-xl p-4 border border-border">
          <h3 className="font-medium mb-3">Estadísticas adicionales</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Duración total</span>
              <span className="text-sm font-medium">8h 45m</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Distancia total</span>
              <span className="text-sm font-medium">127.3 km</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Calorías quemadas</span>
              <span className="text-sm font-medium">6,240 kcal</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Ritmo promedio</span>
              <span className="text-sm font-medium">5:42 min/km</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
