import { InferModel } from 'drizzle-orm';
import { integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	username: varchar('username', { length: 255 }),
	fullName: varchar('full_name', { length: 255 }),
	email: varchar('email', { length: 255 }),
	password: varchar('password', { length: 255 }),
});

export const groups = pgTable('groups', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 255 }),
});

export const groupmembers = pgTable('groupmembers', {
	user_id: integer('user_id').references(() => users.id),
	group_id: integer('group_id').references(() => groups.id),
});

type UserData = InferModel<typeof users, 'select'>;
export type User = Omit<UserData, 'password'>;
export type Groups = InferModel<typeof groups, 'select'>;
export type Members = InferModel<typeof groupmembers, 'select'>;
