import express from 'express';
import cookieParser from 'cookie-parser';
import logMiddleware from './middlewares/log.middleware.js';
import UsersRouter from './routes/users.router.js';
import ResumesRouter from './routes/resumes.router.js';
import AuthRouter from './routes/auth.router.js';
import ErrorHandlingMiddleware from './middlewares/error-handling,middleware.js';

const app = express();
const PORT = 3018;

app.use(logMiddleware);

app.use(express.json());
app.use(cookieParser());
app.use('/auth', AuthRouter);
app.use('/api', [UsersRouter, ResumesRouter]);

app.use(ErrorHandlingMiddleware);

app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});
