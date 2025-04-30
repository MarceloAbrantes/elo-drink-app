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

      {/* Texto maior sobre a empresa */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-[#5A5040]">
        <div className="max-w-4xl space-y-6 text-center">
          <h3 className="mb-4 text-3xl font-semibold">Sobre a Elo Drinks</h3>
          <p className="text-lg leading-relaxed">
            Desde 2016, a Elo Drinks é referência em coquetelaria personalizada para eventos sociais e corporativos. 
            Trabalhamos com rótulos premium, insumos selecionados e uma equipe especializada para entregar muito mais do que apenas bebidas: proporcionamos uma experiência única.
            <br /><br />
            Com serviços de open bar inovadores, drinks autorais e opções exclusivas de soft drinks, oferecemos soluções completas para tornar cada celebração inesquecível.
            Nosso diferencial é a atenção aos detalhes e a capacidade de personalizar cada evento de acordo com o perfil dos nossos clientes.
          </p>
        </div>
      </main>
    </div>
  );
}


  