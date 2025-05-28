"use client";

import { motion } from 'framer-motion';

export default function SobrePage() {
  const eventos = [
    { titulo: 'Casamentos', img: '/casamento.jpg' },
    { titulo: 'Aniversários/Debutante', img: '/aniversario.jpg' },
    { titulo: 'Corporativos', img: '/corporativo.jpg' },
    { titulo: 'Kids', img: '/kids.jpg' },
  ];

  const marcas = [
    '/marca1.png', '/marca2.png', '/marca3.png', '/marca4.png', '/marca5.png'
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#101820]">

      {/* Imagem com Texto por cima */}
      <section className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
        <img
          src="/imagem_fundo.png"
          alt="Elo Drinks Banner"
          className="absolute object-cover w-full h-full opacity-30"
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          variants={fadeIn}
          className="relative z-10 px-4 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#F7F6F3] drop-shadow-lg">
            Celebre momentos únicos
          </h2>
          <p className="mt-4 text-lg md:text-xl text-[#F7F6F3] max-w-2xl mx-auto">
            Com os melhores drinks, atendimento impecável e experiências inesquecíveis, a Elo Drinks transforma sua festa em um evento memorável.
          </p>
        </motion.div>
      </section>

      {/* SOBRE A EMPRESA */}
      <section className="relative flex flex-col md:flex-row items-center justify-center gap-12 px-12 py-20 bg-[#101820]">
        <img
          src="/fundo.svg"
          alt="Fundo decorativo"
          className="absolute z-0 object-cover w-full h-full opacity-100"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          variants={fadeIn}
          className="relative z-10 md:w-1/2 space-y-6 text-left text-[#F7F6F3]"
        >
          <h3 className="mb-4 text-3xl font-semibold">Sobre a Elo Drinks</h3>
          <p className="text-lg leading-relaxed text-justify">
            Desde 2016, a Elo Drinks é referência em coquetelaria personalizada para eventos sociais e corporativos. 
            Trabalhamos com rótulos premium, insumos selecionados e uma equipe especializada para entregar muito mais do que apenas bebidas: proporcionamos uma experiência única.
            <br /><br />
            Com serviços de open bar inovadores, drinks autorais e opções exclusivas de soft drinks, oferecemos soluções completas para tornar cada celebração inesquecível.
            Nosso diferencial é a atenção aos detalhes e a capacidade de personalizar cada evento de acordo com o perfil dos nossos clientes.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          variants={fadeIn}
          className="relative z-10 flex justify-center md:w-1/2"
        >
          <img 
            src="/drinkimagem.jpg"
            alt="Imagem da empresa"
            className="w-[500px] h-auto rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105"
          />
        </motion.div>
      </section>

      {/* NOSSO FUNDADOR */}
      <section className="relative flex flex-col md:flex-row-reverse items-center justify-center gap-12 px-12 py-20 bg-[#101820]">
        <img
          src="/fundo.svg"
          alt="Fundo decorativo"
          className="absolute z-0 object-cover w-full h-full opacity-100"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          variants={fadeIn}
          className="relative z-10 md:w-1/2 space-y-6 text-right text-[#F7F6F3]"
        >
          <h3 className="pr-6 mb-4 text-3xl font-semibold text-left">Nosso Fundador</h3>
          <p className="text-lg leading-relaxed text-justify">
            À frente da Elo Drinks está o empresário Roberto Vitta, que começou sua trajetória como barman 
            e tornou-se especialista na arte da coquetelaria e na gestão de equipes.
          </p>
          <p className="text-lg leading-relaxed text-justify">
            Em 2016, fundou a empresa e, em 2020, decidiu apostar integralmente em seu sonho, consolidando 
            a Elo Drinks como um dos nomes mais desejados do mercado de eventos em São Paulo e região.
          </p>
          <p className="text-lg leading-relaxed text-justify">
            Roberto acredita que a verdadeira experiência de um evento vai além dos drinks – está na conexão 
            humana, na hospitalidade genuína e no prazer de oferecer algo inesquecível.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          variants={fadeIn}
          className="relative z-10 flex justify-center md:w-1/2"
        >
          <img 
            src="/roberto-vitta.jpg"
            alt="Roberto Vitta - Fundador"
            className="w-[500px] h-auto rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105"
          />
        </motion.div>
      </section>

      {/* Eventos que realizamos */}
      <section className="px-12 py-20">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          variants={fadeIn}
          className="text-3xl font-semibold text-[#F7F6F3] mb-6"
        >
          Alguns eventos que realizamos
        </motion.h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {eventos.map((evento) => (
            <motion.div
              key={evento.titulo}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              variants={fadeIn}
              className="bg-[#5A5040] text-[#F7F6F3] rounded-lg p-4 flex flex-col items-center justify-center shadow-md hover:scale-105 transition-transform"
            >
              <img src={evento.img} alt={evento.titulo} className="object-cover w-full h-40 mb-4 rounded-md" />
              <span className="font-semibold">{evento.titulo}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Marcas que confiam em nós */}
      <section className="px-12 py-20">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          variants={fadeIn}
          className="text-3xl font-semibold text-[#F7F6F3] mb-6"
        >
          Marcas que confiam em nós
        </motion.h2>

        <div className="relative w-full overflow-hidden">
          <div
            className="flex space-x-8"
            style={{
              animation: 'marquee 30s linear infinite',
              display: 'flex',
            }}
          >
            {marcas.concat(marcas, marcas, marcas).map((marca, index) => (
              <img
                key={index}
                src={marca}
                alt={`Marca ${index + 1}`}
                className="object-contain w-auto h-12"
              />
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-25%); }
          }
        `}</style>
      </section>
    </div>
  );
}


  