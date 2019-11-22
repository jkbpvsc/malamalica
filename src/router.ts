import { Application } from 'express';
import { createDrop, uploadDropData, getDropData } from './controllers/drop';

export function createRouter(app: Application): void {
    app.post('/drop', createDrop);
    app.post('/drop/:id', uploadDropData);
    app.get('/drop/:id', getDropData);
}
