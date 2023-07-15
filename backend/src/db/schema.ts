import { InferModel } from 'drizzle-orm';
import { integer, pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	username: varchar('username', { length: 255 }).notNull(),
	fullName: varchar('full_name', { length: 255 }).notNull(),
	email: varchar('email', { length: 255 }).notNull(),
	password: varchar('password', { length: 255 }).notNull(),
});

export const groups = pgTable('groups', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 255 }).notNull(),
});

export const groupmembers = pgTable('groupmembers', {
	user_id: integer('user_id').references(() => users.id),
	group_id: integer('group_id').references(() => groups.id),
});

export const bucketlists = pgTable('bucketlists', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 255 }).notNull(),
	description: varchar('description', { length: 255 }),
	user_id: integer('user_id').references(() => users.id),
	group_id: integer('group_id').references(() => groups.id),
});

export const goals = pgTable('goals', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 255 }).notNull(),
	status: varchar('status', { length: 255 }).notNull(),
	bucket_id: integer('bucket_id')
		.references(() => bucketlists.id)
		.notNull(),
});

export const tasks = pgTable('tasks', {
	id: serial('id').primaryKey(),
	task: text('task').notNull(),
	goal_id: integer('goal_id').references(() => goals.id),
});

export type User = InferModel<typeof users, 'select'>;
export type GroupUser = Omit<User, 'password'>;
export type Groups = InferModel<typeof groups, 'select'>;
export type Members = InferModel<typeof groupmembers, 'select'>;
export type Bucket = InferModel<typeof bucketlists, 'select'>;
export type Goal = InferModel<typeof goals, 'select'>;
export type Task = InferModel<typeof tasks, 'select'>;
