import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { CartItem, CartItemResponse } from "../types/cart-item.type";
import CartItemService from "../services/cart-item.service";
import { Context } from "../common/types";

@Resolver(() => CartItem)
export default class CartItemResolver {

    @Query(() => [CartItem])
    async getItems(@Ctx() { session }: Context) {
        return CartItemService.getItems(session);
    }

    @Mutation(() => CartItem)
    async removeItem(@Arg('id') id: string) {
        return CartItemService.removeItem(id);
    }

    @Mutation(() => CartItemResponse)
    async increaseItemQuantity(
        @Arg('id') id: string,
        @Arg('id') qty: number = 1,
        @Ctx() { session }: Context
    ) {
        return CartItemService.increaseQuantity(id, qty, session);
    }

    @Mutation(() => CartItemResponse)
    async decreaseItemQuantity(
        @Arg('id') id: string,
        @Arg('id') qty: number = 1,
        @Ctx() { session }: Context
    ) {
        return CartItemService.decreaseQuantity(id, qty, session);
    }
}