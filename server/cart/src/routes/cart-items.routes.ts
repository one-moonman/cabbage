import { Router } from 'express';
import CartItemController from '../controllers/cart-items.controller';
import { Validator, AllowedSchema } from 'express-json-validator-middleware';

const { validate } = new Validator({});

const schema: AllowedSchema = {
    type: "object",
    required: ["item_id", "qty", "variant_price"],
    properties: {
        item_id: { type: "string" },
        qty: { type: "number" },
        variant_price: { type: "number" },
    }
}

const bodyValidator = validate({ body: schema });
const router = Router();

router
    .route('/')
    .get(CartItemController.getItems)                               //?sid=
    .put(bodyValidator, CartItemController.increaseQuantity)
    .patch(bodyValidator, CartItemController.decreaseQuantity)

router.delete('/:id', CartItemController.remove)
router.get('/getTaken/:id', CartItemController.calculateTaken)

export default router;
