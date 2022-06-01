import { ObjectType, Field, ID } from "type-graphql";
import CartItem from "./cart-item.type";
import FieldError from "./field-error.type";

@ObjectType()
export default class Cart {
    @Field()
    sid: string;

    @Field()
    total: number;

    @Field(type => [CartItem])
    items: CartItem[];
}

@ObjectType()
export class CartResponse {
    @Field(() => FieldError, { nullable: true })
    error?: FieldError;

    @Field(() => Cart, { nullable: true })
    cart?: Cart;
}
