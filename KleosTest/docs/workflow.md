# Mobile Development Workflow (Expo + React Native + PNPM Monorepo)

## Project Structure

```text
KleosTest/
├── apps/
│   ├── api/
│   └── mobile/
├── packages/
├── docs/
├── pnpm-workspace.yaml
└── package.json
```

The project uses:

* PNPM Workspaces
* Expo SDK 56
* React Native
* Expo Router

---

# General Rule

Always execute dependency installation commands from the monorepo root:

```bash
KleosTest/
```

Never use:

```bash
npm install
```

inside:

```text
apps/mobile
```

Mixing npm and pnpm can create dependency conflicts and lockfile issues.

---

# Installing Dependencies

## Install a dependency only for the mobile app

From the monorepo root:

```bash
pnpm --filter mobile add <package-name>
```

Example:

```bash
pnpm --filter mobile add react-native-gifted-charts
```

Example:

```bash
pnpm --filter mobile add axios
```

Example:

```bash
pnpm --filter mobile add @tanstack/react-query
```

---

# Verifying Installed Packages

Check if a package exists:

```bash
pnpm --filter mobile list react-native-gifted-charts
```

Check React Query:

```bash
pnpm --filter mobile list @tanstack/react-query
```

Check Axios:

```bash
pnpm --filter mobile list axios
```

---

# Running Expo

## Recommended

From the monorepo root:

```bash
pnpm --filter mobile start
```

---

## Android

```bash
pnpm --filter mobile android
```

---

## iOS

```bash
pnpm --filter mobile ios
```

---

## Web

```bash
pnpm --filter mobile web
```

---

# Running Expo Directly

If debugging Expo issues:

```bash
cd apps/mobile
npx expo start
```

---

# Clearing Metro Cache

When routing, dependencies, or bundling behaves unexpectedly:

```bash
cd apps/mobile
npx expo start -c
```

The `-c` flag clears Metro cache.

---

# Expo Router Checklist

Required:

```json
{
  "main": "expo-router/entry"
}
```

inside:

```text
apps/mobile/package.json
```

Required structure:

```text
app/
├── _layout.tsx
├── index.tsx
├── (coach)/
└── (athlete)/
```

Root layout example:

```tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
```

Root redirect example:

```tsx
import { Redirect } from 'expo-router';

export default function Index() {
  return <Redirect href="/(coach)" />;
}
```

---

# Common Commands

## Check Expo version

```bash
pnpm --filter mobile list expo
```

---

## Check React version

```bash
pnpm --filter mobile list react
```

---

## Check React Native version

```bash
pnpm --filter mobile list react-native
```

---

## Check installed dependencies

```bash
pnpm --filter mobile list
```

---

# Design System Location

Theme file:

```text
apps/mobile/theme/index.ts
```

Contains:

* Colors
* Typography
* Spacing
* Border Radius
* Shadows
* Layout Constants

Import example:

```ts
import { colors, spacing, typography } from '../../theme';
```

---

# Recommended Development Flow

1. Create screen
2. Create reusable component
3. Add navigation route
4. Test on Expo Go
5. Verify Android rendering
6. Commit changes
7. Continue to next screen

---

# Current MVP Priority

Coach Dashboard

Sections:

* Greeting
* Alerts
* KPI Cards
* Upcoming Sessions
* Revenue Chart
* Quick Actions

After dashboard:

1. Athletes
2. Plans
3. Messages
4. Profile
5. Authentication
6. API Integration
7. React Query Setup
8. Production Build

```
```
