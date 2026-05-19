import { useState } from 'react';
import { Home, Users, MessageSquare, Calendar, ClipboardList, Settings } from 'lucide-react';
import CoachHome from './coach/CoachHome';
import CoachAthletes from './coach/CoachAthletes';
import CoachCommunity from './coach/CoachCommunity';
import CoachCalendar from './coach/CoachCalendar';
import CoachPlan from './coach/CoachPlan';
import CoachSettings from './coach/CoachSettings';
import type { PendingPayment } from './coach/CoachPaymentApprovalModal';

type CoachTab = 'home' | 'athletes' | 'community' | 'calendar' | 'plan';

interface CoachViewProps {
  payments: PendingPayment[];
  onApprovePayment: (id: string) => void;
  onRejectPayment: (id: string) => void;
  onLogout: () => void;
}

export default function CoachView({ payments, onApprovePayment, onRejectPayment, onLogout }: CoachViewProps) {
  const [activeTab, setActiveTab] = useState<CoachTab>('home');
  const [showSettings, setShowSettings] = useState(false);

  const pendingPayments = payments.filter((p) => p.status === 'pending');

  const tabs = [
    { id: 'home' as CoachTab, label: 'Inicio', icon: Home },
    { id: 'athletes' as CoachTab, label: 'Atletas', icon: Users },
    { id: 'community' as CoachTab, label: 'Comunidad', icon: MessageSquare },
    { id: 'calendar' as CoachTab, label: 'Calendario', icon: Calendar },
    { id: 'plan' as CoachTab, label: 'Planificación', icon: ClipboardList },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <CoachHome
            pendingPayments={pendingPayments}
            onApprovePayment={onApprovePayment}
            onRejectPayment={onRejectPayment}
          />
        );
      case 'athletes':
        return (
          <CoachAthletes
            payments={payments}
            onApprovePayment={onApprovePayment}
            onRejectPayment={onRejectPayment}
          />
        );
      case 'community':
        return <CoachCommunity />;
      case 'calendar':
        return <CoachCalendar />;
      case 'plan':
        return <CoachPlan />;
      default:
        return (
          <CoachHome
            pendingPayments={pendingPayments}
            onApprovePayment={onApprovePayment}
            onRejectPayment={onRejectPayment}
          />
        );
    }
  };

  return (
    <div className="flex flex-col h-full w-full mx-auto" style={{ maxWidth: '480px' }}>
      {/* Top Bar */}
      <div className="flex items-center justify-between p-3 sm:p-4 pb-0">
        <div className="flex-1" />
        <button
          onClick={() => setShowSettings(!showSettings)}
          className={`p-2 rounded-full transition-colors ${
            showSettings ? 'bg-primary/20 text-primary' : 'bg-muted/50 hover:bg-muted text-muted-foreground'
          }`}
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {showSettings ? (
          <CoachSettings onClose={() => setShowSettings(false)} onLogout={onLogout} />
        ) : (
          renderContent()
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="bg-card border-t border-border safe-area-bottom">
        <div className="flex items-center justify-around py-1.5 sm:py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id && !showSettings;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setShowSettings(false);
                  setActiveTab(tab.id);
                }}
                className="flex flex-col items-center gap-0.5 sm:gap-1 px-2 sm:px-4 py-1.5 sm:py-2 min-w-0 flex-1"
              >
                <Icon
                  className={`w-5 h-5 sm:w-6 sm:h-6 ${
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  }`}
                />
                <span
                  className={`text-[10px] sm:text-xs truncate max-w-full ${
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
