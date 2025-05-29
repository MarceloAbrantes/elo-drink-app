'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Lottie from 'lottie-react';
import jsPDF from 'jspdf';
import successAnimation from '@/assets/lotties/success-animation.json';

export default function FinalizarPage() {
  const [orcamento, setOrcamento] = useState<any>(null);
  const [dadosPessoais, setDadosPessoais] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
  });
  const [errors, setErrors] = useState({
    nome: false,
    email: false,
    telefone: false,
    cpf: false,
  });
  const [finalizado, setFinalizado] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const draft = localStorage.getItem('orcamento_draft');
    if (draft) setOrcamento(JSON.parse(draft));
  }, []);

  function formatTelefone(value: string) {
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .slice(0, 15);
  }

  function formatCPF(value: string) {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      .slice(0, 14);
  }

  function handleChange(field: string, value: string) {
    if (field === 'telefone') value = formatTelefone(value);
    if (field === 'cpf') value = formatCPF(value);

    setDadosPessoais((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: false }));
  }

  function gerarPDF(payload: any) {
    const doc = new jsPDF();

    const img = new Image();
    img.src = '/imagemparapdf.jpg';

    img.onload = () => {
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      doc.addImage(img, 'JPG', 0, 0, pageWidth, pageHeight);

      // Título centralizado
      doc.setFontSize(20);
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'bold');
      doc.text('Resumo do Orçamento', pageWidth / 2, 30, { align: 'center' });

      // Informações pessoais
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      let y = 45;
      doc.text(`Nome: ${payload.nome}    Email: ${payload.email}`, 10, y);
      doc.text(`Telefone: ${payload.telefone}    CPF: ${payload.cpf}`, 10, y + 8);

      // Informações do evento com fonte menor
      doc.setFontSize(10);
      y += 20;
      doc.text(`Tipo de Evento: ${payload.tipoEvento}`, 10, y += 10);
      doc.text(`Data do Evento: ${new Date(payload.dataEvento).toLocaleDateString('pt-BR')}`, 10, y += 7);
      doc.text(`Horário: ${payload.horarioInicio} - ${payload.horarioTermino}`, 10, y += 7);
      doc.text(`Número de Convidados: ${payload.convidados}`, 10, y += 7);
      doc.text(`Observações: ${payload.observacoes || 'Nenhuma'}`, 10, y += 7);

      // Adicionais
      doc.text('Adicionais:', 10, y += 10);
      payload.adicionais.forEach((item: any) => {
        const isSeguro = item.nome.toLowerCase().includes('seguro');
        const qtd = isSeguro ? payload.convidados : item.qtd;
        const total = qtd * item.preco;
        doc.text(`- ${item.nome} x ${qtd} — R$ ${total.toFixed(2)}`, 10, y += 7);
      });

      // Cálculo de total
      const totalAdicionais = payload.adicionais.reduce((acc: number, item: any) => {
        const isSeguro = item.nome.toLowerCase().includes('seguro');
        const qtd = isSeguro ? payload.convidados : item.qtd;
        return acc + qtd * item.preco;
      }, 0);
      const total = payload.convidados * 85.0 + totalAdicionais;

      // Total com destaque
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(`Total: R$ ${total.toFixed(2)}`, 10, y + 15);

      doc.save('orcamento.pdf');
    };
  }

  async function finalizarOrcamento() {
    const camposObrigatorios = ['nome', 'email', 'telefone', 'cpf'] as const;
    const novosErros = camposObrigatorios.reduce((acc, campo) => {
      acc[campo] = dadosPessoais[campo].trim() === '';
      return acc;
    }, {} as Record<typeof camposObrigatorios[number], boolean>);

    setErrors(novosErros);
    const temErro = Object.values(novosErros).some((val) => val);
    if (temErro) return;

    const payload = {
      ...orcamento,
      ...dadosPessoais,
    };

    try {
      const res = await fetch('/api/orcamentos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        gerarPDF(payload);
        localStorage.removeItem('orcamento_draft');
        setFinalizado(true);
        setTimeout(() => {
          router.push('/Cliente');
        }, 10000);
      } else {
        alert('Erro ao finalizar orçamento.');
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao finalizar orçamento.');
    }
  }

  if (finalizado) {
    return (
      <div className="flex items-center justify-center min-h-screen p-8 bg-[#101820]">
        <div className="flex flex-col items-center space-y-6 text-center">
          <div className="w-96 h-96">
            <Lottie animationData={successAnimation} loop={false} />
          </div>
          <h1 className="text-3xl font-bold text-[#F7F6F3]">Orçamento finalizado com sucesso!</h1>
          <p className="text-lg text-[#F7F6F3]">
            Você será redirecionado para a página inicial em instantes...
          </p>
        </div>
      </div>
    );
  }

  if (!orcamento) {
    return <div className="p-8 text-lg text-center">Nenhum orçamento foi iniciado.</div>;
  }

  const dataFormatada = new Date(orcamento.dataEvento).toLocaleDateString('pt-BR');

  const adicionaisComTotais = orcamento.adicionais.map((item: any) => {
    const isSeguro = item.nome.toLowerCase().includes('seguro');
    const qtd = isSeguro ? orcamento.convidados : item.qtd;
    return {
      ...item,
      qtdCalculada: qtd,
      total: qtd * item.preco,
    };
  });

  const totalAdicionais = adicionaisComTotais.reduce((acc: number, item: any) => acc + item.total, 0);
  const total = Number(orcamento.convidados * 85.0) + totalAdicionais;

  return (
    <div className="relative flex min-h-screen flex-col bg-[#101820] p-8 md:flex-row overflow-hidden">
      <img
        src="/fundo.svg"
        alt="Fundo decorativo"
        className="absolute inset-0 z-0 object-cover w-full h-full pointer-events-none opacity-30"
      />

      <div className="relative z-10 flex-1 space-y-6">
        <h1 className="mb-4 text-3xl font-bold text-[#F7F6F3]">Resumo do Orçamento</h1>

        <div className="rounded-lg bg-[#5A5040] p-6 text-[#F7F6F3] shadow">
          <p><strong>Tipo de Evento:</strong> {orcamento.tipoEvento}</p>
          <p><strong>Data:</strong> {dataFormatada}</p>
          <p><strong>Horário:</strong> {orcamento.horarioInicio} - {orcamento.horarioTermino}</p>
          <p><strong>Convidados:</strong> {orcamento.convidados}</p>
          <p><strong>Observações:</strong> {orcamento.observacoes || 'Nenhuma'}</p>

          <h2 className="mt-4 text-xl font-semibold">Adicionais</h2>
          <ul className="list-disc list-inside">
            {adicionaisComTotais.map((item: any, i: number) => (
              <li key={i}>
                {item.nome} x {item.qtdCalculada} — R${item.total.toFixed(2)}
              </li>
            ))}
          </ul>

          <p className="mt-4"><strong>Total:</strong> R$ {total.toFixed(2)}</p>
        </div>
      </div>

      <div className="w-full p-6 mt-8 bg-[#5A5040] rounded-lg shadow-lg h-fit md:mt-0 md:ml-8 md:w-1/3">
        <h2 className="mb-4 text-xl font-semibold text-[#F7F6F3]">Seus dados</h2>

        {['nome', 'email', 'telefone', 'cpf'].map((campo) => (
          <div key={campo} className="mb-4">
            <label className="block font-semibold text-[#F7F6F3]">
              {campo[0].toUpperCase() + campo.slice(1)} <span className="text-red-500">*</span>
            </label>
            <input
              type={campo === 'email' ? 'email' : 'text'}
              placeholder={
                campo === 'nome' ? 'Nome completo' :
                campo === 'email' ? 'E-mail' :
                campo === 'telefone' ? 'Celular' :
                campo === 'cpf' ? 'CPF' : ''
              }
              value={dadosPessoais[campo as keyof typeof dadosPessoais]}
              onChange={(e) => handleChange(campo, e.target.value)}
              className={`mt-1 w-full rounded-md border p-3 placeholder:text-[#F7F6F3] text-[#F7F6F3] ${errors[campo as keyof typeof errors] ? 'border-red-500' : ''}`}
            />
            {errors[campo as keyof typeof errors] && (
              <span className="text-sm text-red-500">Preencha esse campo</span>
            )}
          </div>
        ))}

        <button
          onClick={finalizarOrcamento}
          className="w-full rounded-lg bg-[#F7F6F3] py-3 text-lg font-semibold text-[#5A5040] transition hover:bg-[#4a4135]"
        >
          Finalizar orçamento
        </button>
      </div>
    </div>
  );
}
