import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const client = postgres(process.env.DATABASE_URL as string);
const db = drizzle(client);

console.log('db', process.env.DATABASE_URL);

export default db;
