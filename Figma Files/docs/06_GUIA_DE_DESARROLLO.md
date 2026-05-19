# Athletica — Guía de Desarrollo del Equipo

---

## 1. Introducción

Este documento está destinado al equipo de desarrollo que tomará el prototipo de Athletica y lo convertirá en una aplicación de producción. Cubre la configuración del entorno, las convenciones de código, la organización del trabajo y los checklist de calidad.

---

## 2. Configuración del Entorno (Prototipo React/Tailwind)

### Prerequisitos
- Node.js >= 18.x
- pnpm >= 8.x (`npm install -g pnpm`)
- Git

### Instalación
```bash
git clone <repo-url>
cd athletica
pnpm install
pnpm dev
```

La app corre en `localhost:5173` (Vite).

### Credenciales de demo
| Rol | Email | Contraseña |
|-----|-------|------------|
| Coach | `coach@coach` | `1234` |
| Atleta | `athlete@athlete` | `1234` |

---

## 3. Estructura de Archivos del Prototipo

```
src/
├── app/
│   ├── App.tsx                         # Raíz: auth + navegación de roles
│   └── components/
│       ├── Login.tsx                   # Pantalla de login
│       ├── CreateAccount.tsx           # Registro multi-paso
│       ├── CoachView.tsx               # Router de tabs del coach
│       ├── AthleteView.tsx             # Router de tabs + overlays atleta
│       ├── coach/                      # Componentes del coach
│       │   ├── CoachHome.tsx
│       │   ├── CoachAthletes.tsx
│       │   ├── CoachCalendar.tsx
│       │   ├── CoachCommunity.tsx
│       │   ├── CoachPlan.tsx           # Orquestador de las 3 vistas del plan
│       │   ├── CoachSettings.tsx
│       │   ├── AthleteProfile.tsx
│       │   ├── AthleteMetrics.tsx
│       │   ├── AthletePaymentHistory.tsx
│       │   ├── AthleteCalendarPlan.tsx
│       │   ├── CoachPaymentApprovalModal.tsx
│       │   └── plan/
│       │       ├── types.ts            # Interfaces y tipos del plan
│       │       ├── exerciseDatabase.ts # Ejercicios predeterminados
│       │       ├── PlanLibrary.tsx
│       │       ├── WorkoutPlanner.tsx
│       │       ├── WorkoutBlock.tsx
│       │       ├── ExerciseRow.tsx
│       │       ├── ExercisesLibrary.tsx
│       │       ├── CreateExerciseModal.tsx
│       │       ├── AssignWorkoutModal.tsx
│       │       ├── VideoPlayer.tsx
│       │       └── DrawingBoard.tsx
│       └── athlete/
│           ├── AthleteHome.tsx
│           ├── AthleteCoach.tsx
│           ├── AthleteCommunity.tsx
│           ├── AthleteCalendar.tsx
│           ├── AthletePlan.tsx
│           ├── AthleteSettings.tsx
│           ├── AthleteMyCoach.tsx
│           ├── AthleteSubscriptionPlan.tsx
│           ├── AthleteWearables.tsx
│           ├── AthleteEditProfile.tsx
│           ├── WorkoutScreen.tsx       # Overlay de entrenamiento activo
│           ├── RPEModal.tsx            # Puntuación de esfuerzo percibido
│           ├── PaymentModal.tsx        # Envío de comprobante
│           ├── WorkoutDetailsModal.tsx
│           └── AddWorkoutModal.tsx
├── styles/
│   ├── theme.css                       # Variables CSS y tokens de diseño
│   └── fonts.css                       # Importaciones de fuentes
└── imports/                            # Assets SVG importados de Figma
```

---

## 4. Convenciones de Código

### TypeScript
- Usar **strict mode** (`"strict": true` en `tsconfig.json`)
- Definir interfaces para todas las props de componentes
- Evitar `any` — si es necesario, comentar el motivo
- Nombrar interfaces con PascalCase: `interface UserProfile {...}`
- Nombrar tipos con PascalCase: `type BlockType = 'Cardio' | ...`

### Componentes React
- Un componente por archivo
- Nombre del archivo = nombre del componente en PascalCase: `WorkoutBlock.tsx`
- Exportaciones nombradas (no default) para componentes dentro de módulos:
  ```typescript
  export function WorkoutBlock({ ... }: WorkoutBlockProps) { ... }
  ```
- Exportación default solo para páginas/rutas principales

### Hooks
- Prefijo `use`: `useWorkout`, `usePayments`, `useAuth`
- Un hook por archivo en carpeta `/hooks`
- Si el hook es específico de un componente y no se reutiliza, puede estar en el mismo archivo

### Estado
- Mantener el estado lo más cerca posible de donde se usa
- Levantar al padre solo cuando sea necesario compartir entre hermanos
- Para estado global (autenticación, workout activo, pagos): Zustand store

### Estilos (Tailwind)
- Solo usar clases de Tailwind v4
- No crear CSS custom salvo para los tokens en `theme.css`
- Para variantes condicionales: usar template literals con ternario
  ```typescript
  className={`px-3 py-2 rounded-xl ${isActive ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
  ```
- Los colores de la paleta están definidos como CSS variables en `theme.css` — usarlos a través de clases semánticas (`bg-primary`, `text-muted-foreground`, etc.)

### Nombrado
| Elemento | Convención | Ejemplo |
|----------|-----------|---------|
| Componentes | PascalCase | `WorkoutBlock` |
| Funciones | camelCase | `handleSave`, `getAssignedAthletes` |
| Variables | camelCase | `selectedAthlete`, `isLoading` |
| Constantes globales | UPPER_SNAKE | `DEFAULT_PLAN_CATEGORIES` |
| Archivos de componente | PascalCase | `WorkoutBlock.tsx` |
| Archivos de utilidad/tipos | camelCase | `types.ts`, `exerciseDatabase.ts` |
| Props de evento | `on` + verbo | `onSave`, `onClose`, `onEdit` |
| Props de estado | verbo `show`/`is`/`has` | `showModal`, `isLoading`, `hasError` |

---

## 5. Flujo de Desarrollo

### Ramas de Git
```
main          ← Solo producción, merge con PR aprobado
develop       ← Rama de integración principal
feature/HU-XXX-descripcion   ← Nueva funcionalidad
fix/HU-XXX-descripcion       ← Corrección de bugs
```

**Ejemplos:**
```
feature/HU-022-iniciar-entrenamiento
feature/HU-033-ver-estado-pago
fix/HU-017-asignar-plan-grupos
```

### Proceso de Contribución
1. Crear rama desde `develop`: `git checkout -b feature/HU-XXX-descripcion develop`
2. Desarrollar y hacer commits atómicos
3. Push y abrir **Pull Request** hacia `develop`
4. El PR requiere:
   - 1 reviewer aprobando
   - Tests pasando (cuando los haya)
   - Sin conflictos con `develop`
5. Merge con **Squash and Merge** para mantener historial limpio

### Mensajes de Commit
Formato: `[tipo]: descripción breve`

| Tipo | Uso |
|------|-----|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de bug |
| `refactor` | Refactorización sin cambio de comportamiento |
| `style` | Cambios de estilo/formato sin lógica |
| `docs` | Solo documentación |
| `test` | Añadir o modificar tests |
| `chore` | Tareas de mantenimiento (deps, configs) |

**Ejemplos:**
```
feat: agregar modal de puntuación RPE con escala 1-10
fix: corregir cronómetro que no pausaba correctamente
refactor: extraer lógica de categorías a hook usePlanCategories
docs: agregar historias de usuario de la épica de pagos
```

---

## 6. Datos Mock y Transición al Backend

### Estado actual
Todo el prototipo trabaja con datos hardcodeados o en estado React local. No hay persistencia entre recargas.

### Estrategia de migración
1. **Crear la capa de API** (`/api/*.api.ts`) con las mismas firmas de función que las actuales
2. **Reemplazar datos mock** por llamadas a la API de forma progresiva, módulo por módulo
3. **Agregar Zustand stores** para los datos globales (usuario, planes, sesiones)
4. **Mantener los componentes de UI sin cambios** — solo cambian los hooks y stores que les proveen datos

### Orden recomendado de migración
| Fase | Módulo | Motivo |
|------|--------|--------|
| 1 | Autenticación | Bloqueante para todo lo demás |
| 2 | Perfil de usuario | Necesario para mostrar datos reales |
| 3 | Planes de entrenamiento | Core de la app |
| 4 | Sesiones y ejecución | Core de la app |
| 5 | Pagos | Crítico para el negocio |
| 6 | Chat | Requiere WebSocket |
| 7 | Comunidad | Menor prioridad |
| 8 | Notificaciones push | Última fase |

---

## 7. Módulos por Implementar (Backend)

### Checklist de implementación

#### Autenticación
- [ ] POST `/auth/login` con JWT
- [ ] POST `/auth/register/coach`
- [ ] POST `/auth/register/athlete`
- [ ] POST `/auth/refresh`
- [ ] POST `/auth/logout`
- [ ] POST `/auth/forgot-password` + email
- [ ] POST `/auth/reset-password`

#### Usuarios y Perfiles
- [ ] GET/PUT `/coaches/me`
- [ ] GET/PUT `/athletes/me`
- [ ] POST `/files/upload` (avatar, logo)
- [ ] GET `/coaches/:code` (búsqueda de coach por código)
- [ ] POST `/athletes/me/link-coach`

#### Planes de Entrenamiento
- [ ] CRUD completo de planes (`/plans`)
- [ ] CRUD de bloques (integrado en plan)
- [ ] CRUD de ejercicios en bloque
- [ ] CRUD biblioteca de ejercicios (`/exercises`)
- [ ] POST `/plans/:id/assign`
- [ ] GET `/plans/:id/assignments`

#### Sesiones
- [ ] Ciclo completo de sesión (create → start → pause → resume → finish/discard)
- [ ] POST `/sessions/:id/rpe`
- [ ] GET `/sessions` con filtros de fecha y estado

#### Pagos
- [ ] POST `/payments` con upload de archivo a S3
- [ ] PUT `/payments/:id/approve`
- [ ] PUT `/payments/:id/reject`
- [ ] GET `/athletes/:id/payments`

#### Chat
- [ ] WebSocket gateway con autenticación JWT
- [ ] Historial de mensajes por par usuario
- [ ] Subida de archivos adjuntos en chat

#### Notificaciones
- [ ] Integración Firebase FCM
- [ ] Disparar notificación al asignar plan
- [ ] Disparar notificación al recibir pago
- [ ] Disparar notificación al aprobar/rechazar pago
- [ ] Disparar notificación al recibir mensaje

---

## 8. Tipos de Dato Clave (Referencia Rápida)

### Tipos del plan de entrenamiento
```typescript
type BlockType = 'Cardio' | 'Halterofilia' | 'Flexibilidad' | 
                 'Deporte Específico' | 'Recuperación' | 'Otro';

interface ExerciseData {
  id: string;
  name: string;
  sets?: string;
  reps?: string;
  duration?: string;
  intensity?: string;
  notes: string;
  videoUrl?: string;
}

interface Block {
  id: string;
  name: string;
  type: BlockType;
  exercises: ExerciseData[];
  comments: string;
  collapsed: boolean;
}

interface SavedPlan {
  id: string;
  plan: WorkoutPlan;
  planType: 'single' | 'group';
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

interface WorkoutAssignment {
  id: string;
  planId: string;
  athleteIds: string[];
  startDate: Date;
  frequency: 'once' | 'weekly' | 'daily' | 'custom';
  customDays?: number[];  // 0=Dom, 1=Lun, ..., 6=Sáb
  notes?: string;
}

interface CustomExercise {
  id: string;
  name: string;
  videoUrl?: string;
  notes?: string;
  blockType: string;   // string para permitir categorías custom
  isDefault: boolean;
  createdAt: Date;
}
```

### Tipos del workout activo
```typescript
interface WorkoutInfo {
  id: string;
  name: string;
  category: string;
  stages: string[];
}

interface ActiveWorkout {
  info: WorkoutInfo;
  startedAt: number;    // timestamp
  pausedMs: number;     // milisegundos acumulados en pausa
  isPaused: boolean;
  pausedAt: number | null;
}

interface CompletedSession {
  id: string;
  name: string;
  date: string;
  durationSec: number;
  scored: boolean;
}

interface RPEResult {
  sessionId: string;
  rpe: number;         // 1-10
  comment: string;
}
```

### Tipos de pagos
```typescript
interface PendingPayment {
  id: string;
  athleteName: string;
  athleteInitial: string;
  amount: number;
  date: string;
  fileName: string;
  fileData: string;    // base64 del archivo
  status: 'pending' | 'approved' | 'rejected';
}
```

---

## 9. Categorías de Datos Predeterminados

```typescript
// Categorías de planes (editables por coach)
const DEFAULT_PLAN_CATEGORIES = [
  'Entrenamiento Base',
  'Fase de Construcción',
  'Pico / Preparación Carrera',
  'Semana de Recuperación',
  'Entrenamiento de Fuerza',
  'Otro',
];

// Categorías de ejercicios (editables por coach)
const DEFAULT_EXERCISE_CATEGORIES = [
  'Cardio',
  'Halterofilia',
  'Flexibilidad',
  'Deporte Específico',
  'Recuperación',
  'Otro',
];

// Deportes disponibles en el registro
const SPORTS = [
  'Running', 'Ciclismo', 'Remo', 'Gimnasio', 'Funcional',
  'CrossFit', 'Triatlón', 'Natación', 'Fútbol', 'Tenis',
  'Yoga', 'Pilates', 'Boxeo', 'MMA', 'Escalada',
];

// Objetivos del atleta
const OBJECTIVES = [
  'Perder peso', 'Ganar masa muscular', 'Mejorar resistencia',
  'Competir', 'Rehabilitación', 'Mantenimiento', 'Aumentar flexibilidad',
];

// Planes de suscripción de Athletica
const SUBSCRIPTIONS = [
  { id: 'free', name: 'Free', maxAthletes: 3, price: 0 },
  { id: 'starter', name: 'Starter', maxAthletes: 20, price: 29 },
  { id: 'pro', name: 'Pro', maxAthletes: 70, price: 79 },
  { id: 'max', name: 'Max', maxAthletes: 100, price: 149 },
  { id: 'enterprise', name: 'Enterprise', maxAthletes: null, price: null },
];
```

---

## 10. Testing

### Niveles de Test
| Tipo | Herramienta | Cobertura objetivo |
|------|-------------|-------------------|
| Unitario | Vitest + React Testing Library | Hooks, servicios, utils |
| Integración | Supertest (backend) | Endpoints críticos |
| E2E | Playwright / Detox | Flujos: login, workout, pago |

### Flujos críticos que DEBEN tener tests e2e
1. Registro y login (coach y atleta)
2. Crear plan → asignar plan → atleta ve el plan
3. Iniciar → pausar → finalizar workout → puntuar RPE
4. Atleta envía pago → coach aprueba → estado actualizado

---

## 11. Checklist de Calidad por Pull Request

Antes de abrir un PR, verificar:

**Código:**
- [ ] No hay errores de TypeScript (`pnpm tsc --noEmit`)
- [ ] ESLint sin errores (`pnpm lint`)
- [ ] No hay `console.log` en código de producción
- [ ] No hay `any` sin justificación comentada
- [ ] Componentes nuevos exportados correctamente

**Funcionalidad:**
- [ ] El flujo descrito en la HU funciona end-to-end
- [ ] Los casos borde están considerados
- [ ] Los modales abren y cierran correctamente
- [ ] Los formularios validan los campos obligatorios
- [ ] Los mensajes de error son claros para el usuario

**UI/UX:**
- [ ] La pantalla es responsive (móvil 375px y 480px)
- [ ] Los colores coinciden con la paleta definida
- [ ] No hay texto en inglés en la interfaz (todo en español)
- [ ] Los íconos de `lucide-react` son consistentes
- [ ] Los estados de carga y error están representados

**Accesibilidad:**
- [ ] Botones tienen texto descriptivo o `aria-label`
- [ ] Los inputs tienen `label` asociado
- [ ] El contraste cumple WCAG AA mínimo

---

## 12. Glosario del Proyecto

| Término | Definición |
|---------|------------|
| **Coach** | Entrenador personal que usa la plataforma para gestionar atletas |
| **Atleta** | Usuario que es entrenado por un coach |
| **Plan** | Conjunto de bloques de entrenamiento diseñado por el coach |
| **Bloque** | Sección de un plan (ej: "Calentamiento", "Fuerza") con un tipo |
| **Ejercicio** | Actividad específica dentro de un bloque |
| **Asignación** | El acto de asignar un plan a uno o más atletas con fecha y frecuencia |
| **Sesión** | Un entrenamiento ejecutado (o programado) por un atleta |
| **RPE** | Rate of Perceived Exertion — escala del 1 al 10 de esfuerzo percibido |
| **Wearable** | Dispositivo de seguimiento físico (Apple Watch, Garmin, etc.) |
| **Código de vinculación** | Código único del coach que el atleta usa para encontrarlo |
| **Comprobante** | Archivo (imagen/PDF) que el atleta adjunta para probar su pago |
| **Zona cardíaca** | Rango de intensidad de FC (1=Recuperación → 5=VO₂ máx) |
| **Tab** | Pestaña de navegación principal de la app |
| **Bottom sheet** | Modal que aparece desde la parte inferior de la pantalla |
| **Overlay** | Pantalla que cubre toda la pantalla (ej: WorkoutScreen) |
