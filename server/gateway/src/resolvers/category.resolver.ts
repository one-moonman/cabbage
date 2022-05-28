import { get } from '../utils/request-handlers';
import constants from '../constants';
import { Arg, Query, Resolver } from 'type-graphql';
import Category from '../types/category.type';

const { catalog } = constants;

@Resolver(Category)
export default class CategoryResolver {
    @Query(returns => [Category])
    async getAllCategories() { return get(catalog + 'categories') }

    @Query(returns => Category)
    async getCategoryBySlug(@Arg('slug') slug: string) {
        const category = await get(catalog + 'categories/' + slug);
        // throw error if Undefined
        return category;
    }
}

