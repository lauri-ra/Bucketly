import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function Page() {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect('/api/auth/signin');
	}

	const id = session.user.id;
	const response = await fetch(`http://localhost:3001/api/users/${id}`);
	const user = await response.json();

	return (
		<div>
			{!user ? (
				<div>Loading</div>
			) : (
				<h1 className='text-xl'>
					Hello, {user.length > 0 ? user[0].fullName : 'Unknown User'}
				</h1>
			)}
		</div>
	);
}
