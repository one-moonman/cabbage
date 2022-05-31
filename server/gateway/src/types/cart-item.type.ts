import { ObjectType, Field, ID } from "type-graphql";
import FieldError from "./field-error.type";

@ObjectType()
export default class CartItem {
    @Field(type => ID)
    _id: string;

    @Field()
    product_variant: string;

    @Field()
    quantity: number;

    @Field()
    total: number;

    @Field()
    sid: string;
}


@ObjectType()
export class CartItemResponse {
    @Field(() => FieldError, { nullable: true })
    error?: FieldError;

    @Field(() => CartItem, { nullable: true })
    item?: CartItem;
}