import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import db from '../db/connect';
import { User, users } from '../db/schema';
import { eq } from 'drizzle-orm';

// This custom request type has optional values so that the middleware can
// be applied to express app routes
interface AuthRequest extends Request {
	user?: User;
}

export const authMiddleware = async (
	request: AuthRequest,
	response: Response,
	next: NextFunction
) => {
	const token = request.header('Authorization')?.replace('Bearer ', '');

	if (!token) {
		return response.status(401).json({ error: 'Token missing or invalid' });
	}

	try {
		const decoded = jwt.verify(
			token,
			process.env.JWT_SECRET as string
		) as JwtPayload;

		const userId = Number(decoded.userId);
		const user = await db.select().from(users).where(eq(users.id, userId));

		if (!user[0]) {
			return response.status(401).json({ error: 'Request user not found' });
		}

		request.user = user[0];

		next();
	} catch (error) {
		return response.status(401).json({ error: 'Token invalid or expired' });
	}

	return;
};

export default authMiddleware;
