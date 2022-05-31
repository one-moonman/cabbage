import mongoose from "mongoose";

export interface IVariant {
    slug: string;
    name: string;
    description: string;
    option_name: string;

    stock: number;
    committed: number;
    availability: number;

    product: mongoose.Types.ObjectId;
}

export const Variant = mongoose.model<IVariant>(
    'Variant',
    new mongoose.Schema<IVariant>({
        slug: String,
        name: String,
        description: String,
        option_name: String,
        stock: Number,
        committed: Number,
        availability: Number,
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    })
);
