import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import axios from "axios";
import { Context } from "../utils/types";
import CartItem, { CartItemResponse } from "../types/cart-item.type";

import { urls } from "../constants";

@Resolver(returns => CartItem)
export default class CartItemResolver {

    @Mutation(returns => CartItemResponse)
    async addItemToCart(
        @Arg('qty') qty: number = 1,
        @Arg('slug') slug: string,
        @Ctx() { req }: Context
    ) {
        try {
            if (!req.session.total) req.session.total = 0;

            let response = await axios.get(urls.catalog + 'variant/' + slug)
                .catch(error => { throw new Error(error.response.data.message) })
            const variant = response.data;

            if (variant.availability - qty < 0)
                return {
                    error: {
                        field: 'qty',
                        message: 'Variant is not available to purchase at the moment'
                    }
                }

            response = await axios.put(urls.cart + 'cart', {
                qty,
                sid: req.sessionID,
                variant: {
                    _id: variant._id,
                    price: variant.price
                }
            }).catch(error => { throw new Error(error.response.data.message) })
            const item = response.data;

            req.session.total += item.total;
            return { item };

        } catch (error) {
            return {
                error: {
                    field: 'slug',
                    message: error.message
                }
            }
        }
    }


    @Mutation(returns => CartItemResponse)
    async removeItemFromCart(
        @Arg('qty') qty: number = 1,
        @Arg('slug') slug: string,
        @Ctx() { req }: Context
    ) {
        try {
            if (!req.session.total || req.session.total === 0)
                return {
                    error: {
                        field: 'qty',
                        message: 'Cart already empty'
                    }
                }

            let response = await axios.get(urls.catalog + 'variant/' + slug)
                .catch(error => { throw new Error(error.response.data.message) })
            const variant = response.data;

            if (variant.availability + qty > variant.stock)
                return {
                    error: {
                        field: 'qty',
                        message: 'Quantity to remove is too much'
                    }
                }

            response = await axios.patch(urls.cart + 'cart', {
                qty,
                sid: req.sessionID,
                variant: {
                    _id: variant._id,
                    price: variant.price
                }
            }).catch(error => { throw new Error(error.response.data.message) })
            const item = response.data;

            req.session.total -= item.total;
            return { item };

        } catch (error) {
            return {
                error: {
                    field: 'slug',
                    message: error.message
                }
            }
        }
    }

    @Mutation(returns => [CartItem])
    async purgeItemsFromCart(
        @Ctx() { req }: Context
    ) {
        const response = await axios.delete(urls.cart + 'cart/' + req.sessionID)
            .catch(error => { throw new Error(error.response.data.message) })
        req.session.total = 0;
        return response.data;
    }
}