import { CartItem } from '../model';
import createError from 'http-errors';

export interface ReqBody {
    qty: number;
    sid: string;
    variant: {
        _id: string,
        price: number
    }
}

export default class CartService {
    public static async addItem({ qty, sid, variant }: ReqBody) {
        const item = await CartItem.findOne({
            sid,
            product_variant_id: variant._id
        }).exec();

        if (!item)
            return CartItem.create({
                sid,
                product_variant_id: variant._id,
                total: qty * variant.price,
                quantity: qty
            })

        return CartItem.findByIdAndUpdate(item._id, {
            total: item.total + qty * variant.price,
            quantity: item.quantity + qty
        }).exec();
    }

    public static async removeItem({ qty, sid, variant }: ReqBody) {
        let items = await CartItem.find({ sid }).exec();
        const item = items.find(i => i.product_variant_id.toString() === variant._id)
        if (!item) return null;

        if (
            items.length === 1 &&
            items[0]._id === item._id &&
            item.quantity === 1
        ) throw new createError.Gone();

        if (item.quantity - qty === 0)
            return item.remove();

        return CartItem.findByIdAndUpdate(item._id, {
            total: item.total - qty * variant.price,
            quantity: item.quantity - qty
        }).exec();
    }

    public static async purgeItems(sid: string) {
        return CartItem.deleteMany({ sid }).exec();
    }
}