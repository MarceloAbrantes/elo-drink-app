import Navbar from 'app/Cliente/components/navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col bg-[#F7F6F3] font-sans">
      <Navbar />
      <div className="flex-1 pt-[96px]">{children}</div>
      <footer className="w-full bg-[#E0CEAA] py-6 text-center text-[#5A5040]">
        <p>© {new Date().getFullYear()} Elo Drinks | Todos os direitos reservados</p>
      </footer>
    </main>
  );
}
