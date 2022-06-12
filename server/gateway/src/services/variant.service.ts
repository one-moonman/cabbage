import { Variant } from "../types/variant.type";
import { urls } from "../common/constants";
import { createFieldError } from "../common/utils";
import axios from "axios";
import CatalogService from "../common/catalog.service";

export default class VariantService extends CatalogService {
    protected static readonly URL: string = urls.catalog + 'variant';

    public static async resolveAvailability(variant: Variant) {
        try {
            let response = await axios.get(urls.cart + 'cart-items/getTaken/' + variant._id)
            const qty = variant.stock - variant.committed - response.data;
            response = await axios.put(this.URL + '/' + variant.slug + '?qty=' + qty)
            return response.data.availability;
        } catch (error) {
            return createFieldError('slug', error.message);
        }
    }
}