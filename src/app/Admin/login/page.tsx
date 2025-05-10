import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import LoginForm from './components/login-form';

export default async function AdminLogin() {
  // const session = useSession();

  // const handleSignIn = async () => {
  //   'use server';
  //   await signIn('credentials', { redirectTo: '/Admin' });
  // };

  // // Handle sign-out
  // const handleSignOut = async () => {
  //   'use server';
  //   await signOut();
  // };
  return (
    <main className="container flex justify-center px-4 py-12 mx-auto">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </main>
    // <div>
    //   <h1 className="text-2xl">Admin</h1>
    //   {session ? (
    //     <div>
    //       <p>Welcome, {session.data?.user?.name || 'User'}!</p>
    //       <form action={handleSignOut}>
    //         <button
    //           type="submit"
    //           className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
    //         >
    //           Logout
    //         </button>
    //       </form>
    //     </div>
    //   ) : (
    //     <div>
    //       <form action={handleSignIn}>
    //         <button
    //           type="submit"
    //           className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
    //         >
    //           Login with Github
    //         </button>
    //       </form>
    //     </div>
    //   )}
    // </div>
  );
}
