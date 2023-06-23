import express from 'express';
import usersRouter from './routes/users';

const app = express();
app.use(express.json());

const PORT = 3001;

app.use('/api/users', usersRouter);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
