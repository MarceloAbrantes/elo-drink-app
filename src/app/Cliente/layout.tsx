import Navbar from './components/navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col bg-[#101820] font-sans">
      <Navbar />
      <div className="flex-1 pt-[96px]">{children}</div>
      <footer className="w-full bg-[#9D4815] py-6 text-center text-[#F7F6F3]">
        <p>© {new Date().getFullYear()} Elo Drinks | Todos os direitos reservados</p>
      </footer>
    </main>
  );
}
