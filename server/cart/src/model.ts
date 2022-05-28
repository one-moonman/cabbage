import mongoose from "mongoose";

export interface ICartItem {
    sid: string,                                    // redis session_id
    product_variant: mongoose.Types.ObjectId,
    total: number,
    quantity: number
}

export const CartItem = mongoose.model<ICartItem>(
    'Cart-items',
    new mongoose.Schema<ICartItem>({
        sid: {
            type: String,
            required: true
        },
        product_variant: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Variants'
        },
        total: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    })
);
