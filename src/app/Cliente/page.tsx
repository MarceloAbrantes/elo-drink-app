"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Image from "next/image";

export default function OrcamentoPage() {
  const [eventoSelecionado, setEventoSelecionado] = useState<string | null>(null);

  const eventos = [
    "Debutante",
    "Casamento",
    "Corporativo",
    "Aniversário",
    "Outro",
  ];

  function selecionarEvento(evento: string) {
    setEventoSelecionado(evento);
  }

  return (
    <div className="min-h-screen bg-[#F7F6F3] flex flex-col pt-24 px-8">

      {/* Área de eventos + imagem */}
      <div className="flex flex-col items-start justify-start gap-12 lg:flex-row">

        {/* Área de Texto + Lista de Eventos */}
        <div className="flex flex-col w-full max-w-2xl">
          {/* Título principal alinhado à esquerda */}
          <h1 className="text-4xl font-bold text-[#5A5040] mb-8 ml-15">
            Faça agora o orçamento do seu evento!
          </h1>

          {/* Lista de eventos */}
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

        {/* Imagem à direita maior */}
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

      {/* Card aberto ao clicar no evento */}
      {eventoSelecionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="relative w-full max-w-5xl p-8 bg-white shadow-2xl rounded-xl overflow-y-auto max-h-[90vh]">

            {/* Botão fechar */}
            <button
              onClick={() => setEventoSelecionado(null)}
              className="absolute text-2xl text-gray-600 top-4 right-4 hover:text-red-500"
            >
              ×
            </button>

            <h2 className="text-3xl font-bold text-[#5A5040] mb-8 text-center">
              Orçamento para {eventoSelecionado}
            </h2>

            {/* Formulário de informações */}
            {(eventoSelecionado === "Debutante" || eventoSelecionado === "Casamento") ? (
              <form className="space-y-6 text-[#5A5040]">
                
                {/* Data */}
                <div>
                  <label className="font-semibold">Data do Evento</label>
                  <input type="date" className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#8B6E4E]" />
                </div>

                {/* Horário */}
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="font-semibold">Início</label>
                    <input type="time" className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#8B6E4E]" />
                  </div>
                  <div className="flex-1">
                    <label className="font-semibold">Término</label>
                    <input type="time" className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#8B6E4E]" />
                  </div>
                </div>

                {/* Número de convidados */}
                <div>
                  <label className="font-semibold">Número de Convidados</label>
                  <input type="number" placeholder="Ex: 200" className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#8B6E4E]" />
                </div>

                {/* Drinks especiais */}
                <div>
                  <label className="font-semibold">Drinks Especiais</label>
                  <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
                    {eventoSelecionado === "Debutante" && (
                      <>
                        <div className="p-4 border rounded-md">
                          <p>Moscow Mule</p>
                        </div>
                        <div className="p-4 border rounded-md">
                          <p>Basil Smash</p>
                        </div>
                        <div className="p-4 border rounded-md">
                          <p>Penicilin</p>
                        </div>
                        <div className="p-4 border rounded-md">
                          <p>Fitzgerald</p>
                        </div>
                      </>
                    )}
                    {eventoSelecionado === "Casamento" && (
                      <>
                        <div className="p-4 border rounded-md">
                          <p>Moscow Mule</p>
                        </div>
                        <div className="p-4 border rounded-md">
                          <p>Fitzgerald</p>
                        </div>
                        <div className="p-4 border rounded-md">
                          <p>Penicilin</p>
                        </div>
                        <div className="p-4 border rounded-md">
                          <p>Paradise</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Itens Opcionais */}
                <div>
                  <label className="font-semibold">Adicionais</label>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center gap-4">
                      <input type="number" min={0} placeholder="Qtd" className="w-20 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#8B6E4E]" />
                      <span>Cerveja Premium (Heineken/Stella)</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <input type="number" min={0} placeholder="Qtd" className="w-20 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#8B6E4E]" />
                      <span>Espumante Freixenet</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <input type="number" min={0} placeholder="Qtd" className="w-20 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#8B6E4E]" />
                      <span>Whisky Black Label</span>
                    </div>
                  </div>
                </div>

                {/* Observação adicional */}
                <div>
                  <label className="font-semibold">Observações</label>
                  <textarea rows={3} placeholder="Alguma observação especial..." className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#8B6E4E]" />
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


