import { Request, Response } from "express";
import { Post } from "../models/post";
import {RequestWithUserObject} from "../interfaces";
import v4 from 'uuid/v4';
import {Bid} from "../models/bid";

export async function getPosts(
    _: Request,
): Promise<Post[]> {
    return Post.findAll({ limit: 100, order: [['createdAt', 'DESC']] })
}

export async function getPostById(
    req: Request,
): Promise<Post> {
    return Post.findByPk(req.params.id);
}

export async function createPost(
    req: RequestWithUserObject,
): Promise<Post> {
    const user = req.user.user;

    const title = req.body.title;
    const description = req.body.description;
    const location = req.body.location;
    const category = req.body.category;

    return Post.create({
        id: v4(),
        gid_uuid: user.gid_uuid,
        title,
        description,
        location,
        category,
    });
}

export async function updatePost(
    req: RequestWithUserObject,
): Promise<Post[]> {
    const id = req.params.id;
    const gid_uuid = req.user.user.gid_uuid;
    const { title, description, category, location } = req.body.data;

    const post = await Post.findByPk(id);

    if (post.gid_uuid !== gid_uuid) {
        throw new Error('ERR_FORBIDDEN');
    }
    const [ _, posts ] = await Post.update({ title, description, category, location }, { where: { id, gid_uuid }});

    return posts
}

export async function deletePost(
    req: RequestWithUserObject,
): Promise<void> {
    const gid_uuid = req.user.user.gid_uuid;
    const id = req.params.id;

    const post = await Post.findByPk(id);
    if (post.gid_uuid !== gid_uuid) {
        throw new Error('ERR_FORBIDDEN');
    }

    await Post.destroy({ where: { id }})
}

export async function getMyPosts(
    req: RequestWithUserObject
) {
    const gid_uuid = req.user.user.gid_uuid;

    const posts = await Post.findAll({ where: { gid_uuid }});

    const postsWithBidCount = await Promise.all(
        posts.map(countBidsInAPost)
    );

    return postsWithBidCount
}

async function countBidsInAPost (
    post: Post
) {
    const bidCount: number = await Bid.count({ where: { post_id: post.id }});

    return {
        ...post.toJSON(),
        bids: bidCount,
    }
}