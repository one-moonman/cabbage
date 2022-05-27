import { CartItem } from '../model';

interface ReqBody {
    item_id: string,
    qty: number,
    variant_price: number
}

export default class CartItemService {
    public static async findAll() {
        return CartItem.find({}).exec();
    }

    public static async findByCart(sid: string) {
        return CartItem.find({ sid }).exec();
    }

    public static async remove(id: string) {
        return CartItem.findByIdAndRemove(id).exec();
    }

    public static async increaseQuantity({ item_id, variant_price, qty }: ReqBody) {
        const item = await CartItem.findById(item_id).exec();
        return CartItem.findByIdAndUpdate(item_id, {
            total: item.total + qty * variant_price,
            quantity: item.quantity + qty
        }).exec();
    }

    public static async decreaseQuantity({ item_id, variant_price, qty }: ReqBody) {
        const item = await CartItem.findById(item_id).exec();
        return CartItem.findByIdAndUpdate(item_id, {
            total: item.total - qty * variant_price,
            quantity: item.quantity - qty
        }).exec();
    }

    // TODO: move to separate service
    public static async getTakenQuantity(variantId: string) {
        let taken = 0;
        const all = await CartItem.find({
            product_variant_id: variantId
        }).exec();
        all.forEach(item => taken += item.quantity);
        return taken;
    }
}