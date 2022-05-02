import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Model } from 'mongoose';
import { Category } from 'src/categories/entities/category.entity';
import { Product } from 'src/products/entities/product.entity';

export type VariantDocument = Variant & Document;

@Schema()
export class Variant {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    slug: string;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    stock: number;

    @Prop({ required: true })
    commited: number;

    @Prop({ required: true })
    availability: number;

    // @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
    // category: Category;

    @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
    product: Product;
}

export const VariantSchema = SchemaFactory.createForClass(Variant);
export type VariantModel = Model<VariantDocument>;