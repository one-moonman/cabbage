import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export default class Product {
    @Field(type => ID)
    _id: string;

    @Field()
    name: string;

    @Field()
    slug: string;

    @Field()
    category: string;

    @Field(type => [String])
    variants: string[];
}