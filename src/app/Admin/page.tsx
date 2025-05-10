'use client';

import { useSession, signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default function Admin() {
  const session = useSession();

  if (!session) {
    redirect('/Admin/login');
  }

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div>
      <h1 className="text-2xl">Admin Dashboard</h1>
      <p>Usuário: {session.data?.user?.email || 'Admin'}</p>

      <Link href="/Admin/orcamentos">
        <button className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600">
          Orçamentos
        </button>
      </Link>

      <form action={handleSignOut}>
        <button type="submit" className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600">
          Logout
        </button>
      </form>
    </div>
  );
}
