import mongoose from "mongoose";

export interface ICartItem {
    sid: string,                                    // redis session_id
    product_variant_id: mongoose.Types.ObjectId,
    total: number,
    quantity: number
}

export const CartItem = mongoose.model<ICartItem>(
    'Cart-items',
    new mongoose.Schema<ICartItem>({
        sid: { required: true, type: String },
        product_variant_id: { required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Variants' },
        total: { required: true, type: Number },
        quantity: { required: true, type: Number }
    })
);

