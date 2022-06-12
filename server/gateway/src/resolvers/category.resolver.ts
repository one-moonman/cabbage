import { Arg, Query, Resolver } from 'type-graphql';
import { Category, CategoryResponse } from '../types/category.type';
import CategoryService from '../services/category.service';

@Resolver(Category)
export default class CategoryResolver {
    @Query(() => [Category])
    async getAllCategorys() {
        return CategoryService.findAll();
    }

    @Query(() => CategoryResponse)
    async getCategoryBySlug(@Arg('slug') slug: string) {
        return CategoryService.findBySlug(slug);
    }
}
