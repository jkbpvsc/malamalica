import { Request, Response } from "express";
import { isNil } from 'lodash';

type Controller<T> = (req: Request) => Promise<T>

export function controllerWrapper<T> (
    controller: Controller<T>
): (req: Request, res: Response) => Promise<void> {
    return async function (req: Request, res: Response) {
        try {
            const body: T = await controller(req);
            console.log(req.session);
            res.send(body)
        } catch (e) {
            console.error(e);
            res.status(500).send(e);
        }
    }
}

export function isAuthenticated(req: Request, res: Response, next: Function) {
    const user = req.session.user;
    if (isNil(user)) {
        res.status(401).send();
        return;
    }

    next();
}