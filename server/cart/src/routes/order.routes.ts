import { Router } from 'express';
import OrderController from '../controllers/order.controller';
import { Validator, AllowedSchema } from 'express-json-validator-middleware';

const { validate } = new Validator({});

const schema: AllowedSchema = {
    type: "object",
    required: ["sid", "total", "items"],
    properties: {
        sid: { type: "string" },
        total: { type: "number" },
        items: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    _id: { type: "string" },
                    product_variant: { type: "string" },
                    quantity: { type: "number" },
                    total: { type: "number" }
                }
            }
        },
    }
}

const bodyValidator = validate({ body: schema });
const router = Router();

router.post('/', bodyValidator, OrderController.saveOrder)

export default router;