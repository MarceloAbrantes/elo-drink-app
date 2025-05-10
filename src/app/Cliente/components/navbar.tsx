import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 flex w-full items-center justify-between bg-[#E0CEAA]/70 px-8 py-6 shadow-md backdrop-blur-md">
      <div className="flex items-center gap-4">
        <img src="/logo3.png" alt="Logo Elo Drinks" className="w-auto h-16" />
      </div>
      <nav className="flex gap-8 text-lg font-medium text-[#5A5040]">
        <Link href="/Cliente" className="transition-colors duration-300 hover:text-[#8B6E4E]">
          Home
        </Link>
        <Link href="/Cliente/Sobre" className="transition-colors duration-300 hover:text-[#8B6E4E]">
          Sobre
        </Link>
        <Link
          href="/Cliente/Contato"
          className="transition-colors duration-300 hover:text-[#8B6E4E]"
        >
          Contato
        </Link>
      </nav>
    </header>
  );
}
