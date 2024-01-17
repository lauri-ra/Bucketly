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

export async function createBucketList(formData: FormData) {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect('/signin');
	}

	const token = session.user.token;
	const userId = session.user.id;

	const bucketName = formData.get('name');
	const bucketDesc = formData.get('description');

	try {
		const newBucketList = {
			name: bucketName,
			description: bucketDesc,
			user_id: userId,
			group_id: null,
		};

		await fetch(`${process.env.DEV_API}/buckets`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-type': 'application/json',
			},
			body: JSON.stringify(newBucketList),
		});
	} catch {
		console.log('error with creating a new list');
	}
}
