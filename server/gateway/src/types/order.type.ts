import { ObjectType, Field, ID } from "type-graphql";
import CartItem from "./cart-item.type";
import FieldError from "./field-error.type";

@ObjectType()
export default class Order {
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
export class OrderResponse {
    @Field(() => FieldError, { nullable: true })
    error?: FieldError;

    @Field(() => Order, { nullable: true })
    order?: Order;
}

