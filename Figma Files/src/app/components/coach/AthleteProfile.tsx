import { ArrowLeft, Mail, Phone, MapPin, Calendar, Award, Target } from 'lucide-react';

interface AthleteProfileProps {
  athlete: {
    id: number;
    name: string;
    avatar: string;
    email?: string;
    phone?: string;
    location?: string;
    joinDate?: string;
    goal?: string;
    bio?: string;
    sessions: number;
    progress: number;
  };
  onBack: () => void;
}

export default function AthleteProfile({ athlete, onBack }: AthleteProfileProps) {
  return (
    <div className="h-full overflow-y-auto pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border p-4 flex items-center gap-3 z-10">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-muted transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-medium">Perfil del atleta</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Profile Header */}
        <div className="bg-card rounded-xl p-6 border border-border text-center">
          <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <span className="text-primary text-3xl">{athlete.avatar}</span>
          </div>
          <h2 className="text-xl font-medium mb-2">{athlete.name}</h2>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span>Activo</span>
          </div>

          {athlete.bio && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {athlete.bio}
            </p>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-card rounded-xl p-4 border border-border text-center">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2">
              <Award className="w-5 h-5 text-primary" />
            </div>
            <p className="text-2xl font-medium mb-1">{athlete.sessions}</p>
            <p className="text-xs text-muted-foreground">Sesiones</p>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border text-center">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <p className="text-2xl font-medium mb-1">{athlete.progress}%</p>
            <p className="text-xs text-muted-foreground">Progreso</p>
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-sm font-medium mb-3 text-muted-foreground uppercase tracking-wider">
            Información de contacto
          </h3>
          <div className="bg-card rounded-xl border border-border overflow-hidden divide-y divide-border">
            {athlete.email && (
              <div className="flex items-center gap-3 p-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground mb-0.5">Email</p>
                  <p className="text-sm">{athlete.email}</p>
                </div>
              </div>
            )}
            {athlete.phone && (
              <div className="flex items-center gap-3 p-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground mb-0.5">Teléfono</p>
                  <p className="text-sm">{athlete.phone}</p>
                </div>
              </div>
            )}
            {athlete.location && (
              <div className="flex items-center gap-3 p-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground mb-0.5">Ubicación</p>
                  <p className="text-sm">{athlete.location}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional Details */}
        <div>
          <h3 className="text-sm font-medium mb-3 text-muted-foreground uppercase tracking-wider">
            Detalles
          </h3>
          <div className="bg-card rounded-xl border border-border overflow-hidden divide-y divide-border">
            {athlete.joinDate && (
              <div className="flex items-center gap-3 p-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground mb-0.5">Fecha de inicio</p>
                  <p className="text-sm">{athlete.joinDate}</p>
                </div>
              </div>
            )}
            {athlete.goal && (
              <div className="flex items-center gap-3 p-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Target className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground mb-0.5">Objetivo</p>
                  <p className="text-sm">{athlete.goal}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
