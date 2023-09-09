// npm install @apollo/server express graphql cors body-parser
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import typeDefs from "./graphql/type-defs";
import resolvers from "./graphql/resolvers";
import {makeExecutableSchema} from "@graphql-tools/schema";
import * as dotenv from 'dotenv'

interface MyContext {
    token?: string;
}

const main = async () => {

    dotenv.config()
    const app = express();
    const httpServer = http.createServer(app);

    const schema = makeExecutableSchema({
        typeDefs,
        resolvers,
    })

    const server = new ApolloServer<MyContext>({
        schema,
        plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
    });

    await server.start();

    const corsOptions = {
        origin: process.env.CLIENT_ORIGIN,
        credentials: true
    }

    app.use(
        '/',
        cors<cors.CorsRequest>(corsOptions),
        bodyParser.json(),
        expressMiddleware(server, {
            context: async ({req}) => ({token: req.headers.token}),
        }),
    );


    await new Promise<void>((resolve) => httpServer.listen({port: 4000}, resolve));
    console.log(`🚀 Server ready at http://localhost:4000`);
};
    main().catch((err) => console.log(err));