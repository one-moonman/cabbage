import { Arg, Query, Resolver } from 'type-graphql';
import axios from 'axios';
import Product, { ProductResponse } from '../types/product.type';
import { urls } from '../constants';
const URL = urls.catalog + 'product';

@Resolver(Product)
export default class ProductResolver {
    @Query(returns => [Product])
    async getAllProducts() {
        const response = await axios.get(URL)
            .catch(error => { throw new Error(error.response.data.message) });
        return response.data;
    }

    @Query(returns => ProductResponse)
    async getProductBySlug(@Arg('slug') slug: string) {
        try {
            const response = await axios.get(URL + '/' + slug)
                .catch(error => { throw new Error(error.response.data.message) });
            return { product: response.data };
        } catch (error) {
            return {
                error: {
                    field: 'slug',
                    message: error.message
                }
            }
        }
    }
}
