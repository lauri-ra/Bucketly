import { redirect } from 'next/navigation';

export default async function SignUp() {
	async function createUser(formData: FormData) {
		'use server';

		const fullName = formData.get('fullname');
		const email = formData.get('email');
		const username = formData.get('username');
		const password = formData.get('password');
		const passwordConf = formData.get('passwordConf');

		if (password !== passwordConf) {
			console.log('passwords dont match');
			return;
		}

		try {
			const newUser = {
				username,
				fullName,
				email,
				password,
			};

			await fetch('http://localhost:3001/api/users', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newUser),
			});

			redirect('/');
		} catch {
			console.log('username or email already in use');
		}
	}

	return (
		<div className='flex flex-col items-center'>
			signup page
			<form action={createUser} className='flex flex-col items-center'>
				<input
					name='fullname'
					type='text'
					placeholder='name'
					className='my-2 block w-60 rounded border bg-neutral-200 p-2 text-left text-gray-600 outline-none drop-shadow-md hover:border-lime-500 focus:border-lime-500'
				/>
				<input
					name='email'
					type='text'
					placeholder='email'
					className='my-2 block w-60 rounded border bg-neutral-200 p-2 text-left text-gray-600 outline-none drop-shadow-md hover:border-lime-500 focus:border-lime-500'
				/>
				<input
					name='username'
					type='text'
					placeholder='username'
					className='my-2 block w-60 rounded border bg-neutral-200 p-2 text-left text-gray-600 outline-none drop-shadow-md hover:border-lime-500 focus:border-lime-500'
				/>
				<input
					name='password'
					type='password'
					placeholder='password'
					className='my-2 block w-60 rounded border bg-neutral-200 p-2 text-left text-gray-600 outline-none drop-shadow-md hover:border-lime-500 focus:border-lime-500'
				/>
				<input
					name='passwordConf'
					type='password'
					placeholder='confirm password'
					className='my-2 block w-60 rounded border bg-neutral-200 p-2 text-left text-gray-600 outline-none drop-shadow-md hover:border-lime-500 focus:border-lime-500'
				/>
				<button className='rounded bg-lime-500 p-2'>Sign up</button>
			</form>
		</div>
	);
}
