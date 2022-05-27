// express
import express, { NextFunction, Request } from 'express';
import session from 'express-session';
import 'dotenv/config';
import 'reflect-metadata';
// node
import path from 'path';
import cors from 'cors';
// apollo
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

//resolvers
import CategoryResolver from './catalog/resolvers/category.resolver';
import ProductResolver from './catalog/resolvers/product.resolver';
import VariantResolver from './catalog/resolvers/variant.resolver';
import CatalogQueryResolver from './catalog/resolvers/catalog-query.resolver';
import CartItemResolver from './catalog/resolvers/cart-item.resolver';

import connectRedis from 'connect-redis';
import { redis } from './config';
const RedisStore = connectRedis(session);

declare module 'express-session' {
    interface SessionData {
        total: number,
        authenticated: boolean,
    }
}

import constants from './constants';
const { port } = constants;



async function startApp() {
    const app = express();

    app.set("trust proxy", 1);
    //app.use()

    app.use(session({
        name: "sessiika",
        resave: false,
        saveUninitialized: false,
        store: new RedisStore({ client: redis }),
        secret: "sadasd",
        cookie: {
            httpOnly: false,
            sameSite: 'none',
            secure: true,//process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
        }
    }))

    const schema = await buildSchema({
        resolvers: [CategoryResolver, ProductResolver, VariantResolver, CatalogQueryResolver, CartItemResolver],
    })
    const server = new ApolloServer({
        schema,
        csrfPrevention: true,
        context: ({ req, res }) => ({ req, res, redis })
    });
    await server.start();
    server.applyMiddleware({
        app,
        cors: {
            origin: ['https://studio.apollographql.com'],
            credentials: true
        }
    });

    app.listen(port, () => {
        console.log(`GAWATAY LISTENIG AT PORT 4000`);
    })
}

startApp().catch(err => console.error(err))