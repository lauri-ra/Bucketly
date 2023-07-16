import express from 'express';
import { eq } from 'drizzle-orm';

import db from '../db/connect';
import {
	GroupUser,
	Groups,
	Members,
	groupmembers,
	groups,
	users,
} from '../db/schema';

const router = express.Router();

router.get('/', async (_request, response) => {
	const allGroups: Groups[] = await db.select().from(groups);
	response.json(allGroups);
});

router.post('/', async (request, response) => {
	const body = request.body as Groups;

	if (!body) {
		return response.status(400).json({ error: 'Group body missing content' });
	}

	const newGroup = await db.insert(groups).values(body).returning();

	return response.status(201).json(newGroup);
});

router.get('/:id', async (request, response) => {
	const id = Number(request.params.id);
	const group: Groups[] = await db
		.select()
		.from(groups)
		.where(eq(groups.id, id));
	response.json(group);
});

router.delete('/:id', async (request, response) => {
	const id = Number(request.params.id);

	await db.delete(groups).where(eq(groups.id, id));

	response.status(204).end();
});

router.get('/:id/members', async (request, response) => {
	const id = Number(request.params.id);

	const result: GroupUser[] = await db
		.select({
			id: users.id,
			username: users.username,
			fullName: users.fullName,
			email: users.email,
		})
		.from(groupmembers)
		.innerJoin(users, eq(groupmembers.user_id, users.id))
		.where(eq(groupmembers.group_id, id));

	response.json(result);
});

router.post('/:id/members', async (request, response) => {
	const body = request.body as Members;

	if (!body) {
		return response.status(400).json({ error: 'Member body missing content' });
	}

	const addedUser = await db.insert(groupmembers).values(body).returning();

	return response.status(201).json(addedUser);
});

router.delete('/:id/members', async (request, response) => {
	const body = request.body as Members;

	if (!body) {
		return response
			.status(400)
			.json({ error: 'Member data missing from body' });
	}

	const id = Number(body.user_id);
	await db.delete(groupmembers).where(eq(groupmembers.user_id, id));

	return response.status(204).end();
});

export default router;
