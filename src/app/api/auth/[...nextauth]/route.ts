import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Email e senha',
      credentials: {
        mail: { label: 'E-mail', type: 'text', placeholder: 'exemplo@email.com' },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials, req) {
        // TODO: implementar a lógica de autenticação
        // const res = await fetch('/your/endpoint', {
        //   method: 'POST',
        //   body: JSON.stringify(credentials),
        //   headers: { 'Content-Type': 'application/json' },
        // });
        // const user = await res.json();

        // if (res.ok && user) {
        //   return user;
        // }

        return {
          id: '1',
          name: 'Admin',
          email: 'admin@email.com',
        };

        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
