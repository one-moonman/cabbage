import { Request, Response } from 'express';
import { NotFound, Gone } from 'http-errors';
import { CartItem } from '../model';

interface ReqBody {
    qty: number;
    sid: string;
    variant: {
        _id: string,
        price: number
    }
}

export default {
    // PUT -> /
    addItemToCart: async (req: Request, res: Response) => {
        const { sid, qty, variant }: ReqBody = req.body;
        let item = await CartItem.findOne({ sid, product_variant: variant._id }).exec();
        if (!item) item = await CartItem.create({
            sid,
            product_variant: variant._id,
            total: qty * variant.price,
            quantity: qty
        });
        else item = await CartItem.findByIdAndUpdate(item._id, {
            total: item.total + qty * variant.price,
            quantity: item.quantity + qty
        }).exec();
        return res.status(200).json(item);
    },

    // PATCH -> /
    removeItemFromCart: async (req: Request, res: Response) => {
        const { qty, sid, variant }: ReqBody = req.body;
        let item = await CartItem.findOne({ sid, product_variant: variant._id }).exec();
        if (!item) throw new NotFound();
        if (item.quantity - qty === 0) {
            await item.remove();
            return res.status(200).json(item);
        }
        item = await CartItem.findByIdAndUpdate(item._id, {
            total: item.total - qty * variant.price,
            quantity: item.quantity - qty
        }).exec();
        return res.status(200).json(item);
    },

    // DELETE -> /:sid
    purgeItemsFromCart: async (req: Request, res: Response) => {
        const { sid } = req.params;
        const items = await CartItem.deleteMany({ sid }).exec();
        return res.status(200).json(items);
    }
}
