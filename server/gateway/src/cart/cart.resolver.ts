import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "../common/types";
import { CartItemResponse } from "./cart-item/cart-item.type";
import { Cart } from "./cart.type";
import CartService from "./cart.service";

@Resolver()
export default class CartResolver {
    private readonly cartService: CartService = new CartService;

    @Query(() => Cart)
    async getCart(@Ctx() { session }: Context) {
        return this.cartService.getCart(session);
    }

    @Mutation(() => CartItemResponse)
    async addItemToCart(
        @Arg('qty') qty: number = 1,
        @Arg('slug') slug: string,
        @Ctx() { session }: Context
    ) {
        return this.cartService.addItemToCart(session, slug, qty);
    }

    @Mutation(() => CartItemResponse)
    async removeItemFromCart(
        @Arg('qty') qty: number = 1,
        @Arg('slug') slug: string,
        @Ctx() { session }: Context
    ) {
        return this.cartService.removeItemFromCart(session, slug, qty);
    }

    @Mutation(() => Boolean)
    async purgeItemsFromCart(@Ctx() { session }: Context) {
        return this.cartService.purgeItems(session);
    }
}