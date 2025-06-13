import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Contato from '@/app/Cliente/Contato/page';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock fetch
global.fetch = jest.fn();

describe('Contato Page', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockReset();
    render(<Contato />);
  });

  it('renderiza o formulário de contato', () => {
    expect(screen.getByText('Fale conosco')).toBeInTheDocument();
    expect(screen.getByLabelText('Nome')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Telefone')).toBeInTheDocument();
    expect(screen.getByLabelText('Mensagem')).toBeInTheDocument();
  });

  it('renderiza todos os campos de entrada necessários', () => {
    expect(screen.getByPlaceholderText('Seu nome')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('seu@email.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('(00) 00000-0000')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Escreva sua mensagem...')).toBeInTheDocument();
  });

  it('renderiza o botão de envio', () => {
    expect(screen.getByRole('button', { name: 'Enviar' })).toBeInTheDocument();
  });

  it('mostra erros de validação ao enviar formulário vazio', async () => {
    const submitButton = screen.getByRole('button', { name: 'Enviar' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Please fill all required fields.')).toBeInTheDocument();
    });
  });

  it('envia o formulário com dados válidos', async () => {
    // Mock successful fetch response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve({ success: true }),
    });

    const nameInput = screen.getByPlaceholderText('Seu nome');
    const emailInput = screen.getByPlaceholderText('seu@email.com');
    const phoneInput = screen.getByPlaceholderText('(00) 00000-0000');
    const messageInput = screen.getByPlaceholderText('Escreva sua mensagem...');

    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    fireEvent.change(messageInput, { target: { value: 'Test message' } });

    const submitButton = screen.getByRole('button', { name: 'Enviar' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Mensagem enviada com sucesso!')).toBeInTheDocument();
    });
  });

  it('mostra mensagem de erro se o envio falhar', async () => {
    // Mock failed fetch response
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Failed to send'));

    const nameInput = screen.getByPlaceholderText('Seu nome');
    const emailInput = screen.getByPlaceholderText('seu@email.com');
    const phoneInput = screen.getByPlaceholderText('(00) 00000-0000');
    const messageInput = screen.getByPlaceholderText('Escreva sua mensagem...');

    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    fireEvent.change(messageInput, { target: { value: 'Test message' } });

    const submitButton = screen.getByRole('button', { name: 'Enviar' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Error:/)).toBeInTheDocument();
    });
  });
}); 