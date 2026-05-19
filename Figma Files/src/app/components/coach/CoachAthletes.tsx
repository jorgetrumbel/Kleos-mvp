import { Search, MessageCircle, CreditCard, Calendar, TrendingUp, User, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import CoachPaymentApprovalModal, { type PendingPayment } from './CoachPaymentApprovalModal';
import AthletePaymentHistory from './AthletePaymentHistory';
import AthleteProfile from './AthleteProfile';
import AthleteCalendarPlan from './AthleteCalendarPlan';
import AthleteMetrics from './AthleteMetrics';

interface Athlete {
  id: number;
  name: string;
  avatar: string;
  status: string;
  sessions: number;
  lastSession: string;
  progress: number;
  email?: string;
  phone?: string;
  location?: string;
  joinDate?: string;
  goal?: string;
  bio?: string;
  hasDuePayment?: boolean;
  hasPendingPayment?: boolean;
}

const mockAthletes: Athlete[] = [
  {
    id: 1,
    name: 'María González',
    avatar: 'MG',
    status: 'Activo',
    sessions: 12,
    lastSession: 'Hoy',
    progress: 85,
    email: 'maria.gonzalez@email.com',
    phone: '+1 234 567 8900',
    location: 'Santiago, Chile',
    joinDate: '15 de enero 2026',
    goal: 'Completar un trail running de 42k',
    bio: 'Corredora amateur con pasión por el trail running. Busco mejorar mi resistencia y técnica.',
    hasPendingPayment: true,
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    avatar: 'CR',
    status: 'Activo',
    sessions: 8,
    lastSession: 'Ayer',
    progress: 72,
    email: 'carlos.rodriguez@email.com',
    phone: '+1 234 567 8901',
    location: 'Santiago, Chile',
    joinDate: '3 de febrero 2026',
    goal: 'Mejorar fuerza y resistencia',
    bio: 'Entusiasta del fitness, enfocado en mejorar mi rendimiento general.',
  },
  {
    id: 3,
    name: 'Ana Martínez',
    avatar: 'AM',
    status: 'Inactivo',
    sessions: 15,
    lastSession: 'Hace 3 días',
    progress: 91,
    email: 'ana.martinez@email.com',
    location: 'Viña del Mar, Chile',
    joinDate: '20 de diciembre 2025',
    goal: 'Mantener condición física',
    hasDuePayment: true,
  },
  {
    id: 4,
    name: 'Luis Fernández',
    avatar: 'LF',
    status: 'Activo',
    sessions: 10,
    lastSession: 'Hoy',
    progress: 78,
    email: 'luis.fernandez@email.com',
    phone: '+1 234 567 8903',
    location: 'Valparaíso, Chile',
    joinDate: '8 de marzo 2026',
    goal: 'Preparación para maratón',
  },
  {
    id: 5,
    name: 'Patricia López',
    avatar: 'PL',
    status: 'Activo',
    sessions: 14,
    lastSession: 'Ayer',
    progress: 88,
    email: 'patricia.lopez@email.com',
    location: 'Concepción, Chile',
    joinDate: '12 de febrero 2026',
    goal: 'Mejorar técnica de carrera',
  },
];

// Mock payment data
const mockPaymentsData: Record<number, PendingPayment[]> = {
  1: [
    {
      id: 'pay-1',
      athleteName: 'María González',
      athleteInitial: 'MG',
      amount: 29,
      date: '10 de mayo 2026',
      fileName: 'comprobante_mayo.jpg',
      fileData: 'data:image/jpeg;base64,...',
      status: 'pending',
    },
    {
      id: 'pay-2',
      athleteName: 'María González',
      athleteInitial: 'MG',
      amount: 29,
      date: '10 de abril 2026',
      fileName: 'comprobante_abril.jpg',
      fileData: 'data:image/jpeg;base64,...',
      status: 'approved',
    },
  ],
  3: [],
};

interface CoachAthletesProps {
  payments: PendingPayment[];
  onApprovePayment: (id: string) => void;
  onRejectPayment: (id: string) => void;
}

type View = 'list' | 'chat' | 'payment' | 'plan' | 'metrics' | 'profile';

export default function CoachAthletes({ payments, onApprovePayment, onRejectPayment }: CoachAthletesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentView, setCurrentView] = useState<View>('list');
  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const filteredAthletes = mockAthletes.filter((athlete) =>
    athlete.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenChat = (athlete: Athlete) => {
    setSelectedAthlete(athlete);
    setCurrentView('chat');
  };

  const handleOpenPayment = (athlete: Athlete) => {
    setSelectedAthlete(athlete);
    setCurrentView('payment');
  };

  const handleOpenPlan = (athlete: Athlete) => {
    setSelectedAthlete(athlete);
    setCurrentView('plan');
  };

  const handleOpenMetrics = (athlete: Athlete) => {
    setSelectedAthlete(athlete);
    setCurrentView('metrics');
  };

  const handleOpenProfile = (athlete: Athlete) => {
    setSelectedAthlete(athlete);
    setCurrentView('profile');
  };

  const handleOpenPaymentModal = (athlete: Athlete) => {
    setSelectedAthlete(athlete);
    setShowPaymentModal(true);
  };

  const handleBack = () => {
    setCurrentView('list');
    setSelectedAthlete(null);
  };

  const getAthletePayments = (athleteId: number) => {
    return mockPaymentsData[athleteId] || [];
  };

  // Render different views
  if (currentView === 'chat' && selectedAthlete) {
    return (
      <div className="h-full flex flex-col">
        <div className="p-3 sm:p-4 border-b border-border bg-background">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleBack}
              className="p-2 rounded-full hover:bg-muted transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
            </button>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary text-sm sm:text-base">{selectedAthlete.avatar}</span>
            </div>
            <div>
              <p className="font-medium text-sm sm:text-base">{selectedAthlete.name}</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground">Activo</p>
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center text-muted-foreground p-4">
          <p>Chat con {selectedAthlete.name} (funcionalidad próximamente)</p>
        </div>
      </div>
    );
  }

  if (currentView === 'payment' && selectedAthlete) {
    const athletePayments = getAthletePayments(selectedAthlete.id);
    const hasPending = athletePayments.some(p => p.status === 'pending');

    return (
      <AthletePaymentHistory
        athleteName={selectedAthlete.name}
        payments={athletePayments}
        onBack={handleBack}
        onOpenApproval={hasPending ? () => handleOpenPaymentModal(selectedAthlete) : undefined}
      />
    );
  }

  if (currentView === 'plan' && selectedAthlete) {
    return (
      <AthleteCalendarPlan
        athleteName={selectedAthlete.name}
        onBack={handleBack}
      />
    );
  }

  if (currentView === 'metrics' && selectedAthlete) {
    return (
      <AthleteMetrics
        athleteName={selectedAthlete.name}
        onBack={handleBack}
      />
    );
  }

  if (currentView === 'profile' && selectedAthlete) {
    return (
      <AthleteProfile
        athlete={selectedAthlete}
        onBack={handleBack}
      />
    );
  }

  return (
    <div className="p-3 sm:p-4 space-y-3 sm:space-y-4 pb-20">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl mb-1 sm:mb-2">Atletas</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Gestiona tus atletas y su progreso</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar atletas..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-input rounded-lg sm:rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
        />
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-card rounded-xl p-4 border border-border">
          <p className="text-3xl mb-1">{mockAthletes.length}</p>
          <p className="text-sm text-muted-foreground">Total atletas</p>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border">
          <p className="text-3xl mb-1">
            {mockAthletes.filter((a) => a.status === 'Activo').length}
          </p>
          <p className="text-sm text-muted-foreground">Activos hoy</p>
        </div>
      </div>

      {/* Athletes List */}
      <div className="space-y-3">
        <h3>Lista de atletas</h3>
        {filteredAthletes.map((athlete) => {
          const athletePayments = getAthletePayments(athlete.id);
          const hasPendingPayment = athletePayments.some(p => p.status === 'pending');

          return (
            <div
              key={athlete.id}
              className="bg-card rounded-xl p-4 border border-border relative"
            >
              {/* Due payment indicator */}
              {athlete.hasDuePayment && (
                <div className="absolute top-3 right-3">
                  <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                    <AlertCircle className="w-4 h-4 text-red-400" />
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary">{athlete.avatar}</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium">{athlete.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {athlete.sessions} sesiones completadas
                  </p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Última sesión</span>
                  <span>{athlete.lastSession}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progreso</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${athlete.progress}%` }}
                      />
                    </div>
                    <span>{athlete.progress}%</span>
                  </div>
                </div>
              </div>

              {/* Action buttons - 4 in a row */}
              <div className="grid grid-cols-4 gap-2 mb-3">
                <button
                  onClick={() => handleOpenChat(athlete)}
                  className="flex flex-col items-center gap-1 py-2 px-1 bg-muted rounded-lg text-xs hover:bg-muted/80 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat</span>
                </button>
                <button
                  onClick={() => handleOpenPayment(athlete)}
                  className="flex flex-col items-center gap-1 py-2 px-1 bg-muted rounded-lg text-xs hover:bg-muted/80 transition-colors relative"
                >
                  {hasPendingPayment && (
                    <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400" />
                  )}
                  <CreditCard className="w-4 h-4" />
                  <span>Payment</span>
                </button>
                <button
                  onClick={() => handleOpenPlan(athlete)}
                  className="flex flex-col items-center gap-1 py-2 px-1 bg-muted rounded-lg text-xs hover:bg-muted/80 transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Plan</span>
                </button>
                <button
                  onClick={() => handleOpenMetrics(athlete)}
                  className="flex flex-col items-center gap-1 py-2 px-1 bg-muted rounded-lg text-xs hover:bg-muted/80 transition-colors"
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>Metrics</span>
                </button>
              </div>

              {/* Pending payment approval button */}
              {hasPendingPayment && (
                <button
                  onClick={() => handleOpenPaymentModal(athlete)}
                  className="w-full py-2.5 bg-amber-500/20 text-amber-300 rounded-lg hover:bg-amber-500/30 transition-colors flex items-center justify-center gap-2 text-sm font-medium mb-3"
                >
                  <AlertCircle className="w-4 h-4" />
                  Aprobar pago pendiente
                </button>
              )}

              {/* View Profile button */}
              <button
                onClick={() => handleOpenProfile(athlete)}
                className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
              >
                <User className="w-4 h-4" />
                Ver perfil
              </button>
            </div>
          );
        })}
      </div>

      {/* Payment Approval Modal */}
      {showPaymentModal && selectedAthlete && (
        <CoachPaymentApprovalModal
          payments={getAthletePayments(selectedAthlete.id).filter(p => p.status === 'pending')}
          onApprove={onApprovePayment}
          onReject={onRejectPayment}
          onClose={() => setShowPaymentModal(false)}
        />
      )}
    </div>
  );
}
