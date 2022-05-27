import { get } from '../../utils/request-handlers';
import constants from '../../constants';
import { Arg, Query, Resolver } from 'type-graphql';
import CatalogQueryUninType from '../types/catalog-query.type';

const { catalog } = constants;

@Resolver()
export default class CatalogQueryResolver {

    @Query(returns => CatalogQueryUninType)
    async getBySlug(
        @Arg('categorySlug') categorySlug: string,
        @Arg('productSlug') productSlug: string,
        @Arg('variantSlug') variantSlug: string
    ) {
        return { data: "NO data" }
    }
}
