'use client';

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className='flex flex-wrap items-center justify-between border border-red-500'>
      <div className='ml-10  text-4xl font-medium text-black'>Bucketly</div>

      <div className='mr-10 flex items-center gap-5'>
        <Link href='/' className=' font-small text-xl text-black'>
          My buckets
        </Link>
        <Link href='/' className=' font-small text-xl text-black'>
          Shared buckets
        </Link>
        <Link href='/' className=' font-small text-xl text-black'>
          Profile
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
