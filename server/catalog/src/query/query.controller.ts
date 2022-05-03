import { NotFoundException, Param } from '@nestjs/common';
import { Controller, Get, Req } from '@nestjs/common';
import { CategoriesService } from 'src/categories/categories.service';
import { CategoryDocument } from 'src/categories/entities/category.entity';
import { Product, ProductDocument } from 'src/products/entities/product.entity';
import { Variant } from 'src/variants/entities/variant.entity';

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
        const variant = variants.find((v: Variant) => v.slug === variantSlug);
        if (!variant) throw new NotFoundException(`Variant with slug:${variantSlug} Not Found`);
        return variant;
    }

    @Get('/:categorySlug')
    async getCategory(@Param('categorySlug') categorySlug: string) {
        return this.returnCategory(categorySlug);
    }

    @Get('/:categorySlug/:productSlug')
    async getProduct(
        @Param('categorySlug') categorySlug: string,
        @Param('productSlug') productSlug: string
    ) {
        const category = await this.returnCategory(categorySlug);
        await category.populate('products');
        return this.returnProduct(category.products, productSlug);
    }

    @Get('/:categorySlug/:productSlug/:variantSlug')
    async getVariant(
        @Param('categorySlug') categorySlug: string,
        @Param('productSlug') productSlug: string,
        @Param('variantSlug') variantSlug: string
    ) {
        const category = await this.returnCategory(categorySlug);
        await category.populate('products');
        const product = this.returnProduct(category.products, productSlug);
        await product.populate('variants');
        return this.returnVariant(product.variants, variantSlug);
    }
}