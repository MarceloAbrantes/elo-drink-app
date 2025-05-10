import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen admin-layout md:flex-row">
      {/* Sidebar do administrador */}
      <aside className="flex-shrink-0 w-64 p-6 bg-white shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-[#e1ceae]">Administrador</h2>
        <div className="space-y-2 text-[#5A5040]">
          <p>
            <strong>Nome:</strong> Marcelo
          </p>
          <p>
            <strong>E-mail:</strong> admin@email.com
          </p>
        </div>
      </aside>
      <main className="flex-1 overflow-auto bg-gray-50">{children}</main>
    </div>
  );
}
