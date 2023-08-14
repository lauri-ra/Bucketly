'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function SignIn() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		await signIn('credentials', {
			username,
			password,
			redirect: true,
			callbackUrl: '/',
		});
	};

	return (
		<div>
			<form>
				<div>
					<label htmlFor='username'>Username</label>
					<input
						type='text'
						id='username'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</div>
				<div>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						id='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button onClick={handleSubmit} type='submit'>
					Login
				</button>
			</form>
		</div>
	);
}
