# Kleos - AI Development Context

## Project Overview

Kleos is a cross-platform mobile application for coaches and athletes.

The MVP focuses on coaches creating and managing training plans, assigning workouts to athletes, messaging them, and tracking progress.

Tech Stack:

- React Native + Expo
- Expo Router
- TypeScript
- Zustand
- React Query
- React Hook Form
- NestJS
- Prisma
- PostgreSQL
- pnpm Monorepo

---

## Repository Structure

```text
apps/
  api/        NestJS backend
  mobile/     React Native application

packages/
  Shared packages (future)

docs/
  Project documentation
```

---

## Backend Status

Completed:

- NestJS project
- Prisma
- PostgreSQL
- PrismaModule
- UsersModule
- AuthModule
- AuthController
- AuthService
- Real registration endpoint
- Real login endpoint
- bcrypt password hashing
- JWT access token generation
- JWT validation guard
- Authenticated `/auth/me` endpoint

Current auth endpoints:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

Registration creates:

- `Usuario`
- `Coach` when role is `coach`
- `Atleta` when role is `atleta`

Authentication uses:

- `Usuario.email`
- `Usuario.passwordHash`
- `Usuario.rol`
- `Usuario.activo`
- bcrypt
- JWT

---

## Frontend Status

Completed:

- Expo Router configured
- Route groups:
  - `(auth)`
  - `(coach)`
  - `(athlete)` planned
- Theme system implemented
- Localization structure created
- Reusable Button component
- Reusable Input component
- Login screen
- Zustand authentication store
- SecureStore token persistence
- Global AuthProvider
- Session restoration through `GET /api/auth/me`
- Global Auth Guard
- Registration Zustand store
- Registration Step 1 screen
- Registration Step 2 placeholder screen
- Registration progress persistence in SecureStore
- Reusable registration components:
  - `Stepper`
  - `RoleSelector`
  - `DateInput`

Current login flow:

```text
Login Screen
-> React Hook Form validation
-> Axios
-> POST /api/auth/login
-> bcrypt password validation
-> JWT response
-> SecureStore
-> Zustand auth.store
-> Auth Guard
-> Coach Area
```

Current registration Step 1 flow:

```text
Register Step 1
-> React Hook Form validation
-> register.store update
-> POST /api/auth/register
-> JWT response
-> SecureStore token save
-> SecureStore registration step save
-> auth.store login
-> Navigate to Register Step 2
```

If the app closes after Step 1:

```text
App start
-> Restore JWT from SecureStore
-> GET /api/auth/me
-> Restore auth.store
-> Restore registration step from SecureStore
-> Redirect to Register Step 2
```

If the user logs in again after starting registration, the app checks the persisted registration step and sends the user back to the last completed registration point.

---

## Prisma

The project already contains a complete schema.

Authentication-related models:

- `Usuario`
- `Coach`
- `Atleta`

Important fields:

- `Usuario.id`
- `Usuario.email`
- `Usuario.passwordHash`
- `Usuario.rol`
- `Usuario.activo`

---

## Current Goal

Continue the multi-step registration flow after Step 1.

Next likely implementation areas:

1. Define Registration Step 2 requirements.
2. Decide whether registration progress should be persisted on the backend as well as locally.
3. Build Step 2 with React Hook Form.
4. Continue storing cross-step registration state in `register.store.ts`.
5. Add backend update endpoints as later steps collect coach or athlete profile data.

---

## Coding Principles

- Keep services small.
- Separate Controllers, Services and DTOs.
- Never expose Prisma entities directly.
- Prefer dependency injection.
- Reuse the design system.
- Avoid duplicated business logic.
- Keep screens focused on presentation and validation.
- Keep business logic and API calls in service layers.
- Localize user-facing text.
- Everything should be scalable to production.
