import { Request, Response } from 'express';
import {Drop} from "../models/drop";
import {Message} from "../models/message";

export async function postMessage(
    req: Request,
    res: Response,
): Promise<void> {
    const data: string | undefined = req.body.data;
    const drop_id: string | undefined = req.body.drop_id;

    if (!data || !drop_id) {
        res.status(400).send();
        return;
    }

    await Message.create(
        {
            data,
            drop_id,
        }
    );

    res.send();
}

export async function getMessagesByDropId(
    req: Request,
    res: Response,
): Promise<void> {
    const dropId: string = req.params.drop_id;
    const messages: Message[] = await Message.findAll({ where: { drop_id: dropId }, attributes: [ 'data' ]});

    res.send({ messages }).send();
}