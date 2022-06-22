import { Request, Response } from 'express';
import { NotFound } from 'http-errors';
import { CartItem } from '../models/cart-item.model';

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
        const qty = +(req.query.qty);
        let item = await CartItem.findById(req.params.id).exec();
        if (!item) throw new NotFound();
        const variantPrice = item.total / qty;
        item.total += Math.round(qty * variantPrice * 100) / 100;
        item.quantity += qty;
        await item.save();
        return res.status(200).json(item);
    },

    // PATCH -> /
    decreaseQuantity: async (req: Request, res: Response) => {
        const qty = +(req.query.qty);
        let item = await CartItem.findById(req.params.id).exec();
        if (!item) throw new NotFound();
        const variantPrice = item.total / qty;
        item.total -= Math.round(qty * variantPrice * 100) / 100;
        item.quantity -= qty;
        await item.save();
        return res.status(200).json(item);
    },

    // DELETE -> /:id
    remove: async (req: Request, res: Response) => {
        const item = await CartItem.findByIdAndRemove(req.params.id).exec();
        return res.status(200).json(item);
    }
}
