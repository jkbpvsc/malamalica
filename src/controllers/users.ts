import { Request, Response } from 'express';
import { getAccessToken, getGIDUser } from "../utils/globalid";
import jwt from 'jsonwebtoken';
import { User } from "../models/user";
import { RequestWithUserObject } from "../interfaces";

export async function handleOauthConnect(
    req: Request,
    res: Response,
): Promise<void> {
    const accessToken: string = await getAccessToken(
        req.query.code,
        process.env.GID_AUTH_CLIENT_ID,
        process.env.GID_AUTH_CLIENT_SECRET,
        process.env.GID_AUTH_CLIENT_REDIRECT_URL,
    );

    const user = await getGIDUser(accessToken);
    const token: string = jwt.sign(
        { user, gid_access_token: accessToken },
        process.env.JWT_SECRET,
        { expiresIn: '60d' }
    );

    await User.upsert({ gid_name: user.gid_name, gid_uuid: user.gid_uuid });

    res.status(201).send({ accessToken: token });
}

export function getMyUser(
    req: RequestWithUserObject
): Promise<User> {
    const gid_uuid = req.user.user.gid_uuid;

    return User.findByPk(gid_uuid);
}

export function getUserByID(
    req: Request
): Promise<User> {
    const gid_uuid = req.params.gid_uuid;

    return User.findByPk(gid_uuid);
}
