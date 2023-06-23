import express from 'express';
import usersRouter from './routes/users';
import groupsRouter from './routes/groups';

const app = express();
app.use(express.json());

const PORT = 3001;

app.use('/api/users', usersRouter);
app.use('/api/groups', groupsRouter);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
