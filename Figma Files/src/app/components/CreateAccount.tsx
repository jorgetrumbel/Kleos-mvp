/**
 * CreateAccount - Multi-step account creation flow for Athletica
 * Coach: 5 steps | Athlete: 3 steps
 */

import { useState, useRef, useCallback } from 'react';
import {
  ArrowLeft, ArrowRight, Check, Plus, Copy, Share2, X,
  Camera, Instagram, Twitter, Facebook, Youtube,
  Dumbbell, Bike, Waves, Zap, Trophy, User, Users,
  Pencil, Trash2, ChevronDown, ChevronUp, Star,
} from 'lucide-react';
import imgLogin from 'figma:asset/6756315561075879ccf2bce0b6a9eb51f8b06c22.png';
import imgLogo from 'figma:asset/04d9e88d6c46fe3df8b3455953366bd47a216bc4.png';

// ─── Types ───────────────────────────────────────────────────────────────────

type UserRole = 'coach' | 'athlete' | null;

interface Plan {
  id: string;
  name: string;
  description: string;
  frequency: 'weekly' | 'monthly';
  sessions: number;
  sport: string;
  price: number;
}

interface CreateAccountProps {
  onComplete: (role: 'coach' | 'athlete') => void;
  onBack: () => void;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const SPORTS = [
  'Running', 'Ciclismo', 'Remo', 'Gimnasio', 'Funcional',
  'CrossFit', 'Triatlón', 'Natación', 'Fútbol', 'Tenis',
  'Yoga', 'Pilates', 'Boxeo', 'MMA', 'Escalada',
];

const OBJECTIVES = [
  'Perder peso', 'Ganar masa muscular', 'Mejorar resistencia',
  'Competir', 'Rehabilitación', 'Mantenimiento', 'Aumentar flexibilidad',
];

const SUBSCRIPTIONS = [
  { id: 'free',       name: 'Free',       athletes: '1 – 3 atletas',   price: 'Gratis',     color: '#6b7280' },
  { id: 'starter',    name: 'Starter',    athletes: '4 – 20 atletas',  price: '$29/mes',    color: '#38bdf8' },
  { id: 'pro',        name: 'Pro',        athletes: '21 – 70 atletas', price: '$79/mes',    color: '#c4ff0e', popular: true },
  { id: 'max',        name: 'Max',        athletes: '71 – 100 atletas',price: '$149/mes',   color: '#a3e635' },
  { id: 'enterprise', name: 'Enterprise', athletes: '100+ atletas',    price: 'Contactanos',color: '#f97316', enterprise: true },
];

// Mock coach that appears when athlete enters a valid code
const MOCK_COACH = {
  code: 'CARL-2026-FZQX',
  name: 'Carlos Mendoza',
  specialty: 'Running & Triatlón',
  avatar: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&q=80',
};

// ─── Helper ──────────────────────────────────────────────────────────────────

function generateCode(name: string): string {
  const prefix = (name.slice(0, 4).toUpperCase() + 'XXXX').slice(0, 4);
  const year = new Date().getFullYear();
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${prefix}-${year}-${suffix}`;
}

// ─── Reusable UI pieces ───────────────────────────────────────────────────────

function Input({
  label, value, onChange, placeholder, type = 'text', icon,
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; icon?: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-xs text-white">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]">{icon}</div>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-3 bg-[rgba(30,41,59,0.5)] rounded-xl border border-[rgba(255,255,255,0.08)] text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-[#c4ff0e]/50`}
        />
      </div>
    </div>
  );
}

function TextArea({
  label, value, onChange, placeholder, rows = 3,
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; rows?: number;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-xs text-white">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-4 py-3 bg-[rgba(30,41,59,0.5)] rounded-xl border border-[rgba(255,255,255,0.08)] text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-[#c4ff0e]/50 resize-none"
      />
    </div>
  );
}

function AvatarUpload({
  src, onSelect, size = 'md', label = 'Foto de perfil',
}: {
  src: string | null; onSelect: (url: string) => void; size?: 'sm' | 'md' | 'lg'; label?: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const dim = size === 'lg' ? 'w-24 h-24' : size === 'md' ? 'w-20 h-20' : 'w-14 h-14';
  const iconSize = size === 'lg' ? 28 : size === 'md' ? 22 : 16;

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onSelect(URL.createObjectURL(file));
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={() => ref.current?.click()}
        className={`${dim} rounded-full bg-[rgba(30,41,59,0.6)] border-2 border-dashed border-[rgba(196,255,14,0.4)] flex items-center justify-center overflow-hidden relative hover:border-[#c4ff0e] transition-colors`}
      >
        {src ? (
          <img src={src} alt="avatar" className="w-full h-full object-cover" />
        ) : (
          <Camera size={iconSize} className="text-[#c4ff0e]/60" />
        )}
        <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
          <Camera size={iconSize} className="text-white" />
        </div>
      </button>
      <span className="text-[10px] text-[#9ca3af] font-['Plus_Jakarta_Sans',sans-serif]">{label}</span>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  );
}

function SportChip({ label, selected, onToggle }: { label: string; selected: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`px-3 py-1.5 rounded-full text-xs font-['Plus_Jakarta_Sans',sans-serif] font-medium transition-all ${
        selected
          ? 'bg-[#c4ff0e] text-black'
          : 'bg-[rgba(30,41,59,0.5)] text-white/70 border border-[rgba(255,255,255,0.1)] hover:border-[#c4ff0e]/40'
      }`}
    >
      {label}
    </button>
  );
}

// ─── Step Components ──────────────────────────────────────────────────────────

// Step 1 — Shared: Role + Basic Info
function Step1({
  role, setRole, name, setName, surname, setSurname,
  birthdate, setBirthdate, email, setEmail, password, setPassword,
  confirmPassword, setConfirmPassword,
}: {
  role: UserRole; setRole: (r: UserRole) => void;
  name: string; setName: (v: string) => void;
  surname: string; setSurname: (v: string) => void;
  birthdate: string; setBirthdate: (v: string) => void;
  email: string; setEmail: (v: string) => void;
  password: string; setPassword: (v: string) => void;
  confirmPassword: string; setConfirmPassword: (v: string) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <p className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-xs text-white mb-2">
          Soy un/a
        </p>
        <div className="grid grid-cols-2 gap-3">
          {(['coach', 'athlete'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`flex flex-col items-center gap-2 py-4 rounded-2xl border-2 transition-all ${
                role === r
                  ? 'border-[#c4ff0e] bg-[rgba(196,255,14,0.08)]'
                  : 'border-[rgba(255,255,255,0.1)] bg-[rgba(30,41,59,0.4)] hover:border-[#c4ff0e]/40'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                role === r ? 'bg-[#c4ff0e]/20' : 'bg-[rgba(30,41,59,0.6)]'
              }`}>
                {r === 'coach'
                  ? <Trophy size={20} className={role === r ? 'text-[#c4ff0e]' : 'text-white/50'} />
                  : <User size={20} className={role === r ? 'text-[#c4ff0e]' : 'text-white/50'} />
                }
              </div>
              <span className={`font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-sm ${
                role === r ? 'text-[#c4ff0e]' : 'text-white/60'
              }`}>
                {r === 'coach' ? 'Coach' : 'Atleta'}
              </span>
              {role === r && (
                <div className="w-4 h-4 rounded-full bg-[#c4ff0e] flex items-center justify-center">
                  <Check size={10} className="text-black" strokeWidth={3} />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Input label="Nombre" value={name} onChange={setName} placeholder="Carlos" />
        <Input label="Apellido" value={surname} onChange={setSurname} placeholder="Mendoza" />
      </div>

      <div className="space-y-1.5">
        <label className="block font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-xs text-white">
          Fecha de nacimiento
        </label>
        <input
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          className="w-full px-4 py-3 bg-[rgba(30,41,59,0.5)] rounded-xl border border-[rgba(255,255,255,0.08)] text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#c4ff0e]/50"
          style={{ colorScheme: 'dark' }}
        />
      </div>

      <Input label="Email" value={email} onChange={setEmail} placeholder="carlos@ejemplo.com" />

      <div className="space-y-1.5">
        <label className="block font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-xs text-white">
          Contraseña
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full px-4 py-3 bg-[rgba(30,41,59,0.5)] rounded-xl border border-[rgba(255,255,255,0.08)] text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-[#c4ff0e]/50"
        />
      </div>

      <div className="space-y-1.5">
        <label className="block font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-xs text-white">
          Confirmar contraseña
        </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="••••••••"
          className={`w-full px-4 py-3 bg-[rgba(30,41,59,0.5)] rounded-xl border text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-1 ${
            confirmPassword && confirmPassword !== password
              ? 'border-red-500/50 focus:ring-red-500/30'
              : 'border-[rgba(255,255,255,0.08)] focus:ring-[#c4ff0e]/50'
          }`}
        />
        {confirmPassword && confirmPassword !== password && (
          <p className="text-red-400 text-[10px] font-['Plus_Jakarta_Sans',sans-serif]">Las contraseñas no coinciden</p>
        )}
      </div>
    </div>
  );
}

// Coach Step 2 — Professional Info
function CoachStep2({
  profilePic, setProfilePic, yearsExp, setYearsExp,
  selectedSports, toggleSport, city, setCity,
  businessName, setBusinessName, phrase, setPhrase,
  logoPic, setLogoPic,
  socialLinks, setSocialLink,
}: {
  profilePic: string | null; setProfilePic: (v: string) => void;
  yearsExp: string; setYearsExp: (v: string) => void;
  selectedSports: string[]; toggleSport: (s: string) => void;
  city: string; setCity: (v: string) => void;
  businessName: string; setBusinessName: (v: string) => void;
  phrase: string; setPhrase: (v: string) => void;
  logoPic: string | null; setLogoPic: (v: string) => void;
  socialLinks: Record<string, string>; setSocialLink: (k: string, v: string) => void;
}) {
  return (
    <div className="space-y-5">
      {/* Avatars row */}
      <div className="flex justify-around">
        <AvatarUpload src={profilePic} onSelect={setProfilePic} size="lg" label="Foto de perfil" />
        <AvatarUpload src={logoPic} onSelect={setLogoPic} size="lg" label="Logo del negocio" />
      </div>

      <Input label="Nombre del negocio / marca" value={businessName} onChange={setBusinessName} placeholder="Ej: Carlos Mendoza Coaching" />
      <Input label="Frase o subtítulo" value={phrase} onChange={setPhrase} placeholder="Ej: Transformá tu vida con el deporte" />

      <div className="grid grid-cols-2 gap-3">
        <Input label="Años de experiencia" value={yearsExp} onChange={setYearsExp} placeholder="5" type="number" />
        <Input label="Ciudad / Ubicación" value={city} onChange={setCity} placeholder="Buenos Aires" />
      </div>

      {/* Sports */}
      <div className="space-y-2">
        <p className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-xs text-white">
          Deportes que entrena
        </p>
        <div className="flex flex-wrap gap-2">
          {SPORTS.map((s) => (
            <SportChip key={s} label={s} selected={selectedSports.includes(s)} onToggle={() => toggleSport(s)} />
          ))}
        </div>
      </div>

      {/* Social Links */}
      <div className="space-y-2">
        <p className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-xs text-white">
          Redes sociales
        </p>
        <div className="space-y-2">
          {[
            { key: 'instagram', icon: <Instagram size={15} />, placeholder: '@tu_usuario' },
            { key: 'twitter',   icon: <Twitter size={15} />,   placeholder: '@tu_usuario' },
            { key: 'facebook',  icon: <Facebook size={15} />,  placeholder: 'tu.pagina' },
            { key: 'youtube',   icon: <Youtube size={15} />,   placeholder: 'tu canal' },
          ].map(({ key, icon, placeholder }) => (
            <div key={key} className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]">{icon}</div>
              <input
                value={socialLinks[key] || ''}
                onChange={(e) => setSocialLink(key, e.target.value)}
                placeholder={placeholder}
                className="w-full pl-9 pr-4 py-2.5 bg-[rgba(30,41,59,0.5)] rounded-xl border border-[rgba(255,255,255,0.08)] text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-[#c4ff0e]/50"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Coach Step 3 — App Subscription
function CoachStep3({ selected, setSelected }: { selected: string; setSelected: (v: string) => void }) {
  return (
    <div className="space-y-3">
      <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs text-[#9ca3af] pb-1">
        Elegí el plan que más se adapta a tu equipo.
      </p>
      {SUBSCRIPTIONS.map((sub) => (
        <button
          key={sub.id}
          onClick={() => !sub.enterprise && setSelected(sub.id)}
          className={`w-full text-left rounded-2xl border-2 p-4 transition-all relative ${
            selected === sub.id
              ? 'border-[#c4ff0e] bg-[rgba(196,255,14,0.07)]'
              : 'border-[rgba(255,255,255,0.08)] bg-[rgba(30,41,59,0.4)] hover:border-[rgba(255,255,255,0.2)]'
          }`}
        >
          {sub.popular && (
            <div className="absolute -top-2.5 right-4 bg-[#c4ff0e] text-black text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-['Plus_Jakarta_Sans',sans-serif]">
              Más popular
            </div>
          )}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center`}
                style={{ backgroundColor: `${sub.color}18` }}>
                <Users size={16} style={{ color: sub.color }} />
              </div>
              <div>
                <p className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm text-white">{sub.name}</p>
                <p className="font-['Plus_Jakarta_Sans',sans-serif] text-[10px] text-[#9ca3af]">{sub.athletes}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {sub.enterprise ? (
                <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs px-3 py-1.5 rounded-full bg-[rgba(249,115,22,0.15)] text-orange-400 border border-orange-500/30">
                  Contactanos
                </span>
              ) : (
                <>
                  <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm" style={{ color: sub.color }}>
                    {sub.price}
                  </span>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    selected === sub.id ? 'border-[#c4ff0e] bg-[#c4ff0e]' : 'border-[rgba(255,255,255,0.2)]'
                  }`}>
                    {selected === sub.id && <Check size={11} className="text-black" strokeWidth={3} />}
                  </div>
                </>
              )}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

// Plan Modal
function PlanModal({
  onClose, onSave,
}: {
  onClose: () => void; onSave: (plan: Omit<Plan, 'id'>) => void;
}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState<'weekly' | 'monthly'>('monthly');
  const [sessions, setSessions] = useState('4');
  const [sport, setSport] = useState('');
  const [price, setPrice] = useState('');

  const handleSave = () => {
    if (!name || !price) return;
    onSave({ name, description, frequency, sessions: Number(sessions), sport, price: Number(price) });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-[448px] bg-[#0f1729] rounded-t-[32px] p-6 space-y-4 pb-10 max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-4" />

        <div className="flex items-center justify-between mb-2">
          <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base text-white">Nuevo Plan</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20">
            <X size={16} className="text-white" />
          </button>
        </div>

        <Input label="Nombre del plan" value={name} onChange={setName} placeholder="Ej: Plan Básico" />
        <TextArea label="Descripción" value={description} onChange={setDescription} placeholder="Descripción del plan..." rows={2} />

        {/* Frequency */}
        <div className="space-y-1.5">
          <p className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-xs text-white">Frecuencia de pago</p>
          <div className="grid grid-cols-2 gap-2">
            {(['monthly', 'weekly'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFrequency(f)}
                className={`py-2.5 rounded-xl text-xs font-['Plus_Jakarta_Sans',sans-serif] font-semibold transition-all ${
                  frequency === f
                    ? 'bg-[#c4ff0e] text-black'
                    : 'bg-[rgba(30,41,59,0.6)] text-white/60 border border-white/10'
                }`}
              >
                {f === 'monthly' ? 'Mensual' : 'Semanal'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input label="Cant. de sesiones" value={sessions} onChange={setSessions} placeholder="8" type="number" />
          <Input label="Precio ($)" value={price} onChange={setPrice} placeholder="5000" type="number" />
        </div>

        {/* Sport select */}
        <div className="space-y-1.5">
          <p className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-xs text-white">Deporte</p>
          <div className="flex flex-wrap gap-1.5">
            {SPORTS.slice(0, 8).map((s) => (
              <button
                key={s}
                onClick={() => setSport(s)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-['Plus_Jakarta_Sans',sans-serif] font-medium transition-all ${
                  sport === s
                    ? 'bg-[#c4ff0e] text-black'
                    : 'bg-[rgba(30,41,59,0.5)] text-white/60 border border-white/10'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-gradient-to-r from-[#4ade80] to-[#a3e635] rounded-full py-3.5 font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm text-black drop-shadow-[0px_0px_10px_rgba(163,230,53,0.35)] hover:opacity-90 transition-opacity mt-2"
        >
          Guardar plan
        </button>
      </div>
    </div>
  );
}

// Coach Step 4 — Athlete Plans
function CoachStep4({
  plans, addPlan, removePlan,
}: {
  plans: Plan[]; addPlan: (p: Omit<Plan, 'id'>) => void; removePlan: (id: string) => void;
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-4">
      <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs text-[#9ca3af]">
        Creá los planes de suscripción que ofrecerás a tus atletas.
      </p>

      {plans.length === 0 ? (
        <div className="flex flex-col items-center py-8 gap-3 border border-dashed border-white/15 rounded-2xl">
          <div className="w-12 h-12 rounded-full bg-[rgba(196,255,14,0.08)] flex items-center justify-center">
            <Star size={22} className="text-[#c4ff0e]/50" />
          </div>
          <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs text-white/40 text-center">
            Aún no hay planes.<br />Creá el primero.
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {plans.map((plan) => (
            <div key={plan.id} className="flex items-start gap-3 bg-[rgba(30,41,59,0.5)] rounded-2xl p-4 border border-white/[0.06]">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm text-white">{plan.name}</p>
                  {plan.sport && (
                    <span className="text-[9px] font-['Plus_Jakarta_Sans',sans-serif] bg-[#c4ff0e]/15 text-[#c4ff0e] px-2 py-0.5 rounded-full">
                      {plan.sport}
                    </span>
                  )}
                </div>
                {plan.description && (
                  <p className="font-['Plus_Jakarta_Sans',sans-serif] text-[11px] text-white/50 mb-1.5">{plan.description}</p>
                )}
                <div className="flex items-center gap-3">
                  <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm text-[#c4ff0e]">
                    ${plan.price.toLocaleString('es-AR')}
                    <span className="text-[10px] font-normal text-white/40">
                      /{plan.frequency === 'monthly' ? 'mes' : 'sem'}
                    </span>
                  </span>
                  <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[10px] text-white/40">
                    {plan.sessions} sesiones
                  </span>
                </div>
              </div>
              <button
                onClick={() => removePlan(plan.id)}
                className="w-7 h-7 rounded-full bg-red-500/10 flex items-center justify-center hover:bg-red-500/20 transition-colors flex-shrink-0"
              >
                <Trash2 size={13} className="text-red-400" />
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => setShowModal(true)}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-dashed border-[#c4ff0e]/40 hover:border-[#c4ff0e] hover:bg-[#c4ff0e]/5 transition-all"
      >
        <Plus size={16} className="text-[#c4ff0e]" />
        <span className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-sm text-[#c4ff0e]">
          Nuevo Plan
        </span>
      </button>

      {showModal && (
        <PlanModal
          onClose={() => setShowModal(false)}
          onSave={(p) => { addPlan(p); setShowModal(false); }}
        />
      )}
    </div>
  );
}

// Coach Step 5 — Linking Code
function CoachStep5({
  code, setCode, name,
}: {
  code: string; setCode: (v: string) => void; name: string;
}) {
  const [editing, setEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: 'Athletica – Código de acceso', text: `Únete a mi equipo en Athletica con el código: ${code}` });
    } else {
      handleCopy();
    }
  };

  return (
    <div className="space-y-6 flex flex-col items-center">
      {/* Trophy icon */}
      <div className="w-20 h-20 rounded-full bg-[rgba(196,255,14,0.1)] flex items-center justify-center mt-2">
        <Trophy size={36} className="text-[#c4ff0e]" />
      </div>

      <div className="text-center">
        <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-lg text-white mb-1">
          ¡Listo, {name || 'Coach'}!
        </h3>
        <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs text-[#9ca3af] leading-5">
          Compartí este código con tus atletas para que puedan unirse a tu equipo.
        </p>
      </div>

      {/* Code display / edit */}
      <div className="w-full bg-[rgba(196,255,14,0.06)] border-2 border-[#c4ff0e]/30 rounded-2xl p-5">
        {editing ? (
          <div className="space-y-2">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              className="w-full text-center font-['Montserrat',sans-serif] font-bold text-xl tracking-[6px] text-[#c4ff0e] bg-transparent border-b border-[#c4ff0e]/40 focus:outline-none pb-1"
            />
            <button
              onClick={() => setEditing(false)}
              className="w-full text-xs text-[#c4ff0e]/60 font-['Plus_Jakarta_Sans',sans-serif] hover:text-[#c4ff0e]"
            >
              Confirmar
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-3">
            <span className="font-['Montserrat',sans-serif] font-bold text-xl tracking-[6px] text-[#c4ff0e]">
              {code}
            </span>
            <button
              onClick={() => setEditing(true)}
              className="w-7 h-7 rounded-full bg-[#c4ff0e]/10 flex items-center justify-center hover:bg-[#c4ff0e]/20 transition-colors"
            >
              <Pencil size={13} className="text-[#c4ff0e]" />
            </button>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-3 w-full">
        <button
          onClick={handleCopy}
          className={`flex items-center justify-center gap-2 py-3 rounded-2xl border transition-all ${
            copied
              ? 'border-[#c4ff0e] bg-[#c4ff0e]/10 text-[#c4ff0e]'
              : 'border-white/15 bg-[rgba(30,41,59,0.5)] text-white hover:border-white/30'
          }`}
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          <span className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-sm">
            {copied ? 'Copiado' : 'Copiar'}
          </span>
        </button>
        <button
          onClick={handleShare}
          className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-[#4ade80] to-[#a3e635] text-black hover:opacity-90 transition-opacity"
        >
          <Share2 size={16} />
          <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm">Compartir</span>
        </button>
      </div>

      <p className="font-['Plus_Jakarta_Sans',sans-serif] text-[10px] text-white/30 text-center">
        Podés cambiar tu código en cualquier momento desde Configuración.
      </p>
    </div>
  );
}

// Athlete Step 2 — Physical Info
function AthleteStep2({
  profilePic, setProfilePic, height, setHeight, weight, setWeight,
  aptitude, setAptitude, objective, setObjective,
  accomplishments, setAccomplishments, lifestyle, setLifestyle,
}: {
  profilePic: string | null; setProfilePic: (v: string) => void;
  height: string; setHeight: (v: string) => void;
  weight: string; setWeight: (v: string) => void;
  aptitude: number; setAptitude: (v: number) => void;
  objective: string; setObjective: (v: string) => void;
  accomplishments: string; setAccomplishments: (v: string) => void;
  lifestyle: 'sedentary' | 'active'; setLifestyle: (v: 'sedentary' | 'active') => void;
}) {
  return (
    <div className="space-y-5">
      <div className="flex justify-center">
        <AvatarUpload src={profilePic} onSelect={setProfilePic} size="lg" label="Foto de perfil" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Input label="Altura (cm)" value={height} onChange={setHeight} placeholder="175" type="number" />
        <Input label="Peso (kg)" value={weight} onChange={setWeight} placeholder="70" type="number" />
      </div>

      {/* Aptitude slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-xs text-white">
            Aptitud deportiva
          </p>
          <div className="w-8 h-8 rounded-full bg-[#c4ff0e]/15 border border-[#c4ff0e]/40 flex items-center justify-center">
            <span className="font-['Montserrat',sans-serif] font-bold text-sm text-[#c4ff0e]">{aptitude}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[10px] text-white/40">1</span>
          <input
            type="range"
            min={1} max={10} value={aptitude}
            onChange={(e) => setAptitude(Number(e.target.value))}
            className="flex-1 accent-[#c4ff0e] h-1.5 rounded-full"
            style={{ accentColor: '#c4ff0e' }}
          />
          <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[10px] text-white/40">10</span>
        </div>
        <div className="flex justify-between px-1">
          {['Principiante', '', '', '', '', 'Intermedio', '', '', '', 'Élite'].map((l, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full ${i + 1 <= aptitude ? 'bg-[#c4ff0e]' : 'bg-white/20'}`}
            />
          ))}
        </div>
      </div>

      {/* Objective */}
      <div className="space-y-1.5">
        <p className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-xs text-white">
          Objetivo de entrenamiento
        </p>
        <div className="flex flex-wrap gap-2">
          {OBJECTIVES.map((obj) => (
            <button
              key={obj}
              onClick={() => setObjective(obj)}
              className={`px-3 py-1.5 rounded-full text-xs font-['Plus_Jakarta_Sans',sans-serif] font-medium transition-all ${
                objective === obj
                  ? 'bg-[#c4ff0e] text-black'
                  : 'bg-[rgba(30,41,59,0.5)] text-white/70 border border-white/10 hover:border-[#c4ff0e]/40'
              }`}
            >
              {obj}
            </button>
          ))}
        </div>
      </div>

      <TextArea
        label="Logros deportivos pasados"
        value={accomplishments}
        onChange={setAccomplishments}
        placeholder="Ej: Completé mi primer 10K en 2023, practiqué fútbol amateur por 5 años..."
        rows={2}
      />

      {/* Lifestyle */}
      <div className="space-y-2">
        <p className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-xs text-white">Estilo de vida</p>
        <div className="grid grid-cols-2 gap-2">
          {(['sedentary', 'active'] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLifestyle(l)}
              className={`py-3 rounded-xl text-xs font-['Plus_Jakarta_Sans',sans-serif] font-semibold transition-all flex flex-col items-center gap-1.5 ${
                lifestyle === l
                  ? 'bg-[#c4ff0e] text-black'
                  : 'bg-[rgba(30,41,59,0.5)] text-white/60 border border-white/10'
              }`}
            >
              <span className="text-lg">{l === 'sedentary' ? '🛋️' : '⚡'}</span>
              {l === 'sedentary' ? 'Sedentario' : 'Activo'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Athlete Step 3 — Coach Code
function AthleteStep3({
  coachCode, setCoachCode,
}: {
  coachCode: string; setCoachCode: (v: string) => void;
}) {
  const [searched, setSearched] = useState(false);
  const [found, setFound] = useState(false);

  const handleSearch = () => {
    setSearched(true);
    setFound(coachCode.trim().toUpperCase() === MOCK_COACH.code);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="w-16 h-16 rounded-full bg-[rgba(56,189,248,0.1)] flex items-center justify-center mx-auto">
          <Users size={28} className="text-[#38bdf8]" />
        </div>
        <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs text-[#9ca3af] leading-5">
          Si tu coach ya usa Athletica, ingresá su código de enlace para unirte a su equipo.
        </p>
      </div>

      <div className="space-y-2">
        <p className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-xs text-white">
          Código del coach
        </p>
        <div className="flex gap-2">
          <input
            value={coachCode}
            onChange={(e) => { setCoachCode(e.target.value.toUpperCase()); setSearched(false); }}
            placeholder="Ej: CARL-2026-FZQX"
            className="flex-1 px-4 py-3 bg-[rgba(30,41,59,0.5)] rounded-xl border border-[rgba(255,255,255,0.08)] text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-[#38bdf8]/50 font-['Montserrat',sans-serif] tracking-widest uppercase"
          />
          <button
            onClick={handleSearch}
            disabled={!coachCode.trim()}
            className="px-4 py-3 bg-[#38bdf8]/15 border border-[#38bdf8]/30 rounded-xl text-[#38bdf8] font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-sm hover:bg-[#38bdf8]/25 transition-colors disabled:opacity-40"
          >
            Buscar
          </button>
        </div>
      </div>

      {/* Hint for demo */}
      <div className="bg-[rgba(56,189,248,0.06)] border border-[#38bdf8]/20 rounded-xl px-4 py-3">
        <p className="font-['Plus_Jakarta_Sans',sans-serif] text-[10px] text-[#38bdf8]/70 text-center">
          💡 Demo: usá el código <span className="font-bold text-[#38bdf8]">CARL-2026-FZQX</span>
        </p>
      </div>

      {/* Result */}
      {searched && (
        found ? (
          <div className="bg-[rgba(196,255,14,0.06)] border border-[#c4ff0e]/30 rounded-2xl p-4 flex items-center gap-4">
            <img
              src={MOCK_COACH.avatar}
              alt={MOCK_COACH.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-[#c4ff0e]/40 flex-shrink-0"
            />
            <div className="flex-1">
              <div className="flex items-center gap-1.5 mb-0.5">
                <Check size={13} className="text-[#c4ff0e]" />
                <p className="font-['Plus_Jakarta_Sans',sans-serif] text-[10px] text-[#c4ff0e] font-semibold uppercase tracking-wider">
                  Coach encontrado
                </p>
              </div>
              <p className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm text-white">{MOCK_COACH.name}</p>
              <p className="font-['Plus_Jakarta_Sans',sans-serif] text-[11px] text-[#9ca3af]">{MOCK_COACH.specialty}</p>
            </div>
          </div>
        ) : (
          <div className="bg-red-900/20 border border-red-500/30 rounded-2xl px-4 py-3 text-center">
            <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs text-red-400">
              No se encontró ningún coach con ese código.
            </p>
          </div>
        )
      )}
    </div>
  );
}

// ─── Step Title Map ───────────────────────────────────────────────────────────

const COACH_STEP_TITLES: Record<number, { title: string; subtitle: string }> = {
  1: { title: 'Crear cuenta',         subtitle: 'Empecemos con tu información básica' },
  2: { title: 'Tu perfil profesional', subtitle: 'Contanos sobre vos y tu negocio' },
  3: { title: 'Plan Athletica',        subtitle: 'Elegí tu suscripción a la plataforma' },
  4: { title: 'Tus planes',            subtitle: 'Creá los planes para tus atletas' },
  5: { title: 'Código de enlace',      subtitle: 'Invitá atletas a tu equipo' },
};

const ATHLETE_STEP_TITLES: Record<number, { title: string; subtitle: string }> = {
  1: { title: 'Crear cuenta',      subtitle: 'Empecemos con tu información básica' },
  2: { title: 'Tu perfil atlético', subtitle: 'Ayudanos a conocer tu nivel y objetivos' },
  3: { title: 'Tu coach',          subtitle: 'Conectate con tu entrenador' },
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CreateAccount({ onComplete, onBack }: CreateAccountProps) {
  // ── Navigation ──
  const [step, setStep] = useState(1);

  // ── Step 1 – Shared ──
  const [role, setRole]                     = useState<UserRole>(null);
  const [name, setName]                     = useState('');
  const [surname, setSurname]               = useState('');
  const [birthdate, setBirthdate]           = useState('');
  const [email, setEmail]                   = useState('');
  const [password, setPassword]             = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // ── Coach Step 2 ──
  const [profilePic, setProfilePic]         = useState<string | null>(null);
  const [logoPic, setLogoPic]               = useState<string | null>(null);
  const [yearsExp, setYearsExp]             = useState('');
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [city, setCity]                     = useState('');
  const [businessName, setBusinessName]     = useState('');
  const [phrase, setPhrase]                 = useState('');
  const [socialLinks, setSocialLinks]       = useState<Record<string, string>>({});

  // ── Coach Step 3 ──
  const [subscription, setSubscription]     = useState('free');

  // ── Coach Step 4 ──
  const [plans, setPlans]                   = useState<Plan[]>([]);

  // ── Coach Step 5 ──
  const [linkingCode, setLinkingCode]       = useState(() => generateCode(name || 'COACH'));

  // ── Athlete Step 2 ──
  const [athleteProfilePic, setAthleteProfilePic] = useState<string | null>(null);
  const [height, setHeight]                 = useState('');
  const [weight, setWeight]                 = useState('');
  const [aptitude, setAptitude]             = useState(5);
  const [objective, setObjective]           = useState('');
  const [accomplishments, setAccomplishments] = useState('');
  const [lifestyle, setLifestyle]           = useState<'sedentary' | 'active'>('active');

  // ── Athlete Step 3 ──
  const [coachCode, setCoachCode]           = useState('');

  // ── Computed ──
  const totalSteps = role === 'coach' ? 5 : role === 'athlete' ? 3 : 1;
  const stepTitles = role === 'coach' ? COACH_STEP_TITLES : ATHLETE_STEP_TITLES;
  const { title, subtitle } = stepTitles[step] ?? { title: 'Crear cuenta', subtitle: '' };

  // ── Helpers ──
  const toggleSport = (s: string) =>
    setSelectedSports((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

  const setSocialLink = (k: string, v: string) =>
    setSocialLinks((prev) => ({ ...prev, [k]: v }));

  const addPlan = (p: Omit<Plan, 'id'>) =>
    setPlans((prev) => [...prev, { ...p, id: Math.random().toString(36).slice(2) }]);

  const removePlan = (id: string) =>
    setPlans((prev) => prev.filter((p) => p.id !== id));

  // ── Validation ──
  const canProceed = () => {
    if (step === 1) {
      return role !== null && name.trim() && surname.trim() && email.trim() &&
             password.length >= 4 && password === confirmPassword;
    }
    return true;
  };

  const handleNext = () => {
    if (step === 1 && !linkingCode) {
      setLinkingCode(generateCode(name));
    }
    if (step < totalSteps) {
      setStep((s) => s + 1);
    } else {
      onComplete(role!);
    }
  };

  const handleBack = () => {
    if (step === 1) onBack();
    else setStep((s) => s - 1);
  };

  const isLastStep = step === totalSteps;

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="content-stretch flex items-start justify-center px-2 sm:px-4 py-2 relative size-full bg-background overflow-y-auto">
      {/* Background */}
      <img
        alt=""
        className="fixed inset-0 max-w-none object-cover pointer-events-none size-full"
        src={imgLogin}
      />

      {/* Phone frame */}
      <div className="drop-shadow-[0px_25px_25px_rgba(0,0,0,0.25)] w-full max-w-[448px] min-h-[812px] relative rounded-[32px] sm:rounded-[48px] overflow-clip flex flex-col my-2">
        {/* Gradient blur */}
        <div
          className="absolute blur-[30px] inset-[70%_-10%_-10%_-10%] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(ellipse at center bottom, rgba(52,211,153,0.2) 0%, rgba(5,150,105,0.08) 40%, transparent 80%)' }}
        />

        {/* Top bar */}
        <div className="relative z-10 flex items-center justify-between pt-10 pb-3 px-6">
          <button
            onClick={handleBack}
            className="w-9 h-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <ArrowLeft size={18} className="text-white" />
          </button>
          <img alt="Athletica" className="h-7 object-contain" src={imgLogo} />
          <div className="w-9" />
        </div>

        {/* Progress bar */}
        {role && (
          <div className="relative z-10 px-6 pb-3">
            <div className="flex items-center gap-1.5 mb-1">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i + 1 <= step ? 'bg-[#c4ff0e]' : 'bg-white/15'
                  } ${i + 1 === step ? 'flex-[2]' : 'flex-1'}`}
                />
              ))}
            </div>
            <p className="font-['Plus_Jakarta_Sans',sans-serif] text-[10px] text-white/30">
              Paso {step} de {totalSteps}
            </p>
          </div>
        )}

        {/* Step title */}
        <div className="relative z-10 px-6 pb-4">
          <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xl text-white mb-0.5">{title}</h2>
          <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xs text-[#9ca3af]">{subtitle}</p>
        </div>

        {/* Scrollable card */}
        <div className="relative z-10 flex-1 mx-4 mb-4 backdrop-blur-[8px] bg-[rgba(15,23,42,0.65)] rounded-[28px] border border-[rgba(255,255,255,0.09)] shadow-[0px_8px_32px_0px_rgba(0,0,0,0.7)] overflow-y-auto">
          <div className="p-5">
            {step === 1 && (
              <Step1
                role={role} setRole={setRole}
                name={name} setName={setName}
                surname={surname} setSurname={setSurname}
                birthdate={birthdate} setBirthdate={setBirthdate}
                email={email} setEmail={setEmail}
                password={password} setPassword={setPassword}
                confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}
              />
            )}
            {role === 'coach' && step === 2 && (
              <CoachStep2
                profilePic={profilePic} setProfilePic={setProfilePic}
                yearsExp={yearsExp} setYearsExp={setYearsExp}
                selectedSports={selectedSports} toggleSport={toggleSport}
                city={city} setCity={setCity}
                businessName={businessName} setBusinessName={setBusinessName}
                phrase={phrase} setPhrase={setPhrase}
                logoPic={logoPic} setLogoPic={setLogoPic}
                socialLinks={socialLinks} setSocialLink={setSocialLink}
              />
            )}
            {role === 'coach' && step === 3 && (
              <CoachStep3 selected={subscription} setSelected={setSubscription} />
            )}
            {role === 'coach' && step === 4 && (
              <CoachStep4 plans={plans} addPlan={addPlan} removePlan={removePlan} />
            )}
            {role === 'coach' && step === 5 && (
              <CoachStep5
                code={linkingCode || generateCode(name)}
                setCode={setLinkingCode}
                name={name}
              />
            )}
            {role === 'athlete' && step === 2 && (
              <AthleteStep2
                profilePic={athleteProfilePic} setProfilePic={setAthleteProfilePic}
                height={height} setHeight={setHeight}
                weight={weight} setWeight={setWeight}
                aptitude={aptitude} setAptitude={setAptitude}
                objective={objective} setObjective={setObjective}
                accomplishments={accomplishments} setAccomplishments={setAccomplishments}
                lifestyle={lifestyle} setLifestyle={setLifestyle}
              />
            )}
            {role === 'athlete' && step === 3 && (
              <AthleteStep3 coachCode={coachCode} setCoachCode={setCoachCode} />
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="relative z-10 px-4 pb-10">
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="w-full bg-gradient-to-r from-[#4ade80] to-[#a3e635] rounded-full py-4 flex items-center justify-center gap-2 drop-shadow-[0px_0px_12px_rgba(163,230,53,0.35)] hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base text-black">
              {isLastStep ? '¡Comenzar!' : 'Siguiente'}
            </span>
            {!isLastStep && <ArrowRight size={20} className="text-black" />}
            {isLastStep && <Check size={20} className="text-black" />}
          </button>
        </div>

        {/* iOS home indicator */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
          <div className="bg-white/30 h-[5px] rounded-full w-28" />
        </div>
      </div>
    </div>
  );
}
