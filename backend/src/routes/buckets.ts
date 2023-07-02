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

	const bucketList: Bucket[] = await db
		.select()
		.from(bucketlists)
		.where(eq(bucketlists.id, bucketId));

	const goalList: Goal[] = await db
		.select({
			id: goals.id,
			name: goals.name,
			status: goals.status,
			bucket_id: goals.bucket_id,
		})
		.from(bucketlists)
		.innerJoin(goals, eq(bucketlists.id, goals.bucket_id))
		.where(eq(bucketlists.id, bucketId));

	const result = {
		bucket: bucketList[0],
		goals: goalList,
	};

	response.json(result);
});

export default router;
