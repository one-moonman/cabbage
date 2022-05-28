import { Router } from 'express';
import CategoryController from '../controllers/category.controller';

const router = Router();

router
    .get('/', CategoryController.getAll)
    .get('/:slug', CategoryController.getOneBySlug)

export default router;