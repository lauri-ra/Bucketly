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

// Routes for getting bucketlist by user id
router.get('/user/:id', async (request, response) => {
	const id = Number(request.params.id);

	const result: Bucket[] = await db.select().from(bucketlists).where(eq(bucketlists.user_id, id));

	if (result) {
		response.json(result);
	} else {
		response.status(404).end();
	}
});

router.get('/group/:id', async (request, response) => {
	const id = Number(request.params.id);

	const result: Bucket[] = await db.select().from(bucketlists).where(eq(bucketlists.id, id));

	if (result) {
		response.json(result);
	} else {
		response.status(404).end();
	}
});

// Routes for getting goals related to specific bucketlist
router.get('/:bucketId/goals', async (request, response) => {
	const bucketId = Number(request.params.bucketId);

	const result: Goal[] = await db.select().from(goals).where(eq(goals.bucket_id, bucketId));

	response.json(result);
});

router.get('/:bucketId/goals/:goalId', async (request, response) => {
	const goalId = Number(request.params.goalId);

	const result: Goal[] = await db.select().from(goals).where(eq(goals.id, goalId));

	response.json(result[0]);
});

// Route for creating new bucketlist
router.post('/', async (request, response) => {
	const body = request.body as Bucket;

	if (!body.name) {
		return response.status(400).json({ error: 'Bucket list does not have a name' });
	}

	if (!body.user_id && !body.group_id) {
		return response
			.status(400)
			.json({ error: 'Bucket list not assigned to an user or a group' });
	}

	const newBucketList = await db.insert(bucketlists).values(body).returning();

	return response.status(201).json(newBucketList);
});

// Route for deleting a bucketlist
router.delete('/:bucketId', async (request, response) => {
	const bucketId = Number(request.params.bucketId);

	if (!bucketId) {
		return response.status(400).json({ error: 'Bucket list id missing' });
	}

	// SQL transaction, where we make sure each goal related to the bucketlist
	// and the list itself is removed succesfully
	try {
		await db.transaction(async (tx) => {
			await tx.delete(goals).where(eq(goals.bucket_id, bucketId));
			await tx.delete(bucketlists).where(eq(bucketlists.id, bucketId));
			return;
		});

		return response.status(204).end();
	} catch (error) {
		console.log(error);
		return response.status(500).json({ error: 'Internal server error' });
	}
});

// Route for adding a goal to a bucket list
router.post('/:bucketId/goals', async (request, response) => {
	const body = request.body as Goal;

	if (!body) {
		return response.status(400).json({ error: 'Goal body missing content' });
	}

	const newGoal: Goal[] = await db.insert(goals).values(body).returning();

	return response.status(201).json(newGoal);
});

export default router;
