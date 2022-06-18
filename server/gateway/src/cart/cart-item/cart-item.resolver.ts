import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { CartItem, CartItemResponse } from "./cart-item.type";
import CartItemService from "./cart-item.service";
import { Context } from "../../common/types";

@Resolver(() => CartItem)
export default class CartItemResolver {
    private readonly cartItemService = new CartItemService();

    @Query(() => [CartItem])
    async getItems(@Ctx() { session }: Context) {
        return this.cartItemService.getItems(session);
    }

    @Mutation(() => CartItem)
    async removeItem(@Arg('id') id: string) {
        return this.cartItemService.removeItem(id);
    }

    @Mutation(() => CartItemResponse)
    async increaseItemQuantity(
        @Arg('id') id: string,
        @Arg('id') qty: number = 1,
        @Ctx() { session }: Context
    ) {
        return this.cartItemService.increaseQuantity(id, qty, session);
    }

    @Mutation(() => CartItemResponse)
    async decreaseItemQuantity(
        @Arg('id') id: string,
        @Arg('id') qty: number = 1,
        @Ctx() { session }: Context
    ) {
        return this.cartItemService.decreaseQuantity(id, qty, session);
    }
}