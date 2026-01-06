-- CreateTable
CREATE TABLE "whatsapp_configs" (
    "id" TEXT NOT NULL,
    "external_tenant_id" TEXT NOT NULL,
    "phone_number_id" TEXT NOT NULL,
    "waba_id" TEXT NOT NULL,
    "access_token" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "whatsapp_configs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "whatsapp_configs_external_tenant_id_key" ON "whatsapp_configs"("external_tenant_id");

-- CreateIndex
CREATE UNIQUE INDEX "whatsapp_configs_phone_number_id_key" ON "whatsapp_configs"("phone_number_id");

-- CreateIndex
CREATE INDEX "whatsapp_configs_external_tenant_id_idx" ON "whatsapp_configs"("external_tenant_id");

-- CreateIndex
CREATE INDEX "whatsapp_configs_phone_number_id_idx" ON "whatsapp_configs"("phone_number_id");
