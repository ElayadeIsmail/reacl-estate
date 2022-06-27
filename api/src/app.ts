import cookieSession from 'cookie-session';
import express from 'express';
import 'express-async-errors';
import { join } from 'path';
import { NotFoundError } from './errors';
import { currentUser, errorHandler } from './middlewares';
import { authRouter, profileRouter } from './routes';

// Create a new express application
const app = express();

// Set up the express application to use JSON middleware
app.use(express.json());

// Set up the express application to use cookie-session middleware
app.use(
    cookieSession({
        signed: false,
        secure: process.env.Node_ENV === 'production',
    }),
);

// Set up the express application to use the serve static assets middleware
app.use(express.static(join(__dirname, '..', 'public')));

// add the currentUser middleware to all routes
app.use(currentUser);

// register the auth routes
app.use('/auth', authRouter);

// register the profile routes
app.use('/profile', profileRouter);

app.all('*', () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
