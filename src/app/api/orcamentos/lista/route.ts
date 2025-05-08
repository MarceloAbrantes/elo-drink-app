import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const orcamentos = await prisma.orcamento.findMany();
  return NextResponse.json(orcamentos);
}