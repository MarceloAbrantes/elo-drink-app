'use client';

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function OrcamentoPage() {
  const router = useRouter();
  const [eventoSelecionado, setEventoSelecionado] = useState<string | null>(null);

  const eventos = ['Debutante', 'Casamento', 'Corporativo', 'Aniversário', 'Outro'];

  const adicionais = {
    bebidas: [
      { nome: 'Cerveja Premium (Heineken/Stella)', preco: 9, unidade: 'por unidade' },
      { nome: 'Espumante Freixenet Brut', preco: 75, unidade: 'por unidade' },
      { nome: 'Espumante Salton Brut', preco: 40, unidade: 'por unidade' },
      { nome: 'Whisky Black Label', preco: 160, unidade: 'por unidade' },
      { nome: 'Whisky Red Label', preco: 100, unidade: 'por unidade' },
    ],
    servicos: [
      { nome: 'Seguro Quebra', preco: 9, unidade: 'por convidado' },
      { nome: 'Módulo de Bar Profissional', preco: 1500, unidade: 'valor fixo' },
      { nome: 'Bar Whiskeria (harmonizações)', preco: 3500, unidade: 'valor fixo' },
    ],
    personalizados: [
      { nome: 'Drink na Lâmpada', preco: 8, unidade: 'por unidade' },
      { nome: 'Shot Mini Beer – 100 unid.', preco: 1200, unidade: 'lote' },
      { nome: 'Mini milk-shakes de Oreo – 100 unid.', preco: 1500, unidade: 'lote' },
      { nome: 'Tequila de café em copinhos de chocolate – 50 unid.', preco: 800, unidade: 'lote' },
      { nome: 'Jägermeister em tubos de ensaio – 50 unid.', preco: 500, unidade: 'lote' },
      { nome: 'Busca Vida em mini garrafas – 50 unid.', preco: 500, unidade: 'lote' },
      { nome: 'Welcome Drink – Ponche Lillet', preco: 3500, unidade: 'valor fixo' },
      { nome: 'Carrinho de Carajillo', preco: 1800, unidade: 'valor fixo' },
    ],
  };

  const [formData, setFormData] = useState({
    nome: '',
    dataEvento: '',
    horarioInicio: '',
    horarioTermino: '',
    convidados: '',
    observacoes: '',
    adicionais: [] as { nome: string; qtd: number; preco: number }[],
  });

  useEffect(() => {
    const hoje = new Date().toISOString().split('T')[0];
    setFormData((prev) => ({ ...prev, eventDate: hoje }));
  }, []);

  function handleInputChange(field: string, value: any) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!formData.dataEvento || !formData.horarioInicio || !formData.horarioTermino || !formData.convidados) {
      alert("Por favor, preencha todos os campos obrigatórios: Data, Horário e Convidados.");
      return;
    }

    const payload = {
      tipoEvento: eventoSelecionado,
      dataEvento: formData.dataEvento,
      horarioInicio: formData.horarioInicio,
      horarioTermino: formData.horarioTermino,
      convidados: Number(formData.convidados),
      observacoes: formData.observacoes,
      adicionais: formData.adicionais,
    };

    localStorage.setItem('orcamento_draft', JSON.stringify(payload));
    window.location.href = '/Cliente/Finalizar';
  }

  function selecionarEvento(evento: string) {
    setEventoSelecionado(evento);
  }

  function adicionarAdicional(nome: string, preco: number) {
    setFormData((prev) => {
      const outros = prev.adicionais.filter((a) => a.nome !== nome);
      return {
        ...prev,
        adicionais: [...outros, { nome, qtd: 1, preco }],
      };
    });
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#101820] px-8 pt-24 overflow-x-hidden relative">
      <img src="/fundo.svg" alt="Fundo decorativo" className="absolute inset-0 z-0 object-cover w-full h-full max-w-full opacity-50" />
      <div className="relative z-10 flex flex-col items-start justify-start gap-12 lg:flex-row">
        <div className="flex flex-col w-full max-w-2xl">
          <h1 className="mb-8 ml-15 text-4xl font-bold text-[#F7F6F3]">Faça agora o orçamento do seu evento!</h1>
          <div className="flex flex-col gap-6">
            {eventos.map((evento) => (
              <div
                key={evento}
                className="flex cursor-pointer items-center justify-between rounded-lg border-l-8 border-[#F7F6F3] bg-[#5A5040] p-6 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md"
                onClick={() => selecionarEvento(evento)}
              >
                <span className="text-2xl font-semibold text-[#F7F6F3]">{evento}</span>
                <Plus size={32} color="#101820" />
              </div>
            ))}
          </div>
        </div>

        <div className="justify-end hidden w-full lg:flex">
          <div className="relative h-[700px] w-[700px] overflow-hidden rounded-lg shadow-md opacity-40">
            <Image src="/img1.JPG" alt="Drinks Elo" fill className="object-contain" priority />
          </div>
        </div>
      </div>

      {eventoSelecionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-xl bg-[#101820] p-8 shadow-2xl">
            <button onClick={() => setEventoSelecionado(null)} className="absolute text-2xl text-gray-600 top-4 right-4 hover:text-red-500">×</button>
            <h2 className="mb-8 text-center text-3xl font-bold text-[#F7F6F3]">Orçamento para {eventoSelecionado}</h2>

            <div className="mb-6">
              <p className="text-center text-[#F7F6F3]">Não encontrou o que procura?</p>
              <button
                onClick={() => router.push("/Cliente/Contato")}
                className="mt-2 mx-auto block rounded-md border border-[#F7F6F3] px-6 py-2 text-sm text-[#F7F6F3] hover:bg-[#5A5040] transition"
              >
                Criar orçamento personalizado
              </button>
            </div>

            {eventoSelecionado === 'Debutante' || eventoSelecionado === 'Casamento' ? (
              <form className="space-y-6 text-[#F7F6F3]" onSubmit={handleSubmit}>
                <div>
                  <label className="font-semibold">Data do Evento <span className="text-red-500">*</span></label>
                  <input type="date" value={formData.dataEvento} onChange={(e) => handleInputChange('dataEvento', e.target.value)} className="w-full p-3 mt-2 border rounded-md" required />
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="font-semibold">Início <span className="text-red-500">*</span></label>
                    <input type="time" value={formData.horarioInicio} onChange={(e) => handleInputChange('horarioInicio', e.target.value)} className="w-full p-3 mt-2 border rounded-md" required />
                  </div>
                  <div className="flex-1">
                    <label className="font-semibold">Término <span className="text-red-500">*</span></label>
                    <input type="time" value={formData.horarioTermino} onChange={(e) => handleInputChange('horarioTermino', e.target.value)} className="w-full p-3 mt-2 border rounded-md" required />
                  </div>
                </div>

                <div>
                  <label className="font-semibold">Número de Convidados <span className="text-red-500">*</span></label>
                  <input type="number" value={formData.convidados} onChange={(e) => handleInputChange('convidados', e.target.value)} className="w-full p-3 mt-2 border rounded-md" required />
                </div>

                <div>
                  <label className="font-semibold">Itens inclusos no pacote</label>
                  <ul className="mt-4 space-y-2 list-disc list-inside">
                    {eventoSelecionado === 'Casamento' && (
                      <>
                        <li>Drinks: Moscow Mule, Fitzgerald, Penicilin, Paradise, Aperol Spritz</li>
                        <li>Gin Tônica: Toranja Tonic, Classic Tonic</li>
                        <li>Caipirinhas: Abacaxi com hortelã, Kiwi com canela, Caju com cravo</li>
                      </>
                    )}
                    {eventoSelecionado === 'Debutante' && (
                      <>
                        <li>
                          Drinks: Moscow Mule, Basil Smash, Penicilin, Fitzgerald, Classic Tonic
                        </li>
                        <li>
                          Caipirinhas: Abacaxi com hortelã, Uva com manjericão, Kiwi com limão
                        </li>
                        <li>
                          Soft Drinks: Cirque Blue, Pink Lemonade, Pina Descolada, Lichia Paradise,
                          Sonho Brilhante
                        </li>
                      </>
                    )}
                    <li>Destilados premium inclusos</li>
                    <li>Equipe completa com estrutura de bar, copos e utensílios</li>
                  </ul>
                </div>

                {Object.entries(adicionais).map(([categoria, itens]) => (
                  <div key={categoria}>
                    <h3 className="pb-1 mt-8 mb-2 text-xl font-semibold capitalize border-b">
                      {categoria === 'bebidas'
                        ? 'Adicionais de Bebidas'
                        : categoria === 'servicos'
                          ? 'Serviços e Estrutura'
                          : 'Extras e Personalizações'}
                    </h3>
                    <div className="space-y-4">
                      {itens.map((item) => (
                        <div key={item.nome} className="flex items-center gap-4">
                        {['valor fixo', 'por convidado'].includes(item.unidade) ? (
                          <input
                            type="checkbox"
                            onChange={(e) => {
                              const checked = e.target.checked;
                              setFormData((prev) => {
                                const outros = prev.adicionais.filter((a) => a.nome !== item.nome);
                                return {
                                  ...prev,
                                  adicionais: checked
                                    ? [...outros, { nome: item.nome, qtd: 1, preco: item.preco }]
                                    : outros,
                                };
                              });
                            }}
                            className="h-6 w-6 accent-[#5A5040] cursor-pointer"
                          />
                        ) : (
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
                                  adicionais:
                                    qtd > 0
                                      ? [...outros, { nome: item.nome, qtd, preco: item.preco }]
                                      : outros,
                                };
                              });
                            }}
                            className="w-20 p-2 border rounded-md"
                          />
                        )}
                          <span>
                            {item.nome} — <strong>R${item.preco.toFixed(2)}</strong>{' '}
                            <em>({item.unidade})</em>
                          </span>
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
                    onChange={(e) => handleInputChange('observacoes', e.target.value)}
                    placeholder="Alguma observação especial..."
                    className="w-full p-3 mt-2 border rounded-md"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-[#5A5040] py-3 text-lg font-semibold text-[#F7F6F3] transition hover:bg-[#4a4135]"
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
