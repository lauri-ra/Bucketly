'use client';

import Link from 'next/link';

const Navbar = () => {
	return (
		<nav className="flex flex-wrap justify-between items-center border border-red-500">
			<div className="ml-10 text-black text-4xl font-medium">Bucketly</div>

			<div className="flex items-center gap-5 mr-10">
				<Link href="/" className=" text-black text-xl font-small">
					My buckets
				</Link>
				<Link href="/" className=" text-black text-xl font-small">
					Shared buckets
				</Link>
				<Link href="/" className=" text-black text-xl font-small">
					Profile
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;
