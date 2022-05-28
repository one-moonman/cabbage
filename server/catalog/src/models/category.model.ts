import mongoose from "mongoose";

export interface ICategory {
    slug: string;
    name: string;
    description: string;
    products: mongoose.Types.ObjectId[];
}

export const Category = mongoose.model<ICategory>(
    'Category',
    new mongoose.Schema<ICategory>({
        slug: String,
        name: String,
        description: String,
        products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
    })
);

