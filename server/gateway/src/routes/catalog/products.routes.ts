import { Router, Request, Response } from 'express';
import axios from 'axios';

const productsRouter = Router();

productsRouter
    .get('/', async (req: Request, res: Response) => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/catalog/products');
            return res.send(response.data);
        } catch (error) {
            return res.send(error);
        }
    })
    .get('/:id', async (req: Request, res: Response) => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/catalog/products/' + req.params.id);
            return res.send(response);
        } catch (error) {
            return res.send(error);
        }
    })

export default productsRouter;