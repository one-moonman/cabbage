import { Router } from 'express';
import CartItemController from '../controllers/cart-items.controller';

const router = Router();

router
    .route('/:id')
    .put(CartItemController.increaseQuantity)   //?qty
    .patch(CartItemController.decreaseQuantity) //?qty
    .delete(CartItemController.remove)

router.get('/', CartItemController.getItems)                               //?sid=
router.get('/getTaken/:id', CartItemController.calculateTaken)

export default router;
