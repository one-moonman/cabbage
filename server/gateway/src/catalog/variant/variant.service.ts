import { Variant } from "./variant.type";
import { urls } from "../../common/constants";
import { createFieldError } from "../../common/utils";
import axios from "axios";
import CatalogBaseService from "../catalog.service";

export default class VariantService extends CatalogBaseService {
    constructor(URL: string) { super(URL) }

    public async resolveAvailability(variant: Variant) {
        try {
            let response = await axios.get(urls.cart + 'cart-items/getTaken/' + variant._id)
            console.log(response.data)
            const qty = variant.stock - variant.committed - response.data;
            response = await axios.put(this.URL + '/' + variant.slug + '?qty=' + qty)
            console.log(response.data.availability)
            return response.data.availability;
        } catch (error) {
            return createFieldError('slug', error.message);
        }
    }
}