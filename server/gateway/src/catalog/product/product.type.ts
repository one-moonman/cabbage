import { ObjectType, Field, ID } from "type-graphql";
import FieldError from "../../common/field-error.type";
import { Response } from "../../common/types";

@ObjectType()
export class Product {
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
export class ProductResponse implements Response {
    @Field(() => FieldError, { nullable: true })
    error?: FieldError;

    @Field(() => Product, { nullable: true })
    data?: Product;
}