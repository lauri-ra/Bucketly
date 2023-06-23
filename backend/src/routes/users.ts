import express from 'express';
import db from '../db/connect';
import { users, User } from '../db/schema';
import { eq } from 'drizzle-orm';

const router = express.Router();

router.get('/', async (_request, response) => {
	const allUsers: User[] = await db.select().from(users);
	response.json(allUsers);
});

router.get('/:id', async (request, response) => {
	const id = Number(request.params.id);
	const user: User[] = await db.select().from(users).where(eq(users.id, id));
	response.json(user);
});

export default router;
