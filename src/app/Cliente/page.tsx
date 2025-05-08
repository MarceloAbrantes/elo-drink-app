"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Image from "next/image";

export default function OrcamentoPage() {
  const [eventoSelecionado, setEventoSelecionado] = useState<string | null>(null);

  const eventos = ["Debutante", "Casamento", "Corporativo", "Aniversário", "Outro"];

  const adicionais = {
    bebidas: [
      { nome: "Cerveja Premium (Heineken/Stella)", preco: 9, unidade: "por unidade" },
      { nome: "Espumante Freixenet Brut", preco: 75, unidade: "por unidade" },
      { nome: "Espumante Salton Brut", preco: 40, unidade: "por unidade" },
      { nome: "Whisky Black Label", preco: 160, unidade: "por unidade" },
      { nome: "Whisky Red Label", preco: 100, unidade: "por unidade" },
    ],
    servicos: [
      { nome: "Seguro Quebra", preco: 9, unidade: "por convidado" },
      { nome: "Módulo de Bar Profissional", preco: 1500, unidade: "valor fixo" },
      { nome: "Bar Whiskeria (harmonizações)", preco: 3500, unidade: "valor fixo" },
    ],
    personalizados: [
      { nome: "Drink na Lâmpada", preco: 8, unidade: "por unidade" },
      { nome: "Shot Mini Beer – 100 unid.", preco: 1200, unidade: "lote" },
      { nome: "Mini milk-shakes de Oreo – 100 unid.", preco: 1500, unidade: "lote" },
      { nome: "Tequila de café em copinhos de chocolate – 50 unid.", preco: 800, unidade: "lote" },
      { nome: "Jägermeister em tubos de ensaio – 50 unid.", preco: 500, unidade: "lote" },
      { nome: "Busca Vida em mini garrafas – 50 unid.", preco: 500, unidade: "lote" },
      { nome: "Welcome Drink – Ponche Lillet", preco: 3500, unidade: "valor fixo" },
      { nome: "Carrinho de Carajillo", preco: 1800, unidade: "valor fixo" },
    ],
  };

  const [formData, setFormData] = useState({
    dataEvento: '',
    horarioInicio: '',
    horarioTermino: '',
    convidados: '',
    observacoes: '',
    adicionais: [] as { nome: string; qtd: number; preco: number }[],
  });

  function handleInputChange(field: string, value: any) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  
    const payload = {
      tipoEvento: eventoSelecionado,
      dataEvento: formData.dataEvento,
      horarioInicio: formData.horarioInicio,
      horarioTermino: formData.horarioTermino,
      convidados: Number(formData.convidados),
      observacoes: formData.observacoes,
      adicionais: formData.adicionais,
    };
  
    // Salvar no localStorage (como rascunho)
    localStorage.setItem("orcamento_draft", JSON.stringify(payload));
  
    // Redirecionar para página de finalização
    window.location.href = "/Cliente/Finalizar";
  }

  function selecionarEvento(evento: string) {
    setEventoSelecionado(evento);
  }

  return (
    <div className="min-h-screen bg-[#F7F6F3] flex flex-col pt-24 px-8">
      <div className="flex flex-col items-start justify-start gap-12 lg:flex-row">
        <div className="flex flex-col w-full max-w-2xl">
          <h1 className="text-4xl font-bold text-[#5A5040] mb-8 ml-15">
            Faça agora o orçamento do seu evento!
          </h1>
          <div className="flex flex-col gap-6">
            {eventos.map((evento) => (
              <div
                key={evento}
                className="flex justify-between items-center p-6 bg-white rounded-lg shadow-md border-l-8 border-[#E0CEAA] cursor-pointer hover:scale-105 hover:shadow-lg transition-all duration-300"
                onClick={() => selecionarEvento(evento)}
              >
                <span className="text-2xl text-[#5A5040] font-semibold">{evento}</span>
                <Plus size={32} color="#5A5040" />
              </div>
            ))}
          </div>
        </div>

        <div className="justify-end hidden w-full lg:flex">
          <div className="w-[700px] h-[700px] relative rounded-lg overflow-hidden shadow-md">
            <Image
              src="/imagem_fundo2.JPG"
              alt="Drinks Elo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>

      {eventoSelecionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="relative w-full max-w-5xl p-8 bg-white shadow-2xl rounded-xl overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setEventoSelecionado(null)}
              className="absolute text-2xl text-gray-600 top-4 right-4 hover:text-red-500"
            >
              ×
            </button>

            <h2 className="text-3xl font-bold text-[#5A5040] mb-8 text-center">
              Orçamento para {eventoSelecionado}
            </h2>

            {(eventoSelecionado === "Debutante" || eventoSelecionado === "Casamento") ? (
              <form className="space-y-6 text-[#5A5040]" onSubmit={handleSubmit}>
                <div>
                  <label className="font-semibold">Data do Evento</label>
                  <input
                    type="date"
                    value={formData.dataEvento}
                    onChange={(e) => handleInputChange("dataEvento", e.target.value)}
                    className="w-full p-3 mt-2 border rounded-md"
                  />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="font-semibold">Início</label>
                    <input
                      type="time"
                      value={formData.horarioInicio}
                      onChange={(e) => handleInputChange("horarioInicio", e.target.value)}
                      className="w-full p-3 mt-2 border rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="font-semibold">Término</label>
                    <input
                      type="time"
                      value={formData.horarioTermino}
                      onChange={(e) => handleInputChange("horarioTermino", e.target.value)}
                      className="w-full p-3 mt-2 border rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-semibold">Número de Convidados</label>
                  <input
                    type="number"
                    value={formData.convidados}
                    onChange={(e) => handleInputChange("convidados", e.target.value)}
                    className="w-full p-3 mt-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="font-semibold">Itens inclusos no pacote</label>
                  <ul className="mt-4 space-y-2 list-disc list-inside">
                    {eventoSelecionado === "Casamento" && (
                      <>
                        <li>Drinks: Moscow Mule, Fitzgerald, Penicilin, Paradise, Aperol Spritz</li>
                        <li>Gin Tônica: Toranja Tonic, Classic Tonic</li>
                        <li>Caipirinhas: Abacaxi com hortelã, Kiwi com canela, Caju com cravo</li>
                      </>
                    )}
                    {eventoSelecionado === "Debutante" && (
                      <>
                        <li>Drinks: Moscow Mule, Basil Smash, Penicilin, Fitzgerald, Classic Tonic</li>
                        <li>Caipirinhas: Abacaxi com hortelã, Uva com manjericão, Kiwi com limão</li>
                        <li>Soft Drinks: Cirque Blue, Pink Lemonade, Pina Descolada, Lichia Paradise, Sonho Brilhante</li>
                      </>
                    )}
                    <li>Destilados premium inclusos</li>
                    <li>Equipe completa com estrutura de bar, copos e utensílios</li>
                  </ul>
                </div>

                {Object.entries(adicionais).map(([categoria, itens]) => (
                  <div key={categoria}>
                    <h3 className="pb-1 mt-8 mb-2 text-xl font-semibold capitalize border-b">
                      {categoria === "bebidas" ? "Adicionais de Bebidas" :
                        categoria === "servicos" ? "Serviços e Estrutura" :
                          "Extras e Personalizações"}
                    </h3>
                    <div className="space-y-4">
                      {itens.map((item) => (
                        <div key={item.nome} className="flex items-center gap-4">
                          <input
                            type="number"
                            min={0}
                            placeholder="Qtd"
                            onChange={(e) => {
                              const qtd = parseInt(e.target.value || '0');
                              setFormData((prev) => {
                                const outros = prev.adicionais.filter((a) => a.nome !== item.nome);
                                return {
                                  ...prev,
                                  adicionais: qtd > 0 ? [...outros, { nome: item.nome, qtd, preco: item.preco }] : outros,
                                };
                              });
                            }}
                            className="w-20 p-2 border rounded-md"
                          />
                          <span>{item.nome} — <strong>R${item.preco.toFixed(2)}</strong> <em>({item.unidade})</em></span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <div>
                  <label className="font-semibold">Observações</label>
                  <textarea
                    rows={3}
                    value={formData.observacoes}
                    onChange={(e) => handleInputChange("observacoes", e.target.value)}
                    placeholder="Alguma observação especial..."
                    className="w-full p-3 mt-2 border rounded-md"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-[#5A5040] text-white py-3 rounded-lg text-lg font-semibold hover:bg-[#4a4135] transition"
                  >
                    Continuar orçamento
                  </button>
                </div>
              </form>
            ) : (
              <p className="text-lg text-center">Em breve essa opção estará disponível.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


