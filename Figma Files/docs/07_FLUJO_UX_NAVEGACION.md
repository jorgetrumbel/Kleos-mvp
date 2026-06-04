# Athletica — Flujo UX y Navegación Detallada

> Este documento mapea **cada elemento interactivo** (botón, tab, link, gesto) de cada pantalla y a dónde lleva. Es la referencia de navegación para diseñadores, desarrolladores frontend y QA.

---

## Convenciones

| Símbolo | Significado |
|---------|-------------|
| `→` | Navega a otra pantalla o abre modal |
| `↩` | Regresa a la pantalla anterior |
| `⊕` | Abre un modal / bottom sheet |
| `⊗` | Cierra el modal actual |
| `⟳` | Actualiza el estado de la pantalla actual (sin navegar) |
| `📋` | Copia al portapapeles |
| `[overlay]` | Aparece sobre la pantalla actual sin reemplazarla |

---

## Mapa de Navegación General

```
┌─────────────────────────────────────────────────────────────────┐
│                         LOGIN                                   │
│  "Iniciar sesión" → CoachView o AthleteView (según rol)         │
│  "Regístrate"     → Registro Paso 1                             │
└─────────────────────────────────────────────────────────────────┘
              │                        │
              ▼                        ▼
    ┌─────────────────┐      ┌──────────────────┐
    │  REGISTRO COACH │      │ REGISTRO ATLETA  │
    │  (5 pasos)      │      │  (3 pasos)       │
    └────────┬────────┘      └────────┬─────────┘
             │                        │
             ▼                        ▼
    ┌─────────────────┐      ┌──────────────────┐
    │   COACH VIEW    │      │  ATHLETE VIEW    │
    │  5 tabs + cfg   │      │  5 tabs + cfg    │
    └─────────────────┘      └──────────────────┘
```

---

## 1. Autenticación

### 1.1 Pantalla de Login

| Elemento | Acción | Destino |
|----------|--------|---------|
| Campo Email | Escribir | ⟳ Actualiza campo |
| Campo Contraseña | Escribir | ⟳ Actualiza campo |
| Botón **"Iniciar sesión"** (credenciales coach) | Tap | → **CoachView** (Tab: Inicio) |
| Botón **"Iniciar sesión"** (credenciales atleta) | Tap | → **AthleteView** (Tab: Inicio) |
| Botón **"Iniciar sesión"** (credenciales incorrectas) | Tap | ⟳ Muestra mensaje de error |
| Link **"¿No tienes cuenta? Regístrate"** | Tap | → **Registro — Paso 1** |

---

### 1.2 Registro — Paso 1 (Datos Básicos) — Ambos roles

| Elemento | Acción | Destino |
|----------|--------|---------|
| Botón **"Coach"** (selector de rol) | Tap | ⟳ Selecciona rol coach, activa flujo coach |
| Botón **"Atleta"** (selector de rol) | Tap | ⟳ Selecciona rol atleta, activa flujo atleta |
| Campos (Nombre, Apellido, etc.) | Escribir | ⟳ Actualiza campo |
| Botón **"Siguiente"** | Tap (coach) | → **Registro Coach — Paso 2** |
| Botón **"Siguiente"** | Tap (atleta) | → **Registro Atleta — Paso 2** |

---

### 1.3 Registro Coach — Paso 2 (Perfil Profesional)

| Elemento | Acción | Destino |
|----------|--------|---------|
| Upload avatar | Tap | ⊕ Selector de imagen del dispositivo |
| Upload logo | Tap | ⊕ Selector de imagen del dispositivo |
| Chips de deportes | Tap | ⟳ Toggle selección de deporte |
| Campos de texto | Escribir | ⟳ Actualiza campo |
| Botón **"Atrás"** | Tap | → **Registro — Paso 1** |
| Botón **"Siguiente"** | Tap | → **Registro Coach — Paso 3** |

---

### 1.4 Registro Coach — Paso 3 (Selección de Plan Athletica)

| Elemento | Acción | Destino |
|----------|--------|---------|
| Tarjeta de plan (Free, Starter, Pro, Max) | Tap | ⟳ Selecciona plan |
| Tarjeta **"Enterprise"** | Tap | ⟳ Selecciona Enterprise (sin precio fijo) |
| Botón **"Atrás"** | Tap | → **Registro Coach — Paso 2** |
| Botón **"Siguiente"** | Tap | → **Registro Coach — Paso 4** |

---

### 1.5 Registro Coach — Paso 4 (Crear Planes para Atletas)

| Elemento | Acción | Destino |
|----------|--------|---------|
| Campos del formulario de plan | Escribir/seleccionar | ⟳ Actualiza campo |
| Botón **"Agregar plan"** | Tap | ⟳ Agrega plan a la lista visible en la pantalla |
| Plan en lista: icono eliminar | Tap | ⟳ Elimina plan de la lista |
| Botón **"Atrás"** | Tap | → **Registro Coach — Paso 3** |
| Botón **"Siguiente"** | Tap | → **Registro Coach — Paso 5** |

---

### 1.6 Registro Coach — Paso 5 (Código de Vinculación)

| Elemento | Acción | Destino |
|----------|--------|---------|
| Campo de código | Escribir | ⟳ Edita el código personalizable |
| Botón **"Copiar código"** | Tap | 📋 Copia el código al portapapeles |
| Botón **"Compartir"** | Tap | ⊕ Share sheet del sistema operativo |
| Botón **"Ir a mi app"** | Tap | → **CoachView** (Tab: Inicio) |

---

### 1.7 Registro Atleta — Paso 2 (Perfil Físico y Deportivo)

| Elemento | Acción | Destino |
|----------|--------|---------|
| Upload avatar | Tap | ⊕ Selector de imagen del dispositivo |
| Slider de aptitud (1–10) | Deslizar | ⟳ Actualiza valor |
| Dropdown objetivo | Tap | ⟳ Expande opciones |
| Campos de texto | Escribir | ⟳ Actualiza campo |
| Botón **"Atrás"** | Tap | → **Registro — Paso 1** |
| Botón **"Siguiente"** | Tap | → **Registro Atleta — Paso 3** |

---

### 1.8 Registro Atleta — Paso 3 (Vincular con Coach)

| Elemento | Acción | Destino |
|----------|--------|---------|
| Campo de código | Escribir | ⟳ Actualiza campo |
| Botón **"Buscar coach"** | Tap (código inválido) | ⟳ Muestra error "Código no encontrado" |
| Botón **"Buscar coach"** | Tap (código válido) | ⟳ Muestra tarjeta del coach encontrado |
| Botón **"Vincularme con este coach"** | Tap | → **AthleteView** (Tab: Inicio, con coach asignado) |
| Link **"Omitir por ahora"** | Tap | → **AthleteView** (Tab: Inicio, sin coach) |
| Botón **"Atrás"** | Tap | → **Registro Atleta — Paso 2** |

---

## 2. Vista Coach

### Barra de Navegación Inferior — Coach

| Tab | Acción | Destino |
|-----|--------|---------|
| Tab **"Inicio"** | Tap | → **CoachHome** |
| Tab **"Atletas"** | Tap | → **CoachAthletes** (lista) |
| Tab **"Comunidad"** | Tap | → **CoachCommunity** |
| Tab **"Calendario"** | Tap | → **CoachCalendar** |
| Tab **"Planificación"** | Tap | → **CoachPlan** (PlanLibrary) |
| Botón **⚙ Ajustes** (esquina superior derecha) | Tap | ⊕ **CoachSettings** (bottom sheet) |

---

### 2.1 CoachHome (Tab: Inicio)

| Elemento | Acción | Destino |
|----------|--------|---------|
| Banner **"N mensajes pendientes"** | Tap | ⊕ **MessagesPanel** (slide-up con lista de atletas) |
| MessagesPanel: tarjeta de atleta | Tap | ⊗ Cierra panel → **CoachAthletes** → Chat con ese atleta |
| MessagesPanel: botón **"×"** / área oscura | Tap | ⊗ Cierra el panel |
| Banner **"N pagos pendientes"** | Tap | ⊕ **CoachPaymentApprovalModal** |
| Tarjeta de próxima sesión grupal | Tap | ⟳ Informativo (no navega en prototipo) |

#### CoachPaymentApprovalModal (abierto desde CoachHome)

| Elemento | Acción | Destino |
|----------|--------|---------|
| Botón **"×"** (cerrar) | Tap | ⊗ Cierra modal, vuelve a **CoachHome** |
| Botón **"Ver comprobante"** | Tap | ⊕ Overlay de visualización del archivo (imagen o PDF) |
| Overlay archivo: botón **"×"** | Tap | ⊗ Cierra overlay, vuelve al modal |
| Botón **"Rechazar"** (rojo) | Tap | ⟳ Cambia estado del pago a "rechazado", muestra pantalla de rechazo |
| Botón **"Aprobar"** (verde) | Tap | ⟳ Cambia estado del pago a "aprobado", muestra pantalla de éxito |
| Pantalla de éxito/rechazo: botón **"Cerrar"** | Tap | ⊗ Cierra modal, vuelve a **CoachHome** |

---

### 2.2 CoachAthletes (Tab: Atletas)

#### Lista de Atletas

| Elemento | Acción | Destino |
|----------|--------|---------|
| Barra de búsqueda | Escribir | ⟳ Filtra lista de atletas por nombre |
| Botón **"Chat"** (en tarjeta de atleta) | Tap | → **Sub-vista: Chat con Atleta** |
| Botón **"Pago"** (en tarjeta de atleta) | Tap | → **Sub-vista: Historial de Pagos** |
| Botón **"Plan"** (en tarjeta de atleta) | Tap | → **Sub-vista: Plan del Atleta** |
| Botón **"Métricas"** (en tarjeta de atleta) | Tap | → **Sub-vista: Métricas del Atleta** |
| Botón **"Ver perfil"** (en tarjeta de atleta) | Tap | → **Sub-vista: Perfil del Atleta** |
| Badge ámbar de pago pendiente (en tarjeta) | Tap | ⊕ **CoachPaymentApprovalModal** |

#### Sub-vista: Chat con Atleta

| Elemento | Acción | Destino |
|----------|--------|---------|
| Botón **"←"** (volver) | Tap | ↩ → **CoachAthletes** (lista) |
| Campo de mensaje | Escribir | ⟳ Actualiza campo |
| Botón de imagen/adjunto | Tap | ⊕ Selector de archivo del dispositivo |
| Botón **"Enviar"** | Tap | ⟳ Envía mensaje, aparece en el hilo |

#### Sub-vista: Historial de Pagos del Atleta

| Elemento | Acción | Destino |
|----------|--------|---------|
| Botón **"←"** (volver) | Tap | ↩ → **CoachAthletes** (lista) |
| Botón **"Revisar"** en pago pendiente | Tap | ⊕ **CoachPaymentApprovalModal** |
| Botón flotante **"Aprobar pago pendiente"** | Tap | ⊕ **CoachPaymentApprovalModal** |

#### Sub-vista: Plan del Atleta (AthleteCalendarPlan)

| Elemento | Acción | Destino |
|----------|--------|---------|
| Botón **"←"** (volver) | Tap | ↩ → **CoachAthletes** (lista) |
| Navegación mes (← →) | Tap | ⟳ Cambia el mes visible en el calendario |
| Día del calendario | Tap | ⟳ Selecciona ese día, muestra sus sesiones abajo |
| Botón **"Ver todos"** | Tap | ⟳ Deselecciona el día, vuelve a vista del día actual |
| Botón **"+"** flotante | Tap | ⊕ **CoachAddWorkoutModal** |

#### CoachAddWorkoutModal

| Elemento | Acción | Destino |
|----------|--------|---------|
| Botón **"×"** | Tap | ⊗ Cierra modal, vuelve a **AthleteCalendarPlan** |
| Pestaña **"Biblioteca"** | Tap | ⟳ Muestra listado de planes de la biblioteca |
| Pestaña **"Manual"** | Tap | ⟳ Muestra grid de deportes para asignación rápida |
| **[Pestaña Biblioteca]** Barra de búsqueda | Escribir | ⟳ Filtra planes por nombre |
| **[Pestaña Biblioteca]** Chip de categoría | Tap | ⟳ Filtra planes por esa categoría |
| **[Pestaña Biblioteca]** Tarjeta de plan (no seleccionado) | Tap | ⟳ Selecciona el plan, muestra opciones de asignación |
| **[Pestaña Biblioteca]** Tarjeta de plan (ya seleccionado) | Tap | ⟳ Deselecciona el plan, oculta opciones |
| **[Pestaña Biblioteca]** Input de fecha | Seleccionar | ⟳ Actualiza fecha de inicio |
| **[Pestaña Biblioteca]** Botón de frecuencia (Una vez / Diario / Semanal) | Tap | ⟳ Cambia la frecuencia de asignación |
| **[Pestaña Biblioteca]** Botón **"Asignar plan"** | Tap | ⟳ Asigna el plan al atleta, ⊗ cierra modal |
| **[Pestaña Manual]** Input de fecha | Seleccionar | ⟳ Actualiza la fecha |
| **[Pestaña Manual]** Chip de deporte | Tap | ⟳ Selecciona el deporte (toggle) |
| **[Pestaña Manual]** Botón **"Agregar"** | Tap | ⟳ Agrega la sesión manual al atleta, ⊗ cierra modal |

#### Sub-vista: Métricas del Atleta

| Elemento | Acción | Destino |
|----------|--------|---------|
| Botón **"←"** (volver) | Tap | ↩ → **CoachAthletes** (lista) |
| Selector **"Semana / Mes / 3 meses"** | Tap | ⟳ Actualiza el período de los gráficos |

#### Sub-vista: Perfil del Atleta

| Elemento | Acción | Destino |
|----------|--------|---------|
| Botón **"←"** (volver) | Tap | ↩ → **CoachAthletes** (lista) |
| Botón **"Enviar mensaje"** | Tap | → **Sub-vista: Chat con Atleta** (ese atleta) |

---

### 2.3 CoachCommunity (Tab: Comunidad)

| Elemento | Acción | Destino |
|----------|--------|---------|
| Botón **"Nueva publicación"** | Tap | ⊕ **Modal: Nueva Publicación** (bottom sheet) |
| Botón ❤ "Me gusta" en post | Tap | ⟳ Toggle like, actualiza contador |
| Botón 💬 "Comentar" en post | Tap | ⟳ Incrementa contador (o abre vista de comentarios) |
| Botón "Compartir" en post | Tap | ⊕ Share sheet del sistema operativo |

#### Modal: Nueva Publicación

| Elemento | Acción | Destino |
|----------|--------|---------|
| Botón **"×"** | Tap | ⊗ Cierra modal, vuelve a **CoachCommunity** |
| Textarea de contenido | Escribir | ⟳ Actualiza campo |
| Botón de adjuntar imagen | Tap | ⊕ Selector de imagen del dispositivo |
| Botón **"Publicar"** | Tap | ⊗ Crea publicación, cierra modal, ⟳ actualiza feed |

---

### 2.4 CoachCalendar (Tab: Calendario)

| Elemento | Acción | Destino |
|----------|--------|---------|
| Botón **"←"** (mes anterior) | Tap | ⟳ Muestra mes anterior |
| Botón **"→"** (mes siguiente) | Tap | ⟳ Muestra mes siguiente |
| Celda de día (no seleccionado) | Tap | ⟳ Selecciona ese día, muestra sus actividades abajo |
| Celda de día (ya seleccionado) | Tap | ⟳ Deselecciona, limpia la sección inferior |
| **`GroupSessionCard`** (sesión grupal en lista) | Tap | ⟳ Expande/colapsa detalles: tipo, lugar, cupo, planes con acceso |
| Botón **"+"** flotante (púrpura) | Tap | ⊕ **CreateGroupSessionModal** |

#### CreateGroupSessionModal

| Elemento | Acción | Destino |
|----------|--------|---------|
| Botón **"×"** | Tap | ⊗ Cierra modal, vuelve a **CoachCalendar** |
| Campo Título | Escribir | ⟳ Actualiza campo |
| Dropdown Tipo de actividad | Seleccionar | ⟳ Selecciona tipo |
| Input Fecha | Seleccionar | ⟳ Actualiza fecha |
| Input Hora | Seleccionar | ⟳ Actualiza hora |
| Input Lugar | Escribir | ⟳ Actualiza campo |
| Input Máximo participantes | Escribir | ⟳ Actualiza número |
| Toggle **"Todos los planes"** | Tap | ⟳ Activa/desactiva acceso universal; si desactiva, muestra checkboxes individuales |
| Checkbox de plan individual | Tap | ⟳ Toggle selección del plan |
| Textarea Notas | Escribir | ⟳ Actualiza campo |
| Botón **"Cancelar"** | Tap | ⊗ Cierra modal |
| Botón **"Crear sesión"** | Tap | ⊗ Crea la sesión grupal, la añade al calendario, selecciona su fecha automáticamente |

---

### 2.5 CoachPlan (Tab: Planificación)

#### 2.5.1 PlanLibrary (Vista por defecto de Planificación)

| Elemento | Acción | Destino |
|----------|--------|---------|
| Botón **"Ejercicios"** (header) | Tap | → **ExercisesLibrary** |
| Botón **"Nuevo"** (header) | Tap | ⊕ **Modal: Nuevo Plan** |
| Barra de búsqueda | Escribir | ⟳ Filtra planes por nombre |
| Dropdown de categoría | Seleccionar | ⟳ Filtra planes por categoría |
| Botón 📁+ **Gestionar categorías** | Tap | ⊕ **Modal: Gestionar Categorías** |
| Área principal de tarjeta de plan | Tap | → **WorkoutPlanner** (modo edición del plan) |
| Botón **"→"** (chevron derecho en tarjeta) | Tap | → **WorkoutPlanner** (modo edición del plan) |
| Badge **"N atletas"** (en tarjeta de plan) | Tap | ⊕ **Modal: Ver Atletas Asignados** |
| Botón de acción **"Asignar"** | Tap | ⊕ **AssignWorkoutModal** |
| Botón de acción **"Atletas"** | Tap | ⊕ **Modal: Ver Atletas Asignados** |
| Botón de acción **"Editar"** | Tap | → **WorkoutPlanner** (modo edición del plan) |
| Botón de acción **"Copiar"** | Tap | ⟳ Duplica el plan (copia aparece en la lista con "(Copia)" en el nombre) |
| Botón de acción **"Eliminar"** | Tap | ⊕ **Modal: Confirmar Eliminación de Plan** |

#### Modal: Nuevo Plan

| Elemento | Acción | Destino |
|----------|--------|---------|
| Botón **"×"** | Tap | ⊗ Cierra modal, vuelve a **PlanLibrary** |
| Botón **"Individual"** | Tap | ⟳ Selecciona tipo individual |
| Botón **"Grupo"** | Tap | ⟳ Selecciona tipo grupal |
| Dropdown de categoría | Seleccionar | ⟳ Selecciona categoría para el nuevo plan |
| Botón **"Nueva categoría"** | Tap | ⟳ Muestra input inline de nueva categoría |
| Input de nueva categoría | Escribir + Enter / Botón "Agregar" | ⟳ Crea categoría, la selecciona, oculta input |
| Botón **"Cancelar"** inline | Tap | ⟳ Oculta el input de nueva categoría |
| Botón **"Cancelar"** (modal) | Tap | ⊗ Cierra modal, vuelve a **PlanLibrary** |
| Botón **"Crear Plan"** | Tap | ⊗ Cierra modal → **WorkoutPlanner** (plan nuevo en blanco) |

#### Modal: Gestionar Categorías

| Elemento | Acción | Destino |
|----------|--------|---------|
| Botón **"×"** | Tap | ⊗ Cierra modal, vuelve a **PlanLibrary** |
| Input de nueva categoría | Escribir | ⟳ Actualiza campo |
| Botón **"Agregar"** | Tap | ⟳ Agrega la nueva categoría a la lista |
| Botón 🗑 en categoría eliminable | Tap | ⊕ **Modal: Confirmar Eliminación de Categoría** |
| Botón **"Cerrar"** | Tap | ⊗ Cierra modal, vuelve a **PlanLibrary** |

#### Modal: Confirmar Eliminación de Plan

| Elemento | Acción | Destino |
|----------|--------|---------|
| Botón **"Cancelar"** | Tap | ⊗ Cierra modal, vuelve a **PlanLibrary** |
| Botón **"Eliminar"** (rojo) | Tap | ⟳ Elimina el plan, ⊗ cierra modal, ⟳ actualiza lista |

#### Modal: Confirmar Eliminación de Categoría

| Elemento | Acción | Destino |
|----------|--------|---------|
| Botón **"Cancelar"** | Tap | ⊗ Cierra modal, vuelve a **Modal: Gestionar Categorías** |
| Botón **"Eliminar"** (rojo) | Tap | ⟳ Elimina la categoría, ⊗ cierra modal, vuelve a **Modal: Gestionar Categorías** |

#### Modal: Ver Atletas Asignados

| Elemento | Acción | Destino |
|----------|--------|---------|
| Botón **"×"** | Tap | ⊗ Cierra modal, vuelve a **PlanLibrary** |
| Botón **"Cerrar"** | Tap | ⊗ Cierra modal, vuelve a **PlanLibrary** |

#### AssignWorkoutModal

| Elemento | Acción | Destino |
|----------|--------|---------|
| Botón **"×"** | Tap | ⊗ Cierra modal, vuelve a **PlanLibrary** |
| Checkbox de atleta | Tap | ⟳ Toggle selección del atleta |
| Input de fecha de inicio | Tap/seleccionar | ⟳ Abre selector de fecha |
| Selector de frecuencia (Once/Diario/Semanal/Custom) | Tap | ⟳ Cambia el tipo de frecuencia |
| Chips de días (si frecuencia = Custom) | Tap | ⟳ Toggle día de la semana |
| Textarea de notas | Escribir | ⟳ Actualiza campo |
| Botón **"Cancelar"** | Tap | ⊗ Cierra modal, vuelve a **PlanLibrary** |
| Botón **"Asignar"** | Tap | ⟳ Guarda la asignación, ⊗ cierra modal |

---

#### 2.5.2 WorkoutPlanner (Editor de Plan)

| Elemento | Acción | Destino |
|----------|--------|---------|
| Botón **"←"** (volver) | Tap | ↩ → **PlanLibrary** (sin guardar cambios) |
| Input de nombre del plan | Escribir | ⟳ Actualiza nombre |
| Botón **"Guardar"** | Tap | ⟳ Guarda el plan → **PlanLibrary** |
| Sección **"Notas del plan"** (header) | Tap | ⟳ Expande/colapsa el textarea de notas |
| Sección **"Archivos adjuntos"** (header) | Tap | ⟳ Expande/colapsa la sección de archivos |
| Botón **"Adjuntar archivo"** | Tap | ⊕ Selector de archivos del dispositivo |
| Botón **"Pizarra"** | Tap | ⊕ **DrawingBoard** [overlay] |
| Archivo adjunto: botón **"×"** | Tap | ⟳ Elimina el archivo de la lista |
| Botón **"Agregar Bloque de Entrenamiento"** | Tap | ⟳ Agrega nuevo bloque al final |
| Handle ⠿ (arrastre de bloque) | Drag & Drop | ⟳ Reordena los bloques |
| Input nombre del bloque | Escribir | ⟳ Actualiza nombre del bloque |
| Dropdown tipo de bloque (en cabecera del bloque) | Seleccionar | ⟳ Cambia el tipo, actualiza colores |
| Botón ∧/∨ (colapsar/expandir bloque) | Tap | ⟳ Colapsa o expande el bloque |
| Botón 🗑 (eliminar bloque) | Tap | ⟳ Elimina el bloque del plan |
| Botón **"Agregar Ejercicio"** (dentro del bloque) | Tap | ⟳ Agrega fila de ejercicio en blanco |
| Botón **"Crear Ejercicio"** (dentro del bloque) | Tap | ⊕ **CreateExerciseModal** |
| Toggle **"Comentarios del bloque"** | Tap | ⟳ Muestra/oculta textarea de comentarios del bloque |

##### Sub-componente: ExerciseRow (fila de ejercicio)

| Elemento | Acción | Destino |
|----------|--------|---------|
| Input de nombre | Escribir | ⟳ Actualiza nombre del ejercicio |
| Inputs de series / repeticiones / duración / intensidad | Escribir | ⟳ Actualiza el campo |
| Input de notas | Escribir | ⟳ Actualiza notas |
| Botón 🗑 | Tap | ⟳ Elimina el ejercicio del bloque |

##### DrawingBoard [overlay]

| Elemento | Acción | Destino |
|----------|--------|---------|
| Canvas | Dibujar (touch) | ⟳ Dibuja en el lienzo |
| Selector de color | Tap | ⟳ Cambia el color activo del trazo |
| Selector de grosor | Tap/deslizar | ⟳ Cambia el grosor del trazo |
| Botón **"Limpiar"** | Tap | ⟳ Borra el lienzo |
| Botón **"Cancelar"** | Tap | ⊗ Descarta el dibujo, regresa al **WorkoutPlanner** |
| Botón **"Guardar"** | Tap | ⊗ Guarda el dibujo como adjunto, regresa al **WorkoutPlanner** |

#### CreateExerciseModal (Crear o Editar Ejercicio)

| Elemento | Acción | Destino |
|----------|--------|---------|
| Botón **"×"** (cerrar) | Tap | ⊗ Cierra modal sin guardar |
| Input de nombre | Escribir | ⟳ Actualiza campo |
| Dropdown de categoría | Seleccionar | ⟳ Selecciona categoría |
| Botón **"Nueva categoría"** | Tap | ⟳ Muestra input inline de nueva categoría |
| Input nueva categoría + botón **"Agregar"** | Escribir + Tap | ⟳ Crea categoría, la selecciona, oculta input |
| Botón **"Cancelar"** inline (nueva cat.) | Tap | ⟳ Oculta input de nueva categoría |
| Input URL de video | Escribir | ⟳ Actualiza campo |
| Textarea de notas | Escribir | ⟳ Actualiza campo |
| Botón **"Cancelar"** (modal) | Tap | ⊗ Cierra modal sin guardar |
| Botón **"Crear Ejercicio"** / **"Guardar Cambios"** | Tap | ⟳ Guarda ejercicio, ⊗ cierra modal |

---

#### 2.5.3 ExercisesLibrary (Biblioteca de Ejercicios)

| Elemento | Acción | Destino |
|----------|--------|---------|
| Botón **"←"** (volver) | Tap | ↩ → **PlanLibrary** |
| Botón **"Nuevo"** (header) | Tap | ⊕ **CreateExerciseModal** (modo creación) |
| Barra de búsqueda | Escribir | ⟳ Filtra ejercicios por nombre |
| Chip **"Todos"** | Tap | ⟳ Muestra todos los ejercicios |
| Chips de categoría (Cardio, Halterofilia, etc.) | Tap | ⟳ Filtra por esa categoría |
| Tarjeta de ejercicio (área principal) | Tap | ⊕ **Modal: Ver Ejercicio** |
| Botón **"Editar"** (solo ejercicios personalizados) | Tap | ⊕ **CreateExerciseModal** (modo edición) |
| Botón **"Eliminar"** (solo ejercicios personalizados) | Tap | ⊕ **Modal: Confirmar Eliminación de Ejercicio** |

##### Modal: Ver Ejercicio

| Elemento | Acción | Destino |
|----------|--------|---------|
| Botón **"×"** | Tap | ⊗ Cierra modal, vuelve a **ExercisesLibrary** |
| URL de video (link) | Tap | → Abre navegador externo con el video |
| Botón **"Cerrar"** | Tap | ⊗ Cierra modal, vuelve a **ExercisesLibrary** |

##### Modal: Confirmar Eliminación de Ejercicio

| Elemento | Acción | Destino |
|----------|--------|---------|
| Botón **"Cancelar"** | Tap | ⊗ Cierra modal, vuelve a **ExercisesLibrary** |
| Botón **"Eliminar"** (rojo) | Tap | ⟳ Elimina el ejercicio, ⊗ cierra modal, ⟳ actualiza lista |

---

### 2.6 CoachSettings (Panel de Configuración)

| Elemento | Acción | Destino |
|----------|--------|---------|
| Botón **"←"** / **"×"** (cerrar) | Tap | ⊗ Cierra panel, vuelve a la vista activa |
| Tarjeta de perfil | Tap | → Sub-página: **Editar Perfil** |
| **"Editar perfil"** | Tap | → Sub-página: **Editar Perfil** |
| **"Configuración de coach"** | Tap | → Sub-página: **Config Coach (planes de atletas)** |
| **"Suscripción y facturación"** | Tap | → Sub-página: **Suscripción a Athletica** |
| Toggle **"Notificaciones"** | Tap | ⟳ Activa / desactiva notificaciones push |
| Toggle **"Modo oscuro"** | Tap | ⟳ Cambia el tema visual |
| **"Ayuda y soporte"** | Tap | → Sub-página: **Acerca de / Soporte** |
| Botón **"Cerrar sesión"** (rojo) | Tap | → **Login** (cierra sesión) |

#### Sub-página: Editar Perfil (`EditProfilePage`)

| Elemento | Acción | Destino |
|----------|--------|---------|
| Botón **"←"** (volver) | Tap | ↩ → **CoachSettings** (página principal) |
| `AvatarPicker` (cámara / archivo) | Tap | ⊕ Selector de imagen del dispositivo |
| Campos de info personal (nombre, email, etc.) | Escribir | ⟳ Actualiza campo |
| Chips de deporte | Tap | ⟳ Toggle selección del deporte |
| Inputs de redes sociales | Escribir | ⟳ Actualiza campo |
| Campos de cambio de contraseña | Escribir | ⟳ Actualiza campo |
| Botón **"Guardar"** | Tap | ⟳ Guarda cambios, ↩ → **CoachSettings** |

#### Sub-página: Config Coach — Planes de Atletas (`CoachConfigPage`)

| Elemento | Acción | Destino |
|----------|--------|---------|
| Botón **"←"** (volver) | Tap | ↩ → **CoachSettings** (página principal) |
| Botón 🗑 en tarjeta de plan | Tap | ⟳ Elimina el plan de la lista |
| Botón **"Nuevo plan"** | Tap | ⊕ **PlanFormModal** (inline) |
| `PlanFormModal`: toggle Semanal/Mensual | Tap | ⟳ Cambia la frecuencia |
| `PlanFormModal`: chips de deporte | Tap | ⟳ Toggle deporte |
| `PlanFormModal`: botón **"Cancelar"** | Tap | ⊗ Cierra el formulario inline |
| `PlanFormModal`: botón **"Guardar plan"** | Tap | ⟳ Agrega el plan a la lista, ⊗ cierra formulario |

#### Sub-página: Suscripción a Athletica (`SubscriptionPage`)

| Elemento | Acción | Destino |
|----------|--------|---------|
| Botón **"←"** (volver) | Tap | ↩ → **CoachSettings** (página principal) |
| Tarjeta de plan (Free / Starter / Pro / Max / Enterprise) | Tap | ⟳ Selecciona ese plan (radio button) |
| Botón **"Cambiar plan"** | Tap | ⟳ Confirma selección (prototipo: actualiza estado local) |

#### Sub-página: Acerca de / Soporte (`AboutPage`)

| Elemento | Acción | Destino |
|----------|--------|---------|
| Botón **"←"** (volver) | Tap | ↩ → **CoachSettings** (página principal) |
| Fila **"Email de soporte"** | Tap | ⊕ Cliente de email del dispositivo (mailto:) |
| Fila **"Teléfono"** | Tap | ⊕ Marcador del dispositivo (tel:) |
| Fila **"Chat en vivo"** | Tap | → Abre chat de soporte (no implementado en prototipo) |
| Links de documentación / ayuda | Tap | → Abre enlace externo en navegador |
| Links de redes sociales | Tap | → Abre enlace externo en navegador |
| Link **"Términos de servicio"** | Tap | → Abre documento legal en navegador |
| Link **"Política de privacidad"** | Tap | → Abre documento legal en navegador |

---

## 3. Vista Atleta

### Barra de Navegación Inferior — Atleta

| Tab | Acción | Destino |
|-----|--------|---------|
| Tab **"Inicio"** | Tap | → **AthleteHome** |
| Tab **"Entrenador"** | Tap | → **AthleteCoach** (Perfil del Coach) |
| Tab **"Comunidad"** | Tap | → **AthleteCommunity** |
| Tab **"Calendario"** | Tap | → **AthleteCalendar** |
| Tab **"Plan"** | Tap | → **AthletePlan** |
| Botón **⚙ Ajustes** (esquina superior derecha) | Tap | ⊕ **AthleteSettings** (bottom sheet) |

---

### 3.1 AthleteHome (Tab: Inicio)

| Elemento | Acción | Destino |
|----------|--------|---------|
| Banner de workout activo: botón **"Volver al entrenamiento"** | Tap | → **WorkoutScreen** [overlay] (retoma sesión en curso) |
| Banner de workout activo: botón ⏸ / ▶ | Tap | ⟳ Pausa / reanuda el cronómetro del workout activo |
| Banner de sesión sin puntuar: botón **"Puntuar"** | Tap | ⊕ **RPEModal** para esa sesión |
| Banner de **pago vencido**: botón **"Realizar pago"** | Tap | ⊕ **PaymentModal** |
| Banner de **pago en revisión** | (no interactivo) | — Informativo |
| Banner de **pago aprobado** | (no interactivo) | — Informativo |
| Tarjeta de próximo entrenamiento | Tap | ⊕ **WorkoutDetailsModal** (sesión futura) |
| Botón acción rápida **"Iniciar entrenamiento"** | Tap | ⊕ **WorkoutDetailsModal** (para seleccionar cuál iniciar) |
| Botón acción rápida **"Ver progreso"** | Tap | → **AthletePlan** (tab Plan) |

---

### 3.2 AthleteCoach (Tab: Entrenador)

#### Vista: Perfil del Coach (default)

| Elemento | Acción | Destino |
|----------|--------|---------|
| Botón **"Chat"** | Tap | ⟳ Cambia a **Vista: Chat con Coach** (mismo componente) |
| Botón **"Mis entrenamientos"** | Tap | → **AthletePlan** (Tab: Plan) |
| Botón **"Plan de suscripción"** | Tap | → **AthleteSettings** → **AthleteSubscriptionPlan** |

#### Vista: Chat con Coach

| Elemento | Acción | Destino |
|----------|--------|---------|
| Botón **"←"** (volver) | Tap | ⟳ Vuelve a **Vista: Perfil del Coach** (mismo componente) |
| Campo de mensaje | Escribir | ⟳ Actualiza campo |
| Botón de imagen / adjunto | Tap | ⊕ Selector de archivo del dispositivo |
| Botón **"Enviar"** | Tap | ⟳ Envía el mensaje, aparece en el hilo |

---

### 3.3 AthleteCommunity (Tab: Comunidad)

| Elemento | Acción | Destino |
|----------|--------|---------|
| Botón ❤ "Me gusta" | Tap | ⟳ Toggle like, actualiza contador |
| Botón 💬 "Comentar" | Tap | ⟳ Incrementa contador (o abre vista de comentarios) |
| Botón "Compartir" | Tap | ⊕ Share sheet del sistema operativo |

> El atleta **no puede publicar**. Solo puede reaccionar y comentar las publicaciones de su coach.

---

### 3.4 AthleteCalendar (Tab: Calendario)

| Elemento | Acción | Destino |
|----------|--------|---------|
| Botón **"←"** (mes anterior) | Tap | ⟳ Muestra el mes anterior |
| Botón **"→"** (mes siguiente) | Tap | ⟳ Muestra el mes siguiente |
| Celda de día (con indicador) | Tap | ⟳ Selecciona ese día, muestra sus sesiones abajo |
| Celda de día (en blanco) | Tap | ⟳ Selecciona día, muestra "No hay sesiones" |
| Tarjeta de sesión **futura** en lista | Tap | ⊕ **WorkoutDetailsModal** (sesión futura) |
| Tarjeta de sesión **completada** en lista | Tap | ⊕ **WorkoutDetailsModal** (sesión pasada) |
| Tarjeta de **evento grupal** | Tap | ⊕ Modal de detalles del evento grupal |
| Botón **"+"** flotante | Tap | ⊕ **AddWorkoutModal** |
| Botón **"Ver todos"** / **"Hoy"** | Tap | ⟳ Vuelve a la vista del día actual |

#### AddWorkoutModal

| Elemento | Acción | Destino |
|----------|--------|---------|
| Botón **"×"** | Tap | ⊗ Cierra modal, vuelve a **AthleteCalendar** |
| Selector de fecha | Seleccionar | ⟳ Actualiza la fecha del nuevo workout |
| Input de nombre | Escribir | ⟳ Actualiza campo |
| Dropdown de tipo | Seleccionar | ⟳ Selecciona categoría |
| Input de hora | Seleccionar | ⟳ Actualiza hora |
| Input de duración | Escribir | ⟳ Actualiza duración estimada |
| Textarea de notas | Escribir | ⟳ Actualiza campo |
| Botón **"Agregar al calendario"** | Tap | ⟳ Agrega el workout al calendario, ⊗ cierra modal |

---

### 3.5 AthletePlan (Tab: Plan)

| Elemento | Acción | Destino |
|----------|--------|---------|
| Banner de sesiones sin puntuar: botón **"Puntuar"** | Tap | ⊕ **RPEModal** |
| Tarjeta de workout pendiente: botón **"Iniciar"** | Tap | → **WorkoutScreen** [overlay] (con ese workout) |
| Tarjeta de workout pendiente: botón **"Ver detalles"** | Tap | ⊕ **WorkoutDetailsModal** (sesión futura) |
| Tarjeta de workout completado: botón **"Puntuar"** | Tap | ⊕ **RPEModal** (para esa sesión sin RPE) |
| Tarjeta de workout completado (con RPE) | Tap | ⊕ **WorkoutDetailsModal** (sesión pasada) |

---

### 3.6 AthleteSettings (Panel de Configuración)

| Elemento | Acción | Destino |
|----------|--------|---------|
| Botón **"←"** / **"×"** (cerrar) | Tap | ⊗ Cierra panel, vuelve a la vista activa |
| Tarjeta de perfil | Tap | → Sub-página: **AthleteEditProfile** |
| **"Mi entrenador"** | Tap | → Sub-página: **AthleteMyCoach** |
| **"Plan de suscripción"** | Tap | → Sub-página: **AthleteSubscriptionPlan** |
| **"Wearables y apps"** | Tap | → Sub-página: **AthleteWearables** |
| **"Editar perfil"** | Tap | → Sub-página: **AthleteEditProfile** |
| **"Privacidad y seguridad"** | Tap | → Sub-página: Privacidad |
| Toggle **"Notificaciones"** | Tap | ⟳ Activa / desactiva notificaciones push |
| Toggle **"Modo oscuro"** | Tap | ⟳ Cambia el tema visual |
| **"Ayuda y soporte"** | Tap | → Sub-página: Soporte |
| Botón **"Cerrar sesión"** (rojo) | Tap | → **Login** (cierra sesión) |

#### Sub-página: AthleteMyCoach

| Elemento | Acción | Destino |
|----------|--------|---------|
| Botón **"←"** (volver) | Tap | ↩ → **AthleteSettings** (página principal) |
| Botón **"Enviar mensaje"** | Tap | → **AthleteCoach** (Tab: Entrenador) → Vista: Chat |
| Botón **"Cambiar entrenador"** | Tap | ⊕ Confirmación o pantalla de búsqueda por código |

#### Sub-página: AthleteSubscriptionPlan

| Elemento | Acción | Destino |
|----------|--------|---------|
| Botón **"←"** (volver) | Tap | ↩ → **AthleteSettings** (página principal) |
| Botón **"Cambiar plan"** | Tap | ⟳ Muestra lista de planes del coach |
| Botón **"Cancelar suscripción"** | Tap | ⊕ Modal de confirmación de cancelación |

#### Sub-página: AthleteWearables

| Elemento | Acción | Destino |
|----------|--------|---------|
| Botón **"←"** (volver) | Tap | ↩ → **AthleteSettings** (página principal) |
| Botón **"Conectar"** (por dispositivo) | Tap | → Flujo OAuth del dispositivo / Health permissions |
| Botón **"Desconectar"** (por dispositivo) | Tap | ⊕ Modal de confirmación de desconexión |

#### Sub-página: AthleteEditProfile

| Elemento | Acción | Destino |
|----------|--------|---------|
| Botón **"←"** (volver) | Tap | ↩ → **AthleteSettings** (página principal) |
| Upload avatar | Tap | ⊕ Selector de imagen del dispositivo |
| Campos de texto | Escribir | ⟳ Actualiza campo |
| Botón **"Guardar cambios"** | Tap | ⟳ Guarda cambios, ↩ → **AthleteSettings** |

---

## 4. Modales Globales (Atleta)

### 4.1 WorkoutDetailsModal (Sesión Futura)

| Elemento | Acción | Destino |
|----------|--------|---------|
| Botón **"×"** (cerrar) | Tap | ⊗ Cierra modal, vuelve a la pantalla anterior |
| Botón **"Iniciar entrenamiento"** | Tap | ⊗ Cierra modal → **WorkoutScreen** [overlay] |

### 4.2 WorkoutDetailsModal (Sesión Pasada)

| Elemento | Acción | Destino |
|----------|--------|---------|
| Botón **"×"** (cerrar) | Tap | ⊗ Cierra modal, vuelve a la pantalla anterior |
| Botón **"Puntuar ahora"** (si sin RPE) | Tap | ⊕ **RPEModal** |

---

### 4.3 WorkoutScreen [overlay full-screen]

| Elemento | Acción | Destino |
|----------|--------|---------|
| Botón **"×"** (salir) | Tap | ⊕ Modal de confirmación: **"¿Descartar sesión?"** |
| Confirmación **"Descartar"** | Tap | ⊗ Descarta la sesión, cierra **WorkoutScreen**, vuelve a la pantalla anterior |
| Confirmación **"Cancelar"** | Tap | ⊗ Cierra la confirmación, regresa a **WorkoutScreen** |
| Botón ⏸ **Pausar** | Tap | ⟳ Pausa el cronómetro, muestra banner de pausa |
| Botón ▶ **Reanudar** | Tap | ⟳ Reanuda el cronómetro, oculta banner de pausa |
| Etapa del entrenamiento (en lista) | Tap | ⟳ Marca etapa como completada / activa |
| Botón **"Finalizar entrenamiento"** (rojo) | Tap | ⊕ Modal de confirmación: **"¿Finalizar sesión?"** |
| Confirmación **"Confirmar"** (finalizar) | Tap | ⊗ Guarda sesión como completada, cierra **WorkoutScreen** → ⊕ **RPEModal** |
| Confirmación **"Cancelar"** (finalizar) | Tap | ⊗ Cierra la confirmación, regresa a **WorkoutScreen** |

---

### 4.4 RPEModal

| Elemento | Acción | Destino |
|----------|--------|---------|
| Botón **"Omitir"** (header) | Tap | ⊗ Cierra modal sin guardar RPE (sesión queda como "sin puntuar") |
| Botón de RPE **1–10** | Tap | ⟳ Selecciona el valor de RPE (resalta el botón) |
| Textarea de comentario | Escribir | ⟳ Actualiza el comentario opcional |
| Botón **"Omitir"** (footer) | Tap | ⊗ Cierra modal sin guardar RPE |
| Botón **"Guardar puntuación"** | Tap | ⟳ Guarda el RPE asociado a la sesión, ⊗ cierra modal |

---

### 4.5 PaymentModal

| Elemento | Acción | Destino |
|----------|--------|---------|
| Botón **"×"** (cerrar) | Tap | ⊗ Cierra modal, vuelve a **AthleteHome** |
| Botón 📋 copiar (banco) | Tap | 📋 Copia el banco al portapapeles |
| Botón 📋 copiar (número de cuenta) | Tap | 📋 Copia el número de cuenta |
| Botón 📋 copiar (nombre titular) | Tap | 📋 Copia el nombre |
| Botón 📋 copiar (RUT) | Tap | 📋 Copia el RUT |
| Botón 📋 copiar (email) | Tap | 📋 Copia el email |
| Input de monto | Escribir | ⟳ Actualiza el monto a pagar |
| Área de upload / botón adjuntar | Tap | ⊕ Selector de imagen o PDF del dispositivo |
| Botón **"Enviar comprobante"** | Tap | ⟳ Envía el pago, muestra **pantalla de éxito** |
| Pantalla de éxito: botón **"Cerrar"** | Tap | ⊗ Cierra modal, vuelve a **AthleteHome** (estado → "En revisión") |

---

## 5. Diagrama Textual de Flujo Completo

```
LOGIN
  ├── [Inicio sesión coach]    ──→  COACH VIEW
  ├── [Inicio sesión atleta]   ──→  ATHLETE VIEW
  └── [Regístrate]             ──→  REGISTRO PASO 1
        ├── [Coach]  ──→ Paso 2C ──→ Paso 3C ──→ Paso 4C ──→ Paso 5C ──→ COACH VIEW
        └── [Atleta] ──→ Paso 2A ──→ Paso 3A ──→ ATHLETE VIEW

COACH VIEW
  ├── [Tab: Inicio]
  │     ├── [Banner mensajes]   ──→  ⊕ MessagesPanel
  │     │       └── [Atleta]    ──→  ⊗ ──→ CoachAthletes > Chat
  │     └── [Banner pagos]      ──→  ⊕ CoachPaymentApprovalModal
  │             ├── [Aprobar]   ──→  ⟳ estado aprobado
  │             └── [Rechazar]  ──→  ⟳ estado rechazado
  │
  ├── [Tab: Atletas]
  │     ├── [Chat]              ──→  Sub-vista: Chat
  │     │       └── [←]        ──→  Lista Atletas
  │     ├── [Pago]              ──→  Sub-vista: Historial Pagos
  │     │       ├── [Revisar]   ──→  ⊕ CoachPaymentApprovalModal
  │     │       └── [←]        ──→  Lista Atletas
  │     ├── [Plan]              ──→  Sub-vista: Plan Atleta
  │     │       ├── [+]         ──→  ⊕ CoachAddWorkoutModal
  │     │       │     ├── [Asignar plan] ──→ ⊗ asigna plan
  │     │       │     └── [Agregar manual] ──→ ⊗ agrega sesión
  │     │       └── [←]        ──→  Lista Atletas
  │     ├── [Métricas]          ──→  Sub-vista: Métricas
  │     │       └── [←]        ──→  Lista Atletas
  │     └── [Ver perfil]        ──→  Sub-vista: Perfil
  │             ├── [Mensaje]   ──→  Sub-vista: Chat
  │             └── [←]        ──→  Lista Atletas
  │
  ├── [Tab: Comunidad]
  │     └── [Nueva publicación] ──→  ⊕ Modal nueva publicación
  │
  ├── [Tab: Calendario]
  │     ├── [Día]               ──→  ⟳ muestra sesiones del día
  │     ├── [GroupSessionCard]  ──→  ⟳ expande/colapsa detalles
  │     └── [+]                 ──→  ⊕ CreateGroupSessionModal
  │             └── [Crear]     ──→  ⊗ agrega sesión grupal al calendario
  │
  ├── [Tab: Planificación]
  │     ├── [Ejercicios]        ──→  ExercisesLibrary
  │     │       ├── [Nuevo]     ──→  ⊕ CreateExerciseModal
  │     │       ├── [Editar]    ──→  ⊕ CreateExerciseModal
  │     │       ├── [Eliminar]  ──→  ⊕ Confirmación
  │     │       └── [←]        ──→  PlanLibrary
  │     ├── [Nuevo]             ──→  ⊕ Modal nuevo plan ──→ WorkoutPlanner
  │     ├── [Plan card]         ──→  WorkoutPlanner
  │     │       ├── [Guardar]   ──→  PlanLibrary
  │     │       ├── [Bloque+]   ──→  ⟳ agrega bloque
  │     │       ├── [Ejercicio+]──→  ⟳ agrega fila
  │     │       ├── [Crear Ej.] ──→  ⊕ CreateExerciseModal
  │     │       ├── [Pizarra]   ──→  ⊕ DrawingBoard
  │     │       └── [←]        ──→  PlanLibrary
  │     ├── [Asignar]           ──→  ⊕ AssignWorkoutModal
  │     ├── [Atletas]           ──→  ⊕ Modal ver atletas
  │     └── [Eliminar]          ──→  ⊕ Confirmación
  │
  └── [⚙ Config]               ──→  ⊕ CoachSettings
          ├── [Editar perfil]   ──→  EditProfilePage
          │       └── [←]      ──→  CoachSettings
          ├── [Config coach]    ──→  CoachConfigPage (planes de atletas)
          │       └── [←]      ──→  CoachSettings
          ├── [Suscripción]     ──→  SubscriptionPage
          │       └── [←]      ──→  CoachSettings
          ├── [Soporte]         ──→  AboutPage
          │       └── [←]      ──→  CoachSettings
          └── [Cerrar sesión]   ──→  Login

ATHLETE VIEW
  ├── [Tab: Inicio]
  │     ├── [Volver workout]    ──→  WorkoutScreen [overlay]
  │     ├── [Puntuar sesión]    ──→  ⊕ RPEModal
  │     ├── [Realizar pago]     ──→  ⊕ PaymentModal
  │     └── [Próximo workout]   ──→  ⊕ WorkoutDetailsModal
  │
  ├── [Tab: Entrenador]
  │     ├── [Chat]              ──→  Vista: Chat con Coach
  │     │       └── [←]        ──→  Vista: Perfil Coach
  │     ├── [Mis entrenos]      ──→  Tab: Plan
  │     └── [Suscripción]       ──→  AthleteSettings > Suscripción
  │
  ├── [Tab: Comunidad]
  │     └── [Like/Comentar]     ──→  ⟳ actualiza contadores
  │
  ├── [Tab: Calendario]
  │     ├── [Día]               ──→  ⟳ muestra sesiones del día
  │     ├── [Sesión futura]     ──→  ⊕ WorkoutDetailsModal
  │     │       └── [Iniciar]   ──→  WorkoutScreen [overlay]
  │     ├── [Sesión pasada]     ──→  ⊕ WorkoutDetailsModal
  │     │       └── [Puntuar]   ──→  ⊕ RPEModal
  │     └── [+]                 ──→  ⊕ AddWorkoutModal
  │
  ├── [Tab: Plan]
  │     ├── [Iniciar workout]   ──→  WorkoutScreen [overlay]
  │     ├── [Ver detalles]      ──→  ⊕ WorkoutDetailsModal
  │     └── [Puntuar]           ──→  ⊕ RPEModal
  │
  ├── [WorkoutScreen] [overlay]
  │     ├── [×]                 ──→  ⊕ Confirmar descarte
  │     │       ├── [Descartar] ──→  ⊗ cierra WorkoutScreen
  │     │       └── [Cancelar]  ──→  WorkoutScreen
  │     ├── [⏸/▶]              ──→  ⟳ pausa/reanuda
  │     └── [Finalizar]         ──→  ⊕ Confirmar fin
  │             ├── [Confirmar] ──→  ⊗ cierra ──→ ⊕ RPEModal
  │             └── [Cancelar]  ──→  WorkoutScreen
  │
  └── [⚙ Config]               ──→  ⊕ AthleteSettings
          ├── [Mi entrenador]   ──→  AthleteMyCoach
          │       └── [Mensaje] ──→  Tab: Entrenador > Chat
          ├── [Suscripción]     ──→  AthleteSubscriptionPlan
          ├── [Wearables]       ──→  AthleteWearables
          ├── [Editar perfil]   ──→  AthleteEditProfile
          └── [Cerrar sesión]   ──→  Login
```

---

## 6. Notas de Implementación

### Comportamientos especiales de navegación

| Comportamiento | Detalle |
|----------------|---------|
| **WorkoutScreen persiste en segundo plano** | Cuando el atleta navega a otro tab mientras hay un workout activo, el cronómetro sigue corriendo. El banner en Home y el botón de estado global permiten volver al WorkoutScreen. |
| **PlanLibrary tiene 3 sub-vistas** | La navegación entre PlanLibrary ↔ WorkoutPlanner ↔ ExercisesLibrary se maneja con un estado `view` en `CoachPlan.tsx`, no con rutas separadas. |
| **CoachAthletes tiene 5 sub-vistas** | Chat, Pagos, Plan, Métricas y Perfil se manejan con un estado `currentView` y `selectedAthlete` en `CoachAthletes.tsx`. |
| **CoachSettings tiene 4 sub-páginas** | EditProfilePage, CoachConfigPage, SubscriptionPage y AboutPage se manejan con un estado `subPage: 'edit-profile' | 'coach-config' | 'subscription' | 'about' | null` en `CoachSettings.tsx`, usando early returns. |
| **AthleteCoach tiene 2 estados** | El mismo componente alterna entre "Perfil del Coach" y "Chat" con un estado booleano interno. |
| **CoachCalendar es solo vista mensual** | Se eliminó el toggle Mes/Semana. La vista es siempre mensual. El día actual queda seleccionado por defecto al montar el componente. |
| **CoachAddWorkoutModal tiene 2 pestañas** | La pestaña "Biblioteca" permite buscar y asignar planes existentes con frecuencia. La pestaña "Manual" es la asignación rápida por deporte. Mismo componente, estado `activeTab`. |
| **Modales de confirmación** | Todos los "eliminar" y "descartar" muestran un modal de confirmación antes de ejecutar la acción destructiva. |
| **Modales de éxito** | PaymentModal y CoachPaymentApprovalModal muestran una pantalla de éxito/rechazo interna antes de cerrarse. |
| **Navegación a tab desde otra vista** | Botones como "Mis entrenamientos" en AthleteCoach cambian el tab activo directamente. |
| **CustomEvent para navegación desacoplada** | El botón "Ejercicios" en PlanLibrary dispara `window.dispatchEvent(new CustomEvent('navigate-exercises'))` para comunicarse con el padre `CoachPlan`. |
