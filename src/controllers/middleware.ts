import { Request, Response } from "express";
import { isNil } from 'lodash';
import { verify } from 'jsonwebtoken';
import { RequestWithUserObject } from "../interfaces";

type Controller<T> = (req: Request) => Promise<T>

export function controllerWrapper<T> (
    controller: Controller<T>
): (req: RequestWithUserObject, res: Response) => Promise<void> {
    return async function (req: RequestWithUserObject, res: Response) {
        try {
            const body: T = await controller(req);
            res.send(body)
        } catch (e) {
            console.error(e);
            res.status(500).send(e);
        }
    }
}

export async function decodeJWT(req: RequestWithUserObject, res: Response, next: Function) {
    try {
        const authHeader = req.header('Authorization');
        const headerParts = authHeader.split(' ');

        req.user = verify(
            headerParts[1],
            process.env.JWT_SECRET,
            { algorithms: [ 'HS256' ]}
        ) as object;
    } catch (e) {
        console.log('Decoding the token failed', e);
    }

    next();
}

export function isAuthenticated(req: RequestWithUserObject, res: Response, next: Function) {
    const user = req.user;
    if (isNil(user)) {
        res.status(401).send();
        return;
    }

    next();
}