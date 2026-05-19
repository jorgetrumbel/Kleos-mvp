# Athletica — Documentación del Proyecto

Bienvenido al repositorio de documentación de **Athletica**, la app de gestión para entrenadores personales y atletas.

---

## Índice de Documentos

| # | Documento | Descripción |
|---|-----------|-------------|
| 00 | [Resumen del Proyecto](./00_RESUMEN_PROYECTO.md) | Visión general, stack tecnológico, roles, paleta de colores y módulos funcionales |
| 01 | [Pantallas y Modales](./01_PANTALLAS_Y_MODALES.md) | Inventario completo de las 46 pantallas, sub-vistas y modales de la app |
| 02 | [Historias de Usuario](./02_HISTORIAS_DE_USUARIO.md) | 48 historias de usuario con criterios de aceptación y prioridades |
| 03 | [Diagramas de Flujo](./03_DIAGRAMAS_DE_FLUJO.md) | 10 diagramas en Mermaid: flujos de autenticación, workout, pagos, planificación, etc. |
| 04 | [Diagrama Entidad-Relación](./04_DIAGRAMA_ENTIDAD_RELACION.md) | ERD completo con 22 entidades, relaciones, índices recomendados y notas de diseño |
| 05 | [Arquitectura](./05_ARQUITECTURA.md) | Arquitectura de producción, árbol de componentes, API REST, autenticación, infraestructura cloud |
| 06 | [Guía de Desarrollo](./06_GUIA_DE_DESARROLLO.md) | Convenciones de código, Git flow, migración al backend, tipos de dato, checklist de calidad y glosario |

---

## Resumen Ejecutivo

**Athletica** conecta entrenadores personales (coaches) con sus atletas en una app mobile-first que cubre:

- 🏋️ **Planificación:** Biblioteca de planes con bloques de entrenamiento drag & drop
- 📅 **Calendario:** Seguimiento de sesiones pasadas y futuras
- ⏱️ **Ejecución:** Pantalla de workout en tiempo real con métricas de wearable
- 💳 **Pagos:** Flujo de comprobante → aprobación por el coach
- 💬 **Chat:** Mensajería 1:1 entre coach y atleta
- 📢 **Comunidad:** Feed del coach visible por sus atletas
- 📊 **Métricas:** RPE, frecuencia cardíaca y progreso histórico

---

## Roles

| Rol | Credenciales demo | Descripción |
|-----|-------------------|-------------|
| **Coach** | `coach@coach` / `1234` | Gestiona atletas, crea planes, aprueba pagos |
| **Atleta** | `athlete@athlete` / `1234` | Ejecuta entrenamientos, envía pagos, chatea con su coach |

---

## Estado del Prototipo

El prototipo actual es una **SPA React + Tailwind** 100% frontend con datos mock. No tiene backend ni base de datos.

Para convertirlo en producción, consultar:
- El [Diagrama ERD](./04_DIAGRAMA_ENTIDAD_RELACION.md) para el diseño de la base de datos
- La [Arquitectura](./05_ARQUITECTURA.md) para los endpoints API y la infraestructura
- La [Guía de Desarrollo](./06_GUIA_DE_DESARROLLO.md) para la estrategia de migración

---

## Tecnologías del Prototipo

- React 18 + TypeScript
- Tailwind CSS v4
- Vite
- `lucide-react`, `date-fns`, `react-dnd`

## Tecnologías Recomendadas para Producción

- **Móvil:** React Native + Expo
- **Backend:** NestJS + PostgreSQL + Prisma
- **Auth:** JWT + Refresh Tokens
- **Storage:** AWS S3 / Supabase Storage
- **Tiempo real:** Socket.io / Supabase Realtime
- **Push:** Firebase Cloud Messaging

---

*Documentación generada para el proyecto Athletica · Mayo 2026*
