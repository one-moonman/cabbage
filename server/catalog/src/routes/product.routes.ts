import { Router } from 'express';
import ProductController from '../controllers/product.controller';

const router = Router();

router
    .get('/', ProductController.getAll)
    .get('/:slug', ProductController.getOneBySlug)

export default router;