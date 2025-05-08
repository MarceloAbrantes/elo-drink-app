import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Verifica se a pessoa já existe pelo CPF
    let pessoa = await prisma.pessoa.findUnique({
      where: { cpf: data.cpf },
    });

    // Se não existe, cria
    if (!pessoa) {
      pessoa = await prisma.pessoa.create({
        data: {
          nome: data.nome,
          email: data.email,
          telefone: data.telefone,
          cpf: data.cpf,
        },
      });
    }

    // Cria orçamento relacionado à pessoa
    const orcamento = await prisma.orcamento.create({
      data: {
        tipoEvento: data.tipoEvento,
        dataEvento: new Date(data.dataEvento),
        horarioInicio: data.horarioInicio,
        horarioTermino: data.horarioTermino,
        convidados: data.convidados,
        observacoes: data.observacoes,
        adicionais: data.adicionais,
        pessoaId: pessoa.id,
      },
    });

    return NextResponse.json(orcamento, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Erro ao salvar orçamento' }, { status: 500 });
  }
}

