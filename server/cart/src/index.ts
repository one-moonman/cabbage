import express from 'express';
import morgan from 'morgan';
import 'dotenv/config';

import { HttpError } from 'http-errors';

import cartRoutes from './routes/cart.routes';
import cartItemRoutes from './routes/cart-items.routes';

import mongoose from 'mongoose';

const PORT = process.env.PORT || 3001;
const loggerFormat = process.env.NODE_ENV === 'production' ? 'common' : 'dev';
const message = `[_CART_] 🛒 service listening at port:${PORT}`;

async function application() {
    await mongoose.connect(process.env.DATABASE_URL);
    const app = express();
    app
        .use(express.json())
        .use(morgan(loggerFormat))
        .use('/api/v1/cart', cartRoutes)
        .use('/api/v1/cart-items', cartItemRoutes)
        .use((error: HttpError, _, res: express.Response, __) => {
            const status = error.statusCode || error.status || 500;
            const message = error.message || "Something went wrong";
            return res.status(status).json({ status, message })
        })
    app.listen(PORT, () => console.warn(message));
}

application().catch(err => console.log(err))