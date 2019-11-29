import { Request, Response } from "express";

type Controller<T> = (req: Request) => Promise<T>

export function controllerWrapper<T> (controller: Controller<T>) {
    return async function (req: Request, res: Response) {
        try {
            const body: T = await controller(req);
            res.send(body)
        } catch (e) {
            res.status(500).send(e);
        }
    }
}