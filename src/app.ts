import express, { Express } from 'express';
import { urlencoded } from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import { createRouter } from './router'

export function initApp() {
    const app: Express = express();

    app.set('port', process.env.PORT || '3000');
    app.use(urlencoded({ extended: false }));
    app.use(cors());
    app.use(morgan('dev'))

    createRouter(app);

    return app;
}
