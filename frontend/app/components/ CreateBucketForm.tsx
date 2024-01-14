'use client';

import { useState } from 'react';

export function CreateBucketForm() {
	const [visible, setVisible] = useState(false);

	const hideWhenVisible = { display: visible ? 'none' : '' };
	const showWhenVisible = { display: visible ? '' : 'none' };

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	return (
		<div>
			<div className='my-3' style={hideWhenVisible}>
				<button
					className='mb-2 mt-2 w-1/4 flex-col rounded-md border border-black bg-neutral-200 px-5 py-2.5 shadow transition ease-in-out hover:scale-105 hover:bg-sky-300'
					onClick={toggleVisibility}
				>
					Create new bucket list
				</button>
			</div>

			<div style={showWhenVisible}>
				<form>
					<input
						name='name'
						type='text'
						placeholder='bucket list name'
						className='my-2 block w-60 rounded border bg-neutral-200 p-2 text-left text-gray-600 outline-none drop-shadow-md hover:border-lime-500 focus:border-lime-500'
					/>
					<input
						name='description'
						type='text'
						placeholder='description'
						className='my-2 block w-60 rounded border bg-neutral-200 p-2 text-left text-gray-600 outline-none drop-shadow-md hover:border-lime-500 focus:border-lime-500'
					/>
					<button
						type='submit'
						className='mb-2 mt-2 w-1/4 flex-col rounded-md border border-black bg-neutral-200 px-5 py-2.5 shadow transition ease-in-out hover:scale-105 hover:bg-sky-300'
					>
						Create list
					</button>
				</form>
				<button
					className='mb-2 mt-2 w-1/4 flex-col rounded-md border border-black bg-neutral-200 px-5 py-2.5 shadow transition ease-in-out hover:scale-105 hover:bg-sky-300'
					onClick={toggleVisibility}
				>
					Cancel
				</button>
			</div>
		</div>
	);
}
