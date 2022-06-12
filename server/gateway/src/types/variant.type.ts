import { ObjectType, Field, ID } from "type-graphql";
import FieldError from "./field-error.type";

@ObjectType()
export class Variant {
    @Field(type => ID)
    _id: string;

    @Field()
    slug: string;

    @Field()
    name: string;

    @Field({ nullable: true })
    description: string;

    @Field()
    option_name: string;

    @Field()
    stock: number;

    @Field({ defaultValue: 0 })
    committed: number;

    @Field()
    availability: number;

    @Field()
    product: string;
}

@ObjectType()
export class VariantResponse {
    @Field(() => FieldError, { nullable: true })
    error?: FieldError;

    @Field(() => Variant, { nullable: true })
    data?: Variant;
}