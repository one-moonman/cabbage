import mongoose from "mongoose";

export interface ICartItem {
    sid: string,                                // redis session id            
    product_variant: mongoose.Types.ObjectId,   // product variant id   
    total: number,                              // total price
    quantity: number                            // total quantity
}

export const CartItemSchema = new mongoose.Schema<ICartItem>({
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

export const CartItem = mongoose.model<ICartItem>('Cart-items', CartItemSchema);
