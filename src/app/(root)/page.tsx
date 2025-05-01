import { auth, signOut, signIn } from "../../../auth";
import Link from "next/link";

export default async function Home() {
  // Get the current session to check if the user is authenticated
  const session = await auth();

  // Handle sign-in (e.g., with a provider like Google)
  const handleSignIn = async () => {
    "use server";
    await signIn("github"); // Replace "google" with your provider (e.g., github, credentials)
  };

  // Handle sign-out
  const handleSignOut = async () => {
    "use server";
    await signOut({redirectTo: "/"});
  };
  return (
    <div>
      <h1 className="text-2xl">Home</h1>
      {session ? (
        <div>
          <p>Welcome, {session.user?.name || "User"}!</p>
          <form action={handleSignOut}>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </form>
        </div>
      ) : (
        <div>
          <form action={handleSignIn}>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Login with Github
            </button>
          </form>
        </div>
      )}
    </div>
  );
}