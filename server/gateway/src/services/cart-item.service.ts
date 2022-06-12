import axios from "axios";
import { urls } from "../common/constants";
import { SessionType } from "../common/types";
import { createFieldError, roundPrice } from "../common/utils";

export default class CartItemService {
    protected static readonly URL = urls.cart + 'cart-items';

    public static async getItems(session: SessionType) {
        try {
            const { data } = await axios.get(URL + '?sid=' + session.id)
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    public static async removeItem(id: string) {
        try {
            const { data } = await axios.delete(URL + id);
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    public static async increaseQuantity(id: string, qty: number, session: SessionType) {
        try {
            const { data } = await axios.put(URL + id + '?qty=' + qty);
            const price = data.total / data.qty;
            session.total += roundPrice(price * qty);
            return { data };
        } catch (error) {
            return createFieldError('id', error.message)
        }
    }

    public static async decreaseQuantity(id: string, qty: number, session: SessionType) {
        try {
            const { data } = await axios.patch(URL + id + '?qty=' + qty);
            const price = data.total / data.qty;
            session.total -= roundPrice(price * qty);
            return { data };
        } catch (error) {
            return createFieldError('id', error.message)
        }
    }
}