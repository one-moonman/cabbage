import { Request, Response } from "express";
import { Order } from "../models/order.model";

export default {
    saveOrder: async (req: Request, res: Response) => {
        const order = new Order(req.body);
        await order.save();
        return res.status(200).json(order);
    }
}