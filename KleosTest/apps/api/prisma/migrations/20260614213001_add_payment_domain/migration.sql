-- CreateTable
CREATE TABLE "pago" (
    "id" TEXT NOT NULL,
    "atleta_id" TEXT NOT NULL,
    "coach_id" TEXT NOT NULL,
    "suscripcion_atleta_id" TEXT NOT NULL,
    "monto" DECIMAL(65,30) NOT NULL,
    "comprobante_url" TEXT,
    "comprobante_nombre" TEXT,
    "estado" "EstadoPago" NOT NULL,
    "enviado_en" TIMESTAMP(3),
    "revisado_en" TIMESTAMP(3),
    "nota_rechazo" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pago_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "pago_atleta_id_idx" ON "pago"("atleta_id");

-- CreateIndex
CREATE INDEX "pago_coach_id_idx" ON "pago"("coach_id");

-- CreateIndex
CREATE INDEX "pago_suscripcion_atleta_id_idx" ON "pago"("suscripcion_atleta_id");

-- AddForeignKey
ALTER TABLE "pago" ADD CONSTRAINT "pago_atleta_id_fkey" FOREIGN KEY ("atleta_id") REFERENCES "atleta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pago" ADD CONSTRAINT "pago_coach_id_fkey" FOREIGN KEY ("coach_id") REFERENCES "coach"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pago" ADD CONSTRAINT "pago_suscripcion_atleta_id_fkey" FOREIGN KEY ("suscripcion_atleta_id") REFERENCES "suscripcion_atleta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
