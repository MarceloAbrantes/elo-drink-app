"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from 'react';

export default function Contato() {
   const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    file: null,
  });

    const [status, setStatus] = useState('');

      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, file: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, phone, email, message } = formData;
    if (!name || !phone || !email || !message) {
      setStatus('Please fill all required fields.');
      return;
    }

    const data = new FormData();
    data.append('name', name);
    data.append('phone', phone);
    data.append('email', email);
    data.append('message', message);
    if (formData.file) {
      data.append('file', formData.file);
    }

    const res = await fetch(`${window.location.origin}/api/contatos/contact`, {
      method: 'POST',
      body: data,
    });

    const result = await res.json();
    if (result.success) {
      setStatus('Message sent successfully!');
      setFormData({ name: '', phone: '', email: '', message: '', file: null });
    } else {
      setStatus('Error: ' + (result.error || 'Unknown error'));
    }
  };

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
          
          <form onSubmit={handleSubmit} 
            className="w-full max-w-lg p-8 space-y-6 bg-[#5A5040] rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-[#F7F6F3] text-center">Fale conosco</h2>

            {/* Nome */}
            <div>
              <label className="block text-[#F7F6F3] font-medium mb-2">Nome</label>
              <input
                name="name"
                type="text"
                placeholder="Seu nome"
                value={formData.name} 
                onChange={handleChange} 
                className="w-full border border-[#101820] text-[#101820] bg-[#F7F6F3]  p-3 rounded-md focus:outline-none " required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-[#F7F6F3] font-medium mb-2">Email</label>
              <input
                name="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email} 
                onChange={handleChange}
                className="w-full border border-[#101820] text-[#101820] bg-[#F7F6F3] p-3 rounded-md focus:outline-none " required
              />
            </div>

            {/* Telefone */}
            <div>
              <label className="block text-[#F7F6F3] font-medium mb-2">Telefone</label>
              <input
                name="phone"
                type="tel"
                placeholder="Telefone"
                value={formData.phone} 
                onChange={handleChange}
                className="w-full border border-[#101820] text-[#101820] bg-[#F7F6F3]  p-3 rounded-md focus:outline-none " required
              />
            </div>

            {/* Mensagem */}
            <div>
              <label className="block text-[#F7F6F3] font-medium mb-2">Mensagem</label>
              <textarea
                name="message"
                placeholder="Escreva sua mensagem..."
                rows={3}
                value={formData.message} 
                onChange={handleChange}
                className="w-full border border-[#101820] text-[#101820] bg-[#F7F6F3]  p-3 rounded-md focus:outline-none"
              ></textarea>
            </div>

            {/* Anexo */}
            <div>
              <label className="block text-[#F7F6F3] font-medium mb-2">Anexar Arquivo</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full border border-[#101820] text-[#101820] bg-[#F7F6F3]  p-3 rounded-md focus:outline-none"
              />
            </div>

            {/* Botão */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-[#F7F6F3] text-[#101820] px-8 py-3 rounded-md transition-colors duration-300"
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

