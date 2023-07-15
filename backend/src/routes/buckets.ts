import express from 'express';
import { eq } from 'drizzle-orm';

import { Bucket, Goal, bucketlists, goals } from '../db/schema';
import db from '../db/connect';

const router = express.Router();

router.get('/', async (_request, response) => {
	const result: Bucket[] = await db.select().from(bucketlists);
	response.json(result);
});

// Route for getting bucketlist by its id. TODO: Is this needed?
router.get('/:bucketId', async (request, response) => {
	const bucketId = Number(request.params.bucketId);

	const result: Bucket[] = await db
		.select()
		.from(bucketlists)
		.where(eq(bucketlists.id, bucketId));

	response.json(result[0]);
});

// Routes for getting bucketlist by its group or user
router.get('/user/:id', async (request, response) => {
	const id = Number(request.params.id);

	const result: Bucket[] = await db
		.select()
		.from(bucketlists)
		.where(eq(bucketlists.id, id));

	if (result) {
		response.json(result);
	} else {
		response.status(404).end();
	}
});

router.get('/group/:id', async (request, response) => {
	const id = Number(request.params.id);

	const result: Bucket[] = await db
		.select()
		.from(bucketlists)
		.where(eq(bucketlists.id, id));

	if (result) {
		response.json(result);
	} else {
		response.status(404).end();
	}
});

// Routes for getting goals related to specific bucketlist
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

// Route for creating new bucketlist
router.post('/', async (request, response) => {
	const body = request.body as Bucket;

	console.log(body);

	if (!body.name) {
		return response
			.status(400)
			.json({ error: 'Bucket list does not have a name' });
	}

	if (!body.user_id && !body.group_id) {
		return response
			.status(400)
			.json({ error: 'Bucket list not assigned to an user or a group' });
	}

	const newBucketList = await db.insert(bucketlists).values(body).returning();

	return response.status(201).json(newBucketList);
});

export default router;
