-- CreateTable
CREATE TABLE "plan_coach_atleta" (
    "id" TEXT NOT NULL,
    "coach_id" TEXT NOT NULL,
    "deporte_id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "frecuencia" "FrecuenciaPlanCoach" NOT NULL,
    "sesiones_incluidas" INTEGER NOT NULL,
    "precio" DECIMAL(65,30) NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "plan_coach_atleta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "suscripcion_atleta" (
    "id" TEXT NOT NULL,
    "atleta_id" TEXT NOT NULL,
    "plan_coach_atleta_id" TEXT NOT NULL,
    "estado" "EstadoSuscripcionAtleta" NOT NULL,
    "fecha_inicio" TIMESTAMP(3) NOT NULL,
    "fecha_renovacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "suscripcion_atleta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "plan_coach_atleta_coach_id_idx" ON "plan_coach_atleta"("coach_id");

-- CreateIndex
CREATE INDEX "plan_coach_atleta_deporte_id_idx" ON "plan_coach_atleta"("deporte_id");

-- CreateIndex
CREATE INDEX "suscripcion_atleta_atleta_id_idx" ON "suscripcion_atleta"("atleta_id");

-- CreateIndex
CREATE INDEX "suscripcion_atleta_plan_coach_atleta_id_idx" ON "suscripcion_atleta"("plan_coach_atleta_id");

-- AddForeignKey
ALTER TABLE "plan_coach_atleta" ADD CONSTRAINT "plan_coach_atleta_coach_id_fkey" FOREIGN KEY ("coach_id") REFERENCES "coach"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plan_coach_atleta" ADD CONSTRAINT "plan_coach_atleta_deporte_id_fkey" FOREIGN KEY ("deporte_id") REFERENCES "deporte"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "suscripcion_atleta" ADD CONSTRAINT "suscripcion_atleta_atleta_id_fkey" FOREIGN KEY ("atleta_id") REFERENCES "atleta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "suscripcion_atleta" ADD CONSTRAINT "suscripcion_atleta_plan_coach_atleta_id_fkey" FOREIGN KEY ("plan_coach_atleta_id") REFERENCES "plan_coach_atleta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
