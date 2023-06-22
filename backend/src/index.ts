import express from 'express';
import db from './db/connect';
import { users } from './db/schema';

const app = express();
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_request, response) => {
	console.log('pinged');
	response.send('pong');
});

app.get('/api/users', (_request, response) => {
	async () => {
		const allUsers = await db.select().from(users);
		response.json(allUsers);
	};
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
