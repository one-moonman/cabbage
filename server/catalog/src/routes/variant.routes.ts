import { Router } from 'express';
import VariantController from '../controllers/variant.controller';

const router = Router();

router
    .get('/', VariantController.getAll)
    .get('/:slug', VariantController.getOneBySlug)

export default router;