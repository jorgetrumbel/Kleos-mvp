# Athletica — Inventario de Pantallas y Modales

## Índice

1. [Pantallas de Autenticación](#1-pantallas-de-autenticación)
2. [Vista Coach](#2-vista-coach)
3. [Vista Atleta](#3-vista-atleta)
4. [Modales Globales](#4-modales-globales)
5. [Tabla Resumen](#5-tabla-resumen)

---

## 1. Pantallas de Autenticación

### 1.1 Login
**Archivo:** `src/app/components/Login.tsx`
**Acceso:** Pantalla inicial de la app

**Contenido:**
- Logo / nombre de la app
- Campo: Email
- Campo: Contraseña
- Botón: "Iniciar sesión"
- Link: "¿No tienes cuenta? Regístrate"

**Credenciales de demo:**
- Coach: `coach@coach` / `1234`
- Atleta: `athlete@athlete` / `1234`

**Acciones:**
- Login exitoso → navega a CoachView o AthleteView según rol
- Clic en registro → navega a CreateAccount

---

### 1.2 Registro (Flujo Coach — 5 pasos)
**Archivo:** `src/app/components/CreateAccount.tsx`

#### Paso 1 — Información Básica
- Selector de rol (Coach / Atleta)
- Nombre, Apellido, Fecha de nacimiento
- Email, Contraseña
- Botón: "Siguiente"

#### Paso 2 — Perfil Profesional
- Upload de avatar y logo
- Nombre del negocio / nombre público
- Frase de presentación
- Años de experiencia
- Ciudad
- Deportes que entrena (multi-selección de lista predefinida)
- Redes sociales (Instagram, Strava, etc.)

#### Paso 3 — Selección de Suscripción
- Tarjetas con 5 planes: Free, Starter, Pro, Max, Enterprise
- Cada tarjeta muestra: nombre, rango de atletas, precio
- Resaltado visual del plan recomendado (Pro)

#### Paso 4 — Crear Planes para Atletas
- Formulario para crear planes de suscripción propios
- Campos: nombre, descripción, frecuencia (semanal/mensual), sesiones, deporte, precio
- Botón: "Agregar plan"
- Lista de planes creados
- Botón: "Siguiente" (omitir si no quiere crear ahora)

#### Paso 5 — Código de Vinculación
- Código generado automáticamente (ej: `CARL-2026-FZQX`)
- Campo editable para personalizar código
- Botón: "Copiar código"
- Botón: "Compartir"
- Instrucciones de cómo el atleta lo usa
- Botón: "Ir a mi app"

---

### 1.3 Registro (Flujo Atleta — 3 pasos)

#### Paso 1 — Información Básica
- Selector de rol (Coach / Atleta)
- Nombre, Apellido, Fecha de nacimiento
- Email, Contraseña

#### Paso 2 — Perfil Físico y Deportivo
- Upload de avatar
- Talla (cm), Peso (kg)
- Aptitud física (slider 1–10)
- Objetivo principal (desplegable)
- Logros deportivos (textarea)
- Estilo de vida (dropdown)

#### Paso 3 — Vincular con Coach
- Campo de texto: ingresar código del coach
- Botón: "Buscar coach"
- Estado: Buscando... / Coach encontrado (muestra card con nombre y especialidad) / Error
- Botón: "Vincularme con este coach"
- Link: "Omitir por ahora"

---

## 2. Vista Coach

### 2.1 Tab: Inicio (CoachHome)
**Archivo:** `src/app/components/coach/CoachHome.tsx`

**Contenido:**
- Saludo personalizado con nombre del coach
- **Banner de mensajes pendientes** (si existen): badge con cantidad de atletas sin respuesta + botón para abrir panel
- **Banner de pagos pendientes** (si existen): badge con cantidad + botón para revisar
- **Cards de métricas de negocio (fila superior):**
  - Ingresos del mes actual (con flecha de variación vs mes anterior)
  - Ingresos proyectados del mes
- **Cards de métricas de negocio (fila inferior):**
  - Atletas activos con barra de capacidad (activos / máximo del plan)
  - Tasa de completitud mensual de entrenamientos (%)
- **Gráfico de ingresos** (`AreaChart` con gradiente): últimos 5 meses, con tooltip personalizado
- **Gráfico de completitud semanal** (`BarChart`): últimas 4 semanas, barras coloreadas por umbral (verde ≥ 80%, ámbar ≥ 60%, rojo < 60%)
- **Próximas sesiones grupales:** lista de 3 sesiones con tipo, fecha/hora y avatar de iniciales

**Modales / Paneles:**
- `CoachPaymentApprovalModal` — abierto desde el banner de pagos pendientes
- `MessagesPanel` (slide-up interno) — lista de atletas con mensajes pendientes, abierto desde el banner de mensajes

---

### 2.2 Tab: Atletas (CoachAthletes)
**Archivo:** `src/app/components/coach/CoachAthletes.tsx`

**Vista principal (lista):**
- Barra de búsqueda (filtra por nombre)
- Grid estadístico: Total atletas / Activos hoy
- Lista de tarjetas de atleta, cada una con:
  - Avatar (inicial) + nombre + badge de estado (Activo / En revisión / Deuda)
  - Sesiones completadas + Última sesión + Porcentaje de progreso
  - Barra de 4 acciones rápidas: Chat | Pago | Plan | Métricas
  - Botón: "Ver perfil"
  - Indicador rojo si tiene pago vencido
  - Botón ámbar si tiene comprobante pendiente de aprobación

**Sub-vistas (accedidas desde las acciones rápidas):**

#### 2.2.1 Chat con Atleta
- Header: Avatar + nombre + badge de estado + botón volver
- Historial de mensajes (burbujas coach/atleta)
- Input de mensaje + botones de adjuntar imagen/archivo + botón enviar

#### 2.2.2 Historial de Pagos del Atleta
**Archivo:** `src/app/components/coach/AthletePaymentHistory.tsx`
- Header: Avatar + nombre + botón volver
- Grid: Deuda total / Pagado / Pendiente
- Lista de pagos con: fecha, monto, estado (badge), botón "Revisar" si pendiente
- Botón flotante: "Aprobar pago pendiente" → abre `CoachPaymentApprovalModal`

#### 2.2.3 Plan del Atleta (vista desde Coach)
**Archivo:** `src/app/components/coach/AthleteCalendarPlan.tsx`
- Header: nombre del atleta + botón volver
- Vista de calendario mensual con navegación de meses
- Indicadores por día: completado / sin puntuar / programado
- Lista de sesiones del día seleccionado
- **Botón flotante "+"** → abre `CoachAddWorkoutModal`

**Modal:** `CoachAddWorkoutModal` con dos pestañas:
- **Biblioteca** (default): búsqueda de planes, filtros por categoría, tarjetas de plan con badges de tipos de bloque y conteo de ejercicios; al seleccionar un plan se muestran opciones de fecha y frecuencia (Una vez / Diario / Semanal); botón "Asignar plan"
- **Manual**: grid de 10 deportes para agregar sesión rápida con fecha; botón "Agregar"

#### 2.2.4 Métricas del Atleta
**Archivo:** `src/app/components/coach/AthleteMetrics.tsx`
- Header: Avatar + nombre + botón volver
- Selector de período (semana / mes / 3 meses)
- Gráfico de RPE histórico por sesión
- Gráfico de frecuencia cardíaca promedio
- Gráfico de progreso general
- Grid de estadísticas: Sesiones, Tiempo total, RPE promedio, FC promedio

#### 2.2.5 Perfil Completo del Atleta
**Archivo:** `src/app/components/coach/AthleteProfile.tsx`
- Header con avatar grande + nombre + badge de estado
- Datos personales: email, teléfono, ciudad, fecha de ingreso
- Objetivo deportivo
- Bio / descripción
- Historial de sesiones recientes
- Botón: "Enviar mensaje"

---

### 2.3 Tab: Comunidad (CoachCommunity)
**Archivo:** `src/app/components/coach/CoachCommunity.tsx`

**Contenido:**
- Header: "Comunidad" + botón "Nueva publicación"
- Feed de posts del coach, cada uno con:
  - Fecha de publicación
  - Contenido de texto (+ imagen opcional)
  - Botones: Me gusta (con contador), Comentar (con contador), Compartir

**Modal — Nueva Publicación (bottom sheet):**
- Textarea para contenido del post
- Botón de adjuntar imagen
- Botón: "Publicar"

---

### 2.4 Tab: Calendario (CoachCalendar)
**Archivo:** `src/app/components/coach/CoachCalendar.tsx`

**Contenido:**
- Header: Mes y año actual + flechas de navegación (vista mensual única, sin toggle)
- Grid del calendario mensual:
  - Cabeceras de días de la semana (L M M J V S D)
  - Celdas de días seleccionables; día actual seleccionado por defecto
  - Indicadores de eventos (puntos bajo el número de día):
    - `bg-primary` (azul): sesión individual de atleta programada
    - `bg-purple-400` (púrpura): sesión grupal creada por el coach
  - Clic en el mismo día seleccionado lo deselecciona
- **Sección inferior — actividades del día seleccionado:**
  - Lista de sesiones individuales de atletas
  - **`GroupSessionCard`** expandible para cada sesión grupal:
    - Título, tipo, hora, lugar (si aplica)
    - Spots disponibles (participantes / máximo)
    - Badges de planes con acceso (o "Todos los planes")
- **Botón flotante "+"** (púrpura) → abre `CreateGroupSessionModal`

**Modales:**
- `CreateGroupSessionModal` — crear nueva sesión grupal con fecha, tipo, lugar, cupo y control de acceso por plan

---

### 2.5 Tab: Planificación (CoachPlan)
**Archivo:** `src/app/components/coach/CoachPlan.tsx`

El tab de planificación tiene 3 sub-vistas navegadas mediante estado:

#### 2.5.1 Biblioteca de Planes (PlanLibrary)
**Archivo:** `src/app/components/coach/plan/PlanLibrary.tsx`

**Contenido:**
- Header: "Planificación" + botón "Ejercicios" + botón "Nuevo"
- Grid de estadísticas: Planes totales / Bloques totales / Categorías
- Barra de búsqueda
- Filtro de categoría (dropdown) + botón de gestionar categorías
- Lista de planes agrupados por categoría:
  - Cada plan muestra: nombre, notas, tipo (Individual/Grupo), número de bloques, fecha, tipos de bloque
  - Badge de atletas asignados (si aplica)
  - Barra de acciones: Asignar | Atletas | Editar | Copiar | Eliminar

**Modales:**
- **Nuevo Plan** (bottom sheet): selección de tipo + categoría + opción de nueva categoría → Crear
- **Asignar Workout** (`AssignWorkoutModal`): seleccionar atletas, fecha inicio, frecuencia, notas
- **Ver atletas asignados** (bottom sheet): lista de atletas con detalles de asignación
- **Eliminar plan** (confirmación): botones Cancelar / Eliminar
- **Gestionar Categorías** (bottom sheet): agregar nueva categoría, ver/eliminar categorías existentes
- **Eliminar Categoría** (confirmación)

#### 2.5.2 Editor de Planes (WorkoutPlanner)
**Archivo:** `src/app/components/coach/plan/WorkoutPlanner.tsx`

**Contenido:**
- Header: Input nombre del plan + botón "Guardar" + badge de tipo + categoría
- Sección colapsable: "Notas del plan" (textarea)
- Sección colapsable: "Archivos adjuntos" (upload + pizarra)
- Lista de bloques de entrenamiento (drag & drop para reordenar)
- Botón: "Agregar Bloque de Entrenamiento"
- Leyenda de tipos de bloque (cuando no hay bloques)

**Sub-componente — Bloque de Entrenamiento (`WorkoutBlock`):**
- Handle de arrastre (drag & drop)
- Input del nombre del bloque
- Selector de tipo de bloque (Cardio, Halterofilia, etc.)
- Botón de colapsar/expandir
- Botón de eliminar bloque
- Lista de ejercicios del bloque (`ExerciseRow`)
- Botón: "Agregar Ejercicio" (ejercicio en blanco)
- Botón: "Crear Ejercicio" (abre `CreateExerciseModal`)
- Toggle de comentarios del bloque

**Sub-componente — Fila de Ejercicio (`ExerciseRow`):**
- Input de nombre del ejercicio
- Campos dinámicos según tipo de bloque: series, repeticiones, duración, intensidad
- Input de notas
- Botón de eliminar ejercicio

**Modales:**
- `CreateExerciseModal`: crear ejercicio personalizado
- `DrawingBoard`: pizarra de dibujo para adjuntar como archivo

#### 2.5.3 Biblioteca de Ejercicios (ExercisesLibrary)
**Archivo:** `src/app/components/coach/plan/ExercisesLibrary.tsx`

**Contenido:**
- Header: "Biblioteca de Ejercicios" + contadores + botón "Nuevo"
- Barra de búsqueda
- Filtros por categoría (chips horizontales con scroll)
- Lista de ejercicios:
  - Ejercicios predeterminados del sistema (por tipo de bloque)
  - Ejercicios personalizados del coach (badge "Personalizado")
  - Indicadores de video y notas si existen
- Acciones en ejercicios personalizados: Editar | Eliminar

**Modales:**
- **Ver ejercicio** (bottom sheet): nombre, categoría (badge de color), video URL, notas
- `CreateExerciseModal`: crear/editar ejercicio personalizado
- **Eliminar ejercicio** (confirmación)

---

### 2.6 Panel: Configuración del Coach (CoachSettings)
**Archivo:** `src/app/components/coach/CoachSettings.tsx`
**Acceso:** Botón de ajustes en la esquina superior derecha de CoachView

**Contenido (página principal):**
- Tarjeta de perfil: avatar, nombre, email
- **Sección Cuenta:** Editar perfil
- **Sección Coach:** Configuración de coach, Suscripción y facturación
- **Sección Preferencias:** Toggle Notificaciones, Toggle Modo oscuro
- **Sección Soporte:** Ayuda y soporte
- Versión de la app
- Botón: "Cerrar sesión" (rojo)

**Sub-páginas (navegadas via estado `subPage`):**

#### Editar Perfil (`EditProfilePage`)
- `AvatarPicker`: cámara + selector de archivo
- Tarjeta de información personal: nombre, apellido, email, teléfono, ciudad, fecha de nacimiento
- Tarjeta de información del negocio: nombre del negocio, frase de presentación, años de experiencia, chips de deportes (multi-selección)
- Tarjeta de redes sociales: Instagram, Strava, YouTube, Twitter (inputs inline)
- Tarjeta de cambio de contraseña: contraseña actual, nueva, confirmación

#### Configuración de Coach (`CoachConfigPage`)
- Lista de planes de suscripción de atletas (CRUD)
- Cada plan muestra: nombre, frecuencia, precio, deportes, botón eliminar
- Botón: "Nuevo plan" → abre `PlanFormModal` (inline)
- `PlanFormModal`: nombre, descripción, frecuencia (semanal/mensual), sesiones, precio, chips de deporte

#### Suscripción a Athletica (`SubscriptionPage`)
- Banner del plan actual con badge "Tu plan"
- Listado de 5 planes (Free / Starter / Pro / Max / Enterprise) con radio button de selección
- Cada tarjeta: nombre, rango de atletas, precio/mes, features principales
- Sección de facturación: método de pago, próxima factura

#### Acerca de / Soporte (`AboutPage`)
- Ícono y nombre de la app + versión
- Tarjeta de contacto: email, teléfono, chat en vivo
- Tarjeta de recursos: documentación, centro de ayuda
- Redes sociales del producto
- Links legales: términos de servicio, política de privacidad

---

## 3. Vista Atleta

### 3.1 Tab: Inicio (AthleteHome)
**Archivo:** `src/app/components/athlete/AthleteHome.tsx`

**Contenido:**
- Saludo personalizado con nombre + emoji
- **Alerta de entrenamiento activo** (si hay uno en curso):
  - Nombre del workout + timer en curso
  - Botones: Pausar/Reanudar, "Volver al entrenamiento"
- **Alerta de sesiones sin puntuar** (si las hay):
  - Lista de sesiones pendientes de puntuar con botón "Puntuar" → abre `RPEModal`
- **Alertas de pago:**
  - Pago pendiente (rojo): monto + botón "Realizar pago" → abre `PaymentModal`
  - Pago en revisión (azul): confirmación de envío
  - Pago aprobado (verde): confirmación
- **Progreso semanal:** barra con porcentaje
- **Grid de estadísticas (3 columnas):** Sesiones / Tiempo total / Metas
- **Gráfico de rendimiento:** línea de progreso semanal
- **Próximas sesiones:** lista de los próximos 3 entrenamientos
- **Acciones rápidas:** "Iniciar entrenamiento" + "Ver progreso"

**Modales:**
- `WorkoutDetailsModal`: abierto desde próximas sesiones
- `RPEModal`: abierto desde alerta de sesiones sin puntuar
- `PaymentModal`: abierto desde alerta de pago pendiente

---

### 3.2 Tab: Entrenador (AthleteCoach)
**Archivo:** `src/app/components/athlete/AthleteCoach.tsx`

**Vista Perfil del Coach (default):**
- Tarjeta de coach: avatar, nombre, especialidad, descripción/bio
- Grid de stats: Atletas / Años de experiencia / Rating
- 3 botones de acción: Chat | Mis entrenamientos | Plan de suscripción

**Vista Chat con Coach:**
- Header: Avatar del coach + nombre + badge "Activo"
- Historial de mensajes (alternando coach/atleta)
- Input de mensaje + botón de imagen/adjunto + botón enviar

---

### 3.3 Tab: Comunidad (AthleteCommunity)
**Archivo:** `src/app/components/athlete/AthleteCommunity.tsx`

**Contenido:**
- Header: "Comunidad"
- Nota: "Solo tu entrenador puede publicar en esta comunidad"
- Feed de posts del coach:
  - Avatar del coach + fecha
  - Contenido del post (+ imagen si tiene)
  - Botones: Me gusta (con contador), Comentar (con contador), Compartir

---

### 3.4 Tab: Calendario (AthleteCalendar)
**Archivo:** `src/app/components/athlete/AthleteCalendar.tsx`

**Contenido:**
- Header: Mes y año + flechas de navegación
- Grid del calendario:
  - Indicadores de color por día:
    - 🟢 Verde: sesión completada con RPE
    - 🟡 Ámbar: sesión completada sin RPE
    - 🔵 Azul: sesión programada
    - 🟣 Púrpura: evento grupal
  - Resaltado del día seleccionado
- **Sección "Hoy":** sesiones del día actual
- **Próximas sesiones** (cuando no hay fecha seleccionada)
- **Eventos grupales** del coach
- Botón flotante "+" para agregar sesión

**Modales:**
- `AddWorkoutModal`: agregar entrenamiento a una fecha
- `WorkoutDetailsModal`: ver detalles de sesión, iniciar o puntuar

---

### 3.5 Tab: Plan (AthletePlan)
**Archivo:** `src/app/components/athlete/AthletePlan.tsx`

**Contenido:**
- Header: "Plan de Entrenamiento — Ejercicios asignados por tu entrenador"
- Banner de sesiones sin puntuar (si las hay)
- Grid de estadísticas: Total / Completados / Pendientes
- **Sección Pendientes:** lista de workouts con:
  - Nombre, duración, dificultad, descripción
  - Categorías (badges)
  - Lista de etapas/instrucciones
  - Botón: "Iniciar" → lanza `WorkoutScreen`
  - Botón: "Ver detalles" → abre `WorkoutDetailsModal`
- **Sección Completados:** lista de workouts completados con:
  - Nombre, fecha, RPE si fue puntado
  - Botón: "Puntuar" si no tiene RPE → abre `RPEModal`

---

### 3.6 Panel: Configuración del Atleta (AthleteSettings)
**Archivo:** `src/app/components/athlete/AthleteSettings.tsx`

**Página principal:**
- Tarjeta de perfil: avatar, nombre, email
- **Sección Entrenamiento:**
  - Mi entrenador → `AthleteMyCoach`
  - Plan de suscripción → `AthleteSubscriptionPlan`
- **Sección Dispositivos:**
  - Wearables y apps → `AthleteWearables`
- **Sección Cuenta:**
  - Editar perfil → `AthleteEditProfile`
  - Privacidad y seguridad
- **Sección Preferencias:** Toggle Notificaciones, Toggle Modo oscuro
- **Sección Soporte:** Ayuda y soporte
- Versión de la app
- Botón: "Cerrar sesión"

**Sub-páginas:**

#### Mi Entrenador (AthleteMyCoach)
- Tarjeta del coach: avatar, nombre, especialidad
- Bio del coach
- Grid de stats del coach
- Botón: "Enviar mensaje"
- Botón: "Cambiar entrenador"

#### Plan de Suscripción (AthleteSubscriptionPlan)
- Plan actual (ej: "Plan Básico — $29/mes")
- Fecha de renovación
- Historial de pagos
- Botón: "Cambiar plan"
- Botón: "Cancelar suscripción"

#### Wearables y Apps (AthleteWearables)
- Dispositivos conectados (Apple Watch, Garmin, etc.)
- Apps conectadas (Apple Health, Strava, etc.)
- Botón de conectar / desconectar por dispositivo

#### Editar Perfil (AthleteEditProfile)
- Formulario con datos personales: nombre, email, teléfono
- Datos deportivos: altura, peso, objetivo
- Upload de avatar
- Botón: "Guardar cambios"

---

## 4. Modales Globales

### 4.1 WorkoutScreen (Overlay de entrenamiento activo)
**Archivo:** `src/app/components/athlete/WorkoutScreen.tsx`
**Activado desde:** AthletePlan, AthleteCalendar, AthleteHome

- **Header:** Botón salir (×), nombre del workout, botón pausar/reanudar
- **Cronómetro central** (HH:MM:SS)
- **Grid de 4 métricas en tiempo real:**
  - Frecuencia cardíaca (bpm) + zona (1–5)
  - Ritmo (min/km)
  - Cadencia (spm)
  - Calorías (kcal)
- **Etapas del entrenamiento:** lista con estado (pendiente / en curso / completado)
- **Botón rojo:** "Finalizar entrenamiento"
- **Banner de pausa** (cuando está pausado)
- **Overlay de confirmación de salida:** "¿Descartar sesión?" / "¿Finalizar sesión?"

### 4.2 RPEModal (Valoración del esfuerzo percibido)
**Archivo:** `src/app/components/athlete/RPEModal.tsx`
**Activado desde:** AthleteHome, AthletePlan, AthleteCalendar, WorkoutScreen

- Header: nombre de la sesión + duración + botón "Omitir"
- **Escala RPE 1–10** (grid de botones de colores)
- **Etiquetas de zona:** Recuperación | Aeróbico | Umbral | Anaeróbico | VO₂ máx
- **Textarea:** "Comentario opcional"
- Botones: "Omitir" | "Guardar puntuación"

### 4.3 PaymentModal (Envío de comprobante de pago)
**Archivo:** `src/app/components/athlete/PaymentModal.tsx`
**Activado desde:** AthleteHome

- **Datos bancarios del coach** (copiables al portapapeles):
  - Banco, tipo de cuenta, número de cuenta
  - Nombre del titular, RUT, email
- Campo: Monto a pagar
- **Upload de comprobante:** imagen o PDF
- Botón: "Enviar comprobante"
- **Pantalla de éxito:** ícono de check + mensaje de confirmación + botón "Cerrar"

### 4.4 CoachPaymentApprovalModal (Aprobación de pago)
**Archivo:** `src/app/components/coach/CoachPaymentApprovalModal.tsx`
**Activado desde:** CoachHome, AthletePaymentHistory

- Tarjeta resumen: avatar del atleta, nombre, fecha, monto, tipo (transferencia)
- Sección de archivo adjunto: nombre del archivo + botón "Ver comprobante"
- **Overlay de visualización del comprobante** (imagen o PDF)
- Botones: "Rechazar" (rojo) | "Aprobar" (verde)
- **Pantalla de éxito/rechazo:** ícono + mensaje

### 4.5 WorkoutDetailsModal (Detalles de sesión)
**Archivo:** `src/app/components/athlete/WorkoutDetailsModal.tsx`
**Activado desde:** AthleteHome, AthleteCalendar, AthletePlan

**Sesión futura:**
- Título + fecha + hora + botón cerrar
- Badge de tipo/categoría
- Lista de etapas
- Botón: "Iniciar entrenamiento" → lanza `WorkoutScreen`

**Sesión pasada:**
- Título + fecha + hora + botón cerrar
- Badge de tipo/categoría
- Grid de métricas wearable: Duración | Calorías | FC promedio | FC máx | Distancia | Ritmo
- RPE: Barra de puntuación (1–10) + badge de zona | O bien: botón "Puntuar ahora"
- Feedback del coach (si existe)

### 4.6 AddWorkoutModal (Agregar entrenamiento al calendario)
**Archivo:** `src/app/components/athlete/AddWorkoutModal.tsx`
**Activado desde:** AthleteCalendar (botón "+")

- Selector de fecha
- Nombre del entrenamiento
- Tipo de entrenamiento (dropdown)
- Hora de inicio
- Duración estimada
- Notas opcionales
- Botón: "Agregar al calendario"

### 4.7 AssignWorkoutModal (Asignar plan a atletas)
**Archivo:** `src/app/components/coach/plan/AssignWorkoutModal.tsx`
**Activado desde:** PlanLibrary

- Nombre del plan (readonly)
- **Lista de atletas** con checkboxes de selección
- **Fecha de inicio** (date picker)
- **Frecuencia:** Una vez | Diario | Semanal | Personalizado
- Si es personalizado: selector de días de la semana
- Notas adicionales
- Botones: "Cancelar" | "Asignar"

### 4.8 CreateExerciseModal (Crear/editar ejercicio personalizado)
**Archivo:** `src/app/components/coach/plan/CreateExerciseModal.tsx`
**Activado desde:** WorkoutBlock ("Crear Ejercicio"), ExercisesLibrary

- Nombre del ejercicio (obligatorio)
- **Categoría** (dropdown estilizado con ícono ChevronDown + botón "Nueva categoría")
  - Si "Nueva categoría": input inline + botón Agregar
  - Badge de color para categorías predefinidas
- URL de video (opcional)
- Notas (opcional, textarea)
- Botones: "Cancelar" | "Crear Ejercicio" / "Guardar Cambios"

### 4.10 CreateGroupSessionModal (Crear sesión grupal)
**Archivo:** `src/app/components/coach/CreateGroupSessionModal.tsx`
**Activado desde:** CoachCalendar (botón "+" flotante)

- Título de la sesión (obligatorio)
- Tipo de actividad (dropdown: Trail Running, Running, Ciclismo, etc.)
- Fecha (obligatoria) y Hora (obligatoria)
- Lugar (opcional)
- Máximo de participantes (número)
- **Control de acceso por plan:** toggle "Todos los planes" o selección individual de planes con checkboxes
- Notas (opcional)
- Botones: "Cancelar" | "Crear sesión" (deshabilitado si faltan campos obligatorios o no hay planes seleccionados)

### 4.11 CoachAddWorkoutModal (Asignar workout desde biblioteca)
**Archivo:** `src/app/components/coach/CoachAddWorkoutModal.tsx`
**Activado desde:** AthleteCalendarPlan (botón "+" flotante)

**Pestaña Biblioteca:**
- Barra de búsqueda de planes
- Chips de filtro por categoría (scroll horizontal)
- Lista de planes con: nombre, notas, tipos de bloque (badges de colores), conteo de ejercicios
- Al seleccionar un plan: selector de fecha + frecuencia (Una vez / Diario / Semanal)
- Botón: "Asignar plan" (deshabilitado si no hay plan seleccionado)

**Pestaña Manual:**
- Selector de fecha
- Grid de 10 tipos de deporte (Trail Running, Running, Ciclismo, etc.)
- Botón: "Agregar" (deshabilitado si no hay deporte seleccionado)

### 4.9 DrawingBoard (Pizarra de dibujo)
**Archivo:** `src/app/components/coach/plan/DrawingBoard.tsx`
**Activado desde:** WorkoutPlanner (sección archivos adjuntos)

- Canvas HTML5 para dibujo a mano libre
- Selector de color
- Selector de grosor de trazo
- Botón: "Limpiar"
- Botones: "Cancelar" | "Guardar"

---

## 5. Tabla Resumen

| # | Pantalla / Modal | Tipo | Rol | Archivo |
|---|-----------------|------|-----|---------|
| 1 | Login | Pantalla | Ambos | `Login.tsx` |
| 2 | Registro — Paso 1 (Básico) | Pantalla | Ambos | `CreateAccount.tsx` |
| 3 | Registro — Paso 2 Coach (Perfil) | Pantalla | Coach | `CreateAccount.tsx` |
| 4 | Registro — Paso 3 Coach (Suscripción) | Pantalla | Coach | `CreateAccount.tsx` |
| 5 | Registro — Paso 4 Coach (Planes atleta) | Pantalla | Coach | `CreateAccount.tsx` |
| 6 | Registro — Paso 5 Coach (Código) | Pantalla | Coach | `CreateAccount.tsx` |
| 7 | Registro — Paso 2 Atleta (Perfil físico) | Pantalla | Atleta | `CreateAccount.tsx` |
| 8 | Registro — Paso 3 Atleta (Código coach) | Pantalla | Atleta | `CreateAccount.tsx` |
| 9 | Coach — Tab Inicio (Dashboard de negocio) | Pantalla | Coach | `CoachHome.tsx` |
| 10 | Coach — Tab Atletas (lista) | Pantalla | Coach | `CoachAthletes.tsx` |
| 11 | Coach — Atleta: Chat | Sub-vista | Coach | `CoachAthletes.tsx` |
| 12 | Coach — Atleta: Historial de Pagos | Sub-vista | Coach | `AthletePaymentHistory.tsx` |
| 13 | Coach — Atleta: Plan del Atleta | Sub-vista | Coach | `AthleteCalendarPlan.tsx` |
| 14 | Coach — Atleta: Métricas | Sub-vista | Coach | `AthleteMetrics.tsx` |
| 15 | Coach — Atleta: Perfil | Sub-vista | Coach | `AthleteProfile.tsx` |
| 16 | Coach — Tab Comunidad | Pantalla | Coach | `CoachCommunity.tsx` |
| 17 | Coach — Tab Calendario (mensual + sesiones grupales) | Pantalla | Coach | `CoachCalendar.tsx` |
| 18 | Coach — Tab Planificación: Biblioteca | Pantalla | Coach | `PlanLibrary.tsx` |
| 19 | Coach — Planificación: Editor | Pantalla | Coach | `WorkoutPlanner.tsx` |
| 20 | Coach — Planificación: Biblioteca Ejercicios | Pantalla | Coach | `ExercisesLibrary.tsx` |
| 21 | Coach — Configuración | Panel lateral | Coach | `CoachSettings.tsx` |
| 21a | Coach — Config: Editar Perfil | Sub-página | Coach | `CoachSettings.tsx` |
| 21b | Coach — Config: Configuración de Coach (planes atleta) | Sub-página | Coach | `CoachSettings.tsx` |
| 21c | Coach — Config: Suscripción a Athletica | Sub-página | Coach | `CoachSettings.tsx` |
| 21d | Coach — Config: Acerca de / Soporte | Sub-página | Coach | `CoachSettings.tsx` |
| 22 | Atleta — Tab Inicio | Pantalla | Atleta | `AthleteHome.tsx` |
| 23 | Atleta — Tab Entrenador (Perfil) | Pantalla | Atleta | `AthleteCoach.tsx` |
| 24 | Atleta — Entrenador: Chat | Sub-vista | Atleta | `AthleteCoach.tsx` |
| 25 | Atleta — Tab Comunidad | Pantalla | Atleta | `AthleteCommunity.tsx` |
| 26 | Atleta — Tab Calendario | Pantalla | Atleta | `AthleteCalendar.tsx` |
| 27 | Atleta — Tab Plan | Pantalla | Atleta | `AthletePlan.tsx` |
| 28 | Atleta — Config: Mi Entrenador | Sub-página | Atleta | `AthleteMyCoach.tsx` |
| 29 | Atleta — Config: Suscripción | Sub-página | Atleta | `AthleteSubscriptionPlan.tsx` |
| 30 | Atleta — Config: Wearables | Sub-página | Atleta | `AthleteWearables.tsx` |
| 31 | Atleta — Config: Editar Perfil | Sub-página | Atleta | `AthleteEditProfile.tsx` |
| 32 | Atleta — Configuración | Panel lateral | Atleta | `AthleteSettings.tsx` |
| 33 | **Modal:** WorkoutScreen | Overlay full-screen | Atleta | `WorkoutScreen.tsx` |
| 34 | **Modal:** RPEModal | Bottom sheet | Atleta | `RPEModal.tsx` |
| 35 | **Modal:** PaymentModal | Bottom sheet | Atleta | `PaymentModal.tsx` |
| 36 | **Modal:** WorkoutDetailsModal | Bottom sheet | Atleta | `WorkoutDetailsModal.tsx` |
| 37 | **Modal:** AddWorkoutModal | Bottom sheet | Atleta | `AddWorkoutModal.tsx` |
| 38 | **Modal:** CoachPaymentApprovalModal | Bottom sheet | Coach | `CoachPaymentApprovalModal.tsx` |
| 39 | **Modal:** AssignWorkoutModal | Bottom sheet | Coach | `AssignWorkoutModal.tsx` |
| 40 | **Modal:** CreateExerciseModal | Bottom sheet | Coach | `CreateExerciseModal.tsx` |
| 41 | **Modal:** DrawingBoard | Overlay | Coach | `DrawingBoard.tsx` |
| 42 | **Modal:** Nuevo Plan | Bottom sheet inline | Coach | `PlanLibrary.tsx` |
| 43 | **Modal:** Gestionar Categorías | Bottom sheet inline | Coach | `PlanLibrary.tsx` |
| 44 | **Modal:** Ver Atletas Asignados | Bottom sheet inline | Coach | `PlanLibrary.tsx` |
| 45 | **Modal:** Confirmación Eliminar Plan | Alert inline | Coach | `PlanLibrary.tsx` |
| 46 | **Modal:** Ver Ejercicio | Bottom sheet inline | Coach | `ExercisesLibrary.tsx` |
| 47 | **Modal:** CreateGroupSessionModal | Bottom sheet | Coach | `CreateGroupSessionModal.tsx` |
| 48 | **Modal:** CoachAddWorkoutModal (Biblioteca + Manual) | Bottom sheet | Coach | `CoachAddWorkoutModal.tsx` |
| 49 | **Panel:** MessagesPanel (atletas con mensajes pendientes) | Slide-up inline | Coach | `CoachHome.tsx` |

**Total: 50 pantallas/vistas/modales** *(incluye 4 sub-páginas de CoachSettings)*
