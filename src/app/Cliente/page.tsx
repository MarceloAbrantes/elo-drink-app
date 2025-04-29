"use client";

import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F6F3]">
      {/* Navbar */}
      <header className="fixed w-full top-0 z-50 flex justify-between items-center px-8 py-6 bg-[#E0CEAA] shadow-md">
        <div className="flex items-center gap-4">
          <img
            src="/logo2.png"
            alt="Logo Elo Drinks"
            className="w-auto h-16"
          />
        </div>
        <nav className="flex gap-8 text-[#5A5040] font-medium text-lg">
          <Link href="/Cliente" className="hover:text-[#8B6E4E] transition-colors duration-300">Home</Link>
          <Link href="/Cliente/Sobre" className="hover:text-[#8B6E4E] transition-colors duration-300">Sobre</Link>
          <Link href="/Cliente/Contato" className="hover:text-[#8B6E4E] transition-colors duration-300">Contato</Link>
        </nav>
      </header>

      {/* Conteúdo principal */}
      <main className="flex flex-1 pt-24">
        
        {/* Área principal vazia */}
        <div className="flex items-center justify-center flex-1 p-10">
          <div className="w-full max-w-4xl h-[500px] bg-white rounded-lg shadow-md flex items-center justify-center">
            {/* Espaço reservado para futuros conteúdos */}
            <p className="text-[#5A5040] text-2xl opacity-50">Página inicial em construção...</p>
          </div>
        </div>

      </main>

      {/* Rodapé */}
      <footer className="w-full bg-[#E0CEAA] py-6 text-center text-[#5A5040]">
        <p>© {new Date().getFullYear()} Elo Drinks | Todos os direitos reservados</p>
      </footer>
    </div>
  );
}
