import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export default class Variant {
    @Field(type => ID)
    _id: string;

    @Field()
    name: string;

    @Field()
    slug: string;

    @Field()
    category: string;

    @Field()
    product: string;

    @Field()
    stock: number;

    @Field()
    availability: number;

    @Field({ nullable: true })
    commited: number;

    @Field()
    price: number;
}