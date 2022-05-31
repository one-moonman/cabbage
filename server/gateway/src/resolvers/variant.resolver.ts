import { Arg, FieldResolver, Query, Resolver, Root } from 'type-graphql';
import Variant, { VariantResponse } from '../types/variant.type';
import { urls } from '../constants';
import axios from 'axios';
const URL = urls.catalog + 'variant';

@Resolver(Variant)
export default class VariantResolver {
    @Query(returns => [Variant])
    async getAllVariants() {
        const response = await axios.get(URL)
            .catch(error => { throw new Error(error.response.data.message) });
        return response.data;
    }


    @FieldResolver()
    async availability(@Root() variant: Variant) {
        try {
            let response = await axios.get(urls.cart + 'cart-items/getTaken/' + variant._id)
                .catch(error => { throw new Error(error.response.data.message) });
            const qty = variant.stock - response.data;
            response = await axios.put(URL + '/' + variant.slug + '?qty=' + qty)
                .catch(error => { throw new Error(error.response.data.message) });
            return response.data.availability;
        } catch (error) {
            return {
                error: {
                    field: 'slug',
                    message: error.message
                }
            }
        }
    }

    @Query(returns => VariantResponse)
    async getVariantBySlug(@Arg('slug') slug: string) {
        try {
            const response = await axios.get(URL + '/' + slug)
                .catch(error => { throw new Error(error.response.data.message) });
            return { variant: response.data };
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