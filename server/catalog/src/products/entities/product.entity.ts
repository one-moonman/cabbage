import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types, Model } from 'mongoose';
import { Category } from 'src/categories/entities/category.entity';
import { Variant } from 'src/variants/entities/variant.entity';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
    @ApiProperty()
    @Prop({ required: true })
    name: string;

    @ApiProperty()
    @Prop({ required: true })
    slug: string;

    @ApiProperty()
    @Prop({ required: false })
    price: number;

    @ApiProperty({ type: String, description: 'id for many-to-one ref' })
    @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
    category: Category;

    @ApiProperty({ type: [String], description: 'ids for one-to-many refs' })
    @Prop({ type: [{ type: Types.ObjectId, ref: 'Variant' }] })
    variants: Variant[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
export type ProductModel = Model<ProductDocument>;

