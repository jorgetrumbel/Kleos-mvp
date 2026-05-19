import { Send, Image as ImageIcon, Paperclip, MessageCircle, Dumbbell, CreditCard, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

const mockMessages = [
  {
    id: 1,
    sender: 'coach',
    text: '¡Hola María! ¿Cómo te fue en el entrenamiento de ayer?',
    time: '10:30',
  },
  {
    id: 2,
    sender: 'athlete',
    text: '¡Muy bien! Completé los intervalos sin problemas.',
    time: '10:35',
  },
  {
    id: 3,
    sender: 'coach',
    text: '¡Excelente! He notado una gran mejora en tu resistencia. Sigue así 💪',
    time: '10:40',
  },
  {
    id: 4,
    sender: 'athlete',
    text: 'Gracias, coach. ¿Para mañana tengo alguna sesión programada?',
    time: '10:45',
  },
  {
    id: 5,
    sender: 'coach',
    text: 'Sí, mañana a las 7:00 AM tienes entrenamiento de fuerza. Te mandé los detalles en el plan.',
    time: '10:50',
  },
  {
    id: 6,
    sender: 'athlete',
    text: 'Perfecto, ahí estaré. ¡Gracias!',
    time: '10:52',
  },
];

interface AthleteCoachProps {
  onGoToPlan?: () => void;
  onOpenSubscription?: () => void;
}

export default function AthleteCoach({ onGoToPlan, onOpenSubscription }: AthleteCoachProps) {
  const [view, setView] = useState<'profile' | 'chat'>('profile');
  const [message, setMessage] = useState('');

  if (view === 'chat') {
    return (
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-3 sm:p-4 border-b border-border bg-background">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setView('profile')}
              className="p-2 rounded-full hover:bg-muted transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary text-sm sm:text-base">T</span>
            </div>
            <div>
              <p className="font-medium text-sm sm:text-base">Coach Tomás</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground">Activo</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
          {mockMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'athlete' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] sm:max-w-[75%] rounded-xl sm:rounded-2xl p-2.5 sm:p-3 ${
                  msg.sender === 'athlete'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border border-border'
                }`}
              >
                <p className="mb-1 text-sm sm:text-base">{msg.text}</p>
                <p
                  className={`text-[10px] sm:text-xs ${
                    msg.sender === 'athlete'
                      ? 'text-primary-foreground/70'
                      : 'text-muted-foreground'
                  }`}
                >
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-3 sm:p-4 border-t border-border bg-background">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button className="p-1.5 sm:p-2 rounded-full hover:bg-muted transition-colors">
              <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
            </button>
            <button className="p-1.5 sm:p-2 rounded-full hover:bg-muted transition-colors">
              <Paperclip className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
            </button>
            <input
              type="text"
              placeholder="Escribe un mensaje..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 px-3 sm:px-4 py-2 bg-input rounded-full border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
            />
            <button className="p-1.5 sm:p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto pb-20">
      <div className="p-4 space-y-6">
        {/* Coach Profile Card */}
        <div className="bg-card rounded-xl p-6 border border-border">
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <span className="text-primary text-3xl">T</span>
            </div>
            <h2 className="text-xl font-medium mb-1">Tomás Johansson</h2>
            <p className="text-sm text-muted-foreground mb-2">Entrenador Personal</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>Activo</span>
            </div>
          </div>

          {/* Coach Bio */}
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Especialista en trail running y resistencia con más de 10 años de experiencia.
              Te ayudaré a alcanzar tus metas deportivas con planes personalizados.
            </p>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-medium text-primary">45</p>
              <p className="text-xs text-muted-foreground mt-1">Atletas</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-medium text-primary">10+</p>
              <p className="text-xs text-muted-foreground mt-1">Años exp.</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-medium text-primary">4.9</p>
              <p className="text-xs text-muted-foreground mt-1">Rating</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => setView('chat')}
            className="w-full flex items-center justify-center gap-3 p-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="font-medium">Chat</span>
          </button>

          <button
            onClick={onGoToPlan}
            className="w-full flex items-center justify-center gap-3 p-4 bg-card border border-border rounded-xl hover:bg-muted/50 transition-colors"
          >
            <Dumbbell className="w-5 h-5" />
            <span className="font-medium">Workout</span>
          </button>

          <button
            onClick={onOpenSubscription}
            className="w-full flex items-center justify-center gap-3 p-4 bg-card border border-border rounded-xl hover:bg-muted/50 transition-colors"
          >
            <CreditCard className="w-5 h-5" />
            <span className="font-medium">Plan</span>
          </button>
        </div>
      </div>
    </div>
  );
}
