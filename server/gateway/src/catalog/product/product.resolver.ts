import { Arg, Query, Resolver } from 'type-graphql';
import { Product, ProductResponse } from './product.type';
import ProductService from './product.service';
import { urls } from '../../common/constants';

@Resolver(Product)
export default class ProductResolver {
    private readonly productService = new ProductService(urls.catalog + 'product');

    @Query(() => [Product])
    async getAllProducts() {
        return this.productService.findAll();
    }

    @Query(() => ProductResponse)
    async getProductBySlug(@Arg('slug') slug: string) {
        return this.productService.findBySlug(slug);
    }
}
