import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { get, put } from "../utils/request-handlers";
import { MyContext } from "../utils/types";
import CartItem from "../types/cart-item.type";

import constants from "../constants";
const { catalog, cart } = constants;

@Resolver(returns => CartItem)
export default class CartItemResolver {
    @Mutation(returns => CartItem)
    async addItemToCart(
        @Arg('qty') qty: number = 1,
        @Arg('slug') slug: string,
        @Ctx() { req }: MyContext
    ) {
        if (!req.session.total) req.session.total = 0
        const variant = await get(catalog + 'variants/' + slug);
        const item = await put(cart + 'cart', {
            qty,
            sid: req.sessionID,
            variant: {
                _id: variant._id,
                price: variant.price
            }
        })
        req.session.total += item.total
        return item;
    }
}