import { Arg, Query, Resolver } from 'type-graphql';
import { Category, CategoryResponse } from './category.type';
import CategoryService from './category.service';
import { urls } from '../../common/constants';

@Resolver(Category)
export default class CategoryResolver {
    private readonly categoryService = new CategoryService(urls.catalog + 'category');

    @Query(() => [Category])
    async getAllCategories() {
        return this.categoryService.findAll();
    }

    @Query(() => CategoryResponse)
    async getCategoryBySlug(@Arg('slug') slug: string) {
        return this.categoryService.findBySlug(slug);
    }
}
