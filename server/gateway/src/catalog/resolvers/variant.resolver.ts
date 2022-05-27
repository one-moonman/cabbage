import { get, put } from '../../utils/request-handlers';
import constants from '../../constants';
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import Variant from '../types/variant.type';
import { MyContext } from '../../utils/types';

const { catalog, cart } = constants;

@Resolver(Variant)
export default class VariantResolver {
    @Query(returns => [Variant])
    async getAllVariants() { return get(catalog + 'variants') }

    @Query(returns => Variant)
    async getVariantBySlug(@Arg('slug') slug: string) {
        let variant = await get(catalog + 'variants/' + slug);
        const taken = await get(cart + 'cart-items/getTaken/' + variant._id);
        const qty = variant.stock - taken
        return put(catalog + 'variants/' + variant._id + '?qty=' + qty);
    }
}