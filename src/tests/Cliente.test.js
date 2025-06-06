import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import OrcamentoPage from '../app/Cliente/page';

// filepath: c:\Users\Irineu\elo-drink-app-1\src\tests\Cliente.test.js

// Mock next/image and next/navigation
jest.mock('next/image', () => (props) => <img {...props} />);
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

// Mock window.location and localStorage
const originalLocation = window.location;
const originalAlert = window.alert;
beforeAll(() => {
    delete window.location;
    window.location = { href: '' };
    window.alert = jest.fn();
    window.localStorage.setItem = jest.fn();
});
afterAll(() => {
    window.location = originalLocation;
    window.alert = originalAlert;
});

describe('OrcamentoPage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renderiza o título principal e as opções de eventos', () => {
        render(<OrcamentoPage />);
        expect(screen.getByText(/Faça agora o orçamento do seu evento!/i)).toBeInTheDocument();
        expect(screen.getByText('Debutante')).toBeInTheDocument();
        expect(screen.getByText('Casamento')).toBeInTheDocument();
        expect(screen.getByText('Corporativo')).toBeInTheDocument();
        expect(screen.getByText('Aniversário')).toBeInTheDocument();
        expect(screen.getByText('Outro')).toBeInTheDocument();
    });

    it('abre o modal quando um evento é selecionado', () => {
        render(<OrcamentoPage />);
        fireEvent.click(screen.getByText('Casamento'));
        expect(screen.getByText(/Orçamento para Casamento/i)).toBeInTheDocument();
        expect(screen.getByText(/Criar orçamento personalizado/i)).toBeInTheDocument();
    });

    it('fecha o modal quando o botão fechar é clicado', () => {
        render(<OrcamentoPage />);
        fireEvent.click(screen.getByText('Debutante'));
        expect(screen.getByText(/Orçamento para Debutante/i)).toBeInTheDocument();
        fireEvent.click(screen.getByText('×'));
        expect(screen.queryByText(/Orçamento para Debutante/i)).not.toBeInTheDocument();
    });

    it('mostra mensagem personalizada para o evento "Outro"', () => {
        render(<OrcamentoPage />);
        fireEvent.click(screen.getByText('Outro'));
        expect(screen.getByText(/Entre em contato para criar um orçamento personalizado!/i)).toBeInTheDocument();
    });

    it('mostra os itens corretos do pacote para Casamento', () => {
        render(<OrcamentoPage />);
        fireEvent.click(screen.getByText('Casamento'));
        expect(screen.getByText(/Drinks: Moscow Mule, Fitzgerald, Penicilin, Paradise, Aperol Spritz/)).toBeInTheDocument();
        expect(screen.getByText(/Gin Tônica: Toranja Tonic, Classic Tonic/)).toBeInTheDocument();
        expect(screen.getByText(/Caipirinhas: Abacaxi com hortelã, Kiwi com canela, Caju com cravo/)).toBeInTheDocument();
    });

    it('mostra os itens corretos do pacote para Debutante', () => {
        render(<OrcamentoPage />);
        fireEvent.click(screen.getByText('Debutante'));
        expect(screen.getByText(/Drinks: Moscow Mule, Basil Smash, Penicilin, Fitzgerald, Classic Tonic/)).toBeInTheDocument();
        expect(screen.getByText(/Caipirinhas: Abacaxi com hortelã, Uva com manjericão, Kiwi com limão/)).toBeInTheDocument();
        expect(screen.getByText(/Soft Drinks: Cirque Blue, Pink Lemonade, Pina Descolada, Lichia Paradise, Sonho Brilhante/)).toBeInTheDocument();
    });

    it('valida campos obrigatórios no envio', async () => {
        render(<OrcamentoPage />);
        fireEvent.click(screen.getByText('Casamento'));
        fireEvent.click(screen.getByText(/Continuar orçamento/i));
        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith(expect.stringMatching(/preencha todos os campos obrigatórios/i));
        });
    });

    it('envia o formulário e salva no localStorage', async () => {
        render(<OrcamentoPage />);
        fireEvent.click(screen.getByText('Corporativo'));

        // Fill required fields
        fireEvent.change(screen.getByLabelText(/Data do Evento/i), { target: { value: '2024-12-31' } });
        fireEvent.change(screen.getByLabelText(/Início/i), { target: { value: '18:00' } });
        fireEvent.change(screen.getByLabelText(/Término/i), { target: { value: '23:00' } });
        fireEvent.change(screen.getByLabelText(/Número de Convidados/i), { target: { value: '100' } });
        fireEvent.change(screen.getByLabelText(/Observações/i), { target: { value: 'Teste de observação' } });

        fireEvent.click(screen.getByText(/Continuar orçamento/i));
        await waitFor(() => {
            expect(window.localStorage.setItem).toHaveBeenCalledWith(
                'orcamento_draft',
                expect.stringContaining('"tipoEvento":"Corporativo"')
            );
            expect(window.location.href).toBe('/Cliente/Finalizar');
        });
    });

    it('permite marcar a caixa de seleção adicional', () => {
        render(<OrcamentoPage />);
        fireEvent.click(screen.getByText('Casamento'));
        const checkbox = screen.getAllByRole('checkbox')[0];
        fireEvent.click(checkbox);
        expect(checkbox).toBeChecked();
    });

    it('permite inserir quantidade para adicional baseado em unidade', () => {
        render(<OrcamentoPage />);
        fireEvent.click(screen.getByText('Casamento'));
        const numberInputs = screen.getAllByPlaceholderText('Qtd');
        fireEvent.change(numberInputs[0], { target: { value: '5' } });
        expect(numberInputs[0].value).toBe('5');
    });

    it('navega para a página de contato quando clica em "Criar orçamento personalizado"', () => {
        const pushMock = jest.fn();
        jest.spyOn(require('next/navigation'), 'useRouter').mockReturnValue({ push: pushMock });
        render(<OrcamentoPage />);
        fireEvent.click(screen.getByText('Casamento'));
        fireEvent.click(screen.getByText(/Criar orçamento personalizado/i));
        expect(pushMock).toHaveBeenCalledWith('/Cliente/Contato');
    });

    it('renderiza fundo e imagem', () => {
        render(<OrcamentoPage />);
        expect(screen.getByAltText('Fundo decorativo')).toBeInTheDocument();
        expect(screen.getByAltText('Drinks Elo')).toBeInTheDocument();
    });
});