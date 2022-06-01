// express
import express from 'express';
import 'dotenv/config';
import 'reflect-metadata';

// apollo
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

import { message, port, __prod__ } from './constants';
import { redis, cors, session } from './config';

async function startApp() {
    const app = express();

    app.set("trust proxy", 1);
    app.use(session);

    const server = new ApolloServer({
        schema: await buildSchema({
            resolvers: [__dirname + "/**/*.resolver.{ts,js}"],
        }),
        csrfPrevention: true,
        context: ({ req, res }) => ({ req, res, redis })
    });

    await server.start();
    server.applyMiddleware({ app, cors });

    app.listen(port, () => console.warn(message))
}

startApp().catch(err => console.error(err))