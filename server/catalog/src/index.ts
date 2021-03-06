import express from 'express';
import morgan from 'morgan';
import 'dotenv/config';

import { HttpError } from 'http-errors';
import 'express-async-errors';
import mongoose from 'mongoose';

import categoryRouter from './routes/category.routes';
import productRouter from './routes/product.routes';
import variantRouter from './routes/variant.routes';

const PORT = process.env.PORT || 3000;
const loggerFormat = process.env.NODE_ENV === 'production' ? 'common' : 'dev';
const message = `[_CATALOG_] 📰 service listening at port:${PORT}`;

async function application() {
    await mongoose.connect(process.env.DATABASE_URL);
    const app = express();

    const api = express.Router();
    api
        .use('/category', categoryRouter)
        .use('/product', productRouter)
        .use('/variant', variantRouter);

    app
        .use(express.json())
        .use(morgan(loggerFormat))
        .use('/api/v1/catalog', api)
        .use((error: HttpError, _, res: express.Response, __) => {
            const status = error.statusCode || error.status || 500;
            const message = error.message || "Something went wrong";
            return res.status(status).json({ status, message })
        });

    app.listen(PORT, () => console.warn(message));
}

application().catch(err => console.log(err))