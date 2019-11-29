import { Request, Response } from 'express';
import { getAccessToken, getGIDUser } from "../utils/globalid";

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

    req.session.user = await getGIDUser(accessToken);
    res.redirect('/');
}