'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function PainelAdmin() {
  const [orcamentos, setOrcamentos] = useState<any[]>([]);
  const [contatos, setContatos] = useState<any[]>([]);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/Admin/login');
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/orcamentos/lista').then(r => r.json()).then(data => setOrcamentos(data));
      fetch('/api/contatos/lista').then(r => r.json()).then(data => setContatos(data));
    }
  }, [status]);

  if (status === 'loading') {
    return <p className="p-8 text-[#F7F6F3]">Carregando...</p>;
  }

  const userName = session?.user?.name || 'Admin';
  const userEmail = session?.user?.email || 'admin@email';

  function AdminLayout({ children }: { children: ReactNode }) {
    return (
      <div className="flex flex-col min-h-screen md:flex-row bg-[#101820]">
        <aside className="flex-shrink-0 w-64 p-6 bg-[#5A5040] text-white shadow-md">
          <h2 className="mb-6 text-2xl font-bold text-[#F7F6F3]">Administrador</h2>
          <p><strong>Nome:</strong> {userName}</p>
          <p><strong>E‑mail:</strong> {userEmail}</p>
        </aside>
        <main className="flex-1 p-8 text-[#F7F6F3] bg-[#101820] overflow-auto">{children}</main>
      </div>
    );
  }

  return (
    <AdminLayout>
      <h1 className="mb-12 text-6xl font-bold">
        <span className="text-[#5A5040]">Olá,</span>{' '}
        <span className="text-[#F7F6F3]">{userName}</span>
      </h1>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Lado esquerdo: Orçamentos recebidos (mais largo) */}
        <section className="flex-1">
          <h2 className="text-3xl font-bold text-[#F7F6F3] mb-4">Orçamentos Recebidos</h2>
          <div className="bg-[#5A5040] rounded-lg shadow p-6 space-y-6 max-h-[70vh] overflow-y-auto">
            {orcamentos.length === 0 ? (
              <p className="text-[#F7F6F3]">Nenhum orçamento encontrado.</p>
            ) : (
              orcamentos.map((orc: any) => (
                <div key={orc.id} className="pb-4 border-b border-[#F7F6F3]">
                  <p><strong>Evento:</strong> {orc.tipoEvento}</p>
                  <p><strong>Data do Evento:</strong> {new Date(orc.dataEvento).toLocaleDateString('pt-BR')}</p>
                  <p><strong>Horário:</strong> {orc.horarioInicio} - {orc.horarioTermino}</p>
                  <p><strong>Convidados:</strong> {orc.convidados}</p>
                  <p><strong>Observações:</strong> {orc.observacoes || 'Nenhuma'}</p>
                  <p><strong>Data de envio:</strong> {new Date(orc.createdAt).toLocaleString('pt-BR')}</p>
                  {orc.pessoa && (
                    <div className="mt-2">
                      <p className="font-semibold">Dados do Cliente:</p>
                      <p><strong>Nome:</strong> {orc.pessoa.nome}</p>
                      <p><strong>E‑mail:</strong> {orc.pessoa.email}</p>
                      <p><strong>Telefone:</strong> {orc.pessoa.telefone}</p>
                      <p><strong>CPF:</strong> {orc.pessoa.cpf}</p>
                    </div>
                  )}
                  <div className="mt-2">
                    <p><strong>Adicionais:</strong></p>
                    <ul className="ml-6 list-disc">
                      {orc.adicionais?.map((add: any, i: number) => (
                        <li key={i}>{add.nome} x {add.qtd} — R${add.preco.toFixed(2)}</li>
                      ))}
                    </ul>
                  </div>
                  {/* BOTÃO AQUI */}
                  {!orc.lido && (
                    <button
                      onClick={async () => {
                        await fetch(`/api/orcamentos/lido/${orc.id}`, { method: 'PATCH' });
                        setOrcamentos((prev) =>
                          prev.map((o) => (o.id === orc.id ? { ...o, lido: true } : o))
                        );
                      }}
                      className="mt-2 text-sm text-green-300 underline"
                    >
                      Marcar como lido
                    </button>
                  )}                  
                </div>
              ))
            )}
          </div>
        </section>

        {/* Lado direito: Contatos personalizados (menor) */}
        <section className="w-full lg:w-1/3">
          <h2 className="text-3xl font-bold text-[#F7F6F3] mb-4">Orçamentos Personalizados / Contatos</h2>
          <div className="bg-[#5A5040] rounded-lg shadow p-6 space-y-6 max-h-[70vh] overflow-y-auto">
            {contatos.length === 0 ? (
              <p className="text-[#F7F6F3]">Nenhuma mensagem encontrada.</p>
            ) : (
              contatos.map((ct: any) => (
                <div key={ct.id} className="pb-4 border-b border-[#F7F6F3]">
                  <p><strong>Nome:</strong> {ct.name}</p>
                  <p><strong>Telefone:</strong> {ct.phone}</p>
                  <p><strong>E‑mail:</strong> {ct.email}</p>
                  <p><strong>Mensagem:</strong> {ct.message}</p>
                  {ct.fileUrl && (
                    <p><strong>Arquivo:</strong>{' '}
                      <a className="text-blue-300 underline" href={ct.fileUrl} target="_blank" rel="noreferrer">Ver Arquivo</a>
                    </p>
                  )}
                  <p><strong>Data:</strong> {new Date(ct.createdAt).toLocaleString('pt-BR')}</p>

                  {/* BOTÃO AQUI */}
                  {!ct.lido && (
                    <button
                      onClick={async () => {
                        await fetch(`/api/contatos/lido/${ct.id}`, { method: 'PATCH' });
                        setContatos((prev) =>
                          prev.map((c) => (c.id === ct.id ? { ...c, lido: true } : c))
                        );
                      }}
                      className="mt-2 text-sm text-green-300 underline"
                    >
                      Marcar como lido
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}


