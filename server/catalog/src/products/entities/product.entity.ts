import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Model } from 'mongoose';
import { Category } from 'src/categories/entities/category.entity';
import { Variant } from 'src/variants/entities/variant.entity';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    slug: string;

    @Prop({ required: false })
    price: number;

    @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
    category: Category;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Variant' }] })
    variants: Variant[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
export type ProductModel = Model<ProductDocument>;