import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const orcamentos = await prisma.orcamento.findMany({
    include: {
      pessoa: true, // Inclui os dados da pessoa associada
    },
    orderBy: {
      createdAt: "desc", // Ordena do mais recente para o mais antigo
    },
  });

  return NextResponse.json(orcamentos);
}