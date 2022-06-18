import axios from "axios";
import { urls } from "../common/constants";
import { SessionType } from "../common/types";
import { createFieldError, roundPrice } from "../common/utils";

export default class CartService {
    public async getCart(session: SessionType) {
        if (!session.total) session.total = 0;
        const { data } = await axios.get(urls.cart + 'cart-items?sid=' + session.id)
            .catch(err => { throw new Error(err.message) });
        return {
            sid: session.id,
            total: session.total,
            items: data
        }
    }

    public async addItemToCart(session: SessionType, slug: string, qty: number) {
        try {
            if (!session.total) session.total = 0;
            // get the variant by slug
            let response = await axios.get(urls.catalog + 'variant/' + slug)
            const variant = response.data;

            // get the available quantity
            response = await axios.get(urls.cart + 'cart-items/getTaken/' + variant._id);
            const availability = variant.stock - variant.committed - response.data;
            if (availability - qty < 0)
                return createFieldError('qty', 'Variant is not available to purchase at the moment')

            // add variant as item to cart
            const { data } = await axios.put(urls.cart + 'cart', {
                qty,
                sid: session.id,
                variant: {
                    _id: variant._id,
                    price: variant.price
                }
            })

            session.total += roundPrice(variant.price * qty);
            return { data };
        } catch (error) {
            return createFieldError('slug', error.message)
        }
    }

    public async removeItemFromCart(session: SessionType, slug: string, qty: number) {
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

    public async purgeItems(session: SessionType) {
        await axios.delete(urls.cart + 'cart/' + session.id)
            .catch(err => { throw new Error(err.message) });
        session.total = 0;
        return true;
    }
}