import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { Bucket } from '@/types';
import Link from 'next/link';
import { CreateBucketForm } from '../components/ CreateBucketForm';

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
		<div className='ml-10'>
			<h1 className='mt-10 text-5xl font-medium underline decoration-2 underline-offset-8'>
				bucket list page
			</h1>
			<div className='mt-10'>
				{!buckets ? (
					<div>Loading...</div>
				) : (
					buckets.map((bucket) => (
						<Link href={`/buckets/${bucket.id}`} key={bucket.id}>
							<div className='mb-2 mt-2 w-1/4 flex-col rounded-md border border-black bg-lime-200 px-5 py-2.5 drop-shadow-sm transition ease-in-out hover:scale-105'>
								{bucket.name}: {bucket.description}
							</div>
						</Link>
					))
				)}
			</div>
			<CreateBucketForm />
		</div>
	);
}
