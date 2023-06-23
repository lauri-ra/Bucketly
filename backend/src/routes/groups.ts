import express from 'express';
import { eq } from 'drizzle-orm';

import db from '../db/connect';
import { Groups, groups } from '../db/schema';

const router = express.Router();

router.get('/', async (_request, response) => {
	const allGroups: Groups[] = await db.select().from(groups);
	response.json(allGroups);
});

router.get('/:id', async (request, response) => {
	const id = Number(request.params.id);
	const group: Groups[] = await db.select().from(groups).where(eq(groups.id, id));
	response.json(group);
});

export default router;
