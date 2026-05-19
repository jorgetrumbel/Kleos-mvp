import { Heart, MessageCircle, Share2 } from 'lucide-react';

const mockPosts = [
  {
    id: 1,
    date: '2 horas atrás',
    content: '¡Felicitaciones a todos los atletas que completaron sus sesiones esta semana! 💪 Sigan así, el progreso es evidente.',
    likes: 24,
    comments: 5,
    liked: true,
  },
  {
    id: 2,
    date: 'Ayer',
    content: 'Recordatorio: El próximo sábado tendremos una sesión grupal especial de trail running. ¡No falten! 🏃‍♂️🏔️',
    likes: 18,
    comments: 12,
    liked: false,
  },
  {
    id: 3,
    date: 'Hace 3 días',
    content: 'Nueva rutina de fuerza disponible en la biblioteca de ejercicios. Perfecta para complementar vuestro entrenamiento de resistencia.',
    likes: 31,
    comments: 8,
    liked: true,
  },
  {
    id: 4,
    date: 'Hace 5 días',
    content: '¿Sabían que el descanso es tan importante como el entrenamiento? Asegúrense de dormir 7-8 horas diarias para una recuperación óptima. 😴',
    likes: 45,
    comments: 15,
    liked: false,
  },
];

export default function AthleteCommunity() {
  return (
    <div className="pb-20">
      {/* Header */}
      <div className="p-3 sm:p-4 border-b border-border sticky top-0 bg-background z-10">
        <h1 className="text-xl sm:text-2xl mb-1 sm:mb-2">Comunidad</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Actualizaciones de tu entrenador</p>
      </div>

      {/* Posts Feed */}
      <div className="space-y-3 sm:space-y-4 p-3 sm:p-4">
        {mockPosts.map((post) => (
          <div key={post.id} className="bg-card rounded-lg sm:rounded-xl p-3 sm:p-4 border border-border">
            {/* Post Header */}
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary text-sm sm:text-base">T</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm sm:text-base">Coach Tomás</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground">{post.date}</p>
              </div>
            </div>

            {/* Post Content */}
            <p className="mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">{post.content}</p>

            {/* Post Actions */}
            <div className="flex items-center gap-4 sm:gap-6 pt-2 sm:pt-3 border-t border-border">
              <button
                className={`flex items-center gap-1.5 sm:gap-2 transition-colors ${
                  post.liked
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${post.liked ? 'fill-primary' : ''}`} />
                <span className="text-xs sm:text-sm">{post.likes}</span>
              </button>
              <button className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground hover:text-primary transition-colors">
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm">{post.comments}</span>
              </button>
              <button className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground hover:text-primary transition-colors ml-auto">
                <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Info Message */}
      <div className="mx-3 sm:mx-4 mb-4 bg-muted/50 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
        <p className="text-xs sm:text-sm text-muted-foreground">
          Solo tu entrenador puede publicar en esta comunidad
        </p>
      </div>
    </div>
  );
}
