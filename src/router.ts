import { Application } from 'express';
import { controllerWrapper } from "./controllers/middleware";
import { getPostById, getPosts } from "./controllers/post";
import { getBidById, getBids } from "./controllers/bid";
import {handleOauthConnect} from "./controllers/users";

export function createRouter(app: Application): void {
    createPostRouter(app);
    createBidRouter(app);
    createUserRouter(app);
}

function createPostRouter(app: Application) {
    app.post('/api/posts/');
    app.put('/api/posts/:id');
    app.get('/api/posts/', controllerWrapper(getPosts));
    app.get('/api/posts/:id', controllerWrapper(getPostById));
}

function createBidRouter(app: Application) {
    app.post('/api/bids/');
    app.put('/api/bids/:id');
    app.get('/api/bids/', controllerWrapper(getBids));
    app.get('/api/bids/:id', controllerWrapper(getBidById));
}

function createUserRouter(app: Application) {
    app.get('/oauth/connect', handleOauthConnect)
}
