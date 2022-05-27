import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export default class Category {
    @Field(type => ID)
    _id: string;

    @Field()
    name: string;

    @Field()
    slug: string;

    @Field(type => [String])
    products: string[];
}