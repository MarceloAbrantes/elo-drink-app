import Navbar from './components/navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col bg-[#101820] font-sans">
      <Navbar />
      <div className="flex-1 pt-[96px]">{children}</div>
      <footer className="w-full bg-[#5A5040] py-6 px-8 text-[#F7F6F3]">
        <div className="flex items-center justify-between">
          <div className="w-1/3"></div>

          <p className="w-1/3 text-center">
            © {new Date().getFullYear()} Elo Drinks | Todos os direitos reservados
          </p>

          <div className="flex justify-end w-1/3 space-x-4">
            {/* Instagram */}
            <a href="https://www.instagram.com/elodrinks/" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="#E0CEAA" viewBox="0 0 24 24" className="w-6 h-6">
                <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm5.25-2a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z" />
              </svg>
            </a>

            {/* YouTube - Ícone melhorado */}
            <a href="https://www.youtube.com/@EloDrinks" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="#E0CEAA" viewBox="0 0 24 24" className="w-6 h-6">
                <path d="M23 7s-.2-1.4-.8-2c-.8-.8-1.7-.8-2.1-.9C17.6 4 12 4 12 4s-5.6 0-8.1.1c-.4 0-1.3 0-2.1.9-.6.6-.8 2-.8 2S1 8.6 1 10.3v3.4c0 1.7.2 3.3.2 3.3s.2 1.4.8 2c.8.8 1.8.8 2.2.9C6.4 20 12 20 12 20s5.6 0 8.1-.1c.4 0 1.3 0 2.1-.9.6-.6.8-2 .8-2s.2-1.7.2-3.3v-3.4c0-1.7-.2-3.3-.2-3.3zM9.75 15.02v-6.04l5.5 3.02-5.5 3.02z"/>
              </svg>
            </a>

            {/* LinkedIn - Ícone limpo */}
            <a href="https://www.linkedin.com/in/elo-drinks-e-eventos-953a7b2b7/" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="#E0CEAA" viewBox="0 0 24 24" className="w-6 h-6">
                <path d="M4.98 3.5C3.87 3.5 3 4.38 3 5.5S3.87 7.5 4.98 7.5 7 6.62 7 5.5 6.12 3.5 4.98 3.5zM3.5 8.5h3v12h-3v-12zM8.5 8.5h2.85v1.64h.04c.4-.76 1.38-1.56 2.85-1.56 3.05 0 3.61 2.01 3.61 4.62v6.3h-3v-5.58c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.67h-3v-11z"/>
              </svg>
            </a>

            {/* Facebook */}
            <a href="https://www.facebook.com/elodrinks/" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="#E0CEAA" viewBox="0 0 24 24" className="w-6 h-6">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 5 3.66 9.13 8.44 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34V22C18.34 21.13 22 17 22 12z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}


