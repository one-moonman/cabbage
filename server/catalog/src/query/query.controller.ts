import { Controller, Get, Req } from '@nestjs/common';
import RequestWithCategory from './query.request';

@Controller('query')
export class QueryController {
    @Get('/:categorySlug')
    getCategory(@Req() req: RequestWithCategory) {
        return req.category;
    }

    @Get('/:categorySlug/:productSlug')
    async getProduct(@Req() req: RequestWithCategory) {
        const products = await (await req.category.populate('products')).products;
        const product = products.find(product => product.slug === req.params.productSlug);
        if (!product) throw new Error("");
        return product;
    }

    @Get('/:categorySlug/:productSlug/:variantSlug')
    async getVariant(@Req() req: RequestWithCategory) {
        const products = await (await req.category.populate('products')).products;
        const product = products.find(p => p.slug === req.params.productSlug);
        if (!product) throw new Error();
        //@ts-ignore
        const variants = await product.populate('variants');
        const variant = variants.find(v => v.slug === req.params.variantSlug);
        if (!variant) throw new Error();
        return variant;
    }
}
