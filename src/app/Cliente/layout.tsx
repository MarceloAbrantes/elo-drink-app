import Navbar from "app/Cliente/components/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="font-sans bg-[#F7F6F3] min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-[96px] flex-1">{children}</div>
      <footer className="w-full bg-[#E0CEAA] py-6 text-center text-[#5A5040]">
        <p>© {new Date().getFullYear()} Elo Drinks | Todos os direitos reservados</p>
      </footer>
    </main>
  );
}
