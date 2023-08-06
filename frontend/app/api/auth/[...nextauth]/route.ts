import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				username: { label: 'Username', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				const authResponse = await fetch('http://localhost:3001/api/login', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(credentials),
				});

				if (!authResponse.ok) {
					const errorResponse = await authResponse.json();
					console.error('Authentication error:', errorResponse.error);
					return null;
				}

				const user = await authResponse.json();

				return user;
			},
		}),
	],
	jwt: {
		secret: process.env.JWT_SECRET,
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
