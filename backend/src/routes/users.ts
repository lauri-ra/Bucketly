import express from 'express';
import bcrypt from 'bcrypt';
import db from '../db/connect';
import { users, User } from '../db/schema';
import { eq, or } from 'drizzle-orm';

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

router.post('/', async (request, response) => {
	const newUser: User = request.body as User;

	const existingUsr = await db
		.select()
		.from(users)
		.where(
			or(eq(users.username, newUser.username), eq(users.email, newUser.email))
		);

	if (existingUsr.length !== 0) {
		return response
			.status(400)
			.json({ error: 'Username or email already in use' });
	}

	const passwordHash = await bcrypt.hash(newUser.password, 10);

	const addedUser = await db
		.insert(users)
		.values({
			username: newUser.username,
			fullName: newUser.fullName,
			email: newUser.email,
			password: passwordHash,
		})
		.returning();

	return response.status(201).json(addedUser[0]);
});

export default router;
