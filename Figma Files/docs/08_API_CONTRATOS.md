# Athletica — Contratos de API

> **Documento 08** · Especificación completa de los endpoints REST y eventos WebSocket

---

## Convenciones Generales

| Aspecto | Detalle |
|---------|---------|
| **Base URL** | `https://api.athletica.app/v1` |
| **Autenticación** | `Authorization: Bearer <accessToken>` en todas las rutas protegidas |
| **Formato de fechas** | ISO 8601 — `2026-05-20T14:30:00Z` |
| **Paginación** | `?page=1&limit=20` → respuesta con `{ data, meta: { total, page, limit, totalPages } }` |
| **Idioma de errores** | Español |
| **Content-Type** | `application/json` salvo donde se indique `multipart/form-data` |

### Formato de error estándar

```json
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "El campo email es requerido",
  "field": "email"
}
```

### Anotaciones

- 🔒 Requiere `Authorization` header con token válido
- 🔓 Ruta pública
- `[coach]` Solo accesible por usuarios con rol coach
- `[athlete]` Solo accesible por usuarios con rol atleta
- `[any]` Accesible por cualquier rol autenticado

---

## Índice de Endpoints

| # | Dominio | Método | Ruta | Descripción |
|---|---------|--------|------|-------------|
| 1 | Auth | POST | `/auth/register` | Registro de usuario |
| 2 | Auth | POST | `/auth/login` | Inicio de sesión |
| 3 | Auth | POST | `/auth/refresh` | Renovar access token |
| 4 | Auth | POST | `/auth/logout` | Cerrar sesión |
| 5 | Usuarios | GET | `/users/me` | Perfil propio |
| 6 | Usuarios | PATCH | `/users/me` | Actualizar perfil propio |
| 7 | Usuarios | PATCH | `/users/me/avatar` | Subir avatar |
| 8 | Coaches | GET | `/coaches/me` | Perfil del coach autenticado |
| 9 | Coaches | PATCH | `/coaches/me` | Actualizar perfil del coach |
| 10 | Coaches | GET | `/coaches/me/code` | Obtener código de vinculación |
| 11 | Coaches | POST | `/coaches/me/sports` | Actualizar deportes del coach |
| 12 | Atletas | GET | `/athletes` | Listar atletas del coach |
| 13 | Atletas | GET | `/athletes/:id` | Perfil de un atleta |
| 14 | Atletas | GET | `/athletes/me` | Perfil del atleta autenticado |
| 15 | Atletas | PATCH | `/athletes/me` | Actualizar perfil del atleta |
| 16 | Atletas | POST | `/athletes/link` | Vincular atleta con coach |
| 17 | Atletas | GET | `/athletes/:id/metrics` | Métricas de un atleta |
| 18 | Planes | GET | `/plans` | Listar planes del coach |
| 19 | Planes | POST | `/plans` | Crear plan |
| 20 | Planes | GET | `/plans/:id` | Obtener plan completo |
| 21 | Planes | PATCH | `/plans/:id` | Actualizar plan |
| 22 | Planes | DELETE | `/plans/:id` | Eliminar plan |
| 23 | Planes | POST | `/plans/:id/duplicate` | Duplicar plan |
| 24 | Planes | POST | `/plans/:id/assign` | Asignar plan a atletas |
| 25 | Planes | GET | `/plans/:id/assignments` | Ver atletas asignados |
| 26 | Categorías Plan | GET | `/plan-categories` | Listar categorías de plan |
| 27 | Categorías Plan | POST | `/plan-categories` | Crear categoría de plan |
| 28 | Categorías Plan | DELETE | `/plan-categories/:id` | Eliminar categoría de plan |
| 29 | Bloques | POST | `/plans/:id/blocks` | Agregar bloque a plan |
| 30 | Bloques | PATCH | `/plans/:planId/blocks/:blockId` | Actualizar bloque |
| 31 | Bloques | DELETE | `/plans/:planId/blocks/:blockId` | Eliminar bloque |
| 32 | Bloques | PATCH | `/plans/:id/blocks/reorder` | Reordenar bloques |
| 33 | Ejercicios | GET | `/exercises` | Listar ejercicios (biblioteca) |
| 34 | Ejercicios | POST | `/exercises` | Crear ejercicio personalizado |
| 35 | Ejercicios | PATCH | `/exercises/:id` | Actualizar ejercicio |
| 36 | Ejercicios | DELETE | `/exercises/:id` | Eliminar ejercicio |
| 37 | Categorías Ejercicio | GET | `/exercise-categories` | Listar categorías |
| 38 | Categorías Ejercicio | POST | `/exercise-categories` | Crear categoría |
| 39 | Categorías Ejercicio | DELETE | `/exercise-categories/:id` | Eliminar categoría |
| 40 | Archivos | POST | `/plans/:id/files` | Adjuntar archivo a plan |
| 41 | Archivos | DELETE | `/plans/:planId/files/:fileId` | Eliminar archivo adjunto |
| 42 | Sesiones | GET | `/sessions` | Listar sesiones |
| 43 | Sesiones | GET | `/sessions/:id` | Obtener sesión |
| 44 | Sesiones | POST | `/sessions/start` | Iniciar sesión de entrenamiento |
| 45 | Sesiones | POST | `/sessions/:id/finish` | Finalizar sesión |
| 46 | Sesiones | POST | `/sessions/:id/discard` | Descartar sesión |
| 47 | Sesiones | POST | `/sessions` | Crear sesión manual (calendario) |
| 48 | RPE | POST | `/sessions/:id/rpe` | Registrar RPE |
| 49 | Pagos | GET | `/payments` | Listar pagos |
| 50 | Pagos | POST | `/payments/upload` | Subir comprobante de pago |
| 51 | Pagos | PATCH | `/payments/:id/approve` | Aprobar pago |
| 52 | Pagos | PATCH | `/payments/:id/reject` | Rechazar pago |
| 53 | Comunidad | GET | `/posts` | Listar publicaciones del coach |
| 54 | Comunidad | POST | `/posts` | Crear publicación |
| 55 | Comunidad | DELETE | `/posts/:id` | Eliminar publicación |
| 56 | Comunidad | POST | `/posts/:id/like` | Toggle like en publicación |
| 57 | Comunidad | POST | `/posts/:id/comments` | Comentar publicación |
| 58 | Chat | GET | `/messages` | Obtener historial de mensajes |
| 59 | Chat | POST | `/messages` | Enviar mensaje |
| 60 | Chat | PATCH | `/messages/read` | Marcar mensajes como leídos |
| 61 | Suscripciones Atleta | GET | `/subscriptions/me` | Suscripción actual del atleta |
| 62 | Suscripciones Atleta | POST | `/subscriptions` | Suscribirse a plan del coach |
| 63 | Suscripciones Atleta | DELETE | `/subscriptions/me` | Cancelar suscripción |
| 64 | Planes Coach | GET | `/coach-plans` | Listar planes que ofrece el coach |
| 65 | Planes Coach | POST | `/coach-plans` | Crear plan de suscripción |
| 66 | Planes Coach | PATCH | `/coach-plans/:id` | Actualizar plan de suscripción |
| 67 | Planes Coach | DELETE | `/coach-plans/:id` | Eliminar plan de suscripción |
| 68 | Notificaciones | GET | `/notifications` | Listar notificaciones |
| 69 | Notificaciones | PATCH | `/notifications/:id/read` | Marcar notificación como leída |
| 70 | Notificaciones | PATCH | `/notifications/read-all` | Marcar todas como leídas |
| 71 | Wearables | GET | `/wearables` | Listar dispositivos conectados |
| 72 | Wearables | POST | `/wearables/connect` | Conectar dispositivo |
| 73 | Wearables | DELETE | `/wearables/:id` | Desconectar dispositivo |
| 74 | Suscripción Athletica | GET | `/athletica-plans` | Listar planes de Athletica |

---

## 1. Autenticación

### 1.1 Registro
🔓 `POST /auth/register`

**Disparado por:** Botón "Siguiente" en Registro Paso 1 (cualquier rol)

**Request:**
```json
{
  "email": "carlos@coach.com",
  "password": "Secure1234!",
  "nombre": "Carlos",
  "apellido": "Martínez",
  "rol": "coach"
}
```

**Response 201:**
```json
{
  "user": {
    "id": "uuid",
    "email": "carlos@coach.com",
    "nombre": "Carlos",
    "apellido": "Martínez",
    "rol": "coach",
    "activo": true,
    "createdAt": "2026-05-20T10:00:00Z"
  },
  "accessToken": "eyJ...",
  "refreshToken": "eyJ..."
}
```

**Errores:** `400` email inválido · `409` email ya registrado

---

### 1.2 Login
🔓 `POST /auth/login`

**Disparado por:** Botón "Iniciar sesión" en pantalla de Login

**Request:**
```json
{
  "email": "carlos@coach.com",
  "password": "Secure1234!"
}
```

**Response 200:**
```json
{
  "user": {
    "id": "uuid",
    "email": "carlos@coach.com",
    "nombre": "Carlos",
    "apellido": "Martínez",
    "rol": "coach",
    "avatarUrl": "https://cdn.athletica.app/avatars/uuid.jpg"
  },
  "accessToken": "eyJ...",
  "refreshToken": "eyJ..."
}
```

**Errores:** `401` credenciales incorrectas · `403` cuenta desactivada

---

### 1.3 Renovar Token
🔓 `POST /auth/refresh`

**Disparado por:** Automáticamente por el cliente cuando el `accessToken` expira

**Request:**
```json
{
  "refreshToken": "eyJ..."
}
```

**Response 200:**
```json
{
  "accessToken": "eyJ...",
  "refreshToken": "eyJ..."
}
```

**Errores:** `401` refresh token inválido o expirado

---

### 1.4 Logout
🔒 `POST /auth/logout`

**Disparado por:** Botón "Cerrar sesión" en Settings (cualquier rol)

**Request:**
```json
{
  "refreshToken": "eyJ..."
}
```

**Response 200:**
```json
{ "message": "Sesión cerrada correctamente" }
```

---

## 2. Usuarios

### 2.1 Obtener perfil propio
🔒 `GET /users/me` `[any]`

**Disparado por:** Al cargar la app con sesión activa

**Response 200:**
```json
{
  "id": "uuid",
  "email": "carlos@coach.com",
  "nombre": "Carlos",
  "apellido": "Martínez",
  "rol": "coach",
  "avatarUrl": "https://cdn.athletica.app/avatars/uuid.jpg",
  "fechaNacimiento": "1990-03-15",
  "activo": true,
  "createdAt": "2026-01-10T08:00:00Z"
}
```

---

### 2.2 Actualizar perfil propio
🔒 `PATCH /users/me` `[any]`

**Disparado por:** Botón "Guardar cambios" en AthleteEditProfile / CoachSettings > Editar Perfil

**Request:**
```json
{
  "nombre": "Carlos",
  "apellido": "Martínez",
  "fechaNacimiento": "1990-03-15"
}
```

**Response 200:** Objeto usuario actualizado

---

### 2.3 Subir avatar
🔒 `PATCH /users/me/avatar` `[any]` · `multipart/form-data`

**Request:** `file` (imagen JPG/PNG, máx 5 MB)

**Response 200:**
```json
{
  "avatarUrl": "https://cdn.athletica.app/avatars/uuid.jpg"
}
```

**Errores:** `413` archivo demasiado grande · `415` formato no soportado

---

## 3. Coaches

### 3.1 Perfil del coach autenticado
🔒 `GET /coaches/me` `[coach]`

**Response 200:**
```json
{
  "id": "uuid",
  "usuarioId": "uuid",
  "nombreNegocio": "Carlos Training",
  "frase": "Tu mejor versión comienza hoy",
  "logoUrl": "https://cdn.athletica.app/logos/uuid.jpg",
  "aniosExperiencia": 8,
  "ciudad": "Santiago",
  "instagramUrl": "https://instagram.com/carlostraining",
  "stravaUrl": null,
  "codigoVinculacion": "CARL-2026-FZQX",
  "deportes": ["Crossfit", "Running"],
  "totalAtletas": 12,
  "planAthletica": {
    "nombre": "Pro",
    "maxAtletas": 25
  }
}
```

---

### 3.2 Actualizar perfil del coach
🔒 `PATCH /coaches/me` `[coach]`

**Disparado por:** Botón "Guardar" en CoachSettings > Editar Perfil

**Request:**
```json
{
  "nombreNegocio": "Carlos Elite Training",
  "frase": "Entrena con propósito",
  "aniosExperiencia": 9,
  "ciudad": "Santiago",
  "instagramUrl": "https://instagram.com/carloselite",
  "stravaUrl": null
}
```

**Response 200:** Objeto coach actualizado

---

### 3.3 Obtener código de vinculación
🔒 `GET /coaches/me/code` `[coach]`

**Disparado por:** Pantalla Paso 5 del registro del coach

**Response 200:**
```json
{
  "codigoVinculacion": "CARL-2026-FZQX",
  "shareUrl": "https://athletica.app/join/CARL-2026-FZQX"
}
```

---

### 3.4 Actualizar deportes del coach
🔒 `POST /coaches/me/sports` `[coach]`

**Request:**
```json
{
  "deporteIds": ["uuid-crossfit", "uuid-running", "uuid-natacion"]
}
```

**Response 200:**
```json
{
  "deportes": ["Crossfit", "Running", "Natación"]
}
```

---

## 4. Atletas

### 4.1 Listar atletas del coach
🔒 `GET /athletes` `[coach]`

**Query params:** `?search=juan&page=1&limit=20`

**Response 200:**
```json
{
  "data": [
    {
      "id": "uuid",
      "nombre": "Juan",
      "apellido": "Pérez",
      "avatarUrl": "https://cdn.athletica.app/avatars/uuid.jpg",
      "objetivo": "Bajar de peso",
      "aptitudFisica": 7,
      "tallaCm": 175,
      "pesoKg": 80,
      "vinculadoEn": "2026-02-01T00:00:00Z",
      "pagoPendiente": true,
      "proximaSesion": "2026-05-22T09:00:00Z"
    }
  ],
  "meta": { "total": 12, "page": 1, "limit": 20, "totalPages": 1 }
}
```

---

### 4.2 Perfil de un atleta
🔒 `GET /athletes/:id` `[coach]`

**Disparado por:** Botón "Ver perfil" en tarjeta de atleta

**Response 200:**
```json
{
  "id": "uuid",
  "nombre": "Juan",
  "apellido": "Pérez",
  "email": "juan@atleta.com",
  "avatarUrl": "https://cdn.athletica.app/avatars/uuid.jpg",
  "tallaCm": 175,
  "pesoKg": 80,
  "aptitudFisica": 7,
  "objetivo": "Bajar de peso y ganar masa muscular",
  "logros": "Completé mi primer 5K en 2025",
  "estiloVida": "Trabajo de oficina, sedentario fuera del gym",
  "vinculadoEn": "2026-02-01T00:00:00Z",
  "suscripcion": {
    "planNombre": "Plan Mensual",
    "estado": "activa",
    "fechaRenovacion": "2026-06-01"
  }
}
```

---

### 4.3 Perfil del atleta autenticado
🔒 `GET /athletes/me` `[athlete]`

**Response 200:** Mismo esquema que 4.2 pero incluye `coachInfo`:
```json
{
  "id": "uuid",
  "nombre": "Juan",
  "coachInfo": {
    "id": "uuid",
    "nombreNegocio": "Carlos Training",
    "logoUrl": "https://cdn.athletica.app/logos/uuid.jpg",
    "frase": "Tu mejor versión comienza hoy"
  }
}
```

---

### 4.4 Actualizar perfil del atleta
🔒 `PATCH /athletes/me` `[athlete]`

**Disparado por:** Botón "Guardar cambios" en AthleteEditProfile

**Request:**
```json
{
  "tallaCm": 176,
  "pesoKg": 78.5,
  "aptitudFisica": 8,
  "objetivo": "Ganar masa muscular",
  "logros": "Completé 10K en 2025",
  "estiloVida": "Activo, trabajo de pie"
}
```

**Response 200:** Objeto atleta actualizado

---

### 4.5 Vincular atleta con coach
🔒 `POST /athletes/link` `[athlete]`

**Disparado por:** Botón "Vincularme con este coach" en Registro Atleta Paso 3

**Request:**
```json
{
  "codigoVinculacion": "CARL-2026-FZQX"
}
```

**Response 200:**
```json
{
  "coach": {
    "id": "uuid",
    "nombreNegocio": "Carlos Training",
    "logoUrl": "https://cdn.athletica.app/logos/uuid.jpg",
    "frase": "Tu mejor versión comienza hoy"
  }
}
```

**Errores:** `404` código no encontrado · `409` atleta ya tiene coach

---

### 4.6 Métricas de un atleta
🔒 `GET /athletes/:id/metrics` `[coach]`

**Query params:** `?period=week|month|3months`

**Disparado por:** Botón "Métricas" en CoachAthletes

**Response 200:**
```json
{
  "periodo": "month",
  "sesionesTotales": 12,
  "sesionesCompletadas": 10,
  "promedioRpe": 7.2,
  "totalCaloriasQuemadas": 4800,
  "totalTiempoMinutos": 640,
  "fcPromedio": 142,
  "rpeHistorico": [
    { "fecha": "2026-05-01", "valor": 7 },
    { "fecha": "2026-05-08", "valor": 8 }
  ],
  "sesionesSemanales": [
    { "semana": "2026-W18", "completadas": 3, "programadas": 3 }
  ]
}
```

---

## 5. Planes de Entrenamiento

### 5.1 Listar planes
🔒 `GET /plans` `[coach]`

**Query params:** `?search=fuerza&categoria=Halterofilia&page=1&limit=20`

**Disparado por:** Al cargar PlanLibrary

**Response 200:**
```json
{
  "data": [
    {
      "id": "uuid",
      "nombre": "Plan Fuerza Base",
      "categoria": "Halterofilia",
      "tipo": "individual",
      "notas": "Para principiantes con base de 3 meses",
      "totalBloques": 4,
      "atletasAsignados": 3,
      "createdAt": "2026-03-15T12:00:00Z",
      "updatedAt": "2026-05-10T09:00:00Z"
    }
  ],
  "meta": { "total": 8, "page": 1, "limit": 20, "totalPages": 1 }
}
```

---

### 5.2 Crear plan
🔒 `POST /plans` `[coach]`

**Disparado por:** Botón "Crear Plan" en Modal Nuevo Plan → WorkoutPlanner

**Request:**
```json
{
  "nombre": "Plan Fuerza Base",
  "categoria": "Halterofilia",
  "tipo": "individual",
  "notas": ""
}
```

**Response 201:**
```json
{
  "id": "uuid",
  "nombre": "Plan Fuerza Base",
  "categoria": "Halterofilia",
  "tipo": "individual",
  "notas": "",
  "bloques": [],
  "archivos": [],
  "createdAt": "2026-05-20T14:00:00Z"
}
```

---

### 5.3 Obtener plan completo
🔒 `GET /plans/:id` `[coach]`

**Disparado por:** Al abrir WorkoutPlanner para editar un plan

**Response 200:**
```json
{
  "id": "uuid",
  "nombre": "Plan Fuerza Base",
  "categoria": "Halterofilia",
  "tipo": "individual",
  "notas": "Para principiantes",
  "bloques": [
    {
      "id": "uuid",
      "nombre": "Calentamiento",
      "tipo": "Cardio",
      "comentarios": "Activación articular",
      "orden": 0,
      "ejercicios": [
        {
          "id": "uuid",
          "nombre": "Trote suave",
          "series": "1",
          "repeticiones": null,
          "duracion": "10 min",
          "intensidad": "Baja",
          "notas": "",
          "orden": 0,
          "ejercicioTemplateId": "uuid"
        }
      ]
    }
  ],
  "archivos": [
    {
      "id": "uuid",
      "nombre": "tabla_progresion.pdf",
      "url": "https://cdn.athletica.app/files/uuid.pdf",
      "tipo": "file",
      "mimeType": "application/pdf"
    }
  ]
}
```

---

### 5.4 Actualizar plan
🔒 `PATCH /plans/:id` `[coach]`

**Disparado por:** Botón "Guardar" en WorkoutPlanner

**Request:**
```json
{
  "nombre": "Plan Fuerza Base v2",
  "notas": "Actualizado con progresión de 12 semanas",
  "bloques": [
    {
      "id": "uuid-existente",
      "nombre": "Calentamiento",
      "tipo": "Cardio",
      "comentarios": "Activación articular 10 min",
      "orden": 0,
      "ejercicios": [
        {
          "id": "uuid-existente",
          "nombre": "Trote suave",
          "series": "1",
          "duracion": "10 min",
          "intensidad": "Baja",
          "orden": 0
        }
      ]
    },
    {
      "nombre": "Bloque Principal",
      "tipo": "Halterofilia",
      "comentarios": "",
      "orden": 1,
      "ejercicios": []
    }
  ]
}
```

**Response 200:** Plan completo actualizado

---

### 5.5 Eliminar plan
🔒 `DELETE /plans/:id` `[coach]`

**Disparado por:** Botón "Eliminar" (rojo) en Modal Confirmar Eliminación de Plan

**Response 204:** Sin cuerpo

**Errores:** `404` plan no encontrado · `403` no pertenece a este coach

---

### 5.6 Duplicar plan
🔒 `POST /plans/:id/duplicate` `[coach]`

**Disparado por:** Botón de acción "Copiar" en tarjeta de plan

**Response 201:**
```json
{
  "id": "uuid-nuevo",
  "nombre": "Plan Fuerza Base (Copia)",
  "categoria": "Halterofilia"
}
```

---

### 5.7 Asignar plan a atletas
🔒 `POST /plans/:id/assign` `[coach]`

**Disparado por:** Botón "Asignar" en AssignWorkoutModal

**Request:**
```json
{
  "atletaIds": ["uuid-juan", "uuid-maria"],
  "fechaInicio": "2026-05-25",
  "frecuencia": "weekly",
  "diasCustom": null,
  "notas": "Comenzar con cargas livianas"
}
```

**Response 201:**
```json
{
  "asignacionId": "uuid",
  "atletasAsignados": 2,
  "fechaInicio": "2026-05-25",
  "frecuencia": "weekly"
}
```

**Validación:** `frecuencia: "custom"` requiere `diasCustom: [0,2,4]` (0=Dom … 6=Sáb)

---

### 5.8 Ver atletas asignados a un plan
🔒 `GET /plans/:id/assignments` `[coach]`

**Disparado por:** Badge "N atletas" o botón "Atletas" en tarjeta de plan

**Response 200:**
```json
{
  "planId": "uuid",
  "planNombre": "Plan Fuerza Base",
  "asignaciones": [
    {
      "asignacionId": "uuid",
      "atleta": {
        "id": "uuid",
        "nombre": "Juan",
        "apellido": "Pérez",
        "avatarUrl": "https://cdn.athletica.app/avatars/uuid.jpg"
      },
      "fechaInicio": "2026-05-01",
      "frecuencia": "weekly"
    }
  ]
}
```

---

## 6. Categorías de Plan

### 6.1 Listar categorías
🔒 `GET /plan-categories` `[coach]`

**Response 200:**
```json
{
  "data": [
    { "id": "uuid", "nombre": "Halterofilia", "esPredeterminada": true },
    { "id": "uuid", "nombre": "Cardio", "esPredeterminada": true },
    { "id": "uuid", "nombre": "Mi categoría custom", "esPredeterminada": false }
  ]
}
```

---

### 6.2 Crear categoría de plan
🔒 `POST /plan-categories` `[coach]`

**Disparado por:** Input "Nueva categoría" en Modal Gestionar Categorías

**Request:**
```json
{ "nombre": "Rehabilitación" }
```

**Response 201:**
```json
{ "id": "uuid", "nombre": "Rehabilitación", "esPredeterminada": false }
```

**Errores:** `409` nombre de categoría ya existe

---

### 6.3 Eliminar categoría de plan
🔒 `DELETE /plan-categories/:id` `[coach]`

**Disparado por:** Botón 🗑 en Modal Gestionar Categorías → confirmación

**Response 204:** Sin cuerpo

**Errores:** `400` categoría predeterminada no eliminable · `409` categoría en uso por planes existentes

---

## 7. Bloques de Entrenamiento

### 7.1 Agregar bloque
🔒 `POST /plans/:id/blocks` `[coach]`

**Disparado por:** Botón "Agregar Bloque de Entrenamiento" en WorkoutPlanner

**Request:**
```json
{
  "nombre": "Bloque Principal",
  "tipo": "Halterofilia",
  "comentarios": "",
  "orden": 1
}
```

**Response 201:**
```json
{
  "id": "uuid",
  "nombre": "Bloque Principal",
  "tipo": "Halterofilia",
  "comentarios": "",
  "orden": 1,
  "ejercicios": []
}
```

---

### 7.2 Actualizar bloque
🔒 `PATCH /plans/:planId/blocks/:blockId` `[coach]`

**Request:**
```json
{
  "nombre": "Bloque Principal Actualizado",
  "tipo": "Otro",
  "comentarios": "Ajuste de técnica"
}
```

**Response 200:** Bloque actualizado

---

### 7.3 Eliminar bloque
🔒 `DELETE /plans/:planId/blocks/:blockId` `[coach]`

**Disparado por:** Botón 🗑 en cabecera del bloque en WorkoutPlanner

**Response 204:** Sin cuerpo

---

### 7.4 Reordenar bloques
🔒 `PATCH /plans/:id/blocks/reorder` `[coach]`

**Disparado por:** Drag & drop de bloque en WorkoutPlanner (al soltar)

**Request:**
```json
{
  "orden": ["uuid-bloque-3", "uuid-bloque-1", "uuid-bloque-2"]
}
```

**Response 200:**
```json
{ "message": "Bloques reordenados correctamente" }
```

---

## 8. Ejercicios (Biblioteca)

### 8.1 Listar ejercicios
🔒 `GET /exercises` `[coach]`

**Query params:** `?search=sentadilla&categoria=Halterofilia&page=1&limit=50`

**Disparado por:** Al cargar ExercisesLibrary

**Response 200:**
```json
{
  "data": [
    {
      "id": "uuid",
      "nombre": "Sentadilla trasera",
      "categoria": "Halterofilia",
      "videoUrl": "https://youtube.com/watch?v=...",
      "notas": "Cuidar la posición de la espalda",
      "esPredeterminado": true,
      "coachId": null
    },
    {
      "id": "uuid",
      "nombre": "Mi ejercicio custom",
      "categoria": "Cardio",
      "videoUrl": null,
      "notas": "",
      "esPredeterminado": false,
      "coachId": "uuid-coach"
    }
  ],
  "meta": { "total": 45, "page": 1, "limit": 50, "totalPages": 1 }
}
```

---

### 8.2 Crear ejercicio personalizado
🔒 `POST /exercises` `[coach]`

**Disparado por:** Botón "Crear Ejercicio" en CreateExerciseModal

**Request:**
```json
{
  "nombre": "Sentadilla búlgara con mancuernas",
  "categoria": "Halterofilia",
  "videoUrl": "https://youtube.com/watch?v=...",
  "notas": "Talón elevado, rodilla no supera la punta del pie"
}
```

**Response 201:**
```json
{
  "id": "uuid",
  "nombre": "Sentadilla búlgara con mancuernas",
  "categoria": "Halterofilia",
  "videoUrl": "https://youtube.com/watch?v=...",
  "notas": "Talón elevado, rodilla no supera la punta del pie",
  "esPredeterminado": false,
  "createdAt": "2026-05-20T14:00:00Z"
}
```

---

### 8.3 Actualizar ejercicio
🔒 `PATCH /exercises/:id` `[coach]`

**Disparado por:** Botón "Guardar Cambios" en CreateExerciseModal (modo edición)

**Request:**
```json
{
  "nombre": "Sentadilla búlgara",
  "categoria": "Halterofilia",
  "videoUrl": "https://youtube.com/watch?v=nuevo",
  "notas": "Actualizado"
}
```

**Response 200:** Ejercicio actualizado

**Errores:** `403` ejercicio predeterminado no editable · `403` no pertenece a este coach

---

### 8.4 Eliminar ejercicio
🔒 `DELETE /exercises/:id` `[coach]`

**Disparado por:** Botón "Eliminar" (rojo) en confirmación de ExercisesLibrary

**Response 204:** Sin cuerpo

**Errores:** `403` ejercicio predeterminado no eliminable

---

## 9. Categorías de Ejercicio

### 9.1 Listar categorías
🔒 `GET /exercise-categories` `[coach]`

**Response 200:**
```json
{
  "data": [
    { "id": "uuid", "nombre": "Cardio", "esPredeterminada": true },
    { "id": "uuid", "nombre": "Halterofilia", "esPredeterminada": true },
    { "id": "uuid", "nombre": "Flexibilidad", "esPredeterminada": true },
    { "id": "uuid", "nombre": "Deporte Específico", "esPredeterminada": true },
    { "id": "uuid", "nombre": "Recuperación", "esPredeterminada": true },
    { "id": "uuid", "nombre": "Otro", "esPredeterminada": true },
    { "id": "uuid", "nombre": "Pliometría", "esPredeterminada": false }
  ]
}
```

---

### 9.2 Crear categoría de ejercicio
🔒 `POST /exercise-categories` `[coach]`

**Disparado por:** Input "Nueva categoría" en CreateExerciseModal o ExercisesLibrary

**Request:**
```json
{ "nombre": "Pliometría" }
```

**Response 201:**
```json
{ "id": "uuid", "nombre": "Pliometría", "esPredeterminada": false }
```

---

### 9.3 Eliminar categoría de ejercicio
🔒 `DELETE /exercise-categories/:id` `[coach]`

**Response 204:** Sin cuerpo

**Errores:** `400` categoría predeterminada no eliminable

---

## 10. Archivos Adjuntos a Planes

### 10.1 Adjuntar archivo
🔒 `POST /plans/:id/files` `[coach]` · `multipart/form-data`

**Disparado por:** Botón "Adjuntar archivo" o "Guardar" en DrawingBoard (WorkoutPlanner)

**Request:** `file` (imagen/PDF/PNG de dibujo, máx 20 MB) + `tipo: "file" | "drawing"`

**Response 201:**
```json
{
  "id": "uuid",
  "nombre": "tabla_progresion.pdf",
  "url": "https://cdn.athletica.app/files/uuid.pdf",
  "tipo": "file",
  "mimeType": "application/pdf",
  "createdAt": "2026-05-20T14:00:00Z"
}
```

---

### 10.2 Eliminar archivo adjunto
🔒 `DELETE /plans/:planId/files/:fileId` `[coach]`

**Disparado por:** Botón "×" en archivo adjunto en WorkoutPlanner

**Response 204:** Sin cuerpo

---

## 11. Sesiones de Entrenamiento

### 11.1 Listar sesiones
🔒 `GET /sessions` `[any]`

**Query params:** `?atletaId=uuid&desde=2026-05-01&hasta=2026-05-31&estado=completada&page=1&limit=30`

**Disparado por:** Al cargar AthleteCalendar, AthletePlan, CoachCalendar

**Response 200:**
```json
{
  "data": [
    {
      "id": "uuid",
      "nombre": "Plan Fuerza Base — Semana 1",
      "categoria": "Halterofilia",
      "estado": "completada",
      "inicio": "2026-05-15T09:00:00Z",
      "fin": "2026-05-15T10:15:00Z",
      "duracionSeg": 4500,
      "calorias": 380,
      "fcPromedio": 138,
      "rpe": { "valor": 7, "comentario": "Bien, pero el último set fue duro" },
      "atletaId": "uuid",
      "atletaNombre": "Juan Pérez",
      "asignacionId": "uuid"
    }
  ],
  "meta": { "total": 24, "page": 1, "limit": 30, "totalPages": 1 }
}
```

---

### 11.2 Obtener sesión
🔒 `GET /sessions/:id` `[any]`

**Disparado por:** Al abrir WorkoutDetailsModal

**Response 200:** Objeto sesión completo con `etapas` (bloques y ejercicios del plan al momento de ejecutar), métricas y RPE.

---

### 11.3 Iniciar sesión
🔒 `POST /sessions/start` `[athlete]`

**Disparado por:** Botón "Iniciar entrenamiento" en WorkoutDetailsModal o AthletePlan

**Request:**
```json
{
  "asignacionId": "uuid",
  "planId": "uuid"
}
```

**Response 201:**
```json
{
  "sessionId": "uuid",
  "nombre": "Plan Fuerza Base — Sesión 3",
  "estado": "en_curso",
  "inicio": "2026-05-20T14:30:00Z",
  "etapas": [
    {
      "bloqueId": "uuid",
      "nombre": "Calentamiento",
      "tipo": "Cardio",
      "ejercicios": [
        {
          "ejercicioEnBloqueId": "uuid",
          "nombre": "Trote suave",
          "series": "1",
          "duracion": "10 min",
          "completado": false
        }
      ]
    }
  ]
}
```

---

### 11.4 Finalizar sesión
🔒 `POST /sessions/:id/finish` `[athlete]`

**Disparado por:** Confirmación "Confirmar" en modal de finalización dentro de WorkoutScreen

**Request:**
```json
{
  "fin": "2026-05-20T15:30:00Z",
  "duracionSeg": 3600,
  "calorias": 420,
  "fcPromedio": 142,
  "fcMaxima": 168,
  "distanciaKm": null,
  "etapasCompletadas": [
    { "ejercicioEnBloqueId": "uuid", "completado": true }
  ]
}
```

**Response 200:**
```json
{
  "sessionId": "uuid",
  "estado": "completada",
  "resumen": {
    "duracionMinutos": 60,
    "calorias": 420,
    "fcPromedio": 142
  }
}
```

---

### 11.5 Descartar sesión
🔒 `POST /sessions/:id/discard` `[athlete]`

**Disparado por:** Confirmación "Descartar" en WorkoutScreen

**Response 200:**
```json
{ "sessionId": "uuid", "estado": "descartada" }
```

---

### 11.6 Crear sesión manual
🔒 `POST /sessions` `[athlete]`

**Disparado por:** Botón "Agregar al calendario" en AddWorkoutModal

**Request:**
```json
{
  "nombre": "Entrenamiento libre",
  "categoria": "Cardio",
  "inicio": "2026-05-25T08:00:00Z",
  "duracionSeg": 3600,
  "notas": "Trote en el parque"
}
```

**Response 201:** Objeto sesión con estado `programada`

---

## 12. RPE (Esfuerzo Percibido)

### 12.1 Registrar RPE
🔒 `POST /sessions/:id/rpe` `[athlete]`

**Disparado por:** Botón "Guardar puntuación" en RPEModal

**Request:**
```json
{
  "valor": 7,
  "comentario": "Bien, pero el último set fue duro"
}
```

**Response 201:**
```json
{
  "id": "uuid",
  "sessionId": "uuid",
  "valor": 7,
  "comentario": "Bien, pero el último set fue duro",
  "createdAt": "2026-05-20T15:35:00Z"
}
```

**Errores:** `400` valor fuera de rango 1–10 · `409` la sesión ya tiene RPE registrado

---

## 13. Pagos

### 13.1 Listar pagos
🔒 `GET /payments` `[any]`

**Query params:** `?estado=pendiente&page=1&limit=20`
- Coach: ve todos sus pagos recibidos
- Atleta: ve solo sus propios pagos

**Disparado por:** CoachHome (banner pagos pendientes), CoachAthletes > Historial Pagos, AthleteHome (banners de estado)

**Response 200:**
```json
{
  "data": [
    {
      "id": "uuid",
      "monto": 50000,
      "estado": "pendiente",
      "comprobante": {
        "url": "https://cdn.athletica.app/payments/uuid.jpg",
        "nombre": "comprobante_mayo.jpg"
      },
      "enviadoEn": "2026-05-18T10:00:00Z",
      "revisadoEn": null,
      "notaRechazo": null,
      "atleta": {
        "id": "uuid",
        "nombre": "Juan",
        "apellido": "Pérez",
        "avatarUrl": "https://cdn.athletica.app/avatars/uuid.jpg"
      },
      "suscripcion": {
        "planNombre": "Plan Mensual",
        "periodo": "Mayo 2026"
      }
    }
  ],
  "meta": { "total": 3, "page": 1, "limit": 20, "totalPages": 1 }
}
```

---

### 13.2 Subir comprobante de pago
🔒 `POST /payments/upload` `[athlete]` · `multipart/form-data`

**Disparado por:** Botón "Enviar comprobante" en PaymentModal

**Request:** `file` (imagen JPG/PNG/PDF, máx 10 MB) + `monto: number` + `metodoPago: string`

**Response 201:**
```json
{
  "id": "uuid",
  "monto": 50000,
  "estado": "pendiente",
  "comprobante": {
    "url": "https://cdn.athletica.app/payments/uuid.jpg",
    "nombre": "comprobante.jpg"
  },
  "enviadoEn": "2026-05-20T14:00:00Z"
}
```

---

### 13.3 Aprobar pago
🔒 `PATCH /payments/:id/approve` `[coach]`

**Disparado por:** Botón "Aprobar" en CoachPaymentApprovalModal

**Response 200:**
```json
{
  "id": "uuid",
  "estado": "aprobado",
  "revisadoEn": "2026-05-20T15:00:00Z"
}
```

---

### 13.4 Rechazar pago
🔒 `PATCH /payments/:id/reject` `[coach]`

**Disparado por:** Botón "Rechazar" en CoachPaymentApprovalModal

**Request:**
```json
{
  "notaRechazo": "El comprobante no corresponde al monto acordado"
}
```

**Response 200:**
```json
{
  "id": "uuid",
  "estado": "rechazado",
  "notaRechazo": "El comprobante no corresponde al monto acordado",
  "revisadoEn": "2026-05-20T15:05:00Z"
}
```

---

## 14. Comunidad

### 14.1 Listar publicaciones
🔒 `GET /posts` `[any]`

**Query params:** `?page=1&limit=10`
- Coach: ve sus propias publicaciones
- Atleta: ve publicaciones de su coach

**Response 200:**
```json
{
  "data": [
    {
      "id": "uuid",
      "contenido": "¡Gran semana de entrenamientos! Recuerden descansar bien.",
      "imagenUrl": "https://cdn.athletica.app/posts/uuid.jpg",
      "totalLikes": 8,
      "meGusta": true,
      "totalComentarios": 3,
      "coach": {
        "id": "uuid",
        "nombreNegocio": "Carlos Training",
        "logoUrl": "https://cdn.athletica.app/logos/uuid.jpg"
      },
      "createdAt": "2026-05-19T18:00:00Z"
    }
  ],
  "meta": { "total": 24, "page": 1, "limit": 10, "totalPages": 3 }
}
```

---

### 14.2 Crear publicación
🔒 `POST /posts` `[coach]` · `multipart/form-data`

**Disparado por:** Botón "Publicar" en Modal Nueva Publicación

**Request:** `contenido: string` + `imagen?: File` (opcional, máx 8 MB)

**Response 201:**
```json
{
  "id": "uuid",
  "contenido": "¡Nuevo plan disponible!",
  "imagenUrl": "https://cdn.athletica.app/posts/uuid.jpg",
  "createdAt": "2026-05-20T14:00:00Z"
}
```

---

### 14.3 Eliminar publicación
🔒 `DELETE /posts/:id` `[coach]`

**Response 204:** Sin cuerpo

---

### 14.4 Toggle like
🔒 `POST /posts/:id/like` `[any]`

**Disparado por:** Botón ❤ en publicación

**Response 200:**
```json
{
  "postId": "uuid",
  "meGusta": true,
  "totalLikes": 9
}
```

---

### 14.5 Comentar publicación
🔒 `POST /posts/:id/comments` `[any]`

**Request:**
```json
{ "contenido": "¡Excelente semana profe!" }
```

**Response 201:**
```json
{
  "id": "uuid",
  "contenido": "¡Excelente semana profe!",
  "usuario": {
    "id": "uuid",
    "nombre": "Juan",
    "avatarUrl": "https://cdn.athletica.app/avatars/uuid.jpg"
  },
  "createdAt": "2026-05-20T14:30:00Z"
}
```

---

## 15. Chat (Mensajería)

### 15.1 Obtener historial de mensajes
🔒 `GET /messages` `[any]`

**Query params:** `?conversacionConId=uuid&page=1&limit=50`

**Disparado por:** Al abrir Chat con Atleta (coach) o Chat con Coach (atleta)

**Response 200:**
```json
{
  "data": [
    {
      "id": "uuid",
      "contenido": "¿Cómo te fue con el entrenamiento de hoy?",
      "adjuntoUrl": null,
      "leido": true,
      "remitente": {
        "id": "uuid",
        "nombre": "Carlos",
        "avatarUrl": "https://cdn.athletica.app/avatars/uuid.jpg"
      },
      "createdAt": "2026-05-20T11:00:00Z"
    },
    {
      "id": "uuid",
      "contenido": "¡Muy bien! El último set fue exigente.",
      "adjuntoUrl": "https://cdn.athletica.app/chat/uuid.jpg",
      "leido": true,
      "remitente": {
        "id": "uuid",
        "nombre": "Juan",
        "avatarUrl": "https://cdn.athletica.app/avatars/uuid.jpg"
      },
      "createdAt": "2026-05-20T11:05:00Z"
    }
  ],
  "meta": { "total": 120, "page": 1, "limit": 50, "totalPages": 3 }
}
```

---

### 15.2 Enviar mensaje (HTTP fallback)
🔒 `POST /messages` `[any]` · `multipart/form-data`

**Nota:** En producción, enviar mensajes se hace vía WebSocket. Este endpoint es un fallback para adjuntos grandes.

**Request:** `destinatarioId: string` + `contenido?: string` + `adjunto?: File` (máx 15 MB)

**Response 201:**
```json
{
  "id": "uuid",
  "contenido": "Aquí la foto del ejercicio",
  "adjuntoUrl": "https://cdn.athletica.app/chat/uuid.jpg",
  "leido": false,
  "createdAt": "2026-05-20T14:00:00Z"
}
```

---

### 15.3 Marcar mensajes como leídos
🔒 `PATCH /messages/read` `[any]`

**Disparado por:** Al abrir la conversación de chat

**Request:**
```json
{ "conversacionConId": "uuid" }
```

**Response 200:**
```json
{ "mensajesActualizados": 5 }
```

---

## 16. Suscripciones del Atleta

### 16.1 Suscripción actual
🔒 `GET /subscriptions/me` `[athlete]`

**Disparado por:** Sub-página AthleteSubscriptionPlan

**Response 200:**
```json
{
  "id": "uuid",
  "estado": "activa",
  "fechaInicio": "2026-05-01",
  "fechaRenovacion": "2026-06-01",
  "plan": {
    "id": "uuid",
    "nombre": "Plan Mensual",
    "descripcion": "4 sesiones semanales + seguimiento personalizado",
    "frecuencia": "mensual",
    "sesionesIncluidas": 16,
    "precio": 50000
  },
  "coach": {
    "id": "uuid",
    "nombreNegocio": "Carlos Training",
    "datosBancarios": {
      "banco": "Banco Chile",
      "numeroCuenta": "123456789",
      "titular": "Carlos Martínez",
      "rut": "12.345.678-9",
      "email": "pagos@carlostraining.cl"
    }
  }
}
```

---

### 16.2 Suscribirse a un plan
🔒 `POST /subscriptions` `[athlete]`

**Request:**
```json
{ "planCoachAtletaId": "uuid" }
```

**Response 201:** Objeto suscripción con estado `activa`

---

### 16.3 Cancelar suscripción
🔒 `DELETE /subscriptions/me` `[athlete]`

**Response 200:**
```json
{ "estado": "cancelada", "fechaFin": "2026-06-01" }
```

---

## 17. Planes que ofrece el Coach

### 17.1 Listar planes del coach
🔒 `GET /coach-plans` `[coach]`

**Response 200:**
```json
{
  "data": [
    {
      "id": "uuid",
      "nombre": "Plan Mensual",
      "descripcion": "4 sesiones semanales + seguimiento",
      "frecuencia": "mensual",
      "sesionesIncluidas": 16,
      "precio": 50000,
      "activo": true,
      "deporte": "Crossfit"
    }
  ]
}
```

---

### 17.2 Crear plan de suscripción
🔒 `POST /coach-plans` `[coach]`

**Disparado por:** Botón "Agregar plan" en Registro Coach Paso 4

**Request:**
```json
{
  "nombre": "Plan Mensual",
  "descripcion": "4 sesiones semanales",
  "frecuencia": "mensual",
  "sesionesIncluidas": 16,
  "deporteId": "uuid",
  "precio": 50000
}
```

**Response 201:** Objeto plan creado

---

### 17.3 Actualizar plan de suscripción
🔒 `PATCH /coach-plans/:id` `[coach]`

**Request:** Campos opcionales del plan a actualizar

**Response 200:** Objeto plan actualizado

---

### 17.4 Eliminar plan de suscripción
🔒 `DELETE /coach-plans/:id` `[coach]`

**Response 204:** Sin cuerpo

**Errores:** `409` plan tiene atletas activos suscritos

---

## 18. Notificaciones

### 18.1 Listar notificaciones
🔒 `GET /notifications` `[any]`

**Query params:** `?leida=false&page=1&limit=20`

**Response 200:**
```json
{
  "data": [
    {
      "id": "uuid",
      "tipo": "pago_recibido",
      "titulo": "Nuevo comprobante de pago",
      "cuerpo": "Juan Pérez ha enviado un comprobante por $50.000",
      "data": { "pagoId": "uuid", "atletaId": "uuid" },
      "leida": false,
      "createdAt": "2026-05-20T10:00:00Z"
    }
  ],
  "meta": { "total": 5, "page": 1, "limit": 20, "totalPages": 1 }
}
```

---

### 18.2 Marcar notificación como leída
🔒 `PATCH /notifications/:id/read` `[any]`

**Response 200:**
```json
{ "id": "uuid", "leida": true }
```

---

### 18.3 Marcar todas como leídas
🔒 `PATCH /notifications/read-all` `[any]`

**Response 200:**
```json
{ "actualizadas": 5 }
```

---

## 19. Wearables

### 19.1 Listar dispositivos conectados
🔒 `GET /wearables` `[athlete]`

**Disparado por:** Sub-página AthleteWearables

**Response 200:**
```json
{
  "data": [
    {
      "id": "uuid",
      "dispositivo": "apple_watch",
      "activo": true,
      "conectadoEn": "2026-03-01T00:00:00Z"
    }
  ]
}
```

---

### 19.2 Conectar dispositivo
🔒 `POST /wearables/connect` `[athlete]`

**Disparado por:** Botón "Conectar" en AthleteWearables (después del flujo OAuth)

**Request:**
```json
{
  "dispositivo": "apple_watch",
  "tokenAcceso": "oauth_token_del_dispositivo"
}
```

**Response 201:**
```json
{
  "id": "uuid",
  "dispositivo": "apple_watch",
  "activo": true,
  "conectadoEn": "2026-05-20T14:00:00Z"
}
```

---

### 19.3 Desconectar dispositivo
🔒 `DELETE /wearables/:id` `[athlete]`

**Disparado por:** Botón "Desconectar" → confirmación en AthleteWearables

**Response 200:**
```json
{ "id": "uuid", "activo": false }
```

---

## 20. Planes de Athletica (Suscripción del Coach)

### 20.1 Listar planes de Athletica
🔓 `GET /athletica-plans`

**Disparado por:** Pantalla Registro Coach Paso 3 / CoachSettings > Suscripción

**Response 200:**
```json
{
  "data": [
    { "id": "uuid", "nombre": "Free", "maxAtletas": 3, "precioMensual": 0 },
    { "id": "uuid", "nombre": "Starter", "maxAtletas": 10, "precioMensual": 9900 },
    { "id": "uuid", "nombre": "Pro", "maxAtletas": 25, "precioMensual": 19900 },
    { "id": "uuid", "nombre": "Max", "maxAtletas": 100, "precioMensual": 39900 },
    { "id": "uuid", "nombre": "Enterprise", "maxAtletas": null, "precioMensual": null, "esEnterprise": true }
  ]
}
```

---

## 21. WebSocket

**URL de conexión:** `wss://api.athletica.app/socket`

**Autenticación:** `{ auth: { token: "<accessToken>" } }`

### Eventos del cliente → servidor

| Evento | Payload | Descripción |
|--------|---------|-------------|
| `joinConversation` | `{ conversacionConId: string }` | Entrar a la sala de chat con otro usuario |
| `leaveConversation` | `{ conversacionConId: string }` | Salir de la sala de chat |
| `sendMessage` | `{ destinatarioId: string, contenido: string }` | Enviar mensaje de texto |
| `typing` | `{ destinatarioId: string, isTyping: boolean }` | Indicar que está escribiendo |

### Eventos del servidor → cliente

| Evento | Payload | Descripción |
|--------|---------|-------------|
| `newMessage` | `{ id, contenido, adjuntoUrl, remitente, createdAt }` | Nuevo mensaje recibido |
| `userTyping` | `{ userId: string, isTyping: boolean }` | El otro usuario está escribiendo |
| `notification` | `{ id, tipo, titulo, cuerpo, data, createdAt }` | Notificación push en tiempo real |
| `paymentUpdated` | `{ pagoId: string, estado: "aprobado" \| "rechazado", notaRechazo?: string }` | Actualización de estado de pago |

### Tipos de notificación (`notification.tipo`)

| Tipo | Quién lo recibe | Disparado cuando |
|------|----------------|-----------------|
| `nuevo_mensaje` | Cualquiera | Se recibe un mensaje de chat |
| `pago_recibido` | Coach | Un atleta sube un comprobante |
| `pago_aprobado` | Atleta | El coach aprueba su pago |
| `pago_rechazado` | Atleta | El coach rechaza su pago |
| `workout_asignado` | Atleta | El coach le asigna un nuevo plan |
| `sesion_proxima` | Atleta | Recordatorio de sesión programada (24h antes) |

---

*Documentación generada para el proyecto Athletica · Mayo 2026*
