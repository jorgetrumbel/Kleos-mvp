import { useState } from 'react';
import Login from './components/Login';
import CoachView from './components/CoachView';
import AthleteView from './components/AthleteView';
import CreateAccount from './components/CreateAccount';
import type { PendingPayment } from './components/coach/CoachPaymentApprovalModal';

type Screen = 'login' | 'createAccount' | 'app';

export default function App() {
  const [screen, setScreen] = useState<Screen>('login');
  const [userRole, setUserRole] = useState<'coach' | 'athlete' | null>(null);
  const [payments, setPayments] = useState<PendingPayment[]>([]);

  const handleLogin = (role: 'coach' | 'athlete') => {
    setUserRole(role);
    setScreen('app');
  };

  const handleCreateAccountComplete = (role: 'coach' | 'athlete') => {
    setUserRole(role);
    setScreen('app');
  };

  const handleSubmitPayment = (data: { amount: number; fileName: string; fileData: string }) => {
    const newPayment: PendingPayment = {
      id: `pay-${Date.now()}`,
      athleteName: 'María García',
      athleteInitial: 'M',
      amount: data.amount,
      date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }),
      fileName: data.fileName,
      fileData: data.fileData,
      status: 'pending',
    };
    setPayments((prev) => [...prev, newPayment]);
  };

  const handleApprovePayment = (id: string) => {
    setPayments((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'approved' } : p))
    );
  };

  const handleRejectPayment = (id: string) => {
    setPayments((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'rejected' } : p))
    );
  };

  if (screen === 'login') {
    return (
      <Login
        onLogin={handleLogin}
        onCreateAccount={() => setScreen('createAccount')}
      />
    );
  }

  if (screen === 'createAccount') {
    return (
      <CreateAccount
        onComplete={handleCreateAccountComplete}
        onBack={() => setScreen('login')}
      />
    );
  }

  return (
    <div className="size-full bg-background text-foreground dark flex flex-col">
      {userRole === 'coach' ? (
        <CoachView
          payments={payments}
          onApprovePayment={handleApprovePayment}
          onRejectPayment={handleRejectPayment}
          onLogout={() => setScreen('login')}
        />
      ) : (
        <AthleteView
          payments={payments}
          onSubmitPayment={handleSubmitPayment}
          onLogout={() => setScreen('login')}
        />
      )}
    </div>
  );
}
