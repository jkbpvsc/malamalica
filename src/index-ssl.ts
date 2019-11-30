import * as dotenv from 'dotenv';
dotenv.config();

import { Application } from 'express';
import { initApp } from './app';
import { createServer } from 'https';

(async () => {
    const app: Application = await initApp();
    const key = Buffer.from(process.env.SERVER_CERT_PRIVATE_KEY, 'base64').toString();
    const cert =  Buffer.from(process.env.SERVER_CERT, 'base64').toString();

    const sslConfig = {
        key: key,
        cert: cert,
    };

    createServer(sslConfig, app)
        .listen(app.get('port'), () => {
            console.log("App is running on port %d", app.get('port'));
        });
})();
