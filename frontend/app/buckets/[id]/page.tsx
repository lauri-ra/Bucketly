import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Goal } from '@/types';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect('/signin');
	}

	const token = session.user.token;

	const response = await fetch(
		`${process.env.DEV_API}/buckets/${params.id}/goals`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);

	const goals: Goal[] = await response.json();
	console.log(goals);

	return (
		<div className='ml-10'>
			<h1 className='mt-10 text-5xl font-medium underline decoration-2 underline-offset-8'>
				bucket list goals
			</h1>
			<div className='mt-10 text-2xl'>Completed X/Y</div>
			<div className='mt-5 flex flex-col'>
				{!goals ? (
					<div>Loading...</div>
				) : (
					goals.map((goal) => (
						<div
							className='mb-2 mt-2 w-1/4 flex-col rounded-md border border-black bg-lime-200 px-5 py-2.5 drop-shadow-sm'
							key={goal.id}
						>
							<div className='font-medium'>{goal.name}</div>
							<div className=''>{goal.status}</div>
						</div>
					))
				)}
			</div>

			<Link href='/'>
				<div className='mb-2 mt-2 w-1/4 flex-col rounded-md border border-black bg-neutral-200 px-5 py-2.5 shadow transition ease-in-out hover:scale-105 hover:bg-sky-300'>
					Add a new goal
				</div>
			</Link>
		</div>
	);
}
