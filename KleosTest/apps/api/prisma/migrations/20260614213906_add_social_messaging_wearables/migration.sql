-- CreateEnum
CREATE TYPE "TipoNotificacion" AS ENUM ('nueva_sesion', 'sesion_completada', 'nuevo_pago', 'pago_aprobado', 'pago_rechazado', 'nuevo_mensaje');

-- CreateEnum
CREATE TYPE "TipoWearable" AS ENUM ('apple_health', 'google_fit', 'garmin', 'samsung_health');

-- CreateTable
CREATE TABLE "notificacion" (
    "id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "tipo" "TipoNotificacion" NOT NULL,
    "titulo" TEXT NOT NULL,
    "mensaje" TEXT NOT NULL,
    "leida" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notificacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mensaje" (
    "id" TEXT NOT NULL,
    "remitente_id" TEXT NOT NULL,
    "destinatario_id" TEXT NOT NULL,
    "contenido" TEXT NOT NULL,
    "leido" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mensaje_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "publicacion" (
    "id" TEXT NOT NULL,
    "coach_id" TEXT NOT NULL,
    "contenido" TEXT NOT NULL,
    "imagen_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "publicacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comentario_publicacion" (
    "id" TEXT NOT NULL,
    "publicacion_id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "contenido" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comentario_publicacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reaccion_publicacion" (
    "id" TEXT NOT NULL,
    "publicacion_id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reaccion_publicacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wearable_conexion" (
    "id" TEXT NOT NULL,
    "atleta_id" TEXT NOT NULL,
    "tipo" "TipoWearable" NOT NULL,
    "token_acceso" TEXT,
    "refresh_token" TEXT,
    "token_expires_at" TIMESTAMP(3),
    "conectado" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "wearable_conexion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "notificacion_usuario_id_leida_idx" ON "notificacion"("usuario_id", "leida");

-- CreateIndex
CREATE INDEX "mensaje_remitente_id_idx" ON "mensaje"("remitente_id");

-- CreateIndex
CREATE INDEX "mensaje_destinatario_id_idx" ON "mensaje"("destinatario_id");

-- CreateIndex
CREATE INDEX "publicacion_coach_id_idx" ON "publicacion"("coach_id");

-- CreateIndex
CREATE INDEX "comentario_publicacion_publicacion_id_idx" ON "comentario_publicacion"("publicacion_id");

-- CreateIndex
CREATE UNIQUE INDEX "reaccion_publicacion_publicacion_id_usuario_id_key" ON "reaccion_publicacion"("publicacion_id", "usuario_id");

-- CreateIndex
CREATE INDEX "wearable_conexion_atleta_id_idx" ON "wearable_conexion"("atleta_id");

-- AddForeignKey
ALTER TABLE "notificacion" ADD CONSTRAINT "notificacion_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mensaje" ADD CONSTRAINT "mensaje_remitente_id_fkey" FOREIGN KEY ("remitente_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mensaje" ADD CONSTRAINT "mensaje_destinatario_id_fkey" FOREIGN KEY ("destinatario_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publicacion" ADD CONSTRAINT "publicacion_coach_id_fkey" FOREIGN KEY ("coach_id") REFERENCES "coach"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comentario_publicacion" ADD CONSTRAINT "comentario_publicacion_publicacion_id_fkey" FOREIGN KEY ("publicacion_id") REFERENCES "publicacion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comentario_publicacion" ADD CONSTRAINT "comentario_publicacion_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reaccion_publicacion" ADD CONSTRAINT "reaccion_publicacion_publicacion_id_fkey" FOREIGN KEY ("publicacion_id") REFERENCES "publicacion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reaccion_publicacion" ADD CONSTRAINT "reaccion_publicacion_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wearable_conexion" ADD CONSTRAINT "wearable_conexion_atleta_id_fkey" FOREIGN KEY ("atleta_id") REFERENCES "atleta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
