# Athletica — Historias de Usuario

## Convenciones

- **Formato:** Como [rol], quiero [acción], para [beneficio]
- **Prioridad:** 🔴 Alta | 🟡 Media | 🟢 Baja
- **Estado actual:** ✅ Implementado en prototipo | 🔲 Pendiente de backend | ⬜ No implementado

---

## Épica 1: Autenticación y Registro

### HU-001 — Login de usuario
**Prioridad:** 🔴 Alta | **Estado:** ✅

**Como** usuario (coach o atleta),
**quiero** iniciar sesión con mi email y contraseña,
**para** acceder a mi vista personalizada según mi rol.

**Criterios de aceptación:**
- El sistema valida que el email y contraseña sean correctos
- Muestra error si las credenciales son incorrectas
- Redirige al coach a la vista de coach, y al atleta a la vista de atleta
- La sesión persiste hasta que el usuario cierre sesión manualmente

---

### HU-002 — Registro de Coach
**Prioridad:** 🔴 Alta | **Estado:** ✅ (UI) / 🔲 (backend)

**Como** entrenador personal,
**quiero** registrarme como coach con mi información profesional,
**para** poder ofrecer mis servicios a atletas a través de la plataforma.

**Criterios de aceptación:**
- El flujo consta de 5 pasos: datos básicos, perfil profesional, suscripción, planes para atletas, código de vinculación
- Puede subir foto de perfil y logo
- Puede seleccionar los deportes en los que trabaja (multi-selección)
- Selecciona su plan de suscripción de Athletica
- Puede crear hasta 3 planes de suscripción para sus atletas en el paso 4
- Recibe un código de vinculación único al finalizar

---

### HU-003 — Registro de Atleta
**Prioridad:** 🔴 Alta | **Estado:** ✅ (UI) / 🔲 (backend)

**Como** atleta,
**quiero** registrarme con mis datos personales y deportivos,
**para** poder conectarme con mi entrenador y comenzar a entrenar.

**Criterios de aceptación:**
- El flujo consta de 3 pasos: datos básicos, perfil físico/deportivo, vinculación con coach
- Puede ingresar su talla, peso, aptitud física (slider 1-10), objetivo y logros
- Puede buscar a su coach por código de vinculación en el paso 3
- Puede omitir el paso de vinculación y hacerlo después desde Configuración
- Al vincular con un coach, queda asociado a él en el sistema

---

### HU-004 — Cerrar sesión
**Prioridad:** 🟡 Media | **Estado:** ✅

**Como** usuario,
**quiero** cerrar sesión desde la configuración,
**para** proteger mi cuenta en dispositivos compartidos.

---

### HU-005 — Recuperación de contraseña
**Prioridad:** 🟡 Media | **Estado:** ⬜

**Como** usuario,
**quiero** recuperar mi contraseña mediante mi email,
**para** poder acceder a mi cuenta si la olvidé.

**Criterios de aceptación:**
- Existe un link "¿Olvidaste tu contraseña?" en la pantalla de login
- Se envía un email con enlace de restablecimiento
- El enlace expira en 24 horas

---

## Épica 2: Gestión de Atletas (Coach)

### HU-006 — Ver lista de atletas
**Prioridad:** 🔴 Alta | **Estado:** ✅

**Como** coach,
**quiero** ver la lista de todos mis atletas con su estado y métricas clave,
**para** tener un resumen rápido de cómo está mi equipo.

**Criterios de aceptación:**
- Muestra nombre, avatar (inicial), estado (Activo, En revisión, Deuda)
- Muestra sesiones completadas, última sesión y progreso en porcentaje
- Permite buscar atletas por nombre
- Muestra alertas visuales de pagos vencidos o comprobantes pendientes

---

### HU-007 — Ver perfil completo de un atleta
**Prioridad:** 🟡 Media | **Estado:** ✅

**Como** coach,
**quiero** ver el perfil completo de un atleta,
**para** conocer su información personal, objetivos y historial.

---

### HU-008 — Ver métricas de un atleta
**Prioridad:** 🔴 Alta | **Estado:** ✅

**Como** coach,
**quiero** ver las métricas de rendimiento de mis atletas (RPE, FC, progreso),
**para** tomar decisiones informadas sobre su planificación.

**Criterios de aceptación:**
- Muestra gráficos de RPE histórico, FC promedio y progreso general
- Permite filtrar por período: semana / mes / 3 meses
- Muestra estadísticas clave: sesiones totales, tiempo entrenado, RPE promedio, FC promedio

---

### HU-009 — Chat con atleta
**Prioridad:** 🔴 Alta | **Estado:** ✅ (UI) / 🔲 (backend)

**Como** coach,
**quiero** enviar y recibir mensajes con cada uno de mis atletas,
**para** comunicarme directamente sobre entrenamientos, feedback y consultas.

**Criterios de aceptación:**
- El chat es 1:1 entre coach y atleta
- Muestra historial de mensajes con diferenciación visual coach/atleta
- Permite adjuntar imágenes
- Mensajes nuevos se notifican con badge

---

### HU-010 — Generar código de vinculación
**Prioridad:** 🔴 Alta | **Estado:** ✅ (UI) / 🔲 (backend)

**Como** coach,
**quiero** tener un código único de vinculación,
**para** que mis atletas puedan encontrarme y conectarse conmigo.

**Criterios de aceptación:**
- El código se genera automáticamente al crear la cuenta
- Puede editarse y personalizarse
- Puede copiarse o compartirse directamente desde la app

---

## Épica 3: Planificación de Entrenamientos (Coach)

### HU-011 — Ver biblioteca de planes
**Prioridad:** 🔴 Alta | **Estado:** ✅

**Como** coach,
**quiero** ver todos mis planes de entrenamiento organizados por categorías,
**para** encontrar y reutilizar planes fácilmente.

**Criterios de aceptación:**
- Los planes se agrupan bajo subtítulos por categoría
- Se puede buscar por nombre del plan
- Se puede filtrar por categoría desde un dropdown
- Muestra estadísticas: total de planes, bloques y categorías

---

### HU-012 — Crear un plan de entrenamiento
**Prioridad:** 🔴 Alta | **Estado:** ✅

**Como** coach,
**quiero** crear planes de entrenamiento con bloques y ejercicios,
**para** estructurar las sesiones de mis atletas con detalle.

**Criterios de aceptación:**
- El plan tiene nombre, notas, tipo (individual/grupal) y categoría
- Se pueden agregar bloques de entrenamiento (Cardio, Halterofilia, Flexibilidad, Deporte Específico, Recuperación, Otro)
- Dentro de cada bloque se agregan ejercicios con campos: nombre, series, repeticiones, duración, intensidad, notas
- Los bloques se pueden reordenar mediante drag & drop
- Se pueden adjuntar archivos o dibujos a mano en una pizarra

---

### HU-013 — Editar un plan existente
**Prioridad:** 🔴 Alta | **Estado:** ✅

**Como** coach,
**quiero** editar cualquiera de mis planes guardados,
**para** actualizar los ejercicios, bloques o información del plan.

---

### HU-014 — Duplicar un plan
**Prioridad:** 🟡 Media | **Estado:** ✅

**Como** coach,
**quiero** copiar un plan existente para usarlo como base,
**para** ahorrar tiempo al crear variantes de un mismo tipo de entrenamiento.

---

### HU-015 — Eliminar un plan
**Prioridad:** 🟡 Media | **Estado:** ✅

**Como** coach,
**quiero** eliminar planes que ya no uso,
**para** mantener mi biblioteca organizada.

**Criterios de aceptación:**
- Muestra una confirmación antes de eliminar
- No se puede eliminar un plan si tiene atletas asignados (advertencia)

---

### HU-016 — Gestionar categorías de planes
**Prioridad:** 🟡 Media | **Estado:** ✅

**Como** coach,
**quiero** crear, ver y eliminar las categorías de mis planes,
**para** organizar mi biblioteca de la forma que prefiera.

**Criterios de aceptación:**
- Existen 6 categorías predeterminadas del sistema
- Puede crear categorías personalizadas
- Solo puede eliminar categorías que no tienen planes asociados

---

### HU-017 — Asignar plan a atletas
**Prioridad:** 🔴 Alta | **Estado:** ✅ (UI) / 🔲 (backend)

**Como** coach,
**quiero** asignar un plan de entrenamiento a uno o varios atletas,
**para** que aparezca en su calendario y plan de entrenamiento.

**Criterios de aceptación:**
- Puede seleccionar múltiples atletas con checkboxes
- Define fecha de inicio
- Define frecuencia: una vez, diario, semanal o personalizado (días específicos)
- Puede agregar notas de la asignación
- La asignación se refleja en la vista del atleta

---

### HU-018 — Ver atletas asignados a un plan
**Prioridad:** 🟡 Media | **Estado:** ✅

**Como** coach,
**quiero** ver qué atletas tienen asignado un plan específico,
**para** saber el alcance de cada plan y las fechas de sus asignaciones.

---

### HU-019 — Crear ejercicio personalizado
**Prioridad:** 🟡 Media | **Estado:** ✅

**Como** coach,
**quiero** crear mis propios ejercicios personalizados con categoría, video y notas,
**para** tener una biblioteca de ejercicios adaptada a mis métodos.

**Criterios de aceptación:**
- Nombre del ejercicio (obligatorio)
- Categoría seleccionable desde dropdown (o crear nueva)
- URL de video de referencia (opcional)
- Notas técnicas (opcional)
- Los ejercicios personalizados se distinguen de los predeterminados con un badge

---

### HU-020 — Ver biblioteca de ejercicios
**Prioridad:** 🟡 Media | **Estado:** ✅

**Como** coach,
**quiero** ver todos los ejercicios disponibles (predeterminados y personalizados),
**para** encontrar y añadir ejercicios rápidamente al construir un plan.

**Criterios de aceptación:**
- Búsqueda por nombre
- Filtrado por categoría (chips horizontales con scroll)
- Diferenciación visual entre predeterminados y personalizados
- Puede ver detalles, editar o eliminar ejercicios personalizados

---

## Épica 4: Ejecución de Entrenamientos (Atleta)

### HU-021 — Ver plan de entrenamiento asignado
**Prioridad:** 🔴 Alta | **Estado:** ✅

**Como** atleta,
**quiero** ver los entrenamientos que mi coach me ha asignado,
**para** saber qué tengo que hacer y cuándo.

**Criterios de aceptación:**
- Separados en "Pendientes" y "Completados"
- Muestra nombre, duración, dificultad, descripción y etapas
- Muestra estadísticas: total / completados / pendientes

---

### HU-022 — Iniciar un entrenamiento
**Prioridad:** 🔴 Alta | **Estado:** ✅

**Como** atleta,
**quiero** iniciar un entrenamiento desde mi plan o calendario,
**para** comenzar a registrar mi sesión en tiempo real.

**Criterios de aceptación:**
- Al iniciar, aparece la pantalla de entrenamiento (WorkoutScreen)
- El cronómetro comienza automáticamente
- Las métricas se actualizan en tiempo real (simulación de wearable)

---

### HU-023 — Ver métricas durante el entrenamiento
**Prioridad:** 🔴 Alta | **Estado:** ✅

**Como** atleta,
**quiero** ver mis métricas en tiempo real mientras entreno,
**para** mantener el control de mi esfuerzo y rendimiento.

**Criterios de aceptación:**
- Muestra: Frecuencia cardíaca (bpm + zona 1-5), Ritmo (min/km), Cadencia (spm), Calorías
- Las métricas cambian dinámicamente durante la sesión

---

### HU-024 — Pausar y reanudar entrenamiento
**Prioridad:** 🔴 Alta | **Estado:** ✅

**Como** atleta,
**quiero** pausar y reanudar mi entrenamiento,
**para** atender interrupciones sin perder el registro de la sesión.

**Criterios de aceptación:**
- El cronómetro se detiene al pausar y continúa al reanudar
- El tiempo de pausa no se cuenta en la duración total
- Se muestra un banner visual durante la pausa

---

### HU-025 — Finalizar entrenamiento
**Prioridad:** 🔴 Alta | **Estado:** ✅

**Como** atleta,
**quiero** finalizar un entrenamiento de forma explícita,
**para** que la sesión quede registrada y pueda evaluarla.

**Criterios de aceptación:**
- Pide confirmación antes de finalizar
- Al confirmar, registra la sesión como completada
- Abre automáticamente el modal de puntuación RPE

---

### HU-026 — Salir de un entrenamiento sin guardar
**Prioridad:** 🟡 Media | **Estado:** ✅

**Como** atleta,
**quiero** poder salir de un entrenamiento activo sin guardar,
**para** cancelar una sesión que empecé por error.

**Criterios de aceptación:**
- Pide confirmación antes de descartar ("¿Descartar sesión?")
- Si confirma, se descarta la sesión sin guardar

---

### HU-027 — Puntuar esfuerzo percibido (RPE)
**Prioridad:** 🔴 Alta | **Estado:** ✅

**Como** atleta,
**quiero** puntuar mi esfuerzo percibido (RPE 1-10) después de una sesión,
**para** que mi coach tenga información sobre la carga de entrenamiento.

**Criterios de aceptación:**
- Escala de 1 a 10 con colores por zona
- Muestra etiquetas de zona: Recuperación, Aeróbico, Umbral, Anaeróbico, VO₂ máx
- Campo de comentario opcional
- Puede omitirse con el botón "Omitir" (queda como sesión sin puntuar)
- Las sesiones sin puntuar muestran alertas en Home y Plan hasta que se puntúen

---

### HU-028 — Puntuar sesiones pendientes
**Prioridad:** 🟡 Media | **Estado:** ✅

**Como** atleta,
**quiero** poder puntuar sesiones que dejé sin puntuar anteriormente,
**para** mantener actualizado el registro de mis entrenamientos.

**Criterios de aceptación:**
- Las sesiones sin puntuar aparecen en Home y en la sección Completados del Plan
- Un botón "Puntuar" en cada sesión abre el RPEModal correspondiente

---

## Épica 5: Calendario

### HU-029 — Ver calendario mensual del coach
**Prioridad:** 🟡 Media | **Estado:** ✅

**Como** coach,
**quiero** ver un calendario con todas las sesiones de mis atletas,
**para** tener una visión global de la carga de entrenamiento del equipo.

---

### HU-030 — Ver calendario personal del atleta
**Prioridad:** 🔴 Alta | **Estado:** ✅

**Como** atleta,
**quiero** ver mi calendario con mis sesiones pasadas y futuras,
**para** planificar mis semanas y revisar mi historial.

**Criterios de aceptación:**
- Los días tienen indicadores de color: verde (completado+RPE), ámbar (completado-RPE), azul (programado), púrpura (evento grupal)
- Al tocar un día, muestra las sesiones de ese día
- Permite navegar entre meses

---

### HU-031 — Agregar entrenamiento al calendario (Atleta)
**Prioridad:** 🟢 Baja | **Estado:** ✅

**Como** atleta,
**quiero** agregar un entrenamiento libre a mi calendario,
**para** registrar sesiones que hago fuera del plan asignado por mi coach.

---

### HU-032 — Ver eventos grupales del coach
**Prioridad:** 🟡 Media | **Estado:** ✅

**Como** atleta,
**quiero** ver los eventos grupales que mi coach organiza,
**para** participar en sesiones colectivas y conocer el lugar y horario.

---

## Épica 6: Pagos

### HU-033 — Ver estado de pago
**Prioridad:** 🔴 Alta | **Estado:** ✅

**Como** atleta,
**quiero** ver el estado actual de mi pago mensual,
**para** saber si tengo deudas pendientes o si mi pago fue aprobado.

**Criterios de aceptación:**
- Estado posible: sin deuda / pago vencido / pago en revisión / pago aprobado
- Alerta visual en Home según el estado
- Colores diferenciados: rojo (vencido), azul (revisión), verde (aprobado)

---

### HU-034 — Enviar comprobante de pago
**Prioridad:** 🔴 Alta | **Estado:** ✅

**Como** atleta,
**quiero** enviar el comprobante de mi transferencia bancaria,
**para** que mi coach pueda verificar y aprobar mi pago.

**Criterios de aceptación:**
- Muestra los datos bancarios del coach (copiables con un toque)
- Permite ingresar el monto pagado
- Permite adjuntar una imagen o PDF como comprobante
- Muestra pantalla de éxito al enviar

---

### HU-035 — Aprobar o rechazar pago de atleta (Coach)
**Prioridad:** 🔴 Alta | **Estado:** ✅

**Como** coach,
**quiero** revisar los comprobantes de pago de mis atletas y aprobarlos o rechazarlos,
**para** llevar control de los cobros de mis servicios.

**Criterios de aceptación:**
- Alerta visible en el Inicio del coach
- Modal con los datos del pago y el comprobante (imagen/PDF visualizable)
- Botones de aprobación (verde) y rechazo (rojo)
- El estado del pago se actualiza para el atleta al aprobar/rechazar

---

### HU-036 — Ver historial de pagos del atleta (Coach)
**Prioridad:** 🟡 Media | **Estado:** ✅

**Como** coach,
**quiero** ver el historial completo de pagos de cada atleta,
**para** tener registro de deudas, pagos realizados y montos.

---

## Épica 7: Comunidad

### HU-037 — Publicar en la comunidad (Coach)
**Prioridad:** 🟡 Media | **Estado:** ✅

**Como** coach,
**quiero** publicar mensajes, tips y noticias en el feed de mi comunidad,
**para** mantener motivados e informados a mis atletas.

**Criterios de aceptación:**
- Puede crear texto con imagen opcional
- Las publicaciones aparecen en el feed de todos sus atletas
- Puede ver los contadores de "me gusta" y comentarios

---

### HU-038 — Ver publicaciones del coach (Atleta)
**Prioridad:** 🟡 Media | **Estado:** ✅

**Como** atleta,
**quiero** ver las publicaciones de mi entrenador en la comunidad,
**para** mantenerme informado y motivado.

**Criterios de aceptación:**
- El feed muestra todas las publicaciones del coach
- Puede dar "me gusta" y comentar
- Se indica claramente que solo el coach puede publicar

---

## Épica 8: Perfil y Configuración

### HU-039 — Editar perfil personal
**Prioridad:** 🟡 Media | **Estado:** ✅ (UI) / 🔲 (backend)

**Como** usuario,
**quiero** editar mi información personal (nombre, email, teléfono, avatar),
**para** mantener mis datos actualizados.

---

### HU-040 — Gestionar notificaciones
**Prioridad:** 🟢 Baja | **Estado:** ✅ (UI) / ⬜ (funcionalidad real)

**Como** usuario,
**quiero** activar o desactivar las notificaciones push,
**para** controlar cuándo la app me interrumpe.

---

### HU-041 — Conectar wearables y apps de salud (Atleta)
**Prioridad:** 🟡 Media | **Estado:** ✅ (UI) / ⬜ (integración real)

**Como** atleta,
**quiero** conectar mi Apple Watch, Garmin u otras apps de salud,
**para** que mis métricas de entrenamiento se registren automáticamente.

---

### HU-042 — Ver y cambiar plan de suscripción (Coach con Athletica)
**Prioridad:** 🟡 Media | **Estado:** ✅ (UI) / 🔲 (backend)

**Como** coach,
**quiero** ver mi plan de suscripción actual y poder cambiarlo,
**para** adaptar mi plan al tamaño de mi equipo de atletas.

---

### HU-043 — Ver perfil del coach (Atleta)
**Prioridad:** 🟡 Media | **Estado:** ✅

**Como** atleta,
**quiero** ver el perfil completo de mi coach con su especialidad, experiencia y rating,
**para** conocer mejor a quien me entrena.

---

## Épica 9: Notificaciones (Futuro)

### HU-044 — Notificación de nuevo workout asignado
**Prioridad:** 🔴 Alta | **Estado:** ⬜

**Como** atleta,
**quiero** recibir una notificación cuando mi coach me asigne un nuevo entrenamiento,
**para** estar al tanto de mi plan actualizado.

---

### HU-045 — Notificación de sesión próxima
**Prioridad:** 🟡 Media | **Estado:** ⬜

**Como** atleta,
**quiero** recibir un recordatorio antes de una sesión programada,
**para** prepararme con antelación.

---

### HU-046 — Notificación de pago aprobado/rechazado
**Prioridad:** 🔴 Alta | **Estado:** ⬜

**Como** atleta,
**quiero** recibir una notificación cuando mi coach apruebe o rechace mi pago,
**para** saber el estado de mi cuenta sin tener que revisar la app constantemente.

---

### HU-047 — Notificación de mensaje nuevo
**Prioridad:** 🔴 Alta | **Estado:** ⬜

**Como** usuario,
**quiero** recibir una notificación cuando recibo un mensaje nuevo en el chat,
**para** poder responder rápidamente.

---

### HU-048 — Notificación de pago pendiente (Coach)
**Prioridad:** 🟡 Media | **Estado:** ⬜

**Como** coach,
**quiero** recibir una notificación cuando un atleta envíe un comprobante de pago,
**para** revisarlo y aprobarlo a tiempo.

---

## Resumen por Épica

| Épica | HUs | Implementadas (prototipo) | Pendientes backend | No implementadas |
|-------|-----|--------------------------|-------------------|-----------------|
| 1. Autenticación | 5 | 4 | 1 | 1 |
| 2. Gestión Atletas | 5 | 5 | 1 | 0 |
| 3. Planificación | 10 | 10 | 2 | 0 |
| 4. Ejecución | 8 | 8 | 0 | 0 |
| 5. Calendario | 4 | 4 | 0 | 0 |
| 6. Pagos | 4 | 4 | 1 | 0 |
| 7. Comunidad | 2 | 2 | 0 | 0 |
| 8. Perfil/Config | 5 | 5 | 2 | 1 |
| 9. Notificaciones | 5 | 0 | 0 | 5 |
| **Total** | **48** | **42** | **7** | **7** |
