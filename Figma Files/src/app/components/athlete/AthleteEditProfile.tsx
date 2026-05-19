import { useState, useRef } from 'react';
import { ArrowLeft, Camera, Check, CheckCircle } from 'lucide-react';

interface AthleteEditProfileProps {
  onBack: () => void;
}

const SPORTS = [
  'Running', 'Ciclismo', 'Remo', 'Gimnasio', 'Funcional',
  'CrossFit', 'Triatlón', 'Natación', 'Fútbol', 'Tenis',
  'Yoga', 'Pilates', 'Boxeo', 'MMA', 'Escalada',
];

const OBJECTIVES = [
  'Perder peso', 'Ganar masa muscular', 'Mejorar resistencia',
  'Competir', 'Rehabilitación', 'Mantenimiento', 'Aumentar flexibilidad',
];

export default function AthleteEditProfile({ onBack }: AthleteEditProfileProps) {
  // Basic info
  const [avatar, setAvatar] = useState<string | null>(null);
  const [name, setName] = useState('María');
  const [surname, setSurname] = useState('García');
  const [birthdate, setBirthdate] = useState('1995-06-15');
  const [email, setEmail] = useState('athlete@athlete');
  const [city, setCity] = useState('Buenos Aires');

  // Physical info
  const [height, setHeight] = useState('165');
  const [weight, setWeight] = useState('58');
  const [aptitude, setAptitude] = useState(6);
  const [objective, setObjective] = useState('Mejorar resistencia');
  const [accomplishments, setAccomplishments] = useState('Completé mi primer 10K en 2024. Participé en ciclismo amateur por 3 años.');
  const [lifestyle, setLifestyle] = useState<'sedentary' | 'active'>('active');
  const [selectedSports, setSelectedSports] = useState<string[]>(['Running', 'Ciclismo']);

  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const toggleSport = (s: string) =>
    setSelectedSports(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const aptitudeLabel =
    aptitude <= 3 ? 'Principiante' :
    aptitude <= 6 ? 'Intermedio' :
    aptitude <= 8 ? 'Avanzado' : 'Élite';

  return (
    <div className="h-full overflow-y-auto pb-28">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border sticky top-0 bg-background z-10">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-muted transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg flex-1">Editar perfil</h1>
        {saved && (
          <div className="flex items-center gap-1.5 text-primary text-sm">
            <CheckCircle className="w-4 h-4" />
            <span>Guardado</span>
          </div>
        )}
      </div>

      <div className="p-4 space-y-6">
        {/* Avatar */}
        <div className="flex justify-center pt-2">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center overflow-hidden border-4 border-card">
              {avatar
                ? <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
                : <span className="text-primary-foreground text-3xl">{name[0]}</span>
              }
            </div>
            <button
              onClick={() => fileRef.current?.click()}
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center border-2 border-card"
            >
              <Camera className="w-4 h-4 text-primary-foreground" />
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => {
                const f = e.target.files?.[0];
                if (f) setAvatar(URL.createObjectURL(f));
              }}
            />
          </div>
        </div>

        {/* Section: Información personal */}
        <Section title="Información personal">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Nombre" value={name} onChange={setName} placeholder="María" />
            <Field label="Apellido" value={surname} onChange={setSurname} placeholder="García" />
          </div>
          <Field label="Email" value={email} onChange={setEmail} placeholder="tu@email.com" type="email" />
          <div className="space-y-1.5">
            <label className="block text-xs text-muted-foreground font-medium">Fecha de nacimiento</label>
            <input
              type="date"
              value={birthdate}
              onChange={e => setBirthdate(e.target.value)}
              className="w-full px-4 py-3 bg-muted/50 rounded-xl border border-border text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
              style={{ colorScheme: 'dark' }}
            />
          </div>
          <Field label="Ciudad" value={city} onChange={setCity} placeholder="Buenos Aires" />
        </Section>

        {/* Section: Datos físicos */}
        <Section title="Datos físicos">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Altura (cm)" value={height} onChange={setHeight} placeholder="165" type="number" />
            <Field label="Peso (kg)" value={weight} onChange={setWeight} placeholder="58" type="number" />
          </div>

          {/* Aptitude slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs text-muted-foreground font-medium">Aptitud deportiva</label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{aptitudeLabel}</span>
                <div className="w-8 h-8 rounded-full bg-primary/15 border border-primary/40 flex items-center justify-center">
                  <span className="text-primary text-sm font-bold">{aptitude}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">1</span>
              <input
                type="range"
                min={1} max={10}
                value={aptitude}
                onChange={e => setAptitude(Number(e.target.value))}
                className="flex-1 h-2 rounded-full accent-primary"
                style={{ accentColor: '#c4ff0e' }}
              />
              <span className="text-xs text-muted-foreground">10</span>
            </div>
            <div className="flex justify-between">
              {Array.from({ length: 10 }, (_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    i + 1 <= aptitude ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Lifestyle */}
          <div className="space-y-2">
            <label className="text-xs text-muted-foreground font-medium block">Estilo de vida</label>
            <div className="grid grid-cols-2 gap-2">
              {(['sedentary', 'active'] as const).map(l => (
                <button
                  key={l}
                  onClick={() => setLifestyle(l)}
                  className={`py-3.5 rounded-xl text-xs font-semibold transition-all flex flex-col items-center gap-1.5 ${
                    lifestyle === l
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted/50 text-muted-foreground border border-border hover:border-primary/40'
                  }`}
                >
                  <span className="text-lg">{l === 'sedentary' ? '🛋️' : '⚡'}</span>
                  {l === 'sedentary' ? 'Sedentario' : 'Activo'}
                </button>
              ))}
            </div>
          </div>
        </Section>

        {/* Section: Objetivo y deportes */}
        <Section title="Objetivo de entrenamiento">
          <div className="flex flex-wrap gap-2">
            {OBJECTIVES.map(obj => (
              <button
                key={obj}
                onClick={() => setObjective(obj)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  objective === obj
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted/50 text-muted-foreground border border-border hover:border-primary/40'
                }`}
              >
                {obj}
              </button>
            ))}
          </div>
        </Section>

        {/* Section: Deportes */}
        <Section title="Deportes">
          <div className="flex flex-wrap gap-2">
            {SPORTS.map(s => {
              const sel = selectedSports.includes(s);
              return (
                <button
                  key={s}
                  onClick={() => toggleSport(s)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                    sel
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted/50 text-muted-foreground border border-border hover:border-primary/40'
                  }`}
                >
                  {sel && <Check className="w-3 h-3" />}
                  {s}
                </button>
              );
            })}
          </div>
        </Section>

        {/* Section: Logros */}
        <Section title="Logros deportivos">
          <textarea
            value={accomplishments}
            onChange={e => setAccomplishments(e.target.value)}
            placeholder="Ej: Completé mi primer 10K en 2023, practiqué fútbol amateur por 5 años..."
            rows={3}
            className="w-full px-4 py-3 bg-muted/50 rounded-xl border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none"
          />
        </Section>
      </div>

      {/* Sticky save button */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto px-4 pb-6 pt-3 bg-background/90 backdrop-blur border-t border-border">
        <button
          onClick={handleSave}
          className={`w-full py-3.5 rounded-xl font-medium transition-all ${
            saved
              ? 'bg-primary/20 text-primary border border-primary/40'
              : 'bg-primary text-primary-foreground hover:bg-primary/90'
          }`}
        >
          {saved ? '¡Perfil guardado!' : 'Guardar cambios'}
        </button>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium px-0.5">{title}</p>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Field({
  label, value, onChange, placeholder, type = 'text',
}: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs text-muted-foreground font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-muted/50 rounded-xl border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
      />
    </div>
  );
}
