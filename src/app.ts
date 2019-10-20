import express, { Express } from 'express';
import { urlencoded } from 'body-parser';
import { createRouter } from './router'

export function initApp() {
    const app: Express = express();

    app.set('port', process.env.PORT || '3000');
    app.use(urlencoded());

    createRouter(app);

    return app;
}
