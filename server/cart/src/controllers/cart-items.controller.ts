import { Request, Response } from 'express';
import { NotFound } from 'http-errors';
import { CartItem } from '../model';

interface ReqBody {
    item_id: string,
    qty: number,
    variant_price: number
}

export default {
    // GET -> /?sid=
    getItems: async (req: Request, res: Response) => {
        const sid = req.query.sid as string;
        let items = [];
        if (sid) items = await CartItem.find({ sid }).exec();
        else items = await CartItem.find({}).exec();
        return res.status(200).json(items);
    },

    // PUT -> /
    increaseQuantity: async (req: Request, res: Response) => {
        const { item_id, variant_price, qty }: ReqBody = req.body;
        let item = await CartItem.findById(item_id).exec();
        if (!item) throw new NotFound();
        item.total += qty * variant_price;
        item.quantity += qty;
        await item.save();
        return res.status(200).json(item);
    },

    // PATCH -> /
    decreaseQuantity: async (req: Request, res: Response) => {
        const { item_id, variant_price, qty }: ReqBody = req.body;
        let item = await CartItem.findById(item_id).exec();
        if (!item) throw new NotFound();
        item.total -= qty * variant_price;
        item.quantity -= qty;
        await item.save();
        return res.status(200).json(item);
    },

    // DELETE -> /:id
    remove: async (req: Request, res: Response) => {
        const item = await CartItem.findByIdAndRemove(req.params.id).exec();
        return res.status(200).json(item);
    },

    //TODO: change to separate router
    // GET -> /taken/:id
    calculateTaken: async (req: Request, res: Response) => {
        const { id } = req.params;
        let taken = 0;
        const all = await CartItem.find({ product_variant: id }).exec();
        all.forEach(item => taken += item.quantity)
        return res.status(200).json(taken);
    }
}
