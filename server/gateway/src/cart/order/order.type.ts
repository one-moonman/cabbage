import { ObjectType, Field, ID } from "type-graphql";
import { CartItem } from "../cart-item/cart-item.type";
import FieldError from "../../common/field-error.type";
import { Response } from "../../common/types";

@ObjectType()
export class Order {
    @Field()
    sid: string;

    @Field()
    total: number;

    @Field(type => [CartItem])
    items: CartItem[];

    @Field(type => ID)
    _id: string;
}

@ObjectType()
export class OrderResponse implements Response {
    @Field(() => FieldError, { nullable: true })
    error?: FieldError;

    @Field(() => Order, { nullable: true })
    data?: Order;
}

