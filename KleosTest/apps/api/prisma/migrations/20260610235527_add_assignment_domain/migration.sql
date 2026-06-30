-- CreateEnum
CREATE TYPE "EstadoSesion" AS ENUM ('pendiente', 'completada', 'omitida');

-- CreateTable
CREATE TABLE "ejercicio_template" (
    "id" TEXT NOT NULL,
    "coach_id" TEXT,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "categoria" TEXT,
    "video_url" TEXT,
    "es_publico" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ejercicio_template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ejercicio_en_bloque" (
    "id" TEXT NOT NULL,
    "bloque_id" TEXT NOT NULL,
    "ejercicio_template_id" TEXT,
    "orden" INTEGER NOT NULL,
    "nombre_custom" TEXT,
    "descripcion" TEXT,
    "series" INTEGER,
    "repeticiones" INTEGER,
    "duracion" INTEGER,
    "intensidad" TEXT,
    "es_texto_libre" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ejercicio_en_bloque_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "archivo_adjunto" (
    "id" TEXT NOT NULL,
    "ejercicio_en_bloque_id" TEXT NOT NULL,
    "nombre_archivo" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "archivo_adjunto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "asignacion" (
    "id" TEXT NOT NULL,
    "atleta_id" TEXT NOT NULL,
    "plan_entrenamiento_id" TEXT NOT NULL,
    "fecha_inicio" TIMESTAMP(3) NOT NULL,
    "activa" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "asignacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sesion" (
    "id" TEXT NOT NULL,
    "asignacion_id" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "estado" "EstadoSesion" NOT NULL DEFAULT 'pendiente',
    "comentarios" TEXT,
    "rpe" INTEGER,
    "completada_en" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sesion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ejercicio_template_coach_id_idx" ON "ejercicio_template"("coach_id");

-- CreateIndex
CREATE INDEX "ejercicio_en_bloque_bloque_id_idx" ON "ejercicio_en_bloque"("bloque_id");

-- CreateIndex
CREATE INDEX "ejercicio_en_bloque_ejercicio_template_id_idx" ON "ejercicio_en_bloque"("ejercicio_template_id");

-- CreateIndex
CREATE INDEX "archivo_adjunto_ejercicio_en_bloque_id_idx" ON "archivo_adjunto"("ejercicio_en_bloque_id");

-- CreateIndex
CREATE INDEX "asignacion_atleta_id_idx" ON "asignacion"("atleta_id");

-- CreateIndex
CREATE INDEX "asignacion_plan_entrenamiento_id_idx" ON "asignacion"("plan_entrenamiento_id");

-- CreateIndex
CREATE INDEX "sesion_asignacion_id_idx" ON "sesion"("asignacion_id");

-- AddForeignKey
ALTER TABLE "ejercicio_template" ADD CONSTRAINT "ejercicio_template_coach_id_fkey" FOREIGN KEY ("coach_id") REFERENCES "coach"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ejercicio_en_bloque" ADD CONSTRAINT "ejercicio_en_bloque_bloque_id_fkey" FOREIGN KEY ("bloque_id") REFERENCES "bloque_entrenamiento"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ejercicio_en_bloque" ADD CONSTRAINT "ejercicio_en_bloque_ejercicio_template_id_fkey" FOREIGN KEY ("ejercicio_template_id") REFERENCES "ejercicio_template"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "archivo_adjunto" ADD CONSTRAINT "archivo_adjunto_ejercicio_en_bloque_id_fkey" FOREIGN KEY ("ejercicio_en_bloque_id") REFERENCES "ejercicio_en_bloque"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asignacion" ADD CONSTRAINT "asignacion_atleta_id_fkey" FOREIGN KEY ("atleta_id") REFERENCES "atleta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asignacion" ADD CONSTRAINT "asignacion_plan_entrenamiento_id_fkey" FOREIGN KEY ("plan_entrenamiento_id") REFERENCES "plan_entrenamiento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sesion" ADD CONSTRAINT "sesion_asignacion_id_fkey" FOREIGN KEY ("asignacion_id") REFERENCES "asignacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
