import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const prisma = new PrismaClient();

export async function PATCH(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const orcamentoId = parseInt(id);

    const orcamento = await prisma.orcamento.update({
      where: { id: orcamentoId },
      data: { lido: true },
    });

    return NextResponse.json(orcamento);
  } catch (error) {
    console.error('[PATCH /api/orcamentos/lido/[id]] Erro:', error);
    return NextResponse.json({ error: 'Erro ao atualizar orçamento' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
