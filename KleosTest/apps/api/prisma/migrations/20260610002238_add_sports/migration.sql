-- CreateTable
CREATE TABLE "deporte" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "deporte_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coach_deporte" (
    "coach_id" TEXT NOT NULL,
    "deporte_id" TEXT NOT NULL,

    CONSTRAINT "coach_deporte_pkey" PRIMARY KEY ("coach_id","deporte_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "deporte_nombre_key" ON "deporte"("nombre");

-- CreateIndex
CREATE INDEX "coach_deporte_coach_id_idx" ON "coach_deporte"("coach_id");

-- CreateIndex
CREATE INDEX "coach_deporte_deporte_id_idx" ON "coach_deporte"("deporte_id");

-- AddForeignKey
ALTER TABLE "coach_deporte" ADD CONSTRAINT "coach_deporte_coach_id_fkey" FOREIGN KEY ("coach_id") REFERENCES "coach"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coach_deporte" ADD CONSTRAINT "coach_deporte_deporte_id_fkey" FOREIGN KEY ("deporte_id") REFERENCES "deporte"("id") ON DELETE CASCADE ON UPDATE CASCADE;
