import { useState } from 'react';
import {
  ArrowLeft, User, Bell, Moon, Shield, HelpCircle, LogOut,
  ChevronRight, UserCircle, CreditCard, Watch,
} from 'lucide-react';
import AthleteMyCoach from './AthleteMyCoach';
import AthleteSubscriptionPlan from './AthleteSubscriptionPlan';
import AthleteWearables from './AthleteWearables';
import AthleteEditProfile from './AthleteEditProfile';
import type { SubmittedPayment } from './PaymentModal';

type Page = 'main' | 'myCoach' | 'subscription' | 'wearables' | 'editProfile';

interface AthleteSettingsProps {
  onClose: () => void;
  onLogout: () => void;
  onSubmitPayment: (data: SubmittedPayment) => void;
  onGoToChat: () => void;
  initialPage?: Page;
}

export default function AthleteSettings({ onClose, onLogout, onSubmitPayment, onGoToChat, initialPage }: AthleteSettingsProps) {
  const [page, setPage] = useState<Page>(initialPage || 'main');
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  if (page === 'myCoach') {
    return (
      <AthleteMyCoach
        onBack={() => setPage('main')}
        onGoToChat={() => { setPage('main'); onGoToChat(); }}
      />
    );
  }

  if (page === 'subscription') {
    return (
      <AthleteSubscriptionPlan
        onBack={() => setPage('main')}
        onSubmitPayment={onSubmitPayment}
      />
    );
  }

  if (page === 'wearables') {
    return <AthleteWearables onBack={() => setPage('main')} />;
  }

  if (page === 'editProfile') {
    return <AthleteEditProfile onBack={() => setPage('main')} />;
  }

  return (
    <div className="h-full overflow-y-auto pb-20">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border">
        <button onClick={onClose} className="p-2 rounded-full hover:bg-muted transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg">Configuración</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Profile card — tapping opens Edit Profile */}
        <button
          onClick={() => setPage('editProfile')}
          className="w-full bg-card rounded-xl p-4 border border-border flex items-center gap-4 hover:bg-muted/40 transition-colors"
        >
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xl">
            M
          </div>
          <div className="flex-1 text-left">
            <p className="font-medium">María García</p>
            <p className="text-sm text-muted-foreground">athlete@athlete</p>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Training section */}
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2 px-1">Entrenamiento</p>
          <div className="bg-card rounded-xl border border-border overflow-hidden divide-y divide-border">
            <NavRow
              icon={UserCircle}
              label="Mi entrenador"
              sublabel="Tomás Johansson"
              onClick={() => setPage('myCoach')}
            />
            <NavRow
              icon={CreditCard}
              label="Plan de suscripción"
              sublabel="Plan Básico · $29/mes"
              onClick={() => setPage('subscription')}
            />
          </div>
        </div>

        {/* Devices section */}
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2 px-1">Dispositivos</p>
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <NavRow
              icon={Watch}
              label="Wearables y apps de salud"
              sublabel="Apple Watch · Apple Health conectados"
              onClick={() => setPage('wearables')}
            />
          </div>
        </div>

        {/* Account section */}
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2 px-1">Cuenta</p>
          <div className="bg-card rounded-xl border border-border overflow-hidden divide-y divide-border">
            <NavRow
              icon={User}
              label="Editar perfil"
              onClick={() => setPage('editProfile')}
            />
            <SettingRow icon={Shield} label="Privacidad y seguridad" />
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

function NavRow({
  icon: Icon, label, sublabel, onClick,
}: {
  icon: React.ElementType; label: string; sublabel?: string; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors"
    >
      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <div className="flex-1 text-left min-w-0">
        <p className="text-sm">{label}</p>
        {sublabel && <p className="text-xs text-muted-foreground mt-0.5 truncate">{sublabel}</p>}
      </div>
      <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
    </button>
  );
}

function SettingRow({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <button className="w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors">
      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <span className="flex-1 text-left text-sm">{label}</span>
      <ChevronRight className="w-4 h-4 text-muted-foreground" />
    </button>
  );
}

function ToggleRow({
  icon: Icon, label, value, onChange,
}: {
  icon: React.ElementType; label: string; value: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-3 p-4">
      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <span className="flex-1 text-sm">{label}</span>
      <button
        onClick={() => onChange(!value)}
        className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${value ? 'bg-primary' : 'bg-muted'}`}
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
