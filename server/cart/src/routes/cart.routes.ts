import { Router } from 'express';
import CartController from '../controllers/cart.controller';
import { Validator, AllowedSchema } from 'express-json-validator-middleware';

const { validate } = new Validator({});

const schema: AllowedSchema = {
    type: "object",
    required: ["sid", "qty", "variant"],
    properties: {
        sid: { type: "string" },
        qty: { type: "number" },
        variant: {
            type: "object",
            properties: {
                _id: { type: "string" },
                price: { type: "number" }
            }
        },
    }
}

const bodyValidator = validate({ body: schema });
const router = Router();

router
    .route('/')
    .put(bodyValidator, CartController.addItemToCart)
    .patch(bodyValidator, CartController.removeItemFromCart)

router.delete('/:sid', CartController.purgeItemsFromCart)

export default router;