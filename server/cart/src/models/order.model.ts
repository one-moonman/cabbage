import mongoose from "mongoose";
import { CartItem, CartItemSchema, ICartItem } from "./cart-item.model";

export interface IOrder {
    sid: string,                                // redis session id            
    total: number,                              // total price
    items: ICartItem[]
}

export const Order = mongoose.model<IOrder>(
    'Orders',
    new mongoose.Schema<IOrder>({
        sid: {
            type: String,
            required: true
        },
        total: {
            type: Number,
            required: true
        },
        items: [{
            type: CartItemSchema,
            required: true
        }]
    })
);
