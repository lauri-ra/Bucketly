import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function Navbar() {
	const session = await getServerSession(authOptions);

	return (
		<nav className='flex flex-wrap items-center justify-between border border-red-500 py-5'>
			<Link
				href='/'
				className='ml-10 text-4xl font-medium text-black hover:underline'
			>
				Bucketly
			</Link>
			{session !== null ? (
				<div className='mr-10 flex items-center gap-5'>
					<Link
						href='/buckets'
						className='font-small text-base text-black hover:text-sky-500'
					>
						My buckets
					</Link>
					<Link
						href='/profile'
						className=' font-small text-base text-black hover:text-sky-500'
					>
						Profile
					</Link>
					<Link
						href='/signout'
						className=' font-small text-base text-black hover:text-sky-500'
					>
						Sign out
					</Link>
				</div>
			) : (
				<div className='mr-10 flex items-center gap-5'>
					<Link
						href='/signin'
						className=' font-small text-base text-black hover:text-sky-500'
					>
						Log in
					</Link>
					<Link
						href='/signup'
						className=' font-small text-base text-black hover:text-sky-500'
					>
						Sign up
					</Link>
				</div>
			)}
		</nav>
	);
}
