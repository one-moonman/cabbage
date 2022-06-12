import { Arg, FieldResolver, Query, Resolver, Root } from 'type-graphql';
import { Variant, VariantResponse } from '../types/variant.type';
import VariantService from '../services/variant.service';

@Resolver(Variant)
export default class VariantResolver {

    @Query(() => [Variant])
    async getAllVariants() {
        return VariantService.findAll();
    }

    @FieldResolver()
    async availability(@Root() variant: Variant) {
        return VariantService.resolveAvailability(variant);
    }

    @Query(() => VariantResponse)
    async getVariantBySlug(@Arg('slug') slug: string) {
        return VariantService.findBySlug(slug);
    }
}