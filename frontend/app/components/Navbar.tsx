'use client';

import Link from 'next/link';

const Navbar = () => {
	return (
		<nav className='flex flex-wrap items-center justify-between border border-red-500 py-5'>
			<Link
				href='/'
				className='ml-10 text-4xl font-medium text-black hover:underline'
			>
				Bucketly
			</Link>

			<div className='mr-10 flex items-center gap-5'>
				<Link
					href='/buckets'
					className='font-small text-base text-black hover:text-sky-500'
				>
					My buckets
				</Link>
				<Link
					href='/buckets'
					className=' font-small text-base text-black hover:text-sky-500'
				>
					Shared buckets
				</Link>
				<Link
					href='/profile'
					className=' font-small text-base text-black hover:text-sky-500'
				>
					Profile
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;
