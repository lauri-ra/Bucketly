import express from 'express';
import db from '../db/connect';
import { users, User } from '../db/schema';

const router = express.Router();

router.get('/', async (_request, response) => {
	const allUsers: User[] = await db.select().from(users);
	response.json(allUsers);
});

export default router;
