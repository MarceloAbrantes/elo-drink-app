'use client';

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email,
      password: senha,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/Admin/orcamentos");
    } else {
      setErro("Email ou senha incorretos");
    }
  };

  return (
      <div
        className="flex items-center justify-center min-h-screen bg-[#101820] bg-center bg-cover"
        style={{
          backgroundImage: "url('/fundo.svg')",
          backgroundBlendMode: "multiply",
        }}
      >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-white shadow-xl bg-opacity-90 rounded-xl"
      >
        <h2 className="mb-6 text-2xl font-bold text-center">Login</h2>

        {erro && <p className="mb-4 text-center text-red-600">{erro}</p>}

        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1">Senha</label>
          <input
            type="password"
            value={senha}
            required
            onChange={(e) => setSenha(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 font-bold text-white bg-green-600 rounded hover:bg-green-700"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
