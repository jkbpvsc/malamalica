import express, { Express } from 'express';
import { urlencoded } from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import { createRouter } from './router'
import { sequelize } from "./models/database";
import session from 'express-session';

export async function initApp() {
    const app: Express = express();

    app.set('port', process.env.PORT || '3000');
    app.use(urlencoded({ extended: false }));
    app.use(cors());
    app.use(morgan('dev'))

    app.use(session({ secret: process.env.SESSION_SECRET, saveUninitialized: true, resave: true }));

    createRouter(app);

    await sequelize.sync({ force: true });

    return app;
}
