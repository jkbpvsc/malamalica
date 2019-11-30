import * as dotenv from 'dotenv';
dotenv.config();

import { Application } from 'express';
import { initApp } from './app';

(async () => {
    const app: Application = await initApp();

    app.listen(app.get('port'), () => {
        console.log("App is running on port %d", app.get('port'));
    })
})();
