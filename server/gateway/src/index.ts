import express, { Request, Response } from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import resolvers from './resolvers';
import typeDefs from './typeDefs';

async function start() {
    const app = express();
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: (req: Request, res: Response) => { return { req, res } }
    });
    await server.start()
    server.applyMiddleware({ app });
    app.listen(5000, () => console.log("listening on 5000"))
}

start().catch(err => console.log(err))