import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import db from '../db/connect';
import { User, users } from '../db/schema';
import { eq } from 'drizzle-orm';

// This custom request type has optional values so that the middleware can
// be applied to express app routes
interface AuthRequest extends Request {
	token?: string;
	user?: User;
}

const authMiddleware = async (
	request: AuthRequest,
	response: Response,
	next: NextFunction
) => {
	if (request.token) {
		const decoded = jwt.verify(
			request.token,
			process.env.JWT_SECRET as string
		) as JwtPayload;

		const userId = Number(decoded.userId);
		const user = await db.select().from(users).where(eq(users.id, userId));
		request.user = user[0];

		next();
	} else {
		return response.status(401).json({ error: 'Token missing or invalid' });
	}

	return;
};

export default authMiddleware;
