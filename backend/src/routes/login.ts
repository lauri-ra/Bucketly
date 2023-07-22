import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import db from '../db/connect';
import { User, users } from '../db/schema';
import { eq } from 'drizzle-orm';

const router = express.Router();

router.get('/', (_request, response) => {
	response.send('login');
});

router.post('/', async (request, response) => {
	const { username, password } = request.body as User;

	try {
		const query: User[] = await db
			.select()
			.from(users)
			.where(eq(users.username, username));

		const user = query[0];

		if (!user) {
			return response.status(404).json({ error: 'User not found' });
		}

		const passwordMatch = await bcrypt.compare(password, user.password);

		if (!passwordMatch) {
			return response.status(401).json({ error: 'Invalid password' });
		}

		const token = jwt.sign(
			{ userId: user.id },
			process.env.JWT_SECRET as string
		);

		return response.json({ token });
	} catch (error) {
		console.error('Error during login:', error);
		return response.status(500).json({ error: 'Internal server error' });
	}
});

export default router;
