import { Request, Response } from "express";
import { Order } from "../models/order.model";
import { CartItem } from "../models/cart-item.model";

export default {
    getAvailability: async (req: Request, res: Response) => {
        let availability = 0;
        const all = await CartItem.find({ product_variant: req.params.id }).exec();
        all.forEach(item => availability += item.quantity)
        return res.status(200).json(availability);
    },
    getCommitted: async (req: Request, res: Response) => {
        let committed = 0;
        const all = await Order.find({}).exec();
        for (const order of all) {
            order.items.forEach(item => item.product_variant.toString() === req.params.id ? committed += item.quantity : null)
        }
        return res.status(200).json(committed);
    }
}