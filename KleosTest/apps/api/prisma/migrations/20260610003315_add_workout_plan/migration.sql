-- CreateTable
CREATE TABLE "plan_entrenamiento" (
    "id" TEXT NOT NULL,
    "coach_id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "categoria" TEXT,
    "es_plantilla" BOOLEAN NOT NULL DEFAULT false,
    "es_publico" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "plan_entrenamiento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bloque_entrenamiento" (
    "id" TEXT NOT NULL,
    "plan_id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "orden" INTEGER NOT NULL,
    "comentarios" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bloque_entrenamiento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "plan_entrenamiento_coach_id_idx" ON "plan_entrenamiento"("coach_id");

-- CreateIndex
CREATE INDEX "bloque_entrenamiento_plan_id_idx" ON "bloque_entrenamiento"("plan_id");

-- AddForeignKey
ALTER TABLE "plan_entrenamiento" ADD CONSTRAINT "plan_entrenamiento_coach_id_fkey" FOREIGN KEY ("coach_id") REFERENCES "coach"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bloque_entrenamiento" ADD CONSTRAINT "bloque_entrenamiento_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "plan_entrenamiento"("id") ON DELETE CASCADE ON UPDATE CASCADE;
