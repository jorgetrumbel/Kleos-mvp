import { useState } from 'react';
import { ArrowLeft, User, Bell, Moon, Shield, HelpCircle, LogOut, ChevronRight, Dumbbell, CreditCard } from 'lucide-react';

interface CoachSettingsProps {
  onClose: () => void;
  onLogout: () => void;
}

export default function CoachSettings({ onClose, onLogout }: CoachSettingsProps) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className="h-full overflow-y-auto pb-20">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border">
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg">Configuración</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Profile card */}
        <button className="w-full bg-card rounded-xl p-4 border border-border flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xl">
            T
          </div>
          <div className="flex-1 text-left">
            <p className="font-medium">Tomás Johansson</p>
            <p className="text-sm text-muted-foreground">coach@coach</p>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Account section */}
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2 px-1">Cuenta</p>
          <div className="bg-card rounded-xl border border-border overflow-hidden divide-y divide-border">
            <SettingRow icon={User} label="Editar perfil" />
            <SettingRow icon={Shield} label="Privacidad y seguridad" />
          </div>
        </div>

        {/* Coach section */}
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2 px-1">Coach</p>
          <div className="bg-card rounded-xl border border-border overflow-hidden divide-y divide-border">
            <SettingRow icon={Dumbbell} label="Configuración de coach" />
            <SettingRow icon={CreditCard} label="Suscripción y facturación" />
          </div>
        </div>

        {/* Preferences section */}
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2 px-1">Preferencias</p>
          <div className="bg-card rounded-xl border border-border overflow-hidden divide-y divide-border">
            <ToggleRow icon={Bell} label="Notificaciones" value={notifications} onChange={setNotifications} />
            <ToggleRow icon={Moon} label="Modo oscuro" value={darkMode} onChange={setDarkMode} />
          </div>
        </div>

        {/* Support section */}
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2 px-1">Soporte</p>
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <SettingRow icon={HelpCircle} label="Ayuda y soporte" />
          </div>
        </div>

        {/* App version */}
        <p className="text-center text-xs text-muted-foreground pt-2">Athletica v1.0.0</p>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 p-4 bg-red-500/10 rounded-xl border border-red-500/20 text-red-400"
        >
          <LogOut className="w-5 h-5" />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </div>
  );
}

function SettingRow({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <button className="w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors">
      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <span className="flex-1 text-left text-sm">{label}</span>
      <ChevronRight className="w-4 h-4 text-muted-foreground" />
    </button>
  );
}

function ToggleRow({
  icon: Icon,
  label,
  value,
  onChange,
}: {
  icon: React.ElementType;
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-3 p-4">
      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <span className="flex-1 text-sm">{label}</span>
      <button
        onClick={() => onChange(!value)}
        className={`w-11 h-6 rounded-full transition-colors relative ${value ? 'bg-primary' : 'bg-muted'}`}
      >
        <span
          className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
            value ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  );
}
