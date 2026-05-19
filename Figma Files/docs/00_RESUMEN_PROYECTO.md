# Athletica — Resumen del Proyecto

## 1. Visión General

**Athletica** es una aplicación móvil multiplataforma destinada a entrenadores personales (coaches) y sus atletas. Su objetivo central es digitalizar y optimizar la relación entre ambas partes: desde la planificación y asignación de entrenamientos, hasta el seguimiento del rendimiento, la gestión de pagos y la comunicación directa.

La aplicación opera bajo un modelo de suscripción donde el **coach contrata una licencia** de la plataforma (según el número de atletas que gestiona), y luego ofrece **planes de entrenamiento personalizados** a sus atletas.

---

## 2. Objetivos del Producto

| Objetivo | Descripción |
|----------|-------------|
| **Gestión de atletas** | Centralizar la información, el progreso y el historial de cada atleta |
| **Planificación de entrenamientos** | Crear, organizar y asignar planes y rutinas con estructura detallada por bloques |
| **Ejecución de sesiones** | Permitir al atleta registrar una sesión en tiempo real con métricas de wearables |
| **Seguimiento de pagos** | Flujo completo de cobro, envío de comprobante y aprobación |
| **Comunicación** | Chat directo entre coach y atleta, y feed de comunidad |
| **Análisis de rendimiento** | Gráficos de RPE, frecuencia cardíaca y progreso histórico |

---

## 3. Roles de Usuario

### 3.1 Coach (Entrenador Personal)
El coach es el usuario principal que contrata la plataforma. Gestiona múltiples atletas y tiene acceso completo a las herramientas de planificación y administración.

**Credenciales de demo:** `coach@coach` / `1234`

**Nombre de demo:** Tomás Johansson

### 3.2 Atleta
El atleta es invitado por su coach mediante un código de vinculación. Ejecuta entrenamientos, reporta pagos y se comunica con su entrenador.

**Credenciales de demo:** `athlete@athlete` / `1234`

**Nombre de demo:** María García

---

## 4. Stack Tecnológico (Prototipo actual)

| Capa | Tecnología |
|------|------------|
| **Frontend** | React 18 + TypeScript |
| **Estilos** | Tailwind CSS v4 |
| **Routing / Navegación** | Estado local (`useState`) — sin router externo |
| **Drag & Drop** | `react-dnd` + HTML5Backend |
| **Íconos** | `lucide-react` |
| **Fechas** | `date-fns` (con locale `es`) |
| **Gráficos** | Barras CSS custom (sin librería externa por ahora) |
| **Bundler** | Vite |
| **Backend** | _Sin implementar — mock data_ |
| **Base de datos** | _Sin implementar — mock data_ |
| **Autenticación** | _Simulada — sin backend_ |

> **Nota para el equipo:** El prototipo actual es 100% frontend con datos mock. La arquitectura real deberá incorporar un backend REST o GraphQL, base de datos relacional, autenticación JWT/OAuth, y almacenamiento de archivos.

---

## 5. Stack Tecnológico Recomendado para Producción

| Capa | Recomendación |
|------|---------------|
| **Frontend móvil** | React Native + Expo |
| **Frontend web (panel coach)** | Next.js 14+ (App Router) |
| **Backend** | Node.js + Express o NestJS |
| **Base de datos** | PostgreSQL |
| **ORM** | Prisma |
| **Autenticación** | JWT + Refresh Tokens / Auth0 |
| **Almacenamiento** | AWS S3 / Supabase Storage |
| **Notificaciones push** | Firebase Cloud Messaging |
| **Tiempo real (chat)** | WebSockets (Socket.io) o Supabase Realtime |
| **API** | REST + OpenAPI / o GraphQL |
| **CI/CD** | GitHub Actions |
| **Hosting** | AWS / Vercel / Railway |

---

## 6. Arquitectura de Navegación

```
App
├── Login
├── Registro (CreateAccount)
│   ├── Flujo Coach (5 pasos)
│   └── Flujo Atleta (3 pasos)
└── App Principal
    ├── Vista Coach (5 tabs)
    │   ├── Inicio
    │   ├── Atletas
    │   │   ├── Chat
    │   │   ├── Pagos
    │   │   ├── Plan del Atleta
    │   │   ├── Métricas
    │   │   └── Perfil
    │   ├── Comunidad
    │   ├── Calendario
    │   └── Planificación
    │       ├── Biblioteca de Planes
    │       ├── Editor de Planes (WorkoutPlanner)
    │       └── Biblioteca de Ejercicios
    └── Vista Atleta (5 tabs)
        ├── Inicio
        ├── Entrenador
        │   ├── Perfil del Coach
        │   └── Chat
        ├── Comunidad
        ├── Calendario
        └── Plan
```

---

## 7. Paleta de Colores y Tokens de Diseño

| Token | Valor | Uso |
|-------|-------|-----|
| `--background` | `#1a3a45` | Fondo global (teal oscuro) |
| `--primary` | `#c4ff0e` | Acento principal (lima verde) |
| `--primary-gradient` | `#4ade80 → #a3e635` | Botones de acción primaria |
| `--card` | `rgba(15,23,42,0.6)` | Tarjetas y contenedores |
| `--foreground` | `#ffffff` | Texto principal |
| `--muted-foreground` | `#9ca3af` | Texto secundario / subtítulos |
| `--border` | Gris oscuro | Bordes de componentes |
| `--accent-link` | `#38bdf8` | Links / texto interactivo |
| `--success` | `#65a30d` | Pagos aprobados, sesiones completadas |
| `--warning` | `#fb923c` | Pagos pendientes, alertas |
| `--danger` | `#ef4444` | Errores, deudas, eliminar |

### Colores de Zonas de Entrenamiento (FC/RPE)
| Zona | Color | Descripción |
|------|-------|-------------|
| Zona 1 | `#22d3ee` | Recuperación |
| Zona 2 | `#4ade80` | Aeróbico |
| Zona 3 | `#c4ff0e` | Umbral |
| Zona 4 | `#fb923c` | Anaeróbico |
| Zona 5 | `#ef4444` | VO₂ máx |

### Colores de Tipos de Bloque
| Tipo | Color |
|------|-------|
| Cardio | Rojo (`text-red-400`) |
| Halterofilia | Azul (`text-blue-400`) |
| Flexibilidad | Verde (`text-green-400`) |
| Deporte Específico | Púrpura (`text-purple-400`) |
| Recuperación | Amarillo (`text-yellow-400`) |
| Otro | Gris (`text-gray-400`) |

---

## 8. Modelo de Negocio (Referencia)

### Planes de Suscripción del Coach (Athletica → Coach)

| Plan | Atletas | Precio |
|------|---------|--------|
| Free | 1 – 3 atletas | Gratis |
| Starter | 4 – 20 atletas | $29/mes |
| Pro | 21 – 70 atletas | $79/mes |
| Max | 71 – 100 atletas | $149/mes |
| Enterprise | 100+ atletas | Precio negociado |

### Planes del Coach hacia sus Atletas
El coach crea sus propios planes de suscripción con precio, frecuencia, número de sesiones y deporte. Los atletas se suscriben a estos planes.

---

## 9. Módulos Funcionales

| Módulo | Coach | Atleta |
|--------|-------|--------|
| Autenticación y registro | ✓ | ✓ |
| Gestión de perfil | ✓ | ✓ |
| Vinculación coach-atleta | ✓ (genera código) | ✓ (ingresa código) |
| Biblioteca de planes | ✓ | — |
| Editor de entrenamientos | ✓ | — |
| Biblioteca de ejercicios | ✓ | — |
| Asignación de planes | ✓ | — |
| Ejecución de sesiones | — | ✓ |
| Métricas en tiempo real (wearables) | — | ✓ |
| Valoración RPE | — | ✓ |
| Calendario | ✓ | ✓ |
| Chat 1:1 | ✓ | ✓ |
| Comunidad (feed) | ✓ (publica) | ✓ (lee) |
| Pagos (envío) | — | ✓ |
| Pagos (aprobación) | ✓ | — |
| Métricas y análisis del atleta | ✓ | ✓ (de sí mismo) |
| Notificaciones push | ✓ | ✓ |
| Ajustes y configuración | ✓ | ✓ |

---

## 10. Principios de Diseño de la App

1. **Mobile-first:** Diseñada para pantallas de ~375–480px de ancho.
2. **Rol-separado:** Coach y atleta tienen vistas completamente distintas.
3. **Flujos lineales:** Modales y sub-vistas en lugar de páginas independientes para mantener el contexto.
4. **Datos en tiempo real:** El workout screen simula métricas de wearable con actualización por segundos.
5. **Feedback inmediato:** Estados de carga, éxito y error visibles en todos los flujos críticos.
6. **Accesibilidad:** Contraste alto (texto blanco sobre fondo oscuro), botones grandes y áreas de toque amplias.
