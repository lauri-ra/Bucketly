'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignIn() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const router = useRouter();

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		await signIn('credentials', {
			username,
			password,
			redirect: false,
		});

		router.push('/');
	};

	return (
		<div className='flex items-center justify-center p-12'>
			<form className='flex w-1/3 flex-col items-center justify-end rounded-md border border-slate-500 px-5 py-10'>
				<div className='text-3xl'>Log in to Bucketly</div>

				<div className='mt-10'>
					<label htmlFor='username'>Username</label>
					<input
						className='my-2 block w-60 rounded border bg-neutral-200 p-2 text-left text-gray-600 outline-none drop-shadow-md hover:border-lime-500 focus:border-lime-500'
						type='text'
						id='username'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</div>

				<div className='mb-6'>
					<label htmlFor='password'>Password</label>
					<input
						className='my-2 block w-60 rounded border bg-neutral-200 p-2 text-left text-gray-600 outline-none drop-shadow-md hover:border-lime-500 focus:border-lime-500'
						type='password'
						id='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button
					className='rounded  bg-lime-500 px-8 py-2'
					onClick={handleSubmit}
					type='submit'
				>
					Login
				</button>

				<div className='mt-5 py-5 font-extralight'>
					Dont have an account?{' '}
					<Link className='text-sky-400 hover:underline' href='/signup'>
						Sign up
					</Link>
				</div>
			</form>
		</div>
	);
}
