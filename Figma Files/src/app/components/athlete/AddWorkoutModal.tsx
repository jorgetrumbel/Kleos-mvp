import { useState } from 'react';
import { X, Calendar, Dumbbell } from 'lucide-react';

const sports = [
  'Trail Running',
  'Carrera',
  'Ciclismo',
  'Natación',
  'Fuerza',
  'Yoga',
  'CrossFit',
  'Escalada',
  'Remo',
  'Caminata',
];

interface AddWorkoutModalProps {
  onClose: () => void;
  onAdd: (sport: string, date: string) => void;
  initialDate?: Date;
}

export default function AddWorkoutModal({ onClose, onAdd, initialDate }: AddWorkoutModalProps) {
  const [selectedSport, setSelectedSport] = useState('');
  const [selectedDate, setSelectedDate] = useState(
    initialDate ? initialDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
  );

  const handleSubmit = () => {
    if (selectedSport && selectedDate) {
      onAdd(selectedSport, selectedDate);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <div className="bg-background w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border p-4 flex items-center justify-between">
          <h2 className="text-lg font-medium">Agregar entrenamiento</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Date Selector */}
          <div>
            <label className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Fecha
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-3 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Sport Selector */}
          <div>
            <label className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
              <Dumbbell className="w-4 h-4" />
              Deporte
            </label>
            <div className="grid grid-cols-2 gap-2">
              {sports.map((sport) => (
                <button
                  key={sport}
                  onClick={() => setSelectedSport(sport)}
                  className={`p-3 rounded-xl border transition-all text-sm ${
                    selectedSport === sport
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-card border-border hover:bg-muted/50'
                  }`}
                >
                  {sport}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-muted text-foreground rounded-xl hover:bg-muted/80 transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              disabled={!selectedSport}
              className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Agregar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
