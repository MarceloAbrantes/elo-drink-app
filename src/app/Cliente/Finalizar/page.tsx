"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function FinalizarPage() {
  const [orcamento, setOrcamento] = useState<any>(null);
  const [dadosPessoais, setDadosPessoais] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
  });
  const router = useRouter();

  useEffect(() => {
    const draft = localStorage.getItem("orcamento_draft");
    if (draft) setOrcamento(JSON.parse(draft));
  }, []);

  function handleChange(field: string, value: string) {
    setDadosPessoais((prev) => ({ ...prev, [field]: value }));
  }

  async function finalizarOrcamento() {
    try {
      const payload = {
        ...orcamento,
        ...dadosPessoais,
      };

      const res = await fetch("/api/orcamentos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Orçamento finalizado com sucesso!");
        localStorage.removeItem("orcamento_draft");
        router.push("/cliente/finalizar?sucesso=1");
      } else {
        alert("Erro ao finalizar orçamento.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao finalizar orçamento.");
    }
  }

  if (!orcamento) {
    return (
      <div className="p-8 text-lg text-center">Nenhum orçamento foi iniciado.</div>
    );
  }

  const dataFormatada = new Date(orcamento.dataEvento).toLocaleDateString("pt-BR");

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#F7F6F3] p-8">
      <div className="flex-1 space-y-6">
        <h1 className="text-3xl font-bold text-[#5A5040] mb-4">Resumo do Orçamento</h1>

        <div className="p-6 bg-white rounded-lg shadow">
          <p><strong>Tipo de Evento:</strong> {orcamento.tipoEvento}</p>
          <p><strong>Data:</strong> {dataFormatada}</p>
          <p><strong>Horário:</strong> {orcamento.horarioInicio} - {orcamento.horarioTermino}</p>
          <p><strong>Convidados:</strong> {orcamento.convidados}</p>
          <p><strong>Observações:</strong> {orcamento.observacoes || "Nenhuma"}</p>

          <h2 className="mt-4 text-xl font-semibold">Adicionais</h2>
          <ul className="list-disc list-inside">
            {orcamento.adicionais.map((item: any, i: number) => (
              <li key={i}>{item.nome} x {item.qtd} — R${(item.qtd * item.preco).toFixed(2)}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="w-full p-6 mt-8 bg-white rounded-lg shadow-lg md:w-1/3 md:mt-0 md:ml-8 h-fit">
        <h2 className="text-xl font-semibold mb-4 text-[#5A5040]">Seus dados</h2>

        <input
          type="text"
          placeholder="Nome completo"
          value={dadosPessoais.nome}
          onChange={(e) => handleChange("nome", e.target.value)}
          className="w-full p-3 mb-4 border rounded-md"
        />
        <input
          type="email"
          placeholder="E-mail"
          value={dadosPessoais.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className="w-full p-3 mb-4 border rounded-md"
        />
        <input
          type="tel"
          placeholder="Celular"
          value={dadosPessoais.telefone}
          onChange={(e) => handleChange("telefone", e.target.value)}
          className="w-full p-3 mb-4 border rounded-md"
        />
        <input
          type="text"
          placeholder="CPF"
          value={dadosPessoais.cpf}
          onChange={(e) => handleChange("cpf", e.target.value)}
          className="w-full p-3 mb-6 border rounded-md"
        />

        <button
          onClick={finalizarOrcamento}
          className="w-full bg-[#5A5040] text-white py-3 rounded-lg text-lg font-semibold hover:bg-[#4a4135] transition"
        >
          Finalizar orçamento
        </button>
      </div>
    </div>
  );
}
