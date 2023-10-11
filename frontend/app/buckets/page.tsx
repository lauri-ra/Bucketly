import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { Bucket } from '@/types';
import Link from 'next/link';

export default async function Page() {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect('/signin');
	}

	const id = session.user.id;
	const token = session.user.token;

	const response = await fetch(`${process.env.DEV_API}/buckets/user/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	const buckets: Bucket[] = await response.json();

	return (
		<div>
			bucket list page
			<div>
				{!buckets ? (
					<div>Loading...</div>
				) : (
					buckets.map((bucket) => (
						<Link href={`/buckets/${bucket.id}`} key={bucket.id}>
							{bucket.name}: {bucket.description}
						</Link>
					))
				)}
			</div>
		</div>
	);
}
