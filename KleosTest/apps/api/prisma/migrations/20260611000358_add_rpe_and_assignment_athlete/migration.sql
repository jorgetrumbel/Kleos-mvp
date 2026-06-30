/*
  Warnings:

  - You are about to drop the column `rpe` on the `sesion` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "FrecuenciaPlanCoach" AS ENUM ('semanal', 'mensual');

-- CreateEnum
CREATE TYPE "EstadoSuscripcionAtleta" AS ENUM ('activa', 'cancelada', 'vencida');

-- CreateEnum
CREATE TYPE "EstadoPago" AS ENUM ('pendiente', 'aprobado', 'rechazado');

-- AlterTable
ALTER TABLE "sesion" DROP COLUMN "rpe";

-- CreateTable
CREATE TABLE "rpe" (
    "id" TEXT NOT NULL,
    "sesion_id" TEXT NOT NULL,
    "valor" INTEGER NOT NULL,
    "comentario" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rpe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "asignacion_atleta" (
    "asignacion_id" TEXT NOT NULL,
    "atleta_id" TEXT NOT NULL,

    CONSTRAINT "asignacion_atleta_pkey" PRIMARY KEY ("asignacion_id","atleta_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "rpe_sesion_id_key" ON "rpe"("sesion_id");

-- CreateIndex
CREATE INDEX "asignacion_atleta_atleta_id_idx" ON "asignacion_atleta"("atleta_id");

-- AddForeignKey
ALTER TABLE "rpe" ADD CONSTRAINT "rpe_sesion_id_fkey" FOREIGN KEY ("sesion_id") REFERENCES "sesion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asignacion_atleta" ADD CONSTRAINT "asignacion_atleta_asignacion_id_fkey" FOREIGN KEY ("asignacion_id") REFERENCES "asignacion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asignacion_atleta" ADD CONSTRAINT "asignacion_atleta_atleta_id_fkey" FOREIGN KEY ("atleta_id") REFERENCES "atleta"("id") ON DELETE CASCADE ON UPDATE CASCADE;
