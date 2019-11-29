import { Request, Response } from "express";
import { Post } from "../models/post";

// export async function getPosts(
//     req: Request,
//     res: Response,
// ): Promise<void> {
//
// }

export async function getPosts(
    _: Request,
): Promise<Post[]> {
    return Post.findAll({ limit: 100 })
}

export async function getPostById(
    req: Request,
): Promise<Post> {
    return Post.findByPk(req.params.id);
}