import { ObjectType, Field, ID } from "type-graphql";
import FieldError from "../../common/field-error.type";
import { Response } from "../../common/types";

@ObjectType()
export class CartItem {
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
export class CartItemResponse implements Response {
    @Field(() => FieldError, { nullable: true })
    error?: FieldError;

    @Field(() => CartItem, { nullable: true })
    data?: CartItem;
}