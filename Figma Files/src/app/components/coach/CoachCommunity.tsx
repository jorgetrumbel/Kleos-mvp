import { Plus, Heart, MessageCircle, Share2, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';

const mockPosts = [
  {
    id: 1,
    date: '2 horas atrás',
    content: '¡Felicitaciones a todos los atletas que completaron sus sesiones esta semana! 💪 Sigan así, el progreso es evidente.',
    likes: 24,
    comments: 5,
  },
  {
    id: 2,
    date: 'Ayer',
    content: 'Recordatorio: El próximo sábado tendremos una sesión grupal especial de trail running. ¡No falten! 🏃‍♂️🏔️',
    likes: 18,
    comments: 12,
  },
  {
    id: 3,
    date: 'Hace 3 días',
    content: 'Nueva rutina de fuerza disponible en la biblioteca de ejercicios. Perfecta para complementar vuestro entrenamiento de resistencia.',
    likes: 31,
    comments: 8,
  },
  {
    id: 4,
    date: 'Hace 5 días',
    content: '¿Sabían que el descanso es tan importante como el entrenamiento? Asegúrense de dormir 7-8 horas diarias para una recuperación óptima. 😴',
    likes: 45,
    comments: 15,
  },
];

export default function CoachCommunity() {
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="p-3 sm:p-4 border-b border-border sticky top-0 bg-background z-10">
        <div className="flex items-center justify-between mb-1 sm:mb-2">
          <h1 className="text-xl sm:text-2xl">Comunidad</h1>
          <button
            onClick={() => setShowNewPost(true)}
            className="p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground">Comparte actualizaciones con tus atletas</p>
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
              <button className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
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

      {/* New Post Modal */}
      {showNewPost && (
        <div
          className="fixed inset-0 bg-black/50 flex items-end justify-center z-50"
          onClick={() => setShowNewPost(false)}
        >
          <div
            className="bg-card rounded-t-3xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-4">Nueva publicación</h2>
            <textarea
              placeholder="¿Qué quieres compartir con tus atletas?"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              className="w-full h-32 p-4 bg-input rounded-xl border border-border resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <div className="flex gap-3 mt-4">
              <button className="p-3 rounded-xl bg-muted hover:bg-muted/80 transition-colors">
                <ImageIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => {
                  setNewPostContent('');
                  setShowNewPost(false);
                }}
                className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors"
              >
                Publicar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
