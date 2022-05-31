import { Arg, Query, Resolver } from 'type-graphql';
import axios from 'axios';
import Category, { CategoryResponse } from '../types/category.type';
import { urls } from '../constants';

const URL = urls.catalog + 'category';

@Resolver(Category)
export default class CategoryResolver {
    @Query(returns => [Category])
    async getAllCategories() {
        const response = await axios.get(URL)
            .catch(error => { throw new Error(error.response.data.message) });
        return response.data;
    }

    @Query(returns => CategoryResponse)
    async getCategoryBySlug(@Arg('slug') slug: string) {
        try {
            const response = await axios.get(URL + '/' + slug)
                .catch(error => { throw new Error(error.response.data.message) });
            return { category: response.data };
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

