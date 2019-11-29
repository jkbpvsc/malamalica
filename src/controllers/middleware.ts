import { Request, Response } from "express";
import { isNil } from 'lodash';
import { verify } from 'jsonwebtoken';
import * as fs from "fs";
import * as path from "path";

type Controller<T> = (req: Request) => Promise<T>

export function controllerWrapper<T> (
    controller: Controller<T>
): (req: Request, res: Response) => Promise<void> {
    return async function (req: Request, res: Response) {
        try {
            const body: T = await controller(req);
            // @ts-ignore
            console.log(req.session.user);
            res.send(body)
        } catch (e) {
            console.error(e);
            res.status(500).send(e);
        }
    }
}

export async function decodeJWT(req: Request, res: Response, next: Function) {
    try {
        const authHeader = req.header('Authorization');
        const headerParts = authHeader.split(' ');

        const publicKey = fs.readFileSync(path.join(__dirname, '../../keys/public.pem'));

        req.session.user = verify(headerParts[1], publicKey);
    } catch (e) {
        console.log('Decoding the token failed', e);
    }

    next();
}

export function isAuthenticated(req: Request, res: Response, next: Function) {
    const user = req.session.user;
    if (isNil(user)) {
        res.status(401).send();
        return;
    }

    next();
}