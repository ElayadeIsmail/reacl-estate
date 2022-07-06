import express from 'express';
import 'express-async-errors';
import { join } from 'path';
import { NotFoundError } from './errors';
import { currentUser, errorHandler } from './middlewares';
import {
    authRouter,
    citiesRouter,
    listingsRouter,
    profileRouter,
} from './routes';

// Create a new express application
const app = express();

// Set up the express application to use JSON middleware
app.use(express.json({ limit: '30mb' }));

// Set up the express application to use the serve static assets middleware
app.use(express.static(join(__dirname, '..', 'public')));

// Set up route for serving uploaded files
app.use('upload', express.static(join(__dirname, '..', 'public', 'upload')));

// add the currentUser middleware to all routes
app.use(currentUser);

// register the auth routes
app.use('/auth', authRouter);

// register the profile routes
app.use('/profile', profileRouter);

// register the cities routes
app.use('/cities', citiesRouter);

// register the listings routes
app.use('/listings', listingsRouter);

app.all('*', () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
