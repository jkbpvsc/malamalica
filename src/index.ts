import * as dotenv from 'dotenv';
dotenv.config();

import { Application } from 'express';
import { initApp } from './app';
import { createServer } from 'https';
import { readFileSync } from 'fs';
import { join } from 'path';

(async () => {
    const app: Application = await initApp();

    const sslConfig = {
        key: readFileSync(join(__dirname, '..', 'cert/server.key')),
        cert: readFileSync(join(__dirname, '..', 'cert/server.cert')),
    };

    createServer(sslConfig, app)
        .listen(app.get('port'), () => {
            console.log("App is running on port %d", app.get('port'));
        });
})();
