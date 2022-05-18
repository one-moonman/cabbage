import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types, Model } from 'mongoose';
import { Category } from 'src/category/entities/category.entity';
import { Product } from 'src/product/entities/product.entity';

export type VariantDocument = Variant & Document;

@Schema()
export class Variant {
    @ApiProperty()
    @Prop({ required: true, unique: true })
    name: string;

    @ApiProperty()
    @Prop({ required: true, unique: true })
    slug: string;

    @ApiProperty()
    @Prop({ required: true })
    price: number;

    @ApiProperty()
    @Prop({ required: true })
    stock: number;

    @ApiProperty()
    @Prop({ required: true })
    committed: number;

    @ApiProperty()
    @Prop({ required: true })
    availability: number;

    @ApiProperty({ type: String, description: 'id for many-to-one ref' })
    @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
    product: Product;

    @ApiProperty({ type: String, description: 'id for many-to-one ref' })
    @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
    category: Category;
}

export const VariantSchema = SchemaFactory.createForClass(Variant);
export type VariantModel = Model<VariantDocument>;
