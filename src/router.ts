import { Application } from 'express';
import { controllerWrapper } from "./controllers/middleware";
import { getPostById, getPosts } from "./controllers/post";
import { getBidById, getBids } from "./controllers/bid";

export function createRouter(app: Application): void {
    createPostRouter(app);
    createBidRouter(app);
    createUserRouter(app);
}

function createPostRouter(app: Application) {
    app.post('/api/post/');
    app.put('/api/post/:id');
    app.get('/api/post/', controllerWrapper(getPosts));
    app.get('/api/post/:id', controllerWrapper(getPostById));
}

function createBidRouter(app: Application) {
    app.post('/api/bid/');
    app.put('/api/bid/:id');
    app.get('/api/bid/', controllerWrapper(getBids));
    app.get('/api/bid/:id', controllerWrapper(getBidById));
}

function createUserRouter(app: Application) {
    app.get('/oauth2/connect')
}
