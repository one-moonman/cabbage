import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "../common/types";
import { CartItemResponse } from "../types/cart-item.type";
import { Cart } from "../types/cart.type";
import { OrderResponse } from "../types/order.type";
import CartService from "../services/cart.service";


@Resolver()
export default class CartResolver {

    @Query(() => Cart)
    async getCart(@Ctx() { session }: Context) {
        return CartService.getCart(session);
    }

    @Mutation(() => CartItemResponse)
    async addItemToCart(
        @Arg('qty') qty: number = 1,
        @Arg('slug') slug: string,
        @Ctx() { session }: Context
    ) {
        return CartService.addItemToCart(session, slug, qty);
    }

    @Mutation(() => CartItemResponse)
    async removeItemFromCart(
        @Arg('qty') qty: number = 1,
        @Arg('slug') slug: string,
        @Ctx() { session }: Context
    ) {
        return CartService.removeItemFromCart(session, slug, qty);
    }

    @Mutation(() => Boolean)
    async purgeItemsFromCart(@Ctx() { session }: Context) {
        return CartService.purgeItems(session);
    }

    @Mutation(() => OrderResponse)
    async saveOrder(@Ctx() { session }: Context) {
        return CartService.saveOrder(session);
    }
}