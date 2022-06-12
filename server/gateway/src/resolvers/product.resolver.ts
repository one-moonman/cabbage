import { Arg, Query, Resolver } from 'type-graphql';
import { Product, ProductResponse } from '../types/product.type';
import ProductService from '../services/product.service';

@Resolver(Product)
export default class ProductResolver {
    @Query(() => [Product])
    async getAllProducts() {
        return ProductService.findAll();
    }

    @Query(() => ProductResponse)
    async getProductBySlug(@Arg('slug') slug: string) {
        return ProductService.findBySlug(slug);
    }
}
