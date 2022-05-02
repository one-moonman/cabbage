import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { CategoriesService } from '../categories/categories.service';
import RequestWithCategory from './query.request';

@Injectable()
export class CategorySlugMiddleware implements NestMiddleware {
    constructor(private readonly categoriesService: CategoriesService) { }
    async use(req: RequestWithCategory, _: Response, next: NextFunction) {
        const category = await this.categoriesService.findBySlug(req.params.categorySlug);
        if (!category) throw new Error();
        req.category = category;
        next();
    }
}


