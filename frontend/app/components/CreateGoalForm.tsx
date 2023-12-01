'use client';

import { useState } from 'react';
import { createGoal } from '../actions';

interface GoalFormProps {
	bucketId: string;
}

export function CreateGoalForm({ bucketId }: GoalFormProps) {
	const [visible, setVisible] = useState(false);

	const hideWhenVisible = { display: visible ? 'none' : '' };
	const showWhenVisible = { display: visible ? '' : 'none' };

	const createGoalWithId = createGoal.bind(null, bucketId);

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
					Add new Goal
				</button>
			</div>

			<div style={showWhenVisible}>
				<form action={createGoalWithId}>
					<input
						name='name'
						type='text'
						placeholder='goal name'
						className='my-2 block w-60 rounded border bg-neutral-200 p-2 text-left text-gray-600 outline-none drop-shadow-md hover:border-lime-500 focus:border-lime-500'
					/>
					<input
						name='status'
						type='text'
						placeholder='goal status'
						className='my-2 block w-60 rounded border bg-neutral-200 p-2 text-left text-gray-600 outline-none drop-shadow-md hover:border-lime-500 focus:border-lime-500'
					/>
					<button
						type='submit'
						className='mb-2 mt-2 w-1/4 flex-col rounded-md border border-black bg-neutral-200 px-5 py-2.5 shadow transition ease-in-out hover:scale-105 hover:bg-sky-300'
					>
						Create goal
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

CreateGoalForm.displayName = 'CreateGoalForm';
export default CreateGoalForm;
