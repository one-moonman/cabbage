import { NotFoundException, Param, Query } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CategoryService } from 'src/category/category.service';
import { Category } from 'src/category/entities/category.entity';
import { Product } from 'src/product/entities/product.entity';
import { ProductService } from 'src/product/product.service';
import { Variant } from 'src/variant/entities/variant.entity';
import { VariantService } from 'src/variant/variant.service';

@ApiTags('query')
@Controller('query')
export class QueryController {
    constructor(
        private readonly categoriyService: CategoryService,
        private readonly productService: ProductService,
        private readonly variantService: VariantService
    ) { }

    @Get('/:categorySlug')
    @ApiOkResponse({ type: Category })
    @ApiNotFoundResponse()
    async getCategory(@Param('categorySlug') categorySlug: string) {
        const category = await this.categoriyService.findBySlug(categorySlug);
        if (!category) throw new NotFoundException(`Category with slug:${categorySlug} Not Found`);
        return category;
    }

    @Get('/:categorySlug/:productSlug')
    @ApiOkResponse({ type: Product })
    @ApiNotFoundResponse()
    async getProduct(
        @Param('categorySlug') categorySlug: string,
        @Param('productSlug') productSlug: string
    ) {
        const product = await this.productService.findBySlugAndCategory(categorySlug, productSlug);
        if (!product) throw new NotFoundException(`Product with slug:${productSlug} Not Found`);
        return product;
    }

    @Get('/:categorySlug/:productSlug/:variantSlug')
    @ApiOkResponse({ type: Variant })
    @ApiNotFoundResponse()
    async getVariant(
        @Param('categorySlug') categorySlug: string,
        @Param('productSlug') productSlug: string,
        @Param('variantSlug') variantSlug: string,
    ) {
        const variant = await this.variantService.findBySlugAndRefSlugs(categorySlug, productSlug, variantSlug);
        if (!variant) throw new NotFoundException(`Variant with slug:${variantSlug} Not Found`);
        return variant;
    }
}