import { X, Clock, Activity, Heart, Zap, MessageSquare, Star, Play } from 'lucide-react';

interface WearableMetrics {
  duration: string;
  avgHeartRate: number;
  maxHeartRate: number;
  calories: number;
  distance?: string;
  pace?: string;
}

interface WorkoutDetails {
  id: number;
  date: string;
  time: string;
  title: string;
  type: string;
  stages: string[];
  completed: boolean;
  metrics?: WearableMetrics;
  rpe?: number;
  feedback?: string;
}

interface WorkoutDetailsModalProps {
  workout: WorkoutDetails;
  onClose: () => void;
  onStart?: () => void;
  onOpenRPE?: () => void;
}

export default function WorkoutDetailsModal({ workout, onClose, onStart, onOpenRPE }: WorkoutDetailsModalProps) {
  const isPast = workout.completed;
  const workoutDate = new Date(workout.date);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <div className="bg-background w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border p-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium">{workout.title}</h2>
            <p className="text-sm text-muted-foreground">
              {workoutDate.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })} · {workout.time}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Type badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/20 text-primary rounded-full text-sm">
            <Activity className="w-4 h-4" />
            {workout.type}
          </div>

          {/* Stages */}
          <div>
            <h3 className="text-sm font-medium mb-2 text-muted-foreground uppercase tracking-wider">Etapas</h3>
            <div className="space-y-2">
              {workout.stages.map((stage, i) => (
                <div key={i} className="flex items-start gap-3 bg-card border border-border rounded-lg p-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-xs text-primary">
                    {i + 1}
                  </div>
                  <p className="text-sm">{stage}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Past workout: show metrics, RPE, feedback */}
          {isPast && workout.metrics && (
            <>
              {/* Wearable Metrics */}
              <div>
                <h3 className="text-sm font-medium mb-3 text-muted-foreground uppercase tracking-wider">Métricas</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-card border border-border rounded-lg p-3">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs">Duración</span>
                    </div>
                    <p className="text-lg font-medium">{workout.metrics.duration}</p>
                  </div>

                  <div className="bg-card border border-border rounded-lg p-3">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Zap className="w-4 h-4" />
                      <span className="text-xs">Calorías</span>
                    </div>
                    <p className="text-lg font-medium">{workout.metrics.calories}</p>
                  </div>

                  <div className="bg-card border border-border rounded-lg p-3">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Heart className="w-4 h-4" />
                      <span className="text-xs">FC Promedio</span>
                    </div>
                    <p className="text-lg font-medium">{workout.metrics.avgHeartRate} bpm</p>
                  </div>

                  <div className="bg-card border border-border rounded-lg p-3">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Heart className="w-4 h-4" />
                      <span className="text-xs">FC Máxima</span>
                    </div>
                    <p className="text-lg font-medium">{workout.metrics.maxHeartRate} bpm</p>
                  </div>

                  {workout.metrics.distance && (
                    <div className="bg-card border border-border rounded-lg p-3">
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <Activity className="w-4 h-4" />
                        <span className="text-xs">Distancia</span>
                      </div>
                      <p className="text-lg font-medium">{workout.metrics.distance}</p>
                    </div>
                  )}

                  {workout.metrics.pace && (
                    <div className="bg-card border border-border rounded-lg p-3">
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <Zap className="w-4 h-4" />
                        <span className="text-xs">Ritmo</span>
                      </div>
                      <p className="text-lg font-medium">{workout.metrics.pace}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* RPE */}
              {workout.rpe !== undefined ? (
                <div>
                  <h3 className="text-sm font-medium mb-3 text-muted-foreground uppercase tracking-wider">Esfuerzo percibido (RPE)</h3>
                  <div className="bg-card border border-border rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-xl font-medium text-primary">{workout.rpe}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {workout.rpe <= 3 ? 'Muy fácil' : workout.rpe <= 5 ? 'Moderado' : workout.rpe <= 7 ? 'Intenso' : 'Muy intenso'}
                        </p>
                        <div className="flex gap-1 mt-1">
                          {Array.from({ length: 10 }, (_, i) => (
                            <div
                              key={i}
                              className={`h-1.5 flex-1 rounded-full ${
                                i < workout.rpe! ? 'bg-primary' : 'bg-muted'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-sm font-medium mb-3 text-muted-foreground uppercase tracking-wider">Esfuerzo percibido (RPE)</h3>
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <Star className="w-5 h-5 text-amber-400" />
                      <div className="flex-1">
                        <p className="text-sm text-amber-300">Esta sesión aún no ha sido puntuada</p>
                      </div>
                      {onOpenRPE && (
                        <button
                          onClick={onOpenRPE}
                          className="px-3 py-1.5 bg-amber-500/20 text-amber-300 rounded-lg text-sm hover:bg-amber-500/30 transition-colors"
                        >
                          Puntuar
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Feedback */}
              {workout.feedback && (
                <div>
                  <h3 className="text-sm font-medium mb-3 text-muted-foreground uppercase tracking-wider">Feedback</h3>
                  <div className="bg-card border border-border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <MessageSquare className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <p className="text-sm">{workout.feedback}</p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Future workout: show start button */}
          {!isPast && onStart && (
            <button
              onClick={onStart}
              className="w-full py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 font-medium"
            >
              <Play className="w-5 h-5" />
              Iniciar entrenamiento
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
