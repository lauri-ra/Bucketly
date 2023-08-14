import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

interface UserToken {
	token: string;
	id: number;
	username: string;
}

export const authOptions: NextAuthOptions = {
	session: {
		strategy: 'jwt',
	},
	jwt: {
		secret: process.env.JWT_SECRET,
	},
	pages: {
		signIn: '/signin',
	},
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				username: { label: 'Username', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				const authResponse = await fetch(process.env.NEXTAUTH_URL as string, {
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
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.user = user;
			}
			return token;
		},
		async session({ session, token }) {
			if (token) {
				session.user = token.user as UserToken;

				return session;
			}
			return session;
		},
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
