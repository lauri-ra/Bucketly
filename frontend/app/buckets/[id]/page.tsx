import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Goal } from '@/types';
import { getServerSession } from 'next-auth';
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
		<div>
			bucket list goals
			<div>
				{!goals ? (
					<div>Loading...</div>
				) : (
					goals.map((goal) => (
						<div key={goal.id}>
							{goal.name} {goal.status}
						</div>
					))
				)}
			</div>
		</div>
	);
}
