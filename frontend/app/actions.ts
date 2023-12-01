'use server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export async function createGoal(bucketId: string, formData: FormData) {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect('/signin');
	}

	const token = session.user.token;

	const name = formData.get('name');
	const status = formData.get('status');
	const bucket_id = Number(bucketId);

	try {
		const newGoal = {
			name,
			status,
			bucket_id,
		};

		await fetch(`${process.env.DEV_API}/buckets/${bucketId}/goals`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newGoal),
		});
	} catch {
		console.log('error with adding a goal');
	}
}
