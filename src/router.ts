import { Application } from 'express';
import { controllerWrapper, isAuthenticated } from './controllers/middleware';
import { createPost, deletePost, getMyPosts, getPostById, getPosts, updatePost } from './controllers/post';
import { createBid, deleteBid, getBidById, getBidsByPost, getMyBids, updateBid } from './controllers/bid';
import { getMyUser, handleOauthConnect, getUserByID } from './controllers/users';
import { createBidMessage, getBidMessagesByBidId } from "./controllers/bid_messages";

export function createRouter(app: Application): void {
    createPostRouter(app);
    createBidRouter(app);
    createUserRouter(app);
}

function createPostRouter(app: Application) {
    app.post('/api/posts/', isAuthenticated, controllerWrapper(createPost));
    app.put('/api/posts/:id', isAuthenticated, controllerWrapper(updatePost));
    app.get('/api/posts/', controllerWrapper(getPosts));
    app.get('/api/posts/me', isAuthenticated, controllerWrapper(getMyPosts));

    app.get('/api/posts/:post_id/bids', controllerWrapper(getBidsByPost));
    app.get('/api/posts/:id', controllerWrapper(getPostById));

    app.delete('/api/posts/:id', controllerWrapper(deletePost))
}

function createBidRouter(app: Application) {

    app.post('/api/bids/:bid_id/messages', isAuthenticated, controllerWrapper(createBidMessage));
    app.get('/api/bids/:bid_id/messages', isAuthenticated, controllerWrapper(getBidMessagesByBidId));

    app.post('/api/bids/', isAuthenticated, controllerWrapper(createBid));
    app.get('/api/bids/me', isAuthenticated, controllerWrapper(getMyBids));
    app.put('/api/bids/:id', isAuthenticated, controllerWrapper(updateBid));

    app.get('/api/bids/:id', controllerWrapper(getBidById));
    app.delete('/api/bids/:id', isAuthenticated, controllerWrapper(deleteBid));
}

function createUserRouter(app: Application) {
    app.get('/oauth/connect', handleOauthConnect);
    app.get('/api/users/me', controllerWrapper(getMyUser));
    app.get('/api/users/:gid_uuid', controllerWrapper(getUserByID))
}
