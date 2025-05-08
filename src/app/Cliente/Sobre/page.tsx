import Link from "next/link";

export default function SobrePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F6F3]">

      {/* Imagem com Texto por cima */}
      <section className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
        <img
          src="/elo-banner.jpg" 
          alt="Elo Drinks Banner"
          className="absolute object-cover w-full h-full opacity-30"
        />
        <div className="relative z-10 px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#5A5040] drop-shadow-md">
            Celebre momentos únicos
          </h2>
          <p className="mt-4 text-lg md:text-xl text-[#5A5040] max-w-2xl mx-auto">
            Com os melhores drinks, atendimento impecável e experiências inesquecíveis, a Elo Drinks transforma sua festa em um evento memorável.
          </p>
        </div>
      </section>

      {/* SOBRE A EMPRESA */}
      <section className="relative flex flex-col md:flex-row items-center justify-center gap-12 px-12 py-20 bg-[#F7F6F3]">
        {/* Imagem de fundo */}
        <img
          src="/fundo.svg"
          alt="Fundo decorativo"
          className="absolute z-0 object-cover w-full h-full opacity-15"
        />

        {/* Texto à esquerda */}
        
        <div className="relative z-10 md:w-1/2 space-y-6 text-left text-[#5A5040]">
          <h3 className="mb-4 text-3xl font-semibold">Sobre a Elo Drinks</h3>
          <p className="text-lg leading-relaxed text-justify">
            Desde 2016, a Elo Drinks é referência em coquetelaria personalizada para eventos sociais e corporativos. 
            Trabalhamos com rótulos premium, insumos selecionados e uma equipe especializada para entregar muito mais do que apenas bebidas: proporcionamos uma experiência única.
            <br /><br />
            Com serviços de open bar inovadores, drinks autorais e opções exclusivas de soft drinks, oferecemos soluções completas para tornar cada celebração inesquecível.
            Nosso diferencial é a atenção aos detalhes e a capacidade de personalizar cada evento de acordo com o perfil dos nossos clientes.
          </p>
        </div>

        {/* Imagem à direita */}
        <div className="relative z-10 flex justify-center md:w-1/2">
          <img 
            src="/drinkimagem.jpg" 
            alt="Imagem da empresa" 
            className="w-[500px] h-auto rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105"
          />
        </div>
      </section>

      {/* NOSSO FUNDADOR */}
      <section className="relative flex flex-col md:flex-row-reverse items-center justify-center gap-12 px-12 py-20 bg-[#F7F6F3]">
        {/* Imagem de fundo */}
        <img
          src="/fundo.svg"
          alt="Fundo decorativo"
          className="absolute z-0 object-cover w-full h-full opacity-10"
        />

        {/* Texto à direita */}
        <div className="relative z-10 md:w-1/2 space-y-6 text-right text-[#5A5040]">
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
        </div>

        {/* Imagem do fundador à esquerda */}
        <div className="relative z-10 flex justify-center md:w-1/2">
          <img 
            src="/roberto-vitta.jpg" 
            alt="Roberto Vitta - Fundador" 
            className="w-[500px] h-auto rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105"
          />
        </div>
      </section>
    </div>
  );
}


  