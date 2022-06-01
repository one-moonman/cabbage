import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import axios from "axios";
import { urls } from "../constants";
import { Context } from "../utils/types";
import { CartItemResponse } from "../types/cart-item.type";
import Cart, { CartResponse } from "../types/cart.type";
import { OrderResponse } from "../types/order.type";


@Resolver()
export default class CartResolver {

    @Query(returns => Cart)
    async getCart(@Ctx() { req }: Context) {
        if (!req.session.total) req.session.total = 0;
        const response = await axios.get(urls.cart + 'cart-items?sid=' + req.sessionID)
            .catch(error => { throw new Error(error.response.data.message) });
        return {
            sid: req.sessionID,
            total: req.session.total,
            items: response.data
        }
    }

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
            response = await axios.get(urls.cart + 'cart-items/getTaken/' + variant._id)
                .catch(error => { throw new Error(error.response.data.message) });
            const availability = variant.stock - variant.committed - response.data;
            if (availability - qty < 0)
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
            req.session.total += variant.price * qty;
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
            req.session.total -= variant.price * qty;
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

    @Mutation(returns => Boolean)
    async purgeItemsFromCart(
        @Ctx() { req }: Context
    ) {
        await axios.delete(urls.cart + 'cart/' + req.sessionID)
            .catch(error => { throw new Error(error.response.data.message) })
        req.session.total = 0;
        return true;
    }

    // it is supposed to be order
    @Mutation(returns => OrderResponse)
    async saveOrder(@Ctx() { req }: Context) {
        if (!req.session.total || req.session.total === 0)
            return {
                error: {
                    field: 'total',
                    message: 'Empty cart cannot be saved'
                }
            }
        try {
            // get cart items
            let response = await axios.get(urls.cart + 'cart-items?sid=' + req.sessionID)
                .catch(error => { throw new Error(error.response.data.message) });
            const items = response.data;

            // create order
            response = await axios.post(urls.order, {
                sid: req.sessionID,
                total: req.session.total,
                items
            }).catch(error => { throw new Error(error.response.data.message) });

            // update commited
            for await (const item of items) {
                axios.patch(urls.catalog + 'variant/' + item.product_variant + '?qty=' + item.quantity);
            }

            // delete cart-items
            await axios.delete(urls.cart + 'cart/' + req.sessionID)
                .catch(error => { throw new Error(error.response.data.message) })
            req.session.destroy(err => {
                if (err) throw new Error(err);
            })
            return { order: response.data }
        } catch (error) {
            return {
                error: {
                    field: '...',
                    message: error.message
                }
            }
        }

    }
}