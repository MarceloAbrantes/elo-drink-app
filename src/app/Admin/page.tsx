import { auth, signOut } from "../../../auth";
import { redirect } from "next/navigation";
import Link from "next/link";


export default async function Admin() {
  const session = await auth();

  if (!session) {
    redirect("/Admin/login"); // Redirect unauthenticated users to home
  }

  const handleSignOut = async () => {
    "use server";
    await signOut();
  };

  return (
    <div>
      <h1 className="text-2xl">Admin Dashboard</h1>
      <p>Usuário: {session.user?.name || "Admin"}</p>

      <Link href="/Admin/orcamentos">
        <button className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600">
          Orçamentos
        </button>
      </Link>



      <form action={handleSignOut}>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </form>
    </div>
    
  );
}