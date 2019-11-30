import { Application } from 'express';
import {controllerWrapper, isAuthenticated} from './controllers/middleware';
import { createPost, deletePost, getPostById, getPosts, updatePost } from './controllers/post';
import { createBid, deleteBid, getBidById, getBids, updateBid } from './controllers/bid';
import { handleOauthConnect } from './controllers/users';

export function createRouter(app: Application): void {
    createPostRouter(app);
    createBidRouter(app);
    createUserRouter(app);
}

function createPostRouter(app: Application) {
    app.post('/api/posts/', isAuthenticated, controllerWrapper(createPost));
    app.put('/api/posts/:id', isAuthenticated, controllerWrapper(updatePost));
    app.get('/api/posts/', controllerWrapper(getPosts));
    app.get('/api/posts/:id', controllerWrapper(getPostById));
    app.delete('/api/posts/:id', controllerWrapper(deletePost))
}

function createBidRouter(app: Application) {
    app.post('/api/bids/', isAuthenticated, controllerWrapper(createBid));
    app.put('/api/bids/:id', isAuthenticated, controllerWrapper(updateBid));
    app.get('/api/bids/', controllerWrapper(getBids));
    app.get('/api/bids/:id', controllerWrapper(getBidById));
    app.delete('/api/bids/:id', isAuthenticated, controllerWrapper(deleteBid))
}

function createUserRouter(app: Application) {
    app.get('/oauth/connect', handleOauthConnect)
}
