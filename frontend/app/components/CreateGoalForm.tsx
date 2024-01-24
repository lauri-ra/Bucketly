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

			<div
				style={showWhenVisible}
				className='w-1/4 rounded-md border border-sky-300 py-5'
			>
				<form action={createGoalWithId} className='ml-2'>
					<div className='pb-2 text-xl underline'>Create new goal</div>
					<input
						name='name'
						type='text'
						placeholder='Goal name'
						className='my-2 block w-60 rounded border bg-neutral-200 p-2 text-left text-gray-600 outline-none drop-shadow-md hover:border-lime-500 focus:border-lime-500'
					/>
					<select
						name='status'
						className='my-2 block w-60 rounded border p-2 text-left outline-none drop-shadow-md'
					>
						<option value='In progress'>In progress</option>
						<option value='Completed'>Completed</option>
					</select>
					<button
						type='submit'
						className='my-2 mr-2 w-32 rounded-md border border-black bg-neutral-200 px-2 py-2 text-left shadow transition ease-in-out hover:scale-105 hover:bg-sky-300'
					>
						Create goal
					</button>
					<button
						className='my-2 ml-2 w-32 rounded-md border border-black bg-neutral-200 px-2 py-2 text-left shadow transition ease-in-out hover:scale-105 hover:bg-red-300'
						onClick={toggleVisibility}
					>
						Cancel
					</button>
				</form>
			</div>
		</div>
	);
}

CreateGoalForm.displayName = 'CreateGoalForm';
export default CreateGoalForm;
