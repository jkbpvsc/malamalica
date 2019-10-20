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
  const pubkey: string = req.body.pubkey;
  const nonce: string = req.body.nonce;

  await Drop.create(
    {
      id,
      pubkey,
      nonce
    }
  );

  res.send(
    {
      id
    }
  );
}

export async function getDropData(
  req: Request,
  res: Response,
): Promise<void> {
  const id: string = req.params.id;
  const drop: Drop = await Drop.findByPk(id);
  const nonce: string = req.params.nonce;

  if (nonce !== drop.nonce) {
    res.status(403).send();
    return;
  }

  res.send(
    {
      encrypted_data: drop.encrypted_data
    }
  );
}

export async function uploadDropData(
  req: Request,
  res: Response,
): Promise<void> {
  const id: string = req.params.id;
  const encryptedData: string = req.body.encrypted_data;

  const drop = await Drop.findByPk(id);
  await drop.update({ encrypted_data: encryptedData });

  Drop.update(
    { encrypted_data: encryptedData },
    { where: { id } },
  )

  res.status(201).send()
}
