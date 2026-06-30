import { useState, useRef } from 'react';
import {
  ArrowLeft, User, Bell, Moon, HelpCircle, LogOut, ChevronRight,
  Dumbbell, CreditCard, Camera, Instagram, Twitter, Facebook, Youtube,
  Plus, Trash2, Star, Check, Mail, Phone, Globe, MessageSquare,
  Users, X,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type SubPage = 'edit-profile' | 'coach-config' | 'subscription' | 'about' | null;

interface AthletePlan {
  id: string;
  name: string;
  description: string;
  frequency: 'weekly' | 'monthly';
  sessions: number;
  sport: string;
  price: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const SPORTS = [
  'Running', 'Ciclismo', 'Remo', 'Gimnasio', 'Funcional',
  'CrossFit', 'Triatlón', 'Natación', 'Fútbol', 'Tenis',
  'Yoga', 'Pilates', 'Boxeo', 'MMA', 'Escalada',
];

const APP_PLANS = [
  { id: 'free',       name: 'Free',       athletes: '1 – 3 atletas',    price: 'Gratis',     monthly: 0 },
  { id: 'starter',    name: 'Starter',    athletes: '4 – 20 atletas',   price: '$29/mes',    monthly: 29 },
  { id: 'pro',        name: 'Pro',        athletes: '21 – 70 atletas',  price: '$79/mes',    monthly: 79, popular: true },
  { id: 'max',        name: 'Max',        athletes: '71 – 100 atletas', price: '$149/mes',   monthly: 149 },
  { id: 'enterprise', name: 'Enterprise', athletes: '100+ atletas',     price: 'Contactanos',monthly: null, enterprise: true },
];

const INITIAL_PLANS: AthletePlan[] = [
  { id: 'p1', name: 'Plan Básico', description: '2 sesiones semanales', frequency: 'monthly', sessions: 8, sport: 'Running', price: 30000 },
  { id: 'p2', name: 'Plan Premium', description: '4 sesiones semanales + seguimiento', frequency: 'monthly', sessions: 16, sport: 'CrossFit', price: 55000 },
];

// ─── Shared form primitives ────────────────────────────────────────────────────

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs text-muted-foreground mb-1">{children}</label>;
}

function TextInput({
  label, value, onChange, placeholder, type = 'text',
}: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-muted/50 rounded-xl px-4 py-3 text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/40"
        style={type === 'date' ? { colorScheme: 'dark' } : undefined}
      />
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2 px-1">{children}</p>
  );
}

function SubPageHeader({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div className="flex items-center gap-3 p-4 border-b border-border sticky top-0 bg-background z-10">
      <button onClick={onBack} className="p-2 rounded-full hover:bg-muted transition-colors">
        <ArrowLeft className="w-5 h-5" />
      </button>
      <h1 className="text-lg">{title}</h1>
    </div>
  );
}

function AvatarPicker({ src, onChange, label }: { src: string | null; onChange: (v: string) => void; label: string }) {
  const ref = useRef<HTMLInputElement>(null);
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onChange(URL.createObjectURL(file));
  };
  return (
    <div className="flex flex-col items-center gap-1.5">
      <button
        onClick={() => ref.current?.click()}
        className="w-20 h-20 rounded-full bg-muted border-2 border-dashed border-primary/40 hover:border-primary flex items-center justify-center overflow-hidden relative transition-colors"
      >
        {src ? (
          <img src={src} alt={label} className="w-full h-full object-cover" />
        ) : (
          <Camera className="w-6 h-6 text-primary/60" />
        )}
        <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
          <Camera className="w-5 h-5 text-white" />
        </div>
      </button>
      <span className="text-xs text-muted-foreground">{label}</span>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  );
}

function SportChip({ label, selected, onToggle }: { label: string; selected: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
        selected
          ? 'bg-primary text-primary-foreground'
          : 'bg-muted/60 text-muted-foreground border border-border hover:border-primary/50'
      }`}
    >
      {label}
    </button>
  );
}

// ─── Edit Profile Sub-page ────────────────────────────────────────────────────

function EditProfilePage({ onBack }: { onBack: () => void }) {
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [logoPic, setLogoPic] = useState<string | null>(null);
  const [name, setName] = useState('Tomás');
  const [surname, setSurname] = useState('Johansson');
  const [birthdate, setBirthdate] = useState('1988-06-15');
  const [email, setEmail] = useState('coach@coach');
  const [businessName, setBusinessName] = useState('Tomás Johansson Coaching');
  const [phrase, setPhrase] = useState('Transformá tu vida con el deporte');
  const [yearsExp, setYearsExp] = useState('10');
  const [city, setCity] = useState('Buenos Aires');
  const [selectedSports, setSelectedSports] = useState<string[]>(['Running', 'CrossFit']);
  const [social, setSocial] = useState({ instagram: '', twitter: '', facebook: '', youtube: '' });

  const toggleSport = (s: string) =>
    setSelectedSports(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const setSocialLink = (k: string, v: string) =>
    setSocial(prev => ({ ...prev, [k]: v }));

  return (
    <div className="h-full overflow-y-auto pb-24">
      <SubPageHeader title="Editar perfil" onBack={onBack} />

      <div className="p-4 space-y-6">
        {/* Avatars */}
        <div className="flex justify-around py-2">
          <AvatarPicker src={profilePic} onChange={setProfilePic} label="Foto de perfil" />
          <AvatarPicker src={logoPic} onChange={setLogoPic} label="Logo del negocio" />
        </div>

        {/* Personal info */}
        <div>
          <SectionLabel>Información personal</SectionLabel>
          <div className="bg-card rounded-xl border border-border p-4 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <TextInput label="Nombre" value={name} onChange={setName} placeholder="Tomás" />
              <TextInput label="Apellido" value={surname} onChange={setSurname} placeholder="Johansson" />
            </div>
            <TextInput label="Fecha de nacimiento" value={birthdate} onChange={setBirthdate} type="date" />
            <TextInput label="Email" value={email} onChange={setEmail} placeholder="coach@ejemplo.com" type="email" />
          </div>
        </div>

        {/* Business info */}
        <div>
          <SectionLabel>Información profesional</SectionLabel>
          <div className="bg-card rounded-xl border border-border p-4 space-y-4">
            <TextInput label="Nombre del negocio / marca" value={businessName} onChange={setBusinessName} placeholder="Ej: Carlos Coaching" />
            <TextInput label="Frase o subtítulo" value={phrase} onChange={setPhrase} placeholder="Ej: Transformá tu vida" />
            <div className="grid grid-cols-2 gap-3">
              <TextInput label="Años de experiencia" value={yearsExp} onChange={setYearsExp} type="number" />
              <TextInput label="Ciudad" value={city} onChange={setCity} placeholder="Buenos Aires" />
            </div>

            {/* Sports */}
            <div>
              <FieldLabel>Deportes que entrenas</FieldLabel>
              <div className="flex flex-wrap gap-2 mt-1">
                {SPORTS.map(s => (
                  <SportChip key={s} label={s} selected={selectedSports.includes(s)} onToggle={() => toggleSport(s)} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Social links */}
        <div>
          <SectionLabel>Redes sociales</SectionLabel>
          <div className="bg-card rounded-xl border border-border overflow-hidden divide-y divide-border">
            {[
              { key: 'instagram', icon: Instagram, placeholder: '@tu_usuario' },
              { key: 'twitter',   icon: Twitter,   placeholder: '@tu_usuario' },
              { key: 'facebook',  icon: Facebook,  placeholder: 'tu.pagina' },
              { key: 'youtube',   icon: Youtube,   placeholder: 'tu canal' },
            ].map(({ key, icon: Icon, placeholder }) => (
              <div key={key} className="flex items-center gap-3 px-4 py-3">
                <Icon className="w-4 h-4 text-muted-foreground shrink-0" />
                <input
                  value={social[key as keyof typeof social]}
                  onChange={e => setSocialLink(key, e.target.value)}
                  placeholder={placeholder}
                  className="flex-1 bg-transparent text-sm focus:outline-none placeholder:text-muted-foreground/50"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Change password */}
        <div>
          <SectionLabel>Contraseña</SectionLabel>
          <div className="bg-card rounded-xl border border-border p-4 space-y-4">
            <TextInput label="Contraseña actual" value="" onChange={() => {}} type="password" placeholder="••••••••" />
            <TextInput label="Nueva contraseña" value="" onChange={() => {}} type="password" placeholder="••••••••" />
            <TextInput label="Confirmar nueva contraseña" value="" onChange={() => {}} type="password" placeholder="••••••••" />
          </div>
        </div>

        {/* Save */}
        <button className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors">
          Guardar cambios
        </button>
      </div>
    </div>
  );
}

// ─── Coach Config (athlete plans) Sub-page ────────────────────────────────────

function PlanFormModal({ onClose, onSave }: { onClose: () => void; onSave: (p: Omit<AthletePlan, 'id'>) => void }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState<'weekly' | 'monthly'>('monthly');
  const [sessions, setSessions] = useState('8');
  const [sport, setSport] = useState('');
  const [price, setPrice] = useState('');

  const valid = name.trim().length > 0 && price.trim().length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full sm:max-w-md bg-background rounded-t-2xl sm:rounded-2xl border border-border overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border shrink-0">
          <h2>Nuevo plan</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-muted transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-4 space-y-4 flex-1">
          <TextInput label="Nombre del plan *" value={name} onChange={setName} placeholder="Ej: Plan Básico" />

          <div>
            <FieldLabel>Descripción</FieldLabel>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Descripción del plan..."
              rows={2}
              className="w-full bg-muted/50 rounded-xl px-4 py-3 text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
            />
          </div>

          <div>
            <FieldLabel>Frecuencia de pago</FieldLabel>
            <div className="grid grid-cols-2 gap-2 mt-1">
              {(['monthly', 'weekly'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFrequency(f)}
                  className={`py-2.5 rounded-xl text-sm font-medium transition-all ${
                    frequency === f
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground border border-border'
                  }`}
                >
                  {f === 'monthly' ? 'Mensual' : 'Semanal'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <TextInput label="Sesiones incluidas" value={sessions} onChange={setSessions} type="number" placeholder="8" />
            <TextInput label="Precio ($)" value={price} onChange={setPrice} type="number" placeholder="30000" />
          </div>

          <div>
            <FieldLabel>Deporte</FieldLabel>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {SPORTS.slice(0, 10).map(s => (
                <button
                  key={s}
                  onClick={() => setSport(s)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    sport === s
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground border border-border'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-border flex gap-3 shrink-0">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl border border-border hover:bg-muted/50 transition-colors text-sm">
            Cancelar
          </button>
          <button
            onClick={() => valid && onSave({ name: name.trim(), description, frequency, sessions: Number(sessions), sport, price: Number(price) })}
            disabled={!valid}
            className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm font-medium"
          >
            Guardar plan
          </button>
        </div>
      </div>
    </div>
  );
}

function CoachConfigPage({ onBack }: { onBack: () => void }) {
  const [plans, setPlans] = useState<AthletePlan[]>(INITIAL_PLANS);
  const [showModal, setShowModal] = useState(false);

  const addPlan = (p: Omit<AthletePlan, 'id'>) =>
    setPlans(prev => [...prev, { ...p, id: `plan-${Date.now()}` }]);

  const removePlan = (id: string) =>
    setPlans(prev => prev.filter(p => p.id !== id));

  return (
    <div className="h-full overflow-y-auto pb-8">
      <SubPageHeader title="Configuración de coach" onBack={onBack} />

      <div className="p-4 space-y-4">
        <div>
          <SectionLabel>Planes para atletas</SectionLabel>
          <p className="text-xs text-muted-foreground px-1 mb-3">
            Estos son los planes de suscripción que tus atletas pueden contratar.
          </p>

          {plans.length === 0 ? (
            <div className="flex flex-col items-center py-10 gap-3 border border-dashed border-border rounded-2xl">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Star className="w-5 h-5 text-primary/60" />
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Aún no hay planes.<br />Crea el primero.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {plans.map(plan => (
                <div key={plan.id} className="bg-card rounded-xl border border-border p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <p className="font-medium text-sm">{plan.name}</p>
                        {plan.sport && (
                          <span className="text-xs bg-primary/15 text-primary px-2 py-0.5 rounded-full">
                            {plan.sport}
                          </span>
                        )}
                      </div>
                      {plan.description && (
                        <p className="text-xs text-muted-foreground mb-2">{plan.description}</p>
                      )}
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-primary font-medium">
                          ${plan.price.toLocaleString('es-AR')}
                          <span className="text-xs text-muted-foreground font-normal">
                            /{plan.frequency === 'monthly' ? 'mes' : 'sem'}
                          </span>
                        </span>
                        <span className="text-xs text-muted-foreground">{plan.sessions} sesiones</span>
                      </div>
                    </div>
                    <button
                      onClick={() => removePlan(plan.id)}
                      className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center hover:bg-red-500/20 transition-colors shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => setShowModal(true)}
            className="mt-3 w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-primary/40 hover:border-primary hover:bg-primary/5 transition-all"
          >
            <Plus className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Nuevo plan</span>
          </button>
        </div>
      </div>

      {showModal && (
        <PlanFormModal
          onClose={() => setShowModal(false)}
          onSave={p => { addPlan(p); setShowModal(false); }}
        />
      )}
    </div>
  );
}

// ─── Subscription Sub-page ────────────────────────────────────────────────────

function SubscriptionPage({ onBack }: { onBack: () => void }) {
  const [selected, setSelected] = useState('pro');

  return (
    <div className="h-full overflow-y-auto pb-24">
      <SubPageHeader title="Suscripción y facturación" onBack={onBack} />

      <div className="p-4 space-y-4">
        {/* Current plan banner */}
        <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">Plan actual: Pro</p>
            <p className="text-xs text-muted-foreground">Próxima facturación: 15 Jun 2026</p>
          </div>
        </div>

        <div>
          <SectionLabel>Cambiar plan</SectionLabel>
          <p className="text-xs text-muted-foreground px-1 mb-3">
            Elige el plan que mejor se adapta a tu equipo.
          </p>

          <div className="space-y-3">
            {APP_PLANS.map(plan => (
              <button
                key={plan.id}
                onClick={() => !plan.enterprise && setSelected(plan.id)}
                className={`w-full text-left rounded-xl border-2 p-4 transition-all relative ${
                  selected === plan.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-card hover:border-border/80'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-2.5 right-4 bg-primary text-primary-foreground text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Más popular
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{plan.name}</p>
                      <p className="text-xs text-muted-foreground">{plan.athletes}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {plan.enterprise ? (
                      <span className="text-xs px-3 py-1.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/30 font-medium">
                        Contáctanos
                      </span>
                    ) : (
                      <>
                        <span className="text-sm font-medium text-primary">{plan.price}</span>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          selected === plan.id ? 'border-primary bg-primary' : 'border-muted-foreground'
                        }`}>
                          {selected === plan.id && <Check className="w-3 h-3 text-primary-foreground" strokeWidth={3} />}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <button className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors">
          Confirmar cambio de plan
        </button>

        {/* Billing info */}
        <div>
          <SectionLabel>Facturación</SectionLabel>
          <div className="bg-card rounded-xl border border-border overflow-hidden divide-y divide-border">
            <div className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm font-medium">Método de pago</p>
                <p className="text-xs text-muted-foreground">Visa •••• 4242</p>
              </div>
              <button className="text-xs text-primary hover:underline">Cambiar</button>
            </div>
            <div className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm font-medium">Historial de pagos</p>
                <p className="text-xs text-muted-foreground">Últimas facturas</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </div>

        <button className="w-full text-center text-sm text-red-400 hover:text-red-300 transition-colors py-2">
          Cancelar suscripción
        </button>
      </div>
    </div>
  );
}

// ─── About / Support Sub-page ─────────────────────────────────────────────────

function AboutPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="h-full overflow-y-auto pb-8">
      <SubPageHeader title="Ayuda y soporte" onBack={onBack} />

      <div className="p-4 space-y-4">
        {/* App identity */}
        <div className="flex flex-col items-center py-6 gap-3">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center">
            <Dumbbell className="w-8 h-8 text-primary-foreground" />
          </div>
          <div className="text-center">
            <p className="font-medium text-lg">Athletica</p>
            <p className="text-sm text-muted-foreground">Versión 1.0.0</p>
          </div>
        </div>

        {/* Contact */}
        <div>
          <SectionLabel>Contacto</SectionLabel>
          <div className="bg-card rounded-xl border border-border overflow-hidden divide-y divide-border">
            <a
              href="mailto:soporte@athletica.app"
              className="flex items-center gap-3 p-4 hover:bg-muted/30 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Email de soporte</p>
                <p className="text-xs text-muted-foreground">soporte@athletica.app</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </a>
            <a
              href="tel:+56912345678"
              className="flex items-center gap-3 p-4 hover:bg-muted/30 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Soporte telefónico</p>
                <p className="text-xs text-muted-foreground">+56 9 1234 5678 · Lun–Vie 9–18h</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </a>
            <a
              href="#"
              className="flex items-center gap-3 p-4 hover:bg-muted/30 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <MessageSquare className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Chat en vivo</p>
                <p className="text-xs text-muted-foreground">Disponible en horario hábil</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </a>
          </div>
        </div>

        {/* Resources */}
        <div>
          <SectionLabel>Recursos</SectionLabel>
          <div className="bg-card rounded-xl border border-border overflow-hidden divide-y divide-border">
            <a
              href="#"
              className="flex items-center gap-3 p-4 hover:bg-muted/30 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <HelpCircle className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Centro de ayuda</p>
                <p className="text-xs text-muted-foreground">Preguntas frecuentes y guías</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </a>
            <a
              href="#"
              className="flex items-center gap-3 p-4 hover:bg-muted/30 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Globe className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Sitio web</p>
                <p className="text-xs text-muted-foreground">athletica.app</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </a>
          </div>
        </div>

        {/* Social */}
        <div>
          <SectionLabel>Síguenos</SectionLabel>
          <div className="bg-card rounded-xl border border-border overflow-hidden divide-y divide-border">
            {[
              { Icon: Instagram, label: 'Instagram', handle: '@athletica.app' },
              { Icon: Twitter,   label: 'Twitter / X', handle: '@athleticaapp' },
              { Icon: Youtube,   label: 'YouTube',   handle: 'Athletica Oficial' },
            ].map(({ Icon, label, handle }) => (
              <a
                key={label}
                href="#"
                className="flex items-center gap-3 p-4 hover:bg-muted/30 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{label}</p>
                  <p className="text-xs text-muted-foreground">{handle}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </a>
            ))}
          </div>
        </div>

        {/* Legal */}
        <div>
          <SectionLabel>Legal</SectionLabel>
          <div className="bg-card rounded-xl border border-border overflow-hidden divide-y divide-border">
            {['Términos y condiciones', 'Política de privacidad'].map(item => (
              <a
                key={item}
                href="#"
                className="flex items-center gap-3 p-4 hover:bg-muted/30 transition-colors"
              >
                <span className="flex-1 text-sm">{item}</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </a>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground pt-2">
          © 2026 Athletica. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}

// ─── Main CoachSettings ────────────────────────────────────────────────────────

interface CoachSettingsProps {
  onClose: () => void;
  onLogout: () => void;
}

export default function CoachSettings({ onClose, onLogout }: CoachSettingsProps) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [subPage, setSubPage] = useState<SubPage>(null);

  // Render sub-pages
  if (subPage === 'edit-profile') return <EditProfilePage onBack={() => setSubPage(null)} />;
  if (subPage === 'coach-config') return <CoachConfigPage onBack={() => setSubPage(null)} />;
  if (subPage === 'subscription') return <SubscriptionPage onBack={() => setSubPage(null)} />;
  if (subPage === 'about') return <AboutPage onBack={() => setSubPage(null)} />;

  return (
    <div className="h-full overflow-y-auto pb-20">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border">
        <button onClick={onClose} className="p-2 rounded-full hover:bg-muted transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg">Configuración</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Profile card */}
        <button
          onClick={() => setSubPage('edit-profile')}
          className="w-full bg-card rounded-xl p-4 border border-border flex items-center gap-4 hover:bg-muted/30 transition-colors"
        >
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xl shrink-0">
            T
          </div>
          <div className="flex-1 text-left">
            <p className="font-medium">Tomás Johansson</p>
            <p className="text-sm text-muted-foreground">coach@coach</p>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Account section */}
        <div>
          <SectionLabel>Cuenta</SectionLabel>
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <SettingRow icon={User} label="Editar perfil" onClick={() => setSubPage('edit-profile')} />
          </div>
        </div>

        {/* Coach section */}
        <div>
          <SectionLabel>Coach</SectionLabel>
          <div className="bg-card rounded-xl border border-border overflow-hidden divide-y divide-border">
            <SettingRow icon={Dumbbell} label="Configuración de coach" onClick={() => setSubPage('coach-config')} />
            <SettingRow icon={CreditCard} label="Suscripción y facturación" onClick={() => setSubPage('subscription')} />
          </div>
        </div>

        {/* Preferences */}
        <div>
          <SectionLabel>Preferencias</SectionLabel>
          <div className="bg-card rounded-xl border border-border overflow-hidden divide-y divide-border">
            <ToggleRow icon={Bell} label="Notificaciones" value={notifications} onChange={setNotifications} />
            <ToggleRow icon={Moon} label="Modo oscuro" value={darkMode} onChange={setDarkMode} />
          </div>
        </div>

        {/* Support */}
        <div>
          <SectionLabel>Soporte</SectionLabel>
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <SettingRow icon={HelpCircle} label="Ayuda y soporte" onClick={() => setSubPage('about')} />
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground pt-2">Athletica v1.0.0</p>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 p-4 bg-red-500/10 rounded-xl border border-red-500/20 text-red-400 hover:bg-red-500/15 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </div>
  );
}

// ─── Shared row components ─────────────────────────────────────────────────────

function SettingRow({ icon: Icon, label, onClick }: { icon: React.ElementType; label: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors"
    >
      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <span className="flex-1 text-left text-sm">{label}</span>
      <ChevronRight className="w-4 h-4 text-muted-foreground" />
    </button>
  );
}

function ToggleRow({
  icon: Icon, label, value, onChange,
}: {
  icon: React.ElementType; label: string; value: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-3 p-4">
      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <span className="flex-1 text-sm">{label}</span>
      <button
        onClick={() => onChange(!value)}
        className={`w-11 h-6 rounded-full transition-colors relative ${value ? 'bg-primary' : 'bg-muted'}`}
      >
        <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${value ? 'translate-x-5' : 'translate-x-0.5'}`} />
      </button>
    </div>
  );
}
