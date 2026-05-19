import { useState } from 'react';
import { ArrowLeft, Bluetooth, Wifi, Check, RefreshCw, AlertCircle, ChevronRight } from 'lucide-react';

interface AthleteWearablesProps {
  onBack: () => void;
}

type ConnectionStatus = 'connected' | 'disconnected' | 'syncing';

interface Device {
  id: string;
  name: string;
  brand: string;
  type: 'watch' | 'app';
  icon: string;
  status: ConnectionStatus;
  lastSync?: string;
  color: string;
}

const INITIAL_DEVICES: Device[] = [
  // Smartwatches
  {
    id: 'apple-watch',
    name: 'Apple Watch',
    brand: 'Apple',
    type: 'watch',
    icon: '⌚',
    status: 'connected',
    lastSync: 'Hace 5 min',
    color: '#6b7280',
  },
  {
    id: 'garmin-watch',
    name: 'Garmin Forerunner',
    brand: 'Garmin',
    type: 'watch',
    icon: '🏃',
    status: 'disconnected',
    color: '#0ea5e9',
  },
  {
    id: 'polar',
    name: 'Polar Vantage',
    brand: 'Polar',
    type: 'watch',
    icon: '💓',
    status: 'disconnected',
    color: '#ef4444',
  },
  {
    id: 'fitbit',
    name: 'Fitbit',
    brand: 'Fitbit',
    type: 'watch',
    icon: '💪',
    status: 'disconnected',
    color: '#22c55e',
  },
  // Health apps
  {
    id: 'apple-health',
    name: 'Apple Health',
    brand: 'Apple',
    type: 'app',
    icon: '❤️',
    status: 'connected',
    lastSync: 'Hace 1 hora',
    color: '#f43f5e',
  },
  {
    id: 'google-fit',
    name: 'Google Fit',
    brand: 'Google',
    type: 'app',
    icon: '🏅',
    status: 'disconnected',
    color: '#3b82f6',
  },
  {
    id: 'garmin-connect',
    name: 'Garmin Connect',
    brand: 'Garmin',
    type: 'app',
    icon: '🗺️',
    status: 'disconnected',
    color: '#0ea5e9',
  },
  {
    id: 'strava',
    name: 'Strava',
    brand: 'Strava',
    type: 'app',
    icon: '🚴',
    status: 'disconnected',
    color: '#f97316',
  },
];


export default function AthleteWearables({ onBack }: AthleteWearablesProps) {
  const [devices, setDevices] = useState<Device[]>(INITIAL_DEVICES);
  const [syncingId, setSyncingId] = useState<string | null>(null);

  const watches = devices.filter(d => d.type === 'watch');
  const apps = devices.filter(d => d.type === 'app');
  const connected = devices.filter(d => d.status === 'connected');

  const handleToggle = (id: string) => {
    const device = devices.find(d => d.id === id);
    if (!device) return;

    if (device.status === 'connected') {
      // Disconnect
      setDevices(prev => prev.map(d => d.id === id ? { ...d, status: 'disconnected', lastSync: undefined } : d));
    } else {
      // Connect — simulate sync
      setSyncingId(id);
      setDevices(prev => prev.map(d => d.id === id ? { ...d, status: 'syncing' } : d));
      setTimeout(() => {
        setDevices(prev => prev.map(d => d.id === id ? { ...d, status: 'connected', lastSync: 'Ahora mismo' } : d));
        setSyncingId(null);
      }, 1800);
    }
  };

  const handleResync = (id: string) => {
    setSyncingId(id);
    setDevices(prev => prev.map(d => d.id === id ? { ...d, status: 'syncing' } : d));
    setTimeout(() => {
      setDevices(prev => prev.map(d => d.id === id ? { ...d, status: 'connected', lastSync: 'Ahora mismo' } : d));
      setSyncingId(null);
    }, 1500);
  };

  return (
    <div className="h-full overflow-y-auto pb-20">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-muted transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg">Wearables y apps de salud</h1>
      </div>

      <div className="p-4 space-y-5">
        {/* Connected status pill */}
        {connected.length > 0 && (
          <div className="flex items-center gap-2 px-1">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <p className="text-sm text-primary">
              {connected.length} {connected.length === 1 ? 'dispositivo conectado' : 'dispositivos conectados'}
            </p>
          </div>
        )}

        {/* Smartwatches */}
        <div>
          <div className="flex items-center gap-2 mb-3 px-1">
            <Bluetooth className="w-4 h-4 text-muted-foreground" />
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Smartwatch</p>
          </div>
          <div className="bg-card rounded-2xl border border-border overflow-hidden divide-y divide-border">
            {watches.map(device => (
              <DeviceRow
                key={device.id}
                device={device}
                onToggle={() => handleToggle(device.id)}
                onResync={() => handleResync(device.id)}
                isSyncing={syncingId === device.id}
              />
            ))}
          </div>
        </div>

        {/* Health apps */}
        <div>
          <div className="flex items-center gap-2 mb-3 px-1">
            <Wifi className="w-4 h-4 text-muted-foreground" />
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Apps de salud</p>
          </div>
          <div className="bg-card rounded-2xl border border-border overflow-hidden divide-y divide-border">
            {apps.map(device => (
              <DeviceRow
                key={device.id}
                device={device}
                onToggle={() => handleToggle(device.id)}
                onResync={() => handleResync(device.id)}
                isSyncing={syncingId === device.id}
              />
            ))}
          </div>
        </div>

        {/* Info note */}
        <div className="flex gap-3 p-4 bg-muted/30 rounded-xl border border-border">
          <AlertCircle className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            Los datos sincronizados son visibles por tu coach para un mejor seguimiento de tu rendimiento y recuperación.
          </p>
        </div>
      </div>
    </div>
  );
}

function DeviceRow({
  device,
  onToggle,
  onResync,
  isSyncing,
}: {
  device: Device;
  onToggle: () => void;
  onResync: () => void;
  isSyncing: boolean;
}) {
  const isConnected = device.status === 'connected';
  const isSyncingNow = device.status === 'syncing';

  return (
    <div className="flex items-center gap-3 p-4">
      {/* Icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
        style={{ backgroundColor: `${device.color}18` }}
      >
        {device.icon}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm">{device.name}</p>
        {isConnected && device.lastSync && (
          <p className="text-xs text-muted-foreground">
            <span className="text-primary">●</span> Sincronizado · {device.lastSync}
          </p>
        )}
        {isSyncingNow && (
          <p className="text-xs text-sky-400 flex items-center gap-1">
            <RefreshCw className="w-3 h-3 animate-spin" /> Conectando…
          </p>
        )}
        {!isConnected && !isSyncingNow && (
          <p className="text-xs text-muted-foreground">No conectado</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0">
        {isConnected && (
          <button
            onClick={onResync}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors"
            title="Sincronizar ahora"
          >
            <RefreshCw className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
        <button
          onClick={onToggle}
          disabled={isSyncingNow}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            isConnected
              ? 'bg-muted text-muted-foreground hover:bg-muted/70'
              : isSyncingNow
              ? 'bg-primary/10 text-primary/50 cursor-not-allowed'
              : 'bg-primary text-primary-foreground hover:bg-primary/90'
          }`}
        >
          {isConnected ? 'Desconectar' : isSyncingNow ? 'Conectando…' : 'Conectar'}
        </button>
      </div>
    </div>
  );
}
