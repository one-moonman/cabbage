import axios from "axios";
import { urls } from "../../common/constants";
import { SessionType } from "../../common/types";
import { createFieldError } from "../../common/utils";

export default class OrderService {
    public async saveOrder(session: SessionType) {
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