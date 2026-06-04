# Athletica — Gestión de Estado y Flujo de Datos

> **Documento 09** · Arquitectura de estado del prototipo y recomendaciones para producción

---

## Índice

1. [Estado actual del prototipo](#1-estado-actual-del-prototipo)
2. [Árbol de componentes y prop drilling](#2-árbol-de-componentes-y-prop-drilling)
3. [Arquitectura recomendada para producción](#3-arquitectura-recomendada-para-producción)
4. [Stores con Zustand](#4-stores-con-zustand)
5. [Estado del servidor con React Query](#5-estado-del-servidor-con-react-query)
6. [Separación estado local vs servidor](#6-separación-estado-local-vs-servidor)
7. [Patrones de flujo de datos](#7-patrones-de-flujo-de-datos)
8. [Manejo de caché y sincronización](#8-manejo-de-caché-y-sincronización)
9. [Estado en tiempo real (WebSocket)](#9-estado-en-tiempo-real-websocket)
10. [Resumen de decisiones](#10-resumen-de-decisiones)

---

## 1. Estado actual del prototipo

El prototipo es una **SPA React + TypeScript 100% frontend** sin backend. Todo el estado vive en memoria durante la sesión y se pierde al recargar la página.

### 1.1 Mecanismos de estado en uso

| Mecanismo | Dónde se usa | Propósito |
|-----------|-------------|-----------|
| `useState` | Todos los componentes | Estado local de UI (modales, formularios, tabs) |
| Prop drilling | CoachPlan → WorkoutPlanner → WorkoutBlock | Pasar `exerciseCategories` y callbacks hacia abajo |
| Event lifting (callback props) | Modales → pantallas padre | Confirmar acciones (ej. guardar ejercicio) |
| `CustomEvent` / `window` | PlanLibrary → CoachPlan | Navegación desacoplada entre sub-vistas |
| `localStorage` | Sesión de usuario (login) | Simular persistencia de autenticación |

### 1.2 Datos mock centrales

```
src/app/components/coach/plan/types.ts
  └── DEFAULT_EXERCISE_CATEGORIES: string[]
  └── Interfaces: WorkoutPlan, CustomExercise, WorkoutBlock, etc.

src/app/App.tsx
  └── currentUser: { role: 'coach' | 'athlete', ... }
  └── currentView: string  ← navegación principal

src/app/components/coach/CoachPlan.tsx
  └── exerciseCategories: string[]       ← compartido entre pestañas
  └── plans: WorkoutPlan[]               ← planes del coach
  └── exercises: CustomExercise[]        ← biblioteca de ejercicios

src/app/components/coach/plan/PlanLibrary.tsx
  └── assignments: Map<planId, athleteId[]>  ← asignaciones mock
```

### 1.3 Limitaciones del prototipo

- **Sin persistencia**: los datos se reinician al recargar la página.
- **Sin autenticación real**: el login compara strings hardcodeados.
- **Sin multi-usuario**: no hay conflictos de concurrencia.
- **Sin optimistic updates**: los cambios son instantáneos porque no hay latencia de red.
- **Sin invalidación de caché**: no hay caché, cada render usa los datos en memoria.

---

## 2. Árbol de componentes y prop drilling

### 2.1 Flujo de `exerciseCategories`

El estado de categorías se eleva a `CoachPlan` para ser compartido entre `WorkoutPlanner` y `ExercisesLibrary`:

```
App.tsx
└── CoachDashboard
    └── CoachPlan  (estado: exerciseCategories, setExerciseCategories)
        ├── WorkoutPlanner
        │   └── props: exerciseCategories, onSetExerciseCategories
        │       └── WorkoutBlock (por cada bloque)
        │           └── props: exerciseCategories, onAddExerciseCategory
        │               └── CreateExerciseModal
        │                   └── props: exerciseCategories, onAddExerciseCategory
        └── ExercisesLibrary
            └── props: exerciseCategories, onSetExerciseCategories
                └── CreateExerciseModal
                    └── props: exerciseCategories, onAddExerciseCategory
```

### 2.2 Flujo de planes de entrenamiento

```
CoachPlan (estado: plans, setPlans)
├── WorkoutPlanner
│   ├── onSavePlan(plan) → actualiza plans en CoachPlan
│   └── onDeletePlan(id) → filtra plans en CoachPlan
└── PlanLibrary
    ├── planes: plans (prop de solo lectura)
    └── onAssign(planId, atletaId) → actualiza asignaciones locales
```

### 2.3 Flujo de navegación principal

```
App.tsx (estado: currentView, currentUser)
├── AuthScreen     → onLogin(user) → setCurrentUser + setCurrentView
├── CoachDashboard → activeTab (estado local dentro del dashboard)
└── AthleteDashboard → activeTab (estado local dentro del dashboard)
```

---

## 3. Arquitectura recomendada para producción

Se recomienda una arquitectura de dos capas:

```
┌──────────────────────────────────────────────────────────┐
│                   ESTADO DEL CLIENTE                     │
│                                                          │
│  ┌──────────────────┐    ┌─────────────────────────┐    │
│  │  Zustand Stores  │    │  React Query (TanStack)  │    │
│  │  (UI global,     │    │  (datos del servidor,    │    │
│  │   auth, workout) │    │   caché, mutaciones)     │    │
│  └────────┬─────────┘    └──────────┬──────────────┘    │
│           │                         │                    │
│           └──────────┬──────────────┘                    │
│                      ▼                                    │
│              Componentes React                           │
│         (useState para estado local de UI)               │
└──────────────────────┬───────────────────────────────────┘
                       │ HTTP / WebSocket
                       ▼
              API REST (NestJS)
              WebSocket (Socket.io)
```

### Regla de oro

| Tipo de estado | Dónde vive | Ejemplos |
|---------------|-----------|----------|
| UI efímera | `useState` local | Modal abierto/cerrado, tab activo, valor de input |
| UI global | Zustand `uiStore` | Sidebar colapsado, toasts |
| Auth / sesión | Zustand `authStore` | Usuario actual, tokens JWT, rol |
| Datos del servidor | React Query | Planes, atletas, pagos, mensajes |
| Datos en tiempo real | Socket.io + React Query invalidation | Mensajes de chat, notificaciones |

---

## 4. Stores con Zustand

### Instalación

```bash
pnpm add zustand
```

### 4.1 `authStore` — Sesión y autenticación

```typescript
// src/stores/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthUser {
  id: string;
  email: string;
  rol: 'coach' | 'athlete';
  nombre: string;
  apellido: string;
  avatarUrl?: string;
}

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  login: (user: AuthUser, accessToken: string, refreshToken: string) => void;
  logout: () => void;
  updateTokens: (accessToken: string, refreshToken: string) => void;
  updateUser: (updates: Partial<AuthUser>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      login: (user, accessToken, refreshToken) =>
        set({ user, accessToken, refreshToken, isAuthenticated: true }),

      logout: () =>
        set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false }),

      updateTokens: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken }),

      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),
    }),
    {
      name: 'athletica-auth',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
```

### 4.2 `uiStore` — Estado global de interfaz

```typescript
// src/stores/uiStore.ts
import { create } from 'zustand';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface UiState {
  activeView: string;
  toasts: Toast[];
  setActiveView: (view: string) => void;
  addToast: (message: string, type: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
}

export const useUiStore = create<UiState>((set) => ({
  activeView: 'home',
  toasts: [],

  setActiveView: (view) => set({ activeView: view }),

  addToast: (message, type, duration = 3000) => {
    const id = crypto.randomUUID();
    set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, duration);
  },

  removeToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));
```

### 4.3 `exerciseCategoryStore` — Categorías de ejercicio

Reemplaza el prop drilling de 4 niveles que existe en el prototipo:

```typescript
// src/stores/exerciseCategoryStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const DEFAULT_CATEGORIES = [
  'Cardio', 'Halterofilia', 'Flexibilidad',
  'Deporte Específico', 'Recuperación', 'Otro',
];

interface ExerciseCategoryState {
  categories: string[];
  addCategory: (category: string) => void;
  removeCategory: (category: string) => void;
}

export const useExerciseCategoryStore = create<ExerciseCategoryState>()(
  persist(
    (set) => ({
      categories: DEFAULT_CATEGORIES,

      addCategory: (category) =>
        set((state) => ({
          categories: state.categories.includes(category)
            ? state.categories
            : [...state.categories, category],
        })),

      removeCategory: (category) =>
        set((state) => ({
          categories: state.categories.filter((c) => c !== category),
        })),
    }),
    { name: 'athletica-exercise-categories' }
  )
);
```

Con este store, `CoachPlan`, `WorkoutPlanner`, `WorkoutBlock` y `CreateExerciseModal` llaman directamente a `useExerciseCategoryStore()` sin pasar props.

### 4.4 `workoutStore` — Sesión de entrenamiento activa

```typescript
// src/stores/workoutStore.ts
import { create } from 'zustand';

interface CompletedSet {
  ejercicioEnBloqueId: string;
  completado: boolean;
}

interface WorkoutState {
  activeSessionId: string | null;
  activePlanId: string | null;
  sessionStartTime: Date | null;
  completedSets: CompletedSet[];
  currentRpe: number | null;
  isPaused: boolean;
  startSession: (sessionId: string, planId: string) => void;
  pauseSession: () => void;
  resumeSession: () => void;
  completeSet: (set: CompletedSet) => void;
  setRpe: (rpe: number) => void;
  finishSession: () => void;
}

export const useWorkoutStore = create<WorkoutState>((set) => ({
  activeSessionId: null,
  activePlanId: null,
  sessionStartTime: null,
  completedSets: [],
  currentRpe: null,
  isPaused: false,

  startSession: (sessionId, planId) =>
    set({
      activeSessionId: sessionId,
      activePlanId: planId,
      sessionStartTime: new Date(),
      completedSets: [],
      currentRpe: null,
      isPaused: false,
    }),

  pauseSession: () => set({ isPaused: true }),
  resumeSession: () => set({ isPaused: false }),

  completeSet: (newSet) =>
    set((state) => ({ completedSets: [...state.completedSets, newSet] })),

  setRpe: (rpe) => set({ currentRpe: rpe }),

  finishSession: () =>
    set({
      activeSessionId: null,
      activePlanId: null,
      sessionStartTime: null,
      completedSets: [],
      currentRpe: null,
      isPaused: false,
    }),
}));
```

El `workoutStore` sin `persist` permite que la sesión activa sobreviva la navegación entre tabs (mientras la app siga abierta), pero no persiste entre recargas — comportamiento correcto para un workout en curso.

---

## 5. Estado del servidor con React Query

### Instalación

```bash
pnpm add @tanstack/react-query @tanstack/react-query-devtools
```

### 5.1 Configuración

```typescript
// src/main.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      retry: 2,
      refetchOnWindowFocus: true,
    },
    mutations: { retry: 0 },
  },
});
```

### 5.2 Convención de query keys

```typescript
// src/lib/queryKeys.ts
export const queryKeys = {
  me: () => ['me'] as const,
  athletes: () => ['athletes'] as const,
  athlete: (id: string) => ['athletes', id] as const,
  athleteMetrics: (id: string) => ['athletes', id, 'metrics'] as const,
  plans: () => ['plans'] as const,
  plan: (id: string) => ['plans', id] as const,
  planAssignments: (id: string) => ['plans', id, 'assignments'] as const,
  exercises: () => ['exercises'] as const,
  exerciseCategories: () => ['exercise-categories'] as const,
  sessions: (filters?: object) => ['sessions', filters] as const,
  session: (id: string) => ['sessions', id] as const,
  payments: (filters?: object) => ['payments', filters] as const,
  posts: () => ['posts'] as const,
  messages: (conversacionConId: string) => ['messages', conversacionConId] as const,
  notifications: () => ['notifications'] as const,
  subscriptionMe: () => ['subscriptions', 'me'] as const,
};
```

### 5.3 Ejemplo: hook para planes

```typescript
// src/hooks/usePlans.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../lib/queryKeys';
import { api } from '../lib/api';

export function usePlans() {
  return useQuery({
    queryKey: queryKeys.plans(),
    queryFn: () => api.get('/plans'),
  });
}

export function useCreatePlan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => api.post('/plans', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.plans() });
    },
  });
}

export function useDeletePlan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/plans/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.plans() });
    },
  });
}
```

### 5.4 Optimistic updates — pagos

```typescript
export function useApprovePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (paymentId: string) => api.patch(`/payments/${paymentId}/approve`),

    onMutate: async (paymentId) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.payments() });
      const previous = queryClient.getQueryData(queryKeys.payments());

      queryClient.setQueryData(queryKeys.payments(), (old: any) => ({
        ...old,
        data: old?.data?.map((p: any) =>
          p.id === paymentId ? { ...p, estado: 'aprobado' } : p
        ),
      }));

      return { previous };
    },

    onError: (_err, _id, context) => {
      queryClient.setQueryData(queryKeys.payments(), context?.previous);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.payments() });
    },
  });
}
```

### 5.5 Hook para sesión activa

```typescript
// src/hooks/useActiveSession.ts
export function useStartSession() {
  const startSession = useWorkoutStore((s) => s.startSession);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { asignacionId: string; planId: string }) =>
      api.post<{ sessionId: string }>('/sessions/start', data),
    onSuccess: ({ sessionId }, { planId }) => {
      startSession(sessionId, planId);
    },
  });
}

export function useFinishSession() {
  const { activeSessionId, completedSets, currentRpe, finishSession } = useWorkoutStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { fin: string; duracionSeg: number; calorias?: number }) =>
      api.post(`/sessions/${activeSessionId}/finish`, { ...data, completedSets }),
    onSuccess: () => {
      finishSession();
      queryClient.invalidateQueries({ queryKey: queryKeys.sessions() });
    },
  });
}
```

---

## 6. Separación estado local vs servidor

### Guía de decisión

```
¿Este dato existe en el servidor?
├── SÍ → React Query
│   ├── ¿Cambia en tiempo real?
│   │   ├── SÍ → React Query + invalidación vía WebSocket
│   │   └── NO → React Query con staleTime apropiado
└── NO → ¿Lo necesito fuera de este componente?
    ├── SÍ → Zustand store
    └── NO → useState local
```

### Tabla por dominio

| Dominio | `useState` local | Zustand | React Query |
|---------|-----------------|---------|-------------|
| Auth | — | `authStore` | `useQuery(['me'])` |
| Planes | Modal abierto, plan en edición | — | `usePlans()`, `usePlan(id)` |
| Ejercicios | Formulario nuevo ejercicio | `exerciseCategoryStore` | `useExercises()` |
| Sesión workout | Timer local, etapa actual | `workoutStore` | `useFinishSession()` al guardar |
| Pagos | Tab activo, comprobante preview | — | `usePayments()`, `useApprovePayment()` |
| Chat | Texto del input | — | `useMessages(id)` + Socket.io |
| Notificaciones | Panel abierto/cerrado | `uiStore` (badge contador) | `useNotifications()` + Socket.io |
| Comunidad | Texto de comentario | — | `usePosts()`, `useCreatePost()` |
| Perfil | Formulario en edición | `authStore.user` | `useUpdateProfile()` |
| UI global | — | `uiStore` (toasts) | — |

---

## 7. Patrones de flujo de datos

### 7.1 Crear plan (coach)

```
WorkoutPlanner
│
├── [Rellena formulario] → useState local (nombre, bloques, notas)
│
├── [Clic "Guardar Plan"]
│   └── useCreatePlan().mutate(planData)
│       ├── POST /plans → API
│       ├── onSuccess: invalidateQueries(['plans'])
│       └── uiStore.addToast('Plan creado', 'success')
│
└── PlanLibrary se re-renderiza automáticamente (usePlans() refetch)
```

### 7.2 Ejecutar workout (atleta)

```
AthletePlan / WorkoutDetailsModal
│
├── [Clic "Iniciar"]
│   └── useStartSession().mutate({ asignacionId, planId })
│       ├── POST /sessions/start → API → { sessionId }
│       └── workoutStore.startSession(sessionId, planId)
│
├── [Durante el workout]
│   ├── Timer: useState local (segundos)
│   ├── Completar etapa: workoutStore.completeSet(set)
│   └── FC: useState local (datos del wearable)
│
└── [Clic "Finalizar" → Confirmar]
    └── useFinishSession().mutate({ fin, duracionSeg, calorias })
        ├── POST /sessions/:id/finish → API
        ├── workoutStore.finishSession()
        └── invalidateQueries(['sessions'])
            └── → abre RPEModal
```

### 7.3 Flujo de pago

```
PaymentModal (atleta)
├── [Selecciona imagen] → useState: selectedFile: File | null
└── [Clic "Enviar comprobante"]
    └── useUploadPayment().mutate({ file, monto })
        ├── POST /payments/upload (multipart) → API
        └── invalidateQueries(['payments'])

CoachPaymentApprovalModal (coach)
├── usePayments({ estado: 'pendiente' }) → lista
└── [Clic "Aprobar"]
    └── useApprovePayment().mutate(paymentId)
        ├── Optimistic: marca 'aprobado' localmente
        ├── PATCH /payments/:id/approve → API
        └── onSettled: invalidateQueries(['payments'])
```

---

## 8. Manejo de caché y sincronización

### staleTime por recurso

| Recurso | `staleTime` | Razón |
|---------|------------|-------|
| Perfil propio (`/me`) | 10 min | Cambia poco |
| Lista de atletas | 5 min | Edición infrecuente |
| Planes de entrenamiento | 5 min | Edición relativamente infrecuente |
| Biblioteca de ejercicios | 15 min | Muy estable |
| Sesiones históricas | 10 min | Inmutables una vez finalizadas |
| Pagos pendientes | 1 min | Tiempo-sensible para aprobación |
| Publicaciones del coach | 2 min | Feed moderadamente activo |
| Mensajes de chat | 0 | Manejados por WebSocket |
| Notificaciones | 0 | Manejadas por WebSocket |

### Invalidación cruzada

Al finalizar una sesión de workout deben invalidarse múltiples queries relacionadas:

```typescript
onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: ['sessions'] });
  queryClient.invalidateQueries({ queryKey: ['athletes', atletaId, 'metrics'] });
}
```

### Prefetch estratégico

Al entrar al dashboard precargar datos de alta probabilidad de uso:

```typescript
useEffect(() => {
  queryClient.prefetchQuery({ queryKey: queryKeys.athletes(), queryFn: () => api.get('/athletes') });
  queryClient.prefetchQuery({ queryKey: queryKeys.plans(), queryFn: () => api.get('/plans') });
}, []);
```

---

## 9. Estado en tiempo real (WebSocket)

### 9.1 socketStore

```typescript
// src/stores/socketStore.ts
import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';

interface SocketState {
  socket: Socket | null;
  isConnected: boolean;
  connect: (token: string) => void;
  disconnect: () => void;
}

export const useSocketStore = create<SocketState>((set, get) => ({
  socket: null,
  isConnected: false,

  connect: (token) => {
    const socket = io(import.meta.env.VITE_WS_URL, {
      auth: { token },
      transports: ['websocket'],
    });
    socket.on('connect', () => set({ isConnected: true }));
    socket.on('disconnect', () => set({ isConnected: false }));
    set({ socket });
  },

  disconnect: () => {
    get().socket?.disconnect();
    set({ socket: null, isConnected: false });
  },
}));
```

### 9.2 Hook de chat

```typescript
// src/hooks/useChat.ts
export function useChatSocket(conversacionConId: string) {
  const socket = useSocketStore((s) => s.socket);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) return;

    socket.emit('joinConversation', { conversacionConId });

    socket.on('newMessage', (message) => {
      queryClient.setQueryData(
        queryKeys.messages(conversacionConId),
        (old: any) => ({
          ...old,
          data: [...(old?.data ?? []), message],
        })
      );
    });

    return () => {
      socket.emit('leaveConversation', { conversacionConId });
      socket.off('newMessage');
    };
  }, [socket, conversacionConId, queryClient]);
}

export function useSendMessage(conversacionConId: string) {
  const socket = useSocketStore((s) => s.socket);
  const queryClient = useQueryClient();

  return (contenido: string) => {
    const tempId = `temp-${Date.now()}`;
    const tempMsg = { id: tempId, contenido, estado: 'enviando', createdAt: new Date() };

    // Optimistic insert
    queryClient.setQueryData(
      queryKeys.messages(conversacionConId),
      (old: any) => ({ ...old, data: [...(old?.data ?? []), tempMsg] })
    );

    socket?.emit('sendMessage', { destinatarioId: conversacionConId, contenido }, (ack: any) => {
      queryClient.setQueryData(
        queryKeys.messages(conversacionConId),
        (old: any) => ({
          ...old,
          data: old?.data?.map((m: any) => (m.id === tempId ? ack.message : m)),
        })
      );
    });
  };
}
```

### 9.3 Notificaciones en tiempo real

```typescript
// src/hooks/useNotifications.ts
export function useNotificationSocket() {
  const socket = useSocketStore((s) => s.socket);
  const queryClient = useQueryClient();
  const addToast = useUiStore((s) => s.addToast);

  useEffect(() => {
    if (!socket) return;

    socket.on('notification', (notification) => {
      queryClient.setQueryData(
        queryKeys.notifications(),
        (old: any) => ({ ...old, data: [notification, ...(old?.data ?? [])] })
      );

      const mensajes: Record<string, string> = {
        pago_aprobado: 'Tu pago fue aprobado',
        pago_rechazado: 'Tu pago fue rechazado',
        workout_asignado: 'Tu coach te asignó un nuevo plan',
        nuevo_mensaje: 'Nuevo mensaje de tu coach',
        pago_recibido: 'Nuevo comprobante de pago recibido',
      };
      addToast(mensajes[notification.tipo] ?? 'Nueva notificación', 'info');
    });

    return () => { socket.off('notification'); };
  }, [socket, queryClient, addToast]);
}
```

---

## 10. Resumen de decisiones

| Decisión | Elección | Razón |
|----------|---------|-------|
| Estado global de UI | Zustand | Mínimo boilerplate, sin providers extra, TypeScript nativo |
| Estado del servidor | React Query (TanStack) | Mejor soporte para mutaciones, invalidación granular, devtools excelentes |
| Auth persistence | Zustand + `persist` | Simplicidad. En producción migrar a HttpOnly cookies |
| WebSocket client | Socket.io-client | Reconexión automática, rooms, ACKs incorporados |
| Sesión workout activa | Zustand (sin persist) | Necesita sobrevivir navegación entre tabs, no entre recargas |
| Categorías de ejercicio | Zustand + `persist` | Elimina prop-drill de 4 niveles, persiste categorías custom del coach |
| Optimistic updates | Manual vía `onMutate` | Control granular; solo en operaciones donde vale la pena (pagos, likes) |

### Orden de migración recomendado

1. **Auth**: `localStorage` hardcoded → `authStore` + API real
2. **Planes y ejercicios**: mock arrays → `usePlans()` / `useExercises()` con React Query
3. **Categorías**: prop drilling → `exerciseCategoryStore` + `useExerciseCategories()` (GET/POST)
4. **Sesión workout**: `workoutStore` ya listo, solo conectar `useStartSession()` / `useFinishSession()` a la API
5. **Pagos**: React Query con optimistic updates en aprobación
6. **Chat**: Socket.io + `useChatSocket()` hook
7. **Notificaciones**: `useNotificationSocket()` al store de UI

---

*Documentación generada para el proyecto Athletica · Mayo 2026*
