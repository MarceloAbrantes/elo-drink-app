import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/Admin/login");
  }

  // Redireciona direto para a página de orçamentos
  redirect("/Admin/orcamentos");
}
