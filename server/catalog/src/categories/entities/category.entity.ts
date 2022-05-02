import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document, Types, Model } from 'mongoose';
import { Product } from 'src/products/entities/product.entity';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    slug: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }] })
    products: Product[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
export type CategoryModel = Model<CategoryDocument>;