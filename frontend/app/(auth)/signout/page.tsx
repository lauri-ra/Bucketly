'use client';

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SignOut() {
	const router = useRouter();

	const handleSignOut = async () => {
		await signOut({ redirect: false });
		router.push('/');
	};

	return <button onClick={handleSignOut}>Sign Out</button>;
}
