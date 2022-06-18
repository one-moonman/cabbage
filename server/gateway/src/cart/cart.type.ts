import { ObjectType, Field } from "type-graphql";
import { CartItem } from "./cart-item/cart-item.type";
import FieldError from "../common/field-error.type";
import { Response } from "../common/types";

@ObjectType()
export class Cart {
    @Field()
    sid: string;

    @Field()
    total: number;

    @Field(type => [CartItem])
    items: CartItem[];
}

@ObjectType()
export class CartResponse implements Response {
    @Field(() => FieldError, { nullable: true })
    error?: FieldError;

    @Field(() => Cart, { nullable: true })
    data?: Cart;
}
