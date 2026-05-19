# Athletica — Descripción de Arquitectura

---

## 1. Visión General de la Arquitectura

Athletica es una aplicación cliente-servidor con dos clientes principales (móvil iOS/Android y web) que se comunican con un backend REST/WebSocket. A continuación se describe la arquitectura completa para producción, y cómo el prototipo actual se relaciona con ella.

```
┌─────────────────────────────────────────────────────────┐
│                      CLIENTES                           │
│  ┌──────────────────┐    ┌──────────────────────────┐   │
│  │   App Móvil      │    │     Panel Web (Coach)    │   │
│  │  React Native    │    │       Next.js 14+        │   │
│  │  (iOS + Android) │    │     (opcional v2)        │   │
│  └────────┬─────────┘    └────────────┬─────────────┘   │
└───────────┼──────────────────────────┼─────────────────┘
            │ HTTPS / WSS              │ HTTPS
┌───────────▼──────────────────────────▼─────────────────┐
│                     API GATEWAY                         │
│          (Rate limiting, Auth, Load balancing)          │
└───────────────────────────┬─────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────┐
│                    BACKEND (NestJS / Express)            │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌───────────┐  │
│  │  Auth    │ │  Users   │ │  Plans   │ │ Payments  │  │
│  │ Service  │ │ Service  │ │ Service  │ │  Service  │  │
│  └──────────┘ └──────────┘ └──────────┘ └───────────┘  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌───────────┐  │
│  │Sessions  │ │   Chat   │ │Community │ │Notif.     │  │
│  │ Service  │ │ Service  │ │ Service  │ │  Service  │  │
│  └──────────┘ └──────────┘ └──────────┘ └───────────┘  │
└───────────────────────────┬─────────────────────────────┘
            ┌───────────────┼───────────────────┐
            │               │                   │
┌───────────▼───┐  ┌────────▼───────┐  ┌────────▼────────┐
│  PostgreSQL   │  │  Redis Cache   │  │  AWS S3 /       │
│  (Prisma ORM) │  │  (Sesiones,    │  │  Supabase       │
│               │  │   WebSocket)   │  │  Storage        │
│               │  │               │  │  (archivos,     │
│               │  │               │  │   comprobantes) │
└───────────────┘  └───────────────┘  └─────────────────┘
                            │
            ┌───────────────┼───────────────────┐
            │               │                   │
┌───────────▼───┐  ┌────────▼──────┐  ┌─────────▼──────┐
│  Firebase FCM │  │  Wearable     │  │  Email (SendGrid│
│  (Push Notif.)│  │  APIs (OAuth) │  │  / Resend)     │
│               │  │  Apple Health │  │               │
│               │  │  Garmin, etc. │  │               │
└───────────────┘  └───────────────┘  └────────────────┘
```

---

## 2. Arquitectura del Prototipo Actual (Frontend)

El prototipo actual es una **Single Page Application (SPA)** 100% frontend sin backend. Toda la navegación, el estado y los datos son gestionados localmente con React hooks.

### Árbol de Componentes Principal

```
App.tsx
├── State: screen | userRole | payments
│
├── Login.tsx
│   └── Navegación a CreateAccount o App
│
├── CreateAccount.tsx
│   ├── Flujo Coach (5 pasos en estado local)
│   └── Flujo Atleta (3 pasos en estado local)
│
└── [userRole === 'coach'] CoachView.tsx
│   ├── State: activeTab | showSettings
│   ├── CoachHome.tsx
│   │   └── CoachPaymentApprovalModal.tsx
│   ├── CoachAthletes.tsx
│   │   ├── State: currentView | selectedAthlete
│   │   ├── AthleteProfile.tsx
│   │   ├── AthleteMetrics.tsx
│   │   ├── AthletePaymentHistory.tsx
│   │   └── AthleteCalendarPlan.tsx
│   ├── CoachCommunity.tsx
│   ├── CoachCalendar.tsx
│   ├── CoachPlan.tsx
│   │   ├── State: view | savedPlans | editingPlan | customExercises
│   │   │         planCategories | exerciseCategories | assignments
│   │   ├── PlanLibrary.tsx
│   │   │   ├── AssignWorkoutModal.tsx
│   │   │   └── [inline modals: nuevo, categorías, atletas, eliminar]
│   │   ├── WorkoutPlanner.tsx
│   │   │   └── WorkoutBlock.tsx (x N)
│   │   │       ├── ExerciseRow.tsx (x N)
│   │   │       ├── CreateExerciseModal.tsx
│   │   │       └── DrawingBoard.tsx
│   │   └── ExercisesLibrary.tsx
│   │       └── CreateExerciseModal.tsx
│   └── CoachSettings.tsx
│
└── [userRole === 'athlete'] AthleteView.tsx
    ├── State: activeTab | showSettings | activeWorkout
    │         showWorkoutScreen | completedSessions | pendingRPE
    ├── AthleteHome.tsx
    │   ├── WorkoutDetailsModal.tsx
    │   ├── RPEModal.tsx
    │   └── PaymentModal.tsx
    ├── AthleteCoach.tsx (Perfil + Chat)
    ├── AthleteCommunity.tsx
    ├── AthleteCalendar.tsx
    │   ├── AddWorkoutModal.tsx
    │   └── WorkoutDetailsModal.tsx
    ├── AthletePlan.tsx
    │   └── WorkoutDetailsModal.tsx
    ├── AthleteSettings.tsx
    │   ├── AthleteMyCoach.tsx
    │   ├── AthleteSubscriptionPlan.tsx
    │   ├── AthleteWearables.tsx
    │   └── AthleteEditProfile.tsx
    └── WorkoutScreen.tsx (overlay full-screen)
        └── RPEModal.tsx
```

### Patrones de Estado

| Patrón | Uso |
|--------|-----|
| `useState` local | Toda la gestión de estado (sin Redux ni Context) |
| Prop drilling | Los datos se pasan de padres a hijos mediante props |
| Event lifting | Los callbacks suben por la jerarquía (`onSave`, `onClose`, etc.) |
| Custom Events | `window.dispatchEvent` para navegación entre vistas desacopladas (ej: navigate-exercises) |

---

## 3. Arquitectura de Producción Recomendada

### 3.1 Frontend Móvil (React Native + Expo)

```
src/
├── app/                    # Expo Router (file-based routing)
│   ├── (auth)/             # Login, Registro
│   ├── (coach)/            # Tabs del coach
│   │   ├── index.tsx       # Inicio
│   │   ├── athletes/       # Atletas + sub-rutas
│   │   ├── community.tsx   # Comunidad
│   │   ├── calendar.tsx    # Calendario
│   │   └── plan/           # Planificación + sub-rutas
│   └── (athlete)/          # Tabs del atleta
│       ├── index.tsx       # Inicio
│       ├── coach.tsx       # Entrenador
│       ├── community.tsx   # Comunidad
│       ├── calendar.tsx    # Calendario
│       └── plan.tsx        # Plan
├── components/             # Componentes reutilizables
│   ├── ui/                 # Primitivos (Button, Card, Input...)
│   ├── coach/              # Componentes del coach
│   └── athlete/            # Componentes del atleta
├── hooks/                  # React hooks personalizados
│   ├── useAuth.ts
│   ├── useWorkout.ts
│   └── usePayments.ts
├── store/                  # Zustand / Redux Toolkit
│   ├── authStore.ts
│   ├── workoutStore.ts
│   └── paymentStore.ts
├── api/                    # Cliente API (axios / fetch wrappers)
│   ├── client.ts           # Configuración base + interceptores
│   ├── auth.api.ts
│   ├── plans.api.ts
│   └── sessions.api.ts
├── types/                  # Tipos TypeScript globales
└── utils/                  # Funciones utilitarias
```

### 3.2 Backend (NestJS)

```
src/
├── auth/                   # JWT, refresh tokens, guards
├── users/                  # CRUD de usuarios, roles
├── coaches/                # Perfil, código vinculación, deportes
├── athletes/               # Perfil, vinculación, métricas
├── plans/                  # Planes de entrenamiento
│   ├── plans.controller.ts
│   ├── plans.service.ts
│   ├── blocks/             # Bloques de entrenamiento
│   └── exercises/          # Biblioteca de ejercicios
├── sessions/               # Sesiones y ejecución de workouts
├── payments/               # Gestión de pagos y comprobantes
├── community/              # Feed, publicaciones, reacciones
├── chat/                   # Mensajes + WebSocket gateway
├── notifications/          # Push notifications (FCM)
├── files/                  # Upload y gestión de archivos (S3)
├── wearables/              # Integración con dispositivos
└── subscriptions/          # Planes Athletica + planes coach
```

---

## 4. API REST — Endpoints Principales

### Autenticación
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/auth/login` | Login con email/password → JWT |
| POST | `/auth/register/coach` | Registro de coach |
| POST | `/auth/register/athlete` | Registro de atleta |
| POST | `/auth/refresh` | Refresh del JWT |
| POST | `/auth/logout` | Invalidar token |
| POST | `/auth/forgot-password` | Solicitar reset de contraseña |
| POST | `/auth/reset-password` | Confirmar nuevo password |

### Coaches
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/coaches/me` | Perfil del coach autenticado |
| PUT | `/coaches/me` | Actualizar perfil |
| GET | `/coaches/me/athletes` | Listar atletas del coach |
| GET | `/coaches/me/code` | Obtener código de vinculación |
| PUT | `/coaches/me/code` | Actualizar código |
| GET | `/coaches/:code` | Buscar coach por código (para atleta) |

### Atletas
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/athletes/me` | Perfil del atleta autenticado |
| PUT | `/athletes/me` | Actualizar perfil |
| POST | `/athletes/me/link-coach` | Vincular con coach por código |
| GET | `/athletes/:id/metrics` | Métricas de un atleta (coach) |
| GET | `/athletes/:id/sessions` | Historial de sesiones |

### Planes de Entrenamiento
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/plans` | Biblioteca de planes del coach |
| POST | `/plans` | Crear nuevo plan |
| GET | `/plans/:id` | Detalle de un plan |
| PUT | `/plans/:id` | Actualizar plan |
| DELETE | `/plans/:id` | Eliminar plan |
| POST | `/plans/:id/assign` | Asignar plan a atletas |
| GET | `/plans/:id/assignments` | Ver asignaciones del plan |
| POST | `/plans/:id/duplicate` | Duplicar plan |

### Ejercicios
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/exercises` | Biblioteca de ejercicios (predeterminados + custom del coach) |
| POST | `/exercises` | Crear ejercicio personalizado |
| PUT | `/exercises/:id` | Editar ejercicio |
| DELETE | `/exercises/:id` | Eliminar ejercicio |

### Sesiones
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/sessions` | Sesiones del atleta (con filtros) |
| POST | `/sessions` | Crear sesión (programada manualmente) |
| PUT | `/sessions/:id/start` | Iniciar sesión |
| PUT | `/sessions/:id/pause` | Pausar sesión |
| PUT | `/sessions/:id/resume` | Reanudar sesión |
| PUT | `/sessions/:id/finish` | Finalizar sesión + métricas |
| PUT | `/sessions/:id/discard` | Descartar sesión |
| POST | `/sessions/:id/rpe` | Agregar puntuación RPE |

### Pagos
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/payments` | Pagos del atleta / cola del coach |
| POST | `/payments` | Atleta envía comprobante |
| PUT | `/payments/:id/approve` | Coach aprueba pago |
| PUT | `/payments/:id/reject` | Coach rechaza pago (con nota) |
| GET | `/athletes/:id/payments` | Historial de pagos de un atleta |

### Comunidad
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/community/feed` | Feed de publicaciones del coach del atleta |
| POST | `/community/posts` | Coach crea publicación |
| PUT | `/community/posts/:id` | Editar publicación |
| DELETE | `/community/posts/:id` | Eliminar publicación |
| POST | `/community/posts/:id/like` | Like a publicación |
| POST | `/community/posts/:id/comments` | Comentar publicación |

### Chat
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/chat/:userId` | Historial de mensajes con usuario |
| POST | `/chat/:userId` | Enviar mensaje (alternativa HTTP) |
| POST | `/files/upload` | Subir adjunto para chat |

**WebSocket Events:**
```
connect → authenticate con JWT
message:send → { to, content, attachmentUrl }
message:received → { from, content, attachmentUrl, timestamp }
message:read → { messageId }
typing:start / typing:stop
```

### Notificaciones
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/notifications/register-token` | Registrar token FCM del dispositivo |
| GET | `/notifications` | Listar notificaciones del usuario |
| PUT | `/notifications/:id/read` | Marcar como leída |
| PUT | `/notifications/read-all` | Marcar todas como leídas |

---

## 5. Autenticación y Seguridad

### Estrategia de Autenticación
- **JWT** (JSON Web Token) para stateless auth
- **Access Token:** Expira en 15 minutos
- **Refresh Token:** Expira en 30 días, rotado en cada uso
- Tokens almacenados en Keychain (iOS) / Keystore (Android)

### Flujo de Autenticación
```
Cliente → POST /auth/login → { accessToken, refreshToken }
Cliente guarda tokens de forma segura (Keychain/Keystore)
Cliente → Request con header: Authorization: Bearer <accessToken>
Si 401 → Cliente intenta POST /auth/refresh con refreshToken
Si refresh OK → Nuevo accessToken (y rotación de refreshToken)
Si refresh falla → Redirect a Login
```

### Roles y Permisos
| Recurso | Coach | Atleta |
|---------|-------|--------|
| Planes propios | CRUD | Solo lectura (asignados) |
| Atletas del coach | Lectura | — |
| Perfil propio | CRUD | CRUD |
| Métricas de atleta | Lectura (propios) | Solo las propias |
| Pagos | Aprobar/Rechazar | Enviar |
| Publicaciones | CRUD | Solo lectura + like/comentar |
| Chat | Con atletas propios | Solo con su coach |

### Seguridad de Archivos
- Los comprobantes de pago se suben directamente a S3 mediante presigned URLs
- El backend valida el tipo MIME antes de generar la URL
- Solo el coach y el atleta del pago pueden acceder al comprobante

---

## 6. Gestión de Estado en el Cliente (Producción)

Para la versión de producción se recomienda **Zustand** por su simplicidad y bajo overhead.

```typescript
// authStore.ts
interface AuthStore {
  user: User | null;
  role: 'coach' | 'athlete' | null;
  accessToken: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

// workoutStore.ts
interface WorkoutStore {
  activeWorkout: ActiveWorkout | null;
  completedSessions: CompletedSession[];
  pendingRPE: string[];  // sessionIds
  startWorkout: (workout: WorkoutInfo) => void;
  pauseWorkout: () => void;
  resumeWorkout: () => void;
  finishWorkout: () => void;
  addRPE: (sessionId: string, rpe: RPEResult) => void;
}

// planStore.ts
interface PlanStore {
  savedPlans: SavedPlan[];
  customExercises: CustomExercise[];
  assignments: WorkoutAssignment[];
  fetchPlans: () => Promise<void>;
  createPlan: (plan: CreatePlanDTO) => Promise<void>;
  updatePlan: (id: string, plan: UpdatePlanDTO) => Promise<void>;
  deletePlan: (id: string) => Promise<void>;
  assignPlan: (assignment: CreateAssignmentDTO) => Promise<void>;
}
```

---

## 7. Integración con Wearables

### Flujo de Integración (Apple Watch como ejemplo)

```
1. Atleta va a Configuración → Wearables
2. Toca "Conectar Apple Watch"
3. App solicita permisos de HealthKit
4. El atleta autoriza los tipos de datos (FC, calorías, distancia)
5. Durante el workout:
   - WorkoutScreen lee métricas de HealthKit en tiempo real
   - HKWorkoutSession captura la sesión
6. Al finalizar el workout:
   - Los datos de HealthKit se envían al backend junto con la sesión
   - Backend los almacena en la tabla SESION
```

### Datos capturados por wearable
- Frecuencia cardíaca (bpm, muestra por segundo)
- Calorías activas (kcal)
- Distancia recorrida (km)
- Ritmo (min/km)
- Cadencia de carrera (pasos por minuto)

---

## 8. Arquitectura de Tiempo Real (Chat)

```
Cliente A ─── WebSocket ─── Servidor (Socket.io / WS)
                                    │
Cliente B ─── WebSocket ─────────────┘
                           │
                        Redis Pub/Sub
                     (sincronización entre instancias)
```

**Escalabilidad:** Si hay múltiples instancias del backend (Node clusters), el Redis Pub/Sub garantiza que los mensajes lleguen al WebSocket correcto independientemente de en qué instancia esté conectado el usuario.

---

## 9. Infraestructura Cloud Recomendada

```
┌──────────────────────────────────────────────────────┐
│                    AWS / GCP / Azure                  │
│                                                      │
│  ┌─────────────┐    ┌──────────────────────────────┐ │
│  │  CloudFront │    │     Elastic Beanstalk /       │ │
│  │   (CDN)     │    │     Cloud Run / Railway       │ │
│  │  Assets +   │    │     (Backend Node.js)         │ │
│  │  archivos   │    │     Auto-scaling              │ │
│  └─────────────┘    └──────────────────────────────┘ │
│                              │                        │
│  ┌────────────────┐  ┌───────▼──────┐  ┌───────────┐ │
│  │   S3 Bucket    │  │  RDS /       │  │  ElastiC  │ │
│  │  (comprobantes │  │  PostgreSQL  │  │  Cache    │ │
│  │   archivos     │  │  (managed)   │  │  (Redis)  │ │
│  │   pizarras)    │  └──────────────┘  └───────────┘ │
│  └────────────────┘                                   │
└──────────────────────────────────────────────────────┘
```

**Para empezar rápido (MVP):**
- **Railway** o **Render** para el backend (bajo costo, fácil deploy)
- **Supabase** para PostgreSQL + Storage + Realtime (para el chat)
- **Vercel** para el frontend web (si aplica)
- **Expo EAS** para builds y distribución móvil

---

## 10. Consideraciones para el Equipo

### Branching Strategy (Git Flow)
```
main          ← Producción (solo merge desde release o hotfix)
develop       ← Integración continua
feature/*     ← Nuevas funcionalidades
fix/*         ← Bugs
release/*     ← Preparación para deploy
hotfix/*      ← Parches urgentes a producción
```

### Entornos
| Entorno | Descripción |
|---------|-------------|
| `development` | Local con datos mock |
| `staging` | Espejo de producción con datos de prueba |
| `production` | Real, usuarios reales |

### Variables de Entorno (`.env`)
```bash
# Backend
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
JWT_SECRET=...
JWT_REFRESH_SECRET=...
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
S3_BUCKET_NAME=athletica-files
FCM_SERVER_KEY=...
SENDGRID_API_KEY=...

# Frontend móvil
API_BASE_URL=https://api.athletica.app
SENTRY_DSN=...
```

### Convenciones de Código
- **TypeScript estricto** en todo el proyecto (`strict: true`)
- **ESLint + Prettier** configurados para el proyecto
- **Commits en español** o en inglés (elegir uno y mantenerlo)
- **Documentar endpoints** con Swagger/OpenAPI automático (NestJS lo genera)
- **Tests** mínimo unitarios para servicios y e2e para flujos críticos (auth, pagos, sesiones)
