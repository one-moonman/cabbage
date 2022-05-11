import { NotFoundException, Param, Query } from '@nestjs/common';
import { Controller, Get, Req } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from 'src/categories/categories.service';
import { Category, CategoryDocument } from 'src/categories/entities/category.entity';
import { Product, ProductDocument } from 'src/products/entities/product.entity';
import { Variant, VariantDocument } from 'src/variants/entities/variant.entity';

@ApiTags('query')
@Controller('query')
export class QueryController {
    constructor(private readonly categoriesService: CategoriesService) { }

    private async returnCategory(categorySlug: string) {
        const category: CategoryDocument = await this.categoriesService.findBySlug(categorySlug);
        if (!category) throw new NotFoundException(`Category with slug:${categorySlug} Not Found`);
        return category;
    }

    private returnProduct(products: Product[], productSlug: string) {
        const product = products.find((p: Product) => p.slug === productSlug) as ProductDocument;
        if (!product) throw new NotFoundException(`Product with slug:${productSlug} Not Found`);
        return product;
    }

    private returnVariant(variants: Variant[], variantSlug: string) {
        const variant = variants.find((v: Variant) => v.slug === variantSlug) as VariantDocument;
        if (!variant) throw new NotFoundException(`Variant with slug:${variantSlug} Not Found`);
        return variant;
    }

    @Get('/:categorySlug')
    @ApiOkResponse({ type: Category })
    @ApiNotFoundResponse()
    async getCategory(@Param('categorySlug') categorySlug: string) {
        return this.returnCategory(categorySlug);
    }

    @Get('/:categorySlug/:productSlug')
    @ApiOkResponse({ type: Product })
    @ApiNotFoundResponse()
    async getProduct(
        @Param('categorySlug') categorySlug: string,
        @Param('productSlug') productSlug: string
    ) {
        const category = await this.returnCategory(categorySlug);
        await category.populate('products');
        return this.returnProduct(category.products, productSlug);
    }

    @Get('/:categorySlug/:productSlug/:variantSlug')
    @ApiOkResponse({ type: Variant })
    @ApiNotFoundResponse()
    async getVariant(
        @Param('categorySlug') categorySlug: string,
        @Param('productSlug') productSlug: string,
        @Param('variantSlug') variantSlug: string,
        @Query('taken') taken: number
    ) {
        const category = await this.returnCategory(categorySlug);
        await category.populate('products');
        const product = this.returnProduct(category.products, productSlug);
        await product.populate('variants');
        const varinat = this.returnVariant(product.variants, variantSlug);
        varinat.availability -= taken;
        return varinat.save();
    }
}