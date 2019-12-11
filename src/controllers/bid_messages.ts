import { RequestWithUserObject } from '../interfaces';
import { BidMessage } from '../models/bid_message';
import v4 from 'uuid/v4';
import { Bid } from '../models/bid';
import { Post } from '../models/post';

function canReadBidMessage(
    gid_uuid: string,
    bid: Bid,
    post: Post
): void | never {
    if (
        bid.gid_uuid !== gid_uuid &&
        post.gid_uuid !== gid_uuid
    ) {
        throw new Error('ERR_FORBIDDEN');
    }
}

export async function createBidMessage(
    req: RequestWithUserObject,
): Promise<void> {
    const gid_uuid = req.user.user.gid_uuid;
    const message: string = req.body.message;
    const bid_id = req.params.bid_id;

    const bid = await Bid.findByPk(bid_id);
    const post = await Post.findByPk(bid.post_id);

    canReadBidMessage(gid_uuid, bid, post);

    await BidMessage.create({ id: v4(), gid_uuid, message, bid_id })
}

export async function getBidMessagesByBidId(
    req: RequestWithUserObject,
): Promise<BidMessage[]> {
    const gid_uuid = req.user.user.gid_uuid;
    const bid_id = req.params.bid_id;

    const bid = await Bid.findByPk(bid_id);
    const post = await Post.findByPk(bid.post_id);

    canReadBidMessage(gid_uuid, bid, post);

    return BidMessage.findAll({ where: { bid_id }})
}