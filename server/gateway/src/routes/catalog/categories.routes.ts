import { Router, Request, Response } from 'express';
import axios from 'axios';

const categoriesRouter = Router();

categoriesRouter
    .get('/', async (req: Request, res: Response) => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/catalog/categories');
            return res.send(response.data);
        } catch (error) {
            return res.send(error);
        }
    })
    .get('/:id', async (req: Request, res: Response) => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/catalog/categories/' + req.params.id);
            return res.send(response);
        } catch (error) {
            return res.send(error);
        }
    })

export default categoriesRouter;