"use client";

import { useEffect, useState } from "react";

export default function OrcamentosPage() {
  const [orcamentos, setOrcamentos] = useState([]);

  useEffect(() => {
    fetch("/api/orcamentos/lista")
      .then((res) => res.json())
      .then((data) => setOrcamentos(data));
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F6F3] flex flex-col md:flex-row">
      {/* Sidebar do administrador */}
      <aside className="w-full p-6 bg-white shadow-md md:w-64 md:min-h-screen">
        <h2 className="text-2xl font-bold text-[#5A5040] mb-6">Administrador</h2>
        <div className="space-y-2 text-[#5A5040]">
          <p><strong>Nome:</strong> Marcelo</p>
          <p><strong>E-mail:</strong> admin@email.com</p>
        </div>
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-[#5A5040] mb-8">Orçamentos Recebidos</h1>
        <div className="bg-white rounded-lg shadow p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {orcamentos.length === 0 ? (
            <p className="text-[#5A5040]">Nenhum orçamento encontrado.</p>
          ) : (
            orcamentos.map((orc: any) => (
              <div key={orc.id} className="pb-4 text-black border-b">
                <p><strong>Evento:</strong> {orc.tipoEvento}</p>
                <p><strong>Data do Evento:</strong> {new Date(orc.dataEvento).toLocaleDateString("pt-BR")}</p>
                <p><strong>Horário:</strong> {orc.horarioInicio} - {orc.horarioTermino}</p>
                <p><strong>Convidados:</strong> {orc.convidados}</p>
                <p><strong>Observações:</strong> {orc.observacoes || "Nenhuma"}</p>
                <p><strong>Data de envio:</strong> {new Date(orc.createdAt).toLocaleString("pt-BR")}</p>

                {orc.pessoa && (
                  <div className="mt-4">
                    <p className="font-semibold">Dados do Cliente:</p>
                    <p><strong>Nome:</strong> {orc.pessoa.nome}</p>
                    <p><strong>Email:</strong> {orc.pessoa.email}</p>
                    <p><strong>Telefone:</strong> {orc.pessoa.telefone}</p>
                    <p><strong>CPF:</strong> {orc.pessoa.cpf}</p>
                  </div>
                )}

                <div>
                  <p className="mt-2"><strong>Adicionais:</strong></p>
                  <ul className="ml-6 list-disc">
                    {orc.adicionais?.map((add: any, index: number) => (
                      <li key={index}>{add.nome} x {add.qtd} — R${(add.preco).toFixed(2)}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}


