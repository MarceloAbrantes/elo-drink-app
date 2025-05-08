-- CreateTable
CREATE TABLE "Orcamento" (
    "id" SERIAL NOT NULL,
    "tipoEvento" TEXT NOT NULL,
    "dataEvento" TIMESTAMP(3) NOT NULL,
    "horarioInicio" TEXT NOT NULL,
    "horarioTermino" TEXT NOT NULL,
    "convidados" INTEGER NOT NULL,
    "observacoes" TEXT,
    "adicionais" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Orcamento_pkey" PRIMARY KEY ("id")
);
