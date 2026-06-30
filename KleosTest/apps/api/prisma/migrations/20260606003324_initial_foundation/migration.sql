-- CreateEnum
CREATE TYPE "RolUsuario" AS ENUM ('coach', 'atleta');

-- CreateEnum
CREATE TYPE "EstadoSuscripcionCoach" AS ENUM ('activa', 'cancelada', 'vencida');

-- CreateTable
CREATE TABLE "usuario" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "fecha_nacimiento" TIMESTAMP(3),
    "avatar_url" TEXT,
    "rol" "RolUsuario" NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plan_athletica" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "max_atletas" INTEGER NOT NULL,
    "precio_mensual" DECIMAL(65,30) NOT NULL,
    "es_enterprise" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "plan_athletica_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coach" (
    "id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "nombre_negocio" TEXT,
    "frase" TEXT,
    "logo_url" TEXT,
    "anios_experiencia" INTEGER,
    "ciudad" TEXT,
    "instagram_url" TEXT,
    "strava_url" TEXT,
    "codigo_vinculacion" TEXT NOT NULL,
    "plan_athletica_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "coach_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "atleta" (
    "id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "coach_id" TEXT,
    "talla_cm" DOUBLE PRECISION,
    "peso_kg" DOUBLE PRECISION,
    "aptitud_fisica" INTEGER,
    "objetivo" TEXT,
    "logros" TEXT,
    "estilo_vida" TEXT,
    "vinculado_en" TIMESTAMP(3),

    CONSTRAINT "atleta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "suscripcion_coach" (
    "id" TEXT NOT NULL,
    "coach_id" TEXT NOT NULL,
    "plan_athletica_id" TEXT NOT NULL,
    "estado" "EstadoSuscripcionCoach" NOT NULL,
    "fecha_inicio" TIMESTAMP(3) NOT NULL,
    "fecha_renovacion" TIMESTAMP(3) NOT NULL,
    "monto_pagado" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "suscripcion_coach_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "coach_usuario_id_key" ON "coach"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "coach_codigo_vinculacion_key" ON "coach"("codigo_vinculacion");

-- CreateIndex
CREATE INDEX "coach_plan_athletica_id_idx" ON "coach"("plan_athletica_id");

-- CreateIndex
CREATE UNIQUE INDEX "atleta_usuario_id_key" ON "atleta"("usuario_id");

-- CreateIndex
CREATE INDEX "atleta_coach_id_idx" ON "atleta"("coach_id");

-- CreateIndex
CREATE INDEX "suscripcion_coach_coach_id_idx" ON "suscripcion_coach"("coach_id");

-- CreateIndex
CREATE INDEX "suscripcion_coach_plan_athletica_id_idx" ON "suscripcion_coach"("plan_athletica_id");

-- AddForeignKey
ALTER TABLE "coach" ADD CONSTRAINT "coach_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coach" ADD CONSTRAINT "coach_plan_athletica_id_fkey" FOREIGN KEY ("plan_athletica_id") REFERENCES "plan_athletica"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atleta" ADD CONSTRAINT "atleta_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atleta" ADD CONSTRAINT "atleta_coach_id_fkey" FOREIGN KEY ("coach_id") REFERENCES "coach"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "suscripcion_coach" ADD CONSTRAINT "suscripcion_coach_coach_id_fkey" FOREIGN KEY ("coach_id") REFERENCES "coach"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "suscripcion_coach" ADD CONSTRAINT "suscripcion_coach_plan_athletica_id_fkey" FOREIGN KEY ("plan_athletica_id") REFERENCES "plan_athletica"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
