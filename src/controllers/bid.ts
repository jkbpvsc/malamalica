import { Request } from 'express';
import { Bid } from "../models/bid";
import {RequestWithUserObject} from "../interfaces";
import v4 from 'uuid/v4';
import {Post} from "../models/post";
import {BidMessage} from "../models/bid_message";

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

export async function createBid(
    req: RequestWithUserObject,
): Promise<Bid> {
    const gid_uuid = req.user.user.gid_uuid;
    const { post_id, message, value } = req.body;

    const post = await Post.findByPk(post_id);
    if (!post) {
        throw Error('ERR_POST_NOT_FOUND');
    }

    return Bid.create({ id: v4(), gid_uuid, post_id, message, value});
}

export async function updateBid(
    req: RequestWithUserObject,
): Promise<Bid[]> {
    const gid_uuid = req.user.user.gid_uuid;
    const id = req.params.id;
    const { message, value } = req.body;

    const bid = await Bid.findByPk(id);
    if (bid.gid_uuid !== gid_uuid) {
        throw new Error('ERR_FORBIDDEN');
    }

    const [ _, bids ] = await Bid.update({ message, value }, { where: { gid_uuid, id }});

    return bids;
}

export async function deleteBid(
    req: RequestWithUserObject,
): Promise<void> {
    const gid_uuid = req.user.user.gid_uuid;
    const id = req.params.id;

    const bid = await Bid.findByPk(id);
    if (bid.gid_uuid !== gid_uuid) {
        throw new Error('ERR_FORBIDDEN');
    }

    await Bid.destroy({ where: { id }})
}

export async function getBidsByPost(
    req: RequestWithUserObject
) {
    const post_id = req.params.post_id;
    const post = await Post.findByPk(post_id);

    if (post.gid_uuid !== req.user.user.gid_uuid) {
        throw new Error('ERR_FORBIDDEN')
    }

    const bids: Bid[] = await Bid.findAll({ where: { post_id }});

    const bidsWithMessageCount = await Promise.all(
        bids.map(
            async (bid: Bid) => ({ ...bid.toJSON(), repliesCount: await BidMessage.count({ where: { bid_id: bid.id } }) })
        )
    );

    return bidsWithMessageCount;
}

export async function getMyBids(
    req: RequestWithUserObject,
) {
    const gid_uuid = req.user.user.gid_uuid;

    const bids: Bid[] = await Bid.findAll({ where: { gid_uuid }});

    const bidsWithMessageCount = await Promise.all(
        bids.map(
            async (bid: Bid) => ({ ...bid.toJSON(), repliesCount: await BidMessage.count({ where: { bid_id: bid.id } }) })
        )
    );

    return bidsWithMessageCount;
}
