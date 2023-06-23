import { InferModel } from 'drizzle-orm';
import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	username: varchar('username', { length: 255 }),
	fullName: varchar('full_name', { length: 255 }),
	email: varchar('email', { length: 255 }),
	password: varchar('password', { length: 255 }),
});

export type User = InferModel<typeof users, 'select'>;
