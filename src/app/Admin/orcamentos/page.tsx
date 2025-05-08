'use client';
import { useEffect, useState } from "react";

export default function OrcamentosPage() {
  const [orcamentos, setOrcamentos] = useState([]);

  useEffect(() => {
    fetch("/api/orcamentos/lista")
      .then(res => res.json())
      .then(data => setOrcamentos(data));
  }, []);

  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl font-bold">Orçamentos Recebidos</h1>
      <ul className="space-y-4">
        {orcamentos.map((orc: any) => (
          <li key={orc.id} className="p-4 border rounded-md shadow">
            <p><strong>Evento:</strong> {orc.tipoEvento}</p>
            <p><strong>Data:</strong> {new Date(orc.dataEvento).toLocaleDateString()}</p>
            <p><strong>Horário:</strong> {orc.horarioInicio} - {orc.horarioTermino}</p>
            <p><strong>Convidados:</strong> {orc.convidados}</p>
            <p><strong>Observações:</strong> {orc.observacoes || "Nenhuma"}</p>
            <p><strong>Adicionais:</strong></p>
            <ul className="ml-4 list-disc">
              {orc.adicionais?.map((add: any, index: number) => (
                <li key={index}>{add.nome} x {add.qtd} — R${add.preco}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}