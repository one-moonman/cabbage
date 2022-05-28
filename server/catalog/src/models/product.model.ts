import mongoose from "mongoose";

export interface IProduct {
    slug: string;
    name: string;
    description: string;
    category: mongoose.Types.ObjectId;
    variants: mongoose.Types.ObjectId[];
}

export const Product = mongoose.model<IProduct>(
    'Product',
    new mongoose.Schema<IProduct>({
        slug: String,
        name: String,
        description: String,
        category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
        variants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Variant' }]
    })
);

