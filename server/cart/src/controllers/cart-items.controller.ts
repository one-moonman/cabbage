import { Request, Response } from 'express';
import { NotFound } from 'http-errors';
import CartItemService from '../services/cart-items.service';

export default class CartItemController {
    // GET -> /?sid=
    public static async getItems(req: Request, res: Response) {
        const sid = `${req.query.sid}`;
        let items = [];
        if (sid) items = await CartItemService.findByCart(sid);
        else items = await CartItemService.findAll();
        return res.status(200).json(items);
    }

    // PUT -> /
    public static async increaseQuantity(req: Request, res: Response) {
        const item = await CartItemService.increaseQuantity(req.body);
        if (!item) throw new NotFound();
        return res.status(200).json(item);
    }

    // PATCH -> /
    public static async decreaseQuantity(req: Request, res: Response) {
        const item = await CartItemService.decreaseQuantity(req.body);
        if (!item) throw new NotFound();
        return res.status(200).json(item);
    }

    // DELETE -> /:id
    public static async remove(req: Request, res: Response) {
        const item = await CartItemService.remove(req.params.id);
        if (!item) throw new NotFound();
        return res.status(200).json(item);
    }

    //TODO: change to separate router
    // GET -> /taken/:variant_id
    public static async calculateTaken(req: Request, res: Response) {
        const variant_id = req.params.variant_id;
        const taken = await CartItemService.getTakenQuantity(variant_id);
        return res.status(200).json(taken);
    }
}
