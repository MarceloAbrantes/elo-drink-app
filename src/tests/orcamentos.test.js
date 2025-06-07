// __tests__/orcamentos.test.js
import { render, screen, waitFor } from "@testing-library/react";
import OrcamentosPage from '@/app/Admin/orcamentos/page';
import '@testing-library/jest-dom';

beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            id: 1,
            tipoEvento: "Debutante",
            dataEvento: "2025-07-15T00:00:00.000Z",
            horarioInicio: "18:00",
            horarioTermino: "23:00",
            convidados: 50,
            observacoes: "Sem bebida alcoólica",
            createdAt: "2025-06-05T12:00:00.000Z",
            pessoa: {
              nome: "João Silva",
              email: "joao@email.com",
              telefone: "(11) 99999-9999",
              cpf: "123.456.789-00",
            },
            adicionais: [
              { nome: "Bartender", qtd: 2, preco: 300.0 },
              { nome: "Decoração", qtd: 1, preco: 500.0 },
            ],
          },
        ]),
    })
  );
});

afterAll(() => {
  global.fetch.mockClear();
  delete global.fetch;
});

describe("OrcamentosPage", () => {
  test("renderiza título e dados do orçamento", async () => {
    render(<OrcamentosPage />);

    expect(
      screen.getByRole("heading", { name: /Orçamentos Recebidos/i })
    ).toBeInTheDocument();

    await waitFor(() => {
      // Usa getAllByText para evitar erro com múltiplas ocorrências
      const eventoLabels = screen.getAllByText(/Evento:/i);
      expect(eventoLabels.length).toBeGreaterThan(0);

      expect(screen.getByText(/Debutante/i)).toBeInTheDocument();
      expect(screen.getByText(/Dados do Cliente:/i)).toBeInTheDocument();
      expect(screen.getByText(/João Silva/i)).toBeInTheDocument();
    });
  });

  test("exibe mensagem quando não há orçamentos", async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve([]),
      })
    );

    render(<OrcamentosPage />);

    await waitFor(() => {
      expect(
        screen.getByText(/Nenhum orçamento encontrado/i)
      ).toBeInTheDocument();
    });
  });
});

