import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Contato from '../app/Cliente/Contato/page'; // Adjust path if needed

// filepath: c:\Users\Irineu\elo-drink-app-1\src\tests\Contato.test.js


describe('Contato Page', () => {
    beforeEach(() => {
        render(<Contato />);
    });

    it('renderiza o formulário de contato', () => {
        expect(screen.getByRole('form')).toBeInTheDocument();
    });

    it('renderiza todos os campos de entrada necessários', () => {
        expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/mensagem/i)).toBeInTheDocument();
    });

    it('renderiza o botão de envio', () => {
        expect(screen.getByRole('button', { name: /enviar/i })).toBeInTheDocument();
    });

    it('mostra erros de validação ao enviar formulário vazio', () => {
        fireEvent.click(screen.getByRole('button', { name: /enviar/i }));
        expect(screen.getByText(/nome é obrigatório/i)).toBeInTheDocument();
        expect(screen.getByText(/email é obrigatório/i)).toBeInTheDocument();
        expect(screen.getByText(/mensagem é obrigatória/i)).toBeInTheDocument();
    });

    it('mostra erro de validação de e-mail para e-mail inválido', () => {
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid-email' } });
        fireEvent.click(screen.getByRole('button', { name: /enviar/i }));
        expect(screen.getByText(/email inválido/i)).toBeInTheDocument();
    });

    it('envia o formulário com dados válidos', () => {
        fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: 'João' } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'joao@email.com' } });
        fireEvent.change(screen.getByLabelText(/mensagem/i), { target: { value: 'Olá, gostaria de informações.' } });
        fireEvent.click(screen.getByRole('button', { name: /enviar/i }));
        expect(screen.getByText(/mensagem enviada com sucesso/i)).toBeInTheDocument();
    });

    it('desabilitar botão de envio durante o envio', () => {
        fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: 'Maria' } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'maria@email.com' } });
        fireEvent.change(screen.getByLabelText(/mensagem/i), { target: { value: 'Quero contratar.' } });
        fireEvent.click(screen.getByRole('button', { name: /enviar/i }));
        expect(screen.getByRole('button', { name: /enviando/i })).toBeDisabled();
    });

    it('mostra mensagem de erro se o envio falhar', async () => {
        // Mock fetch or submission handler to reject
        global.fetch = jest.fn(() =>
            Promise.resolve({ ok: false, status: 500 })
        );
        fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: 'Carlos' } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'carlos@email.com' } });
        fireEvent.change(screen.getByLabelText(/mensagem/i), { target: { value: 'Teste de erro.' } });
        fireEvent.click(screen.getByRole('button', { name: /enviar/i }));
        expect(await screen.findByText(/erro ao enviar/i)).toBeInTheDocument();
        global.fetch.mockRestore();
    });
});