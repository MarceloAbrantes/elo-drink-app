'use client';

import type React from 'react';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        alert('Erro ao fazer login: ' + result.error);
      } else {
        alert('Login realizado com sucesso!');
        router.push('/Admin/orcamentos');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 bg-white rounded-md shadow-sm">
      <h2 className="mb-6 text-2xl font-medium text-[#5c4d3c]">Acesso à conta</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-[#5A5040]" htmlFor="email">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 w-full rounded-md border p-3 text-[#5A5040] placeholder:text-[#5A504099]"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-[#5A5040]" htmlFor="password">
            Senha
          </label>
          <input
            id="password"
            type="password"
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 w-full rounded-md border p-3 text-[#5A5040] placeholder:text-[#5A504099]"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-[#5A5040] py-3 text-lg font-semibold text-white transition hover:bg-[#4a4135]"
          disabled={isLoading}
        >
          {isLoading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}
