import { Request, Response } from "express";
import { isNil } from 'lodash';
import { verify } from 'jsonwebtoken';
import { JWTUser, RequestWithUserObject } from "../interfaces";
import { ErrorList } from "../error-list";

type Controller<T> = (req: Request | RequestWithUserObject) => Promise<T>

export function controllerWrapper<T>(
    controller: Controller<T>
): (req: RequestWithUserObject, res: Response) => Promise<void> {
    return async function(req: RequestWithUserObject, res: Response) {
        try {
            const body: T = await controller(req);
            res.send(body)
        } catch (e) {
            console.error(e)

            let errorCode = e.message;

            if (isNil(ErrorList[errorCode])) {
                errorCode = 'ERR'
            }

            const errorObject = ErrorList[errorCode];

            res
                .status(errorObject.code)
                .send({ code: errorCode, message: errorObject.message });
        }
    }
}

export async function decodeJWT(req: RequestWithUserObject, res: Response, next: Function) {
    try {
        const authHeader = req.header('Authorization');
        if (authHeader) {
            const headerParts = authHeader.split(' ');

            req.user = verify(
                headerParts[1],
                process.env.JWT_SECRET,
                { algorithms: [ 'HS256' ]}
            ) as JWTUser;
        }
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
