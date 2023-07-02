import express from 'express';
import { eq } from 'drizzle-orm';

import { Bucket, Goal, bucketlists, goals } from '../db/schema';
import db from '../db/connect';

const router = express.Router();

router.get('/', async (_request, response) => {
	const result: Bucket[] = await db.select().from(bucketlists);
	response.json(result);
});

router.get('/:bucketId', async (request, response) => {
	const bucketId = Number(request.params.bucketId);

	const result: Bucket[] = await db
		.select()
		.from(bucketlists)
		.where(eq(bucketlists.id, bucketId));

	response.json(result[0]);
});

router.get('/:bucketId/goals', async (request, response) => {
	const bucketId = Number(request.params.bucketId);

	const result: Goal[] = await db
		.select()
		.from(goals)
		.where(eq(goals.bucket_id, bucketId));

	response.json(result);
});

router.get('/:bucketId/goals/:goalId', async (request, response) => {
	const goalId = Number(request.params.goalId);

	const result: Goal[] = await db
		.select()
		.from(goals)
		.where(eq(goals.id, goalId));

	response.json(result[0]);
});

export default router;
