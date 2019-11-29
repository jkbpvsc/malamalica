import { Request, Response } from 'express';
import { getAccessToken, getGIDUser } from "../utils/globalid";

import jwt from 'jsonwebtoken';
import * as fs from "fs";
import * as path from "path";

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
        { key: fs.readFileSync(path.join(__dirname, '../../keys/private.pem')).toString(), passphrase: process.env.PRIVATE_KEY_PASS },
        { expiresIn: 7200 }
    );

    console.log(token);
    res.status(201).send({ access_token: token });
}