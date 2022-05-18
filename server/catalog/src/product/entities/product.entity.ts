import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types, Model } from 'mongoose';
import { Category } from 'src/category/entities/category.entity';
import { Variant } from 'src/variant/entities/variant.entity';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
    @ApiProperty()
    @Prop({ required: true, unique: true })
    name: string;

    @ApiProperty()
    @Prop({ required: true, unique: true })
    slug: string;

    @ApiProperty({ type: String, description: 'id for many-to-one ref' })
    @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
    category: Category;

    @ApiProperty({ type: [String], description: 'ids for one-to-many refs' })
    @Prop({ type: [{ type: Types.ObjectId, ref: 'Variant' }] })
    variants: Variant[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
export type ProductModel = Model<ProductDocument>;

