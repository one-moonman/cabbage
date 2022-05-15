import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Model } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/products/entities/product.entity';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
    @ApiProperty()
    @Prop({ required: true, unique: true })
    name: string;

    @ApiProperty()
    @Prop({ required: true, unique: true })
    slug: string;

    @ApiProperty({ type: [String], description: 'ids for one-to-many refs' })
    @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }] })
    products: Product[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
export type CategoryModel = Model<CategoryDocument>;

