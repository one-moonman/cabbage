import { ObjectType, Field, ID } from "type-graphql";
import FieldError from "./field-error.type";

@ObjectType()
export default class Product {
    @Field(type => ID)
    _id: string;

    @Field()
    name: string;

    @Field()
    slug: string;

    @Field({ nullable: true })
    description: string;

    @Field()
    category: string;

    @Field(type => [String])
    variants: string[];
}

@ObjectType()
export class ProductResponse {
    @Field(() => FieldError, { nullable: true })
    error?: FieldError;

    @Field(() => Product, { nullable: true })
    product?: Product;
}