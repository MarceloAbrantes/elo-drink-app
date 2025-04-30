"use client";
import Link from "next/link";
import Image from "next/image";

export default function Contato() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F6F3]">

      {/* Conteúdo principal */}
      <main className="flex flex-1 pt-24">
        
        {/* Formulário */}
        <div className="flex items-center justify-center flex-1 p-10">
          <form className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-[#5A5040] text-center">Fale com a gente</h2>

            {/* Nome */}
            <div>
              <label className="block text-[#5A5040] font-medium mb-2">Nome</label>
              <input
                type="text"
                placeholder="Seu nome"
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-[#8B6E4E]"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-[#5A5040] font-medium mb-2">Email</label>
              <input
                type="email"
                placeholder="seu@email.com"
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-[#8B6E4E]"
              />
            </div>

            {/* Mensagem */}
            <div>
              <label className="block text-[#5A5040] font-medium mb-2">Mensagem</label>
              <textarea
                placeholder="Escreva sua mensagem..."
                rows={5}
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:border-[#8B6E4E]"
              ></textarea>
            </div>

            {/* Anexo */}
            <div>
              <label className="block text-[#5A5040] font-medium mb-2">Anexar Arquivo</label>
              <input
                type="file"
                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-[#8B6E4E]"
              />
            </div>

            {/* Botão */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-[#5A5040] text-white px-8 py-3 rounded-md hover:bg-[#8B6E4E] transition-colors duration-300"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>

        {/* Imagem de fundo lateral */}
        <div className="relative hidden lg:block lg:w-1/2">
          <Image
            src="/fundo-contato.JPG"
            alt="Banner Contato"
            layout="fill"
            objectFit="cover"
            className="object-cover rounded-l-lg opacity-80"
          />
        </div>

      </main>   
    </div>
    
  );
}

