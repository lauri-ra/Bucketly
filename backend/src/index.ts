import express from 'express';

import usersRouter from './routes/users';
import groupsRouter from './routes/groups';
import bucketsRouter from './routes/buckets';
import loginRouter from './routes/login';

const app = express();
app.use(express.json());

const PORT = 3001;

app.use('/api/users', usersRouter);
app.use('/api/groups', groupsRouter);
app.use('/api/buckets', bucketsRouter);
app.use('/api/login', loginRouter);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
