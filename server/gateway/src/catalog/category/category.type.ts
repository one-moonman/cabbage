import { ObjectType, Field, ID } from "type-graphql";
import FieldError from "../../common/field-error.type";
import { Response } from "../../common/types";

@ObjectType()
export class Category {
    @Field(type => ID)
    _id: string;

    @Field()
    name: string;

    @Field()
    slug: string;

    @Field({ nullable: true })
    description: string;

    @Field(type => [String])
    products: string[];
}

@ObjectType()
export class CategoryResponse implements Response {
    @Field(() => FieldError, { nullable: true })
    error?: FieldError;

    @Field(() => Category, { nullable: true })
    data?: Category;
}