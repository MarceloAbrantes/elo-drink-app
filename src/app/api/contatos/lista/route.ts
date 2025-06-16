import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const contatos = await prisma.contact.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(contatos);
  } catch (error) {
    console.error('[GET /api/contatos/lista] Erro ao buscar contatos:', error);
    return NextResponse.json({ error: 'Erro ao buscar contatos' }, { status: 500 });
  }
}