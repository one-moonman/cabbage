import { Router } from "express";
import StockController from "../controllers/stock.controller";

const router = Router();

router.get('/availability/:id', StockController.getAvailability)
router.get('/committed/:id', StockController.getCommitted)

export default router;