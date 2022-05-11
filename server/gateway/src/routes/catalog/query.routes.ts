import { Router, Request, Response } from 'express';
import axios from 'axios';

const queryRouter = Router();

queryRouter
    .get('/:category', async (req: Request, res: Response) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/catalog/query/${req.params.category}`
            );
            return res.send(response.data);
        } catch (error) {
            return res.send(error);
        }
    })
    .get('/:category/:product', async (req: Request, res: Response) => {
        try {
            const response = await axios.get(
                `http://localhost:3000/api/v1/catalog/query/${req.params.category}/${req.params.product}`
            );
            return res.send(response);
        } catch (error) {
            return res.send(error);
        }
    })
    .get('/:category/:product/:variant', async (req: Request, res: Response) => {
        try {
            const response = await axios.get(
                `http://localhost:3000/api/v1/catalog/query/${req.params.category}/${req.params.product}/${req.params.variant}?taken=0`
            );
            return res.send(response);
        } catch (error) {
            return res.send(error);
        }
    })

export default queryRouter;