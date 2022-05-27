import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export default class CartItem {
    @Field(type => ID)
    _id: string;

    @Field()
    product_variant_id: string;

    @Field()
    quantity: number;

    @Field()
    total: number;

    @Field()
    sid: string;
}