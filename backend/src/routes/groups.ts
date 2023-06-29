import express from 'express';
import { eq } from 'drizzle-orm';

import db from '../db/connect';
import { Groups, groupmembers, groups, users } from '../db/schema';

const router = express.Router();

router.get('/', async (_request, response) => {
	const allGroups: Groups[] = await db.select().from(groups);
	response.json(allGroups);
});

router.get('/:id', async (request, response) => {
	const id = Number(request.params.id);
	const group: Groups[] = await db
		.select()
		.from(groups)
		.where(eq(groups.id, id));
	response.json(group);
});

router.get('/:id/members', async (request, response) => {
	const id = Number(request.params.id);

	const group = await db.select().from(groups).where(eq(groups.id, id));

	const members = await db
		.select({
			id: users.id,
			username: users.username,
			name: users.fullName,
			email: users.email,
		})
		.from(groupmembers)
		.innerJoin(users, eq(groupmembers.user_id, users.id))
		.where(eq(groupmembers.group_id, id));

	const result = {
		group: group[0],
		members: members,
	};

	response.json(result);
});

export default router;
