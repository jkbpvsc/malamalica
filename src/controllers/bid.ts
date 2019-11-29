import { Request } from 'express';
import { Bid } from "../models/bid";

export async function getBids(
    _: Request,
): Promise<Bid[]> {
    return Bid.findAll({ limit: 100 })
}

export async function getBidById(
    req: Request,
): Promise<Bid> {
    return Bid.findByPk(req.params.id);
}