import { Request, Response } from 'express';
import { NotFound } from 'http-errors';
import CartService from '../services/cart.service';

export default class CartController {
    // PUT -> /
    public static async addItemToCart(req: Request, res: Response) {
        const item = await CartService.addItem(req.body);
        return res.status(200).json(item);
    }

    // PATCH -> /
    public static async removeItemFromCart(req: Request, res: Response) {
        const item = await CartService.removeItem(req.body);
        if (!item) throw new NotFound();
        return res.status(200).json(item);
    }

    // DELETE -> /:sid
    public static async purgeItemsFromCart(req: Request, res: Response) {
        const items = await CartService.purgeItems(req.params.sid);
        return res.status(200).json(items);
    }
}
