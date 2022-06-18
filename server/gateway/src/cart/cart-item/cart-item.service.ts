import axios from "axios";
import { urls } from "../../common/constants";
import { SessionType } from "../../common/types";
import { createFieldError, roundPrice } from "../../common/utils";

export default class CartItemService {
    private readonly URL = urls.cart + 'cart-items';

    public async getItems(session: SessionType) {
        const { data } = await axios.get(this.URL + '?sid=' + session.id)
            .catch(err => { throw new Error(err.message) })
        return data;
    }

    public async removeItem(id: string) {
        const { data } = await axios.delete(this.URL + id)
            .catch(err => { throw new Error(err.message) })
        return data;
    }

    public async increaseQuantity(id: string, qty: number, session: SessionType) {
        try {
            const { data } = await axios.put(this.URL + id + '?qty=' + qty)
            const price = data.total / data.qty;
            session.total += roundPrice(price * qty);
            return { data };
        } catch (error) {
            return createFieldError('id', error.message)
        }
    }

    public async decreaseQuantity(id: string, qty: number, session: SessionType) {
        try {
            const { data } = await axios.patch(this.URL + id + '?qty=' + qty);
            const price = data.total / data.qty;
            session.total -= roundPrice(price * qty);
            return { data };
        } catch (error) {
            return createFieldError('id', error.message)
        }
    }
}