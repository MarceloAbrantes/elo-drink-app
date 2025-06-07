// __tests__/Finalizar.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FinalizarPage from '@/app/Cliente/Finalizar/page';
import '@testing-library/jest-dom';

// MOCK do lottie-react para evitar erro com canvas no ambiente de testes
jest.mock('lottie-react', () => () => <div data-testid="lottie-mock" />);

// Mock para roteamento
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

beforeEach(() => {
  localStorage.clear();
});

describe('FinalizarPage', () => {
  it('exibe mensagem de nenhum orçamento se não houver rascunho', () => {
    render(<FinalizarPage />);
    expect(screen.getByText('Nenhum orçamento foi iniciado.')).toBeInTheDocument();
  });

  it('exibe campos de dados pessoais se houver rascunho no localStorage', async () => {
    const orcamentoMock = {
      tipoEvento: 'Casamento',
      dataEvento: new Date().toISOString(),
      horarioInicio: '18:00',
      horarioTermino: '23:00',
      convidados: 100,
      observacoes: 'Nenhuma',
      adicionais: [],
    };

    localStorage.setItem('orcamento_draft', JSON.stringify(orcamentoMock));

    render(<FinalizarPage />);

    await waitFor(() => {
      expect(screen.getByText('Resumo do Orçamento')).toBeInTheDocument();
    });

    expect(screen.getByPlaceholderText('Nome completo')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('E-mail')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Celular')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('CPF')).toBeInTheDocument();
  });

  it('valida campos obrigatórios antes de finalizar', async () => {
    const orcamentoMock = {
      tipoEvento: 'Casamento',
      dataEvento: new Date().toISOString(),
      horarioInicio: '18:00',
      horarioTermino: '23:00',
      convidados: 100,
      observacoes: 'Nenhuma',
      adicionais: [],
    };
    localStorage.setItem('orcamento_draft', JSON.stringify(orcamentoMock));

    render(<FinalizarPage />);

    await waitFor(() => {
      expect(screen.getByText('Resumo do Orçamento')).toBeInTheDocument();
    });

    const button = screen.getByRole('button', { name: /Finalizar orçamento/i });
    fireEvent.click(button);

    expect(await screen.findAllByText('Preencha esse campo')).toHaveLength(4);
  });
});
