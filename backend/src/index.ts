import express from 'express';
import cors from 'cors';

import usersRouter from './routes/users';
import groupsRouter from './routes/groups';
import bucketsRouter from './routes/buckets';
import loginRouter from './routes/login';
import authMiddleware from './utils/middleware';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.use('/api/users', usersRouter);
app.use('/api/groups', authMiddleware, groupsRouter);
app.use('/api/buckets', authMiddleware, bucketsRouter);
app.use('/api/login', loginRouter);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
