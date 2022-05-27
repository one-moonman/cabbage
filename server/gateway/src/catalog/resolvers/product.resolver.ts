import { get } from '../../utils/request-handlers';
import constants from '../../constants';
import { Arg, Query, Resolver } from 'type-graphql';
import Product from '../types/product.type';

const { catalog } = constants;

@Resolver(Product)
export default class ProductResolver {
    @Query(returns => [Product])
    async getAllProducts() { return get(catalog + 'products') }

    @Query(returns => Product)
    async getProductBySlug(@Arg('slug') slug: string) {
        const product = await get(catalog + 'products/' + slug);
        // throw error if Undefined
        return product;
    }
}
