import axios from "axios";
import { urls } from "../common/constants";
import { SessionType } from "../common/types";
import { createFieldError, roundPrice } from "../common/utils";

export default class CartService {
    public static async getCart(session: SessionType) {
        try {
            if (!session.total) session.total = 0;
            const { data } = await axios.get(urls.cart + 'cart-items?sid=' + session.id);
            return {
                sid: session.id,
                total: session.total,
                items: data
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    public static async addItemToCart(session: SessionType, slug: string, qty: number) {
        try {
            if (!session.total) session.total = 0;
            let response = await axios.get(urls.catalog + 'variant/' + slug)
            const variant = response.data;
            response = await axios.get(urls.cart + 'cart-items/getTaken/' + variant._id)
            const availability = variant.stock - variant.committed - response.data;
            if (availability - qty < 0)
                return createFieldError('qty', 'Variant is not available to purchase at the moment')
            const { data } = await axios.put(urls.cart + 'cart', {
                qty,
                sid: session.id,
                variant: {
                    _id: variant._id,
                    price: variant.price
                }
            }).catch(error => { throw new Error(error.response.data.message) })
            session.total += roundPrice(variant.price * qty);
            return { data };
        } catch (error) {
            return createFieldError('slug', error.message)
        }
    }


    public static async removeItemFromCart(session: SessionType, slug: string, qty: number) {
        try {
            if (!session.total || session.total === 0)
                return createFieldError('qty', 'Cart already empty')
            let response = await axios.get(urls.catalog + 'variant/' + slug)
            const variant = response.data;
            if (variant.availability + qty > variant.stock)
                return createFieldError('qty', 'Quantity to remove is too much')
            const { data } = await axios.patch(urls.cart + 'cart', {
                qty,
                sid: session.id,
                variant: {
                    _id: variant._id,
                    price: variant.price
                }
            })
            session.total -= roundPrice(variant.price * qty);
            return { data };
        } catch (error) {
            return createFieldError('slug', error.message)
        }
    }

    public static async purgeItems(session: SessionType) {
        try {
            await axios.delete(urls.cart + 'cart/' + session.id)
            session.total = 0;
            return true;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    public static async saveOrder(session: SessionType) {
        if (!session.total || session.total === 0)
            return createFieldError('total', 'Empty cart cannot be saved')

        try {
            // get cart items
            let response = await axios.get(urls.cart + 'cart-items?sid=' + session.id)
            const items = response.data;

            // create order
            const { data } = await axios.post(urls.order, {
                sid: session.id,
                total: session.total,
                items
            })

            // update commited
            for await (const item of items) {
                axios.patch(urls.catalog + 'variant/' + item.product_variant + '?qty=' + item.quantity);
            }

            // delete cart-items
            await axios.delete(urls.cart + 'cart/' + session.id)
            session.destroy(err => { if (err) throw new Error(err); })
            return { data };
        } catch (error) {
            return createFieldError('saveOrder', error.message);
        }

    }
}