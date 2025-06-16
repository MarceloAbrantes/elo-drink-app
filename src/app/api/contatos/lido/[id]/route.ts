import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const prisma = new PrismaClient();

export async function PATCH(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = await context.params;
    const contatoId = parseInt(id);

    const contact = await prisma.contact.update({
      where: { id: contatoId },
      data: { lido: true },
    });

    return NextResponse.json(contact);
  } catch (error) {
    console.error('[PATCH /api/contatos/lido/[id]] Erro:', error);
    return NextResponse.json({ error: 'Erro ao atualizar contato' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';