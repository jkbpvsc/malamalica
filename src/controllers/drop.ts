import { Request, Response } from 'express'
import { Drop } from '../models/drop';
import { randomBytes } from 'crypto'


function generateRandomString(n: number): string {
    return randomBytes(n).toString('hex');
}

export async function createDrop(
    req: Request,
    res: Response,
): Promise<void> {
    const id: string = generateRandomString(32);
    const pub_key: string | undefined = req.body.pub_key;

    if (!pub_key) {
        res.status(400).send();
        return;
    }

    await Drop.create({ id, pub_key });
    res.send({ id });
}

export async function getDrop (
    req: Request,
    res: Response,
): Promise<void> {
    const id: string = req.params.id;
    const drop: Drop = await Drop.findByPk(id);

    res.send({ pub_key: drop.pub_key })
}