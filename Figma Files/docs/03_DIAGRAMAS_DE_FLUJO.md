# Athletica — Diagramas de Flujo

> Los diagramas están escritos en sintaxis **Mermaid**. Se visualizan automáticamente en GitHub, GitLab, Notion, Obsidian y la mayoría de editores de documentación modernos.

---

## Flujo 1 — Autenticación y Registro

```mermaid
flowchart TD
    A([Inicio de la App]) --> B{¿Sesión activa?}
    B -->|Sí| C{Rol guardado}
    B -->|No| D[Pantalla de Login]
    C -->|Coach| CV[Vista Coach]
    C -->|Atleta| AV[Vista Atleta]
    
    D --> E{Credenciales válidas?}
    E -->|No| F[Mostrar error] --> D
    E -->|Sí - Coach| CV
    E -->|Sí - Atleta| AV
    D --> G[Registro]
    
    G --> H{Selección de Rol}
    H -->|Coach| RC1[Paso 1: Datos básicos]
    H -->|Atleta| RA1[Paso 1: Datos básicos]
    
    RC1 --> RC2[Paso 2: Perfil profesional]
    RC2 --> RC3[Paso 3: Plan Athletica]
    RC3 --> RC4[Paso 4: Crear planes para atletas]
    RC4 --> RC5[Paso 5: Código de vinculación]
    RC5 --> CV
    
    RA1 --> RA2[Paso 2: Perfil físico y deportivo]
    RA2 --> RA3[Paso 3: Vincular con coach]
    RA3 --> |Ingresa código| RA4{Coach encontrado?}
    RA4 -->|Sí| RA5[Confirmar vinculación]
    RA4 -->|No| RA6[Mostrar error] --> RA3
    RA3 -->|Omitir| AV
    RA5 --> AV
```

---

## Flujo 2 — Ejecución de Entrenamiento (Atleta)

```mermaid
flowchart TD
    A([Atleta en Plan o Calendario]) --> B[Toca un workout pendiente]
    B --> C[WorkoutDetailsModal se abre]
    C --> D{Sesión futura o pasada?}
    D -->|Pasada| E[Ver métricas históricas]
    D -->|Futura| F[Botón: Iniciar entrenamiento]
    
    F --> G[WorkoutScreen activa]
    G --> H[Cronómetro inicia ▶]
    H --> I{Acción del atleta}
    
    I -->|Pausa| J[Cronómetro se pausa ⏸]
    J -->|Reanudar| H
    
    I -->|Salir ×| K{¿Confirmar salida?}
    K -->|Cancelar| H
    K -->|Descartar| L[Sesión descartada sin guardar]
    L --> M([Regresa a vista anterior])
    
    I -->|Finalizar| N{¿Confirmar finalización?}
    N -->|Cancelar| H
    N -->|Confirmar| O[Sesión guardada como completada]
    O --> P[RPEModal se abre automáticamente]
    
    P --> Q{Atleta puntúa o omite}
    Q -->|Puntúa RPE 1-10 + comentario| R[RPE guardado con la sesión]
    Q -->|Omite| S[Sesión queda como 'sin puntuar']
    
    R --> T([Sesión completamente registrada])
    S --> T
    
    T --> U[Badge de sesiones sin puntuar visible en Home y Plan]
    U --> V{Atleta quiere puntuar después?}
    V -->|Sí - desde Home o Plan| P
    V -->|No| W([Queda pendiente])
```

---

## Flujo 3 — Gestión de Pagos

```mermaid
flowchart TD
    subgraph ATLETA
        A1([Atleta ve alerta de pago vencido en Home]) --> A2[Abre PaymentModal]
        A2 --> A3[Ve datos bancarios del coach]
        A3 --> A4[Realiza la transferencia bancaria]
        A4 --> A5[Ingresa monto en PaymentModal]
        A5 --> A6[Adjunta comprobante imagen/PDF]
        A6 --> A7[Presiona Enviar comprobante]
        A7 --> A8[Pantalla de éxito]
        A8 --> A9[Estado cambia a En revisión]
    end

    subgraph COACH
        C1([Coach ve alerta en Inicio]) --> C2[Abre CoachPaymentApprovalModal]
        C2 --> C3[Ve nombre del atleta, monto, fecha]
        C3 --> C4[Abre y visualiza el comprobante]
        C4 --> C5{¿Aprueba o rechaza?}
        C5 -->|Aprobar| C6[Estado → Aprobado ✓]
        C5 -->|Rechazar| C7[Estado → Rechazado ✗]
        C6 --> C8[Notificación al atleta]
        C7 --> C8
    end

    A9 -.->|El pago aparece en la cola del coach| C1
    C8 -.->|Estado actualizado en vista del atleta| A9_2([Atleta ve Aprobado o Rechazado en Home])
```

---

## Flujo 4 — Planificación y Asignación de Entrenamientos (Coach)

```mermaid
flowchart TD
    A([Coach en Tab Planificación]) --> B{¿Qué quiere hacer?}
    
    B -->|Ver ejercicios| C[Abre Biblioteca de Ejercicios]
    C --> D{Acción en ejercicios}
    D -->|Buscar/filtrar| E[Resultado filtrado]
    D -->|Crear nuevo| F[CreateExerciseModal]
    F --> G[Nombre + Categoría + Video + Notas]
    G --> H[Ejercicio guardado en biblioteca]
    D -->|Editar personalizado| F
    D -->|Eliminar| I[Confirmación → Eliminar]
    
    B -->|Crear nuevo plan| J[Modal Nuevo Plan]
    J --> K[Tipo: Individual o Grupo]
    K --> L[Categoría existente o nueva]
    L --> M[WorkoutPlanner abre]
    
    B -->|Editar plan existente| M
    
    M --> N[Nombre del plan + notas]
    N --> O[Agregar bloque de entrenamiento]
    O --> P[Tipo de bloque: Cardio, Halterofilia, etc.]
    P --> Q{Agregar ejercicios}
    Q -->|Ejercicio en blanco| R[ExerciseRow editable]
    Q -->|Crear ejercicio| F
    R --> S{¿Más bloques?}
    S -->|Sí| O
    S -->|No| T[Adjuntar archivos / pizarra opcional]
    T --> U[Guardar plan]
    U --> V[Plan en biblioteca]
    
    B -->|Asignar plan| W[AssignWorkoutModal desde PlanLibrary]
    V --> W
    W --> X[Seleccionar atleta/s]
    X --> Y[Definir fecha inicio]
    Y --> Z[Frecuencia: Única / Diario / Semanal / Custom]
    Z --> AA[Notas opcionales]
    AA --> AB[Confirmar asignación]
    AB --> AC[Plan aparece en calendario y plan del atleta]
```

---

## Flujo 5 — Registro de Coach (Onboarding completo)

```mermaid
flowchart TD
    A([Nuevo usuario selecciona Rol: Coach]) --> B[Paso 1: Datos básicos]
    B --> B1[Nombre, Apellido, Fecha de nacimiento]
    B1 --> B2[Email, Contraseña]
    B2 --> B3{Validación}
    B3 -->|Error| B -->|Corrige| B3
    B3 -->|OK| C[Paso 2: Perfil profesional]
    
    C --> C1[Avatar + Logo]
    C1 --> C2[Nombre del negocio, Frase]
    C2 --> C3[Años de experiencia, Ciudad]
    C3 --> C4[Deportes multi-selección]
    C4 --> C5[Redes sociales]
    C5 --> D[Paso 3: Selección de plan Athletica]
    
    D --> D1{Plan seleccionado}
    D1 -->|Free| D2[0 a 3 atletas - Gratis]
    D1 -->|Starter| D3[4-20 atletas - $29/mes]
    D1 -->|Pro| D4[21-70 atletas - $79/mes]
    D1 -->|Max| D5[71-100 atletas - $149/mes]
    D1 -->|Enterprise| D6[100+ - Contactar]
    D2 & D3 & D4 & D5 & D6 --> E[Paso 4: Crear planes de atleta]
    
    E --> E1{¿Crear plan ahora?}
    E1 -->|Sí| E2[Nombre, descripción, frecuencia, sesiones, deporte, precio]
    E2 --> E3[Agregar plan a la lista]
    E3 --> E1
    E1 -->|Siguiente| F[Paso 5: Código de vinculación]
    
    F --> F1[Código generado automáticamente]
    F1 --> F2{¿Personalizar código?}
    F2 -->|Sí| F3[Editar campo de código]
    F2 -->|No| F4[Copiar / Compartir código]
    F3 --> F4
    F4 --> G([Coach listo → Vista Coach])
```

---

## Flujo 6 — Registro de Atleta (Onboarding completo)

```mermaid
flowchart TD
    A([Nuevo usuario selecciona Rol: Atleta]) --> B[Paso 1: Datos básicos]
    B --> B1[Nombre, Apellido, Fecha de nacimiento]
    B1 --> B2[Email, Contraseña]
    B2 --> C[Paso 2: Perfil físico y deportivo]
    
    C --> C1[Avatar]
    C1 --> C2[Talla cm + Peso kg]
    C2 --> C3[Aptitud física slider 1-10]
    C3 --> C4[Objetivo deportivo]
    C4 --> C5[Logros + Estilo de vida]
    C5 --> D[Paso 3: Vincular con coach]
    
    D --> D1{¿Tiene código de coach?}
    D1 -->|Sí| D2[Ingresa código]
    D2 --> D3{¿Coach encontrado?}
    D3 -->|Sí| D4[Muestra perfil del coach]
    D4 --> D5[Confirmar vinculación]
    D5 --> E([Vista Atleta con coach asignado])
    D3 -->|No| D6[Error: código inválido] --> D2
    D1 -->|Omitir| E2([Vista Atleta sin coach - puede vincular después])
```

---

## Flujo 7 — Navegación General (Mapa de Interacciones)

```mermaid
flowchart LR
    subgraph AUTH[Autenticación]
        L[Login]
        R[Registro]
    end

    subgraph COACH_VIEW[Vista Coach]
        CH[Tab: Inicio]
        CA[Tab: Atletas]
        CC[Tab: Comunidad]
        CK[Tab: Calendario]
        CP[Tab: Planificación]
        CS[Config]

        CA --> CAP[Perfil Atleta]
        CA --> CAC[Chat Atleta]
        CA --> CAM[Métricas Atleta]
        CA --> CAPL[Plan Atleta]
        CA --> CAPH[Pagos Atleta]

        CP --> PL[Biblioteca Planes]
        CP --> WP[Editor Plan]
        CP --> EL[Biblioteca Ejercicios]

        PL --> AM[Modal: Asignar]
        PL --> VA[Modal: Ver Atletas]
        WP --> CE[Modal: Crear Ejercicio]
        WP --> DB[Modal: Pizarra]

        CH --> PA[Modal: Aprobar Pago]
    end

    subgraph ATHLETE_VIEW[Vista Atleta]
        AH[Tab: Inicio]
        AE[Tab: Entrenador]
        AC[Tab: Comunidad]
        AK[Tab: Calendario]
        APL[Tab: Plan]
        AS[Config]

        AE --> AEP[Perfil Coach]
        AE --> AEC[Chat Coach]

        AS --> AMC[Mi Entrenador]
        AS --> ASP[Suscripción]
        AS --> AW[Wearables]
        AS --> AEP2[Editar Perfil]

        AH --> WS[Modal: Workout Screen]
        AK --> WS
        APL --> WS
        WS --> RPE[Modal: RPE]
        AH --> PM[Modal: Pago]
        AH --> WD[Modal: Detalles Workout]
        AK --> WD
        AK --> AW2[Modal: Agregar Workout]
    end

    L --> COACH_VIEW
    L --> ATHLETE_VIEW
    R --> COACH_VIEW
    R --> ATHLETE_VIEW
```

---

## Flujo 8 — Estados del Pago (Diagrama de Estado)

```mermaid
stateDiagram-v2
    [*] --> SinDeuda : Sin pago pendiente

    SinDeuda --> PagoVencido : Coach registra deuda o ciclo de cobro
    PagoVencido --> EnRevision : Atleta envía comprobante
    EnRevision --> Aprobado : Coach aprueba
    EnRevision --> PagoVencido : Coach rechaza (vuelve a deuda)
    Aprobado --> SinDeuda : Nuevo ciclo de cobro comienza
    Aprobado --> [*] : Sin nuevas deudas
```

---

## Flujo 9 — Estados de una Sesión de Entrenamiento

```mermaid
stateDiagram-v2
    [*] --> Programada : Coach asigna plan al atleta

    Programada --> EnCurso : Atleta inicia el entrenamiento
    EnCurso --> Pausada : Atleta pausa
    Pausada --> EnCurso : Atleta reanuda
    EnCurso --> Descartada : Atleta sale sin guardar
    Pausada --> Descartada : Atleta sale sin guardar
    
    EnCurso --> CompletadaSinRPE : Atleta finaliza
    Pausada --> CompletadaSinRPE : Atleta finaliza
    CompletadaSinRPE --> CompletadaConRPE : Atleta puntúa RPE
    CompletadaSinRPE --> CompletadaSinRPE : Atleta omite o cierra app
    CompletadaConRPE --> [*]
    Descartada --> [*]
```

---

## Flujo 10 — Comunicación Coach–Atleta

```mermaid
sequenceDiagram
    participant A as Atleta
    participant APP as Athletica (App)
    participant C as Coach

    A->>APP: Abre Tab Entrenador → Chat
    APP->>A: Muestra historial de mensajes
    A->>APP: Escribe y envía mensaje
    APP->>C: Notificación push de nuevo mensaje
    C->>APP: Abre Tab Atletas → selecciona atleta → Chat
    APP->>C: Muestra historial con el mensaje del atleta
    C->>APP: Escribe y envía respuesta
    APP->>A: Notificación push de respuesta
    A->>APP: Lee la respuesta del coach
```
