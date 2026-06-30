# Testing Real Authentication

This guide explains how to test the Prisma + bcrypt + JWT authentication flow added to the Kleos MVP.

## What This Tests

Authentication now supports:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- Password hashing with bcrypt
- JWT access tokens
- Session restoration from the mobile app

## 1. Start the Database

From the repository root:

```bash
docker compose up -d
```

This starts:

- PostgreSQL on `localhost:5432`
- Redis on `localhost:6379`

## 2. Check API Environment

The API expects a database URL and JWT secret in:

```text
apps/api/.env
```

Expected local values:

```env
DATABASE_URL="postgresql://kleos:password@localhost:5432/kleos_db?schema=public"
JWT_ACCESS_SECRET=change-me
JWT_REFRESH_SECRET=change-me-too
```

For local testing, these are enough. Before production, replace the JWT secrets with strong private values.

## 3. Apply Prisma Migrations

From the repository root:

```bash
pnpm --filter api exec prisma migrate deploy
```

If you are actively developing and need Prisma to apply local migrations:

```bash
pnpm --filter api exec prisma migrate dev
```

## 4. Start the API

From the repository root:

```bash
pnpm --filter api start:dev
```

The API should run at:

```text
http://localhost:3000
```

Swagger docs are available at:

```text
http://localhost:3000/docs
```

All auth endpoints use the `/api` prefix.

## 5. Create a Coach User

Use Postman, Insomnia, Swagger, or PowerShell.

Endpoint:

```http
POST http://localhost:3000/api/auth/register
```

Body:

```json
{
  "email": "coach@example.com",
  "password": "password123",
  "nombre": "Carlos",
  "apellido": "Perez",
  "role": "coach"
}
```

PowerShell example:

```powershell
Invoke-RestMethod `
  -Method Post `
  -Uri "http://localhost:3000/api/auth/register" `
  -ContentType "application/json" `
  -Body '{
    "email": "coach@example.com",
    "password": "password123",
    "nombre": "Carlos",
    "apellido": "Perez",
    "role": "coach"
  }'
```

Expected response:

```json
{
  "user": {
    "id": "generated-user-id",
    "email": "coach@example.com",
    "role": "coach"
  },
  "accessToken": "jwt-token"
}
```

This creates:

- One `Usuario`
- One related `Coach`

## 6. Create an Athlete User

Endpoint:

```http
POST http://localhost:3000/api/auth/register
```

Body:

```json
{
  "email": "athlete@example.com",
  "password": "password123",
  "nombre": "Ana",
  "apellido": "Garcia",
  "role": "atleta"
}
```

Expected response:

```json
{
  "user": {
    "id": "generated-user-id",
    "email": "athlete@example.com",
    "role": "athlete"
  },
  "accessToken": "jwt-token"
}
```

Important: the API accepts Prisma roles in Spanish: `coach` or `atleta`. The response maps them to frontend roles: `coach` or `athlete`.

This creates:

- One `Usuario`
- One related `Atleta`

## 7. Test Login

Endpoint:

```http
POST http://localhost:3000/api/auth/login
```

Body:

```json
{
  "email": "coach@example.com",
  "password": "password123"
}
```

Expected response:

```json
{
  "user": {
    "id": "generated-user-id",
    "email": "coach@example.com",
    "role": "coach"
  },
  "accessToken": "jwt-token"
}
```

Wrong passwords should return `401 Unauthorized`.

## 8. Test JWT Validation With `/me`

Copy the `accessToken` returned from register or login.

Endpoint:

```http
GET http://localhost:3000/api/auth/me
```

Header:

```http
Authorization: Bearer jwt-token
```

PowerShell example:

```powershell
$token = "paste-token-here"

Invoke-RestMethod `
  -Method Get `
  -Uri "http://localhost:3000/api/auth/me" `
  -Headers @{ Authorization = "Bearer $token" }
```

Expected response:

```json
{
  "id": "generated-user-id",
  "email": "coach@example.com",
  "role": "coach"
}
```

Missing, expired, or invalid tokens should return `401 Unauthorized`.

## 9. Test With Expo Go

The mobile app currently calls the API from:

```ts
// apps/mobile/services/api.ts
baseURL: 'http://192.168.1.69:3000/api'
```

For Expo Go on a physical phone, this IP must be your computer's LAN IP address, not `localhost`.

### Find Your Computer IP

On Windows PowerShell:

```powershell
ipconfig
```

Look for your Wi-Fi or Ethernet IPv4 address, for example:

```text
192.168.1.69
```

Then confirm [apps/mobile/services/api.ts](../apps/mobile/services/api.ts) uses that IP:

```ts
baseURL: 'http://YOUR_COMPUTER_IP:3000/api'
```

Your phone and computer must be on the same Wi-Fi network.

## 10. Start Expo

From the repository root:

```bash
pnpm --filter mobile start
```

Then scan the QR code with Expo Go.

## 11. Login From Expo Go

Use one of the users you created through the API:

```text
Email: coach@example.com
Password: password123
```

Expected behavior:

1. Login screen sends credentials to `POST /api/auth/login`.
2. API validates the password hash.
3. API returns a real JWT.
4. Mobile saves the JWT in SecureStore.
5. Zustand stores the authenticated user.
6. The auth guard redirects to the coach area.

## 12. Test Session Restoration

After a successful login:

1. Close Expo Go.
2. Reopen the app.
3. The app reads the token from SecureStore.
4. The app calls `GET /api/auth/me`.
5. If the token is valid, the session is restored.
6. If the token is invalid, it is removed and the user returns to login.

## Common Problems

### Expo Go Cannot Reach the API

Check:

- API is running with `pnpm --filter api start:dev`
- Phone and computer are on the same Wi-Fi
- `apps/mobile/services/api.ts` uses the computer LAN IP
- Windows Firewall allows connections to port `3000`

### Register Returns Email Already Registered

That email already exists in PostgreSQL. Use a new email or clear the database.

### Login Returns 401

Check:

- The user was created through the new register endpoint
- The password is correct
- The request body has `email` and `password`

### `/me` Returns 401

Check:

- The `Authorization` header is present
- The header starts with `Bearer `
- The token is copied exactly from the login/register response
- `JWT_ACCESS_SECRET` did not change after the token was created

