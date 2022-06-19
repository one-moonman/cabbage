import { Arg, FieldResolver, Query, Resolver, Root } from 'type-graphql';
import { Variant, VariantResponse } from './variant.type';
import VariantService from './variant.service';
import { urls } from '../../common/constants';

@Resolver(Variant)
export default class VariantResolver {
    private readonly variantService = new VariantService(urls.catalog + 'variant');

    @Query(() => [Variant])
    async getAllVariants() {
        return this.variantService.findAll();
    }

    // @FieldResolver()
    // async committed(@Root() variant: Variant) {
    //     return this.variantService.resolveCommitted(variant);
    // }

    // @FieldResolver()
    // async availability(@Root() variant: Variant) {
    //     return this.variantService.resolveAvailability(variant);
    // }

    @Query(() => VariantResponse)
    async getVariantBySlug(@Arg('slug') slug: string) {
        return this.variantService.findBySlug(slug);
    }
}