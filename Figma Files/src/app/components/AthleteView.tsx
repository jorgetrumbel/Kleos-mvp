import { useState } from 'react';
import { Home, UserCircle, MessageSquare, Calendar, ClipboardList, Settings } from 'lucide-react';
import AthleteHome from './athlete/AthleteHome';
import AthleteCoach from './athlete/AthleteCoach';
import AthleteCommunity from './athlete/AthleteCommunity';
import AthleteCalendar from './athlete/AthleteCalendar';
import AthletePlan from './athlete/AthletePlan';
import AthleteSettings from './athlete/AthleteSettings';
import PaymentModal from './athlete/PaymentModal';
import WorkoutScreen from './athlete/WorkoutScreen';
import RPEModal from './athlete/RPEModal';
import type { PendingPayment } from './coach/CoachPaymentApprovalModal';
import type { SubmittedPayment } from './athlete/PaymentModal';
import type { WorkoutInfo } from './athlete/WorkoutScreen';
import type { RPEResult } from './athlete/RPEModal';

type AthleteTab = 'home' | 'coach' | 'community' | 'calendar' | 'plan';

// ── Shared workout types (exported so tabs can use them) ──────────────────────
export interface ActiveWorkout {
  info: WorkoutInfo;
  startedAt: number;   // Date.now()
  pausedMs: number;    // accumulated paused milliseconds
  isPaused: boolean;
  pausedAt: number | null;
}

export interface CompletedSession {
  id: string;
  name: string;
  date: string;
  durationSec: number;
  scored: boolean;
}

function formatDuration(sec: number) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

interface AthleteViewProps {
  payments: PendingPayment[];
  onSubmitPayment: (data: SubmittedPayment) => void;
  onLogout: () => void;
}

export default function AthleteView({ payments, onSubmitPayment, onLogout }: AthleteViewProps) {
  const [activeTab, setActiveTab] = useState<AthleteTab>('home');
  const [showSettings, setShowSettings] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [openSubscriptionDirectly, setOpenSubscriptionDirectly] = useState(false);

  // Workout state
  const [activeWorkout, setActiveWorkout] = useState<ActiveWorkout | null>(null);
  const [showWorkoutScreen, setShowWorkoutScreen] = useState(false);
  const [completedSessions, setCompletedSessions] = useState<CompletedSession[]>([
    // One pre-existing session that needs scoring
    {
      id: 'session-pre1',
      name: 'Trail Running',
      date: '10 de mayo 2026',
      durationSec: 5400,
      scored: false,
    },
  ]);
  const [pendingRPE, setPendingRPE] = useState<CompletedSession | null>(null);

  // Payment helpers
  const hasPendingPayment = payments.some(p => p.status === 'pending');
  const hasApprovedPayment = payments.some(p => p.status === 'approved');
  const hasDuePayment = !hasPendingPayment && !hasApprovedPayment;

  const unscoredSessions = completedSessions.filter(s => !s.scored);

  // ── Workout handlers ────────────────────────────────────────────────────────

  const handleStartWorkout = (info: WorkoutInfo) => {
    const workout: ActiveWorkout = {
      info,
      startedAt: Date.now(),
      pausedMs: 0,
      isPaused: false,
      pausedAt: null,
    };
    setActiveWorkout(workout);
    setShowWorkoutScreen(true);
  };

  const handlePauseWorkout = () => {
    setActiveWorkout(prev => prev
      ? { ...prev, isPaused: true, pausedAt: Date.now() }
      : null
    );
  };

  const handleResumeWorkout = () => {
    setActiveWorkout(prev => {
      if (!prev || !prev.pausedAt) return prev;
      const extra = Date.now() - prev.pausedAt;
      return { ...prev, isPaused: false, pausedMs: prev.pausedMs + extra, pausedAt: null };
    });
  };

  const handleExitWorkout = () => {
    // Keep activeWorkout alive — shows alert on dashboard
    setShowWorkoutScreen(false);
  };

  const handleFinishWorkout = (durationSec: number) => {
    if (!activeWorkout) return;
    setShowWorkoutScreen(false);
    const session: CompletedSession = {
      id: `session-${Date.now()}`,
      name: activeWorkout.info.name,
      date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }),
      durationSec,
      scored: false,
    };
    setCompletedSessions(prev => [session, ...prev]);
    setActiveWorkout(null);
    setPendingRPE(session);
  };

  const handleRPESubmit = (result: RPEResult) => {
    setCompletedSessions(prev =>
      prev.map(s => s.id === result.sessionId ? { ...s, scored: true } : s)
    );
    setPendingRPE(null);
  };

  const handleRPESkip = (sessionId: string) => {
    // Leave scored: false so it stays in unscoredSessions
    setPendingRPE(null);
  };

  const handleOpenRPEForSession = (session: CompletedSession) => {
    setPendingRPE(session);
  };

  // ── Content rendering ───────────────────────────────────────────────────────

  const renderContent = () => {
    if (showSettings) {
      return (
        <AthleteSettings
          onClose={() => { setShowSettings(false); setOpenSubscriptionDirectly(false); }}
          onLogout={onLogout}
          onSubmitPayment={onSubmitPayment}
          onGoToChat={() => { setShowSettings(false); setActiveTab('coach'); }}
          initialPage={openSubscriptionDirectly ? 'subscription' : undefined}
        />
      );
    }
    switch (activeTab) {
      case 'home':
        return (
          <AthleteHome
            hasDuePayment={hasDuePayment}
            paymentInReview={hasPendingPayment}
            paymentApproved={hasApprovedPayment}
            onOpenPayment={() => setShowPaymentModal(true)}
            activeWorkout={activeWorkout}
            onContinueWorkout={() => setShowWorkoutScreen(true)}
            unscoredSessions={unscoredSessions}
            onOpenRPE={handleOpenRPEForSession}
            onStartWorkout={handleStartWorkout}
          />
        );
      case 'coach':
        return (
          <AthleteCoach
            onGoToPlan={() => setActiveTab('plan')}
            onOpenSubscription={() => { setOpenSubscriptionDirectly(true); setShowSettings(true); }}
          />
        );
      case 'community':
        return <AthleteCommunity />;
      case 'calendar':
        return (
          <AthleteCalendar
            onStartWorkout={handleStartWorkout}
            unscoredSessions={unscoredSessions}
            onOpenRPE={handleOpenRPEForSession}
          />
        );
      case 'plan':
        return (
          <AthletePlan
            onStartWorkout={handleStartWorkout}
            unscoredSessions={unscoredSessions}
            onOpenRPE={handleOpenRPEForSession}
          />
        );
      default:
        return null;
    }
  };

  const tabs = [
    { id: 'home' as AthleteTab, label: 'Inicio', icon: Home },
    { id: 'coach' as AthleteTab, label: 'Entrenador', icon: UserCircle },
    { id: 'community' as AthleteTab, label: 'Comunidad', icon: MessageSquare },
    { id: 'calendar' as AthleteTab, label: 'Calendario', icon: Calendar },
    { id: 'plan' as AthleteTab, label: 'Plan', icon: ClipboardList },
  ];

  return (
    <div className="flex flex-col h-full w-full mx-auto relative" style={{ maxWidth: '480px' }}>
      {/* Top Bar */}
      <div className="flex items-center justify-between px-3 pt-3 pb-0 sm:px-4 sm:pt-4">
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
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <div className="bg-card border-t border-border safe-area-bottom">
        <div className="flex items-center justify-around py-1.5 sm:py-2">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id && !showSettings;
            // Badge for unscored sessions on plan/calendar
            const hasBadge =
              (tab.id === 'plan' || tab.id === 'calendar') && unscoredSessions.length > 0;
            return (
              <button
                key={tab.id}
                onClick={() => { setShowSettings(false); setActiveTab(tab.id); }}
                className="relative flex flex-col items-center gap-0.5 sm:gap-1 px-2 sm:px-4 py-1.5 sm:py-2 min-w-0 flex-1"
              >
                <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                {hasBadge && (
                  <span className="absolute top-1 right-1/4 w-2 h-2 rounded-full bg-amber-400" />
                )}
                <span className={`text-[10px] sm:text-xs truncate max-w-full ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Workout Screen overlay */}
      {showWorkoutScreen && activeWorkout && (
        <WorkoutScreen
          workout={activeWorkout.info}
          startedAt={activeWorkout.startedAt}
          pausedMs={activeWorkout.pausedMs}
          isPaused={activeWorkout.isPaused}
          pausedAt={activeWorkout.pausedAt}
          onPause={handlePauseWorkout}
          onResume={handleResumeWorkout}
          onExit={handleExitWorkout}
          onFinish={handleFinishWorkout}
        />
      )}

      {/* RPE Modal */}
      {pendingRPE && (
        <RPEModal
          sessionId={pendingRPE.id}
          sessionName={pendingRPE.name}
          duration={formatDuration(pendingRPE.durationSec)}
          onSubmit={handleRPESubmit}
          onSkip={handleRPESkip}
        />
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <PaymentModal
          onClose={() => setShowPaymentModal(false)}
          onSubmit={data => { onSubmitPayment(data); setShowPaymentModal(false); }}
        />
      )}
    </div>
  );
}
