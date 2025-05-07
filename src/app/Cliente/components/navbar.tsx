import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="fixed w-full top-0 z-50 flex justify-between items-center px-8 py-6 bg-[#E0CEAA]/70 backdrop-blur-md shadow-md">
      <div className="flex items-center gap-4">
        <img
          src="/logo3.png"
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
  );
}
