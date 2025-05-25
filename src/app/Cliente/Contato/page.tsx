"use client";
import Link from "next/link";
import Image from "next/image";

export default function Contato() {
  return (
    <div className="min-h-screen flex flex-col  bg-[#101820]">

              <img
          src="/fundo.svg"
          alt="Fundo decorativo"
          className="absolute z-0 object-cover w-full h-full opacity-100"
        />

      {/* Conteúdo principal */}
      <main className="flex flex-1 pt-24">
        
        
        {/* Formulário */}
        <div className="relative z-10 flex items-center justify-center flex-1 p-10">
          <form className="w-full max-w-lg p-8 space-y-6 bg-[#9D4815] rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-[#F7F6F3] text-center">Fale conosco</h2>

            {/* Nome */}
            <div>
              <label className="block text-[#F7F6F3] font-medium mb-2">Nome</label>
              <input
                type="text"
                placeholder="Seu nome"
                className="w-full border border-[#F7F6F3] text-[#101820] bg-[#E0CEAA]  p-3 rounded-md focus:outline-none " required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-[#F7F6F3] font-medium mb-2">Email</label>
              <input
                type="email"
                placeholder="seu@email.com"
                className="w-full border border-[#F7F6F3] text-[#101820] bg-[#E0CEAA] p-3 rounded-md focus:outline-none " required
              />
            </div>

            {/* Telefone */}
            <div>
              <label className="block text-[#F7F6F3] font-medium mb-2">Telefone</label>
              <input
                type="tel"
                placeholder="Telefone"
                className="w-full border border-[#F7F6F3] text-[#101820] bg-[#E0CEAA]  p-3 rounded-md focus:outline-none " required
              />
            </div>

            {/* Mensagem */}
            <div>
              <label className="block text-[#F7F6F3] font-medium mb-2">Mensagem</label>
              <textarea
                placeholder="Mensagem"
                rows={3}
                className="w-full border border-[#F7F6F3] text-[#101820] bg-[#E0CEAA] p-3 rounded-md focus:outline-none " required
              ></textarea>
            </div>

            {/* Botão */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-[#E0CEAA] text-[#101820] px-8 py-3 rounded-md transition-colors duration-300"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>

        {/* Imagem de fundo lateral */}
        <div className="relative z-10 -mt-20 lg:block lg:w-1/2">
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

