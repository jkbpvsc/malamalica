import { Request, Response } from 'express';
import { getAccessToken, getGIDUser } from "../utils/globalid";
import jwt from 'jsonwebtoken';

export async function handleOauthConnect (
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
        { expiresIn: 7200 }
    );

    res.status(201).send({ access_token: token });
}