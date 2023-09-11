import {ApolloServer} from '@apollo/server';
import {expressMiddleware} from '@apollo/server/express4';
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import { createServer } from "http";
import cors from 'cors';
import pkg from 'body-parser';
const { json } = pkg;

import typeDefs from "./graphql/type-defs";
import resolvers from "./graphql/resolvers";
import {makeExecutableSchema} from "@graphql-tools/schema";
import * as dotenv from 'dotenv'
import {getSession} from "next-auth/react";


interface MyContext {
    token?: string;
}

const main = async () => {

    dotenv.config()
    const app = express();
    const httpServer = createServer(app);

    const schema = makeExecutableSchema({
        typeDefs,
        resolvers,
    })

    const server = new ApolloServer<MyContext>({
        schema,
        csrfPrevention: true,
        plugins: [ApolloServerPluginDrainHttpServer({httpServer})],

    });

    await server.start();

    const corsOptions = {
        origin: process.env.CLIENT_ORIGIN,
        credentials: true
    }

    app.use(
        "/graphql",
        cors<cors.CorsRequest>(corsOptions),
        json(),
        expressMiddleware(server, {
            context: async ({ req }): Promise<any> => {
                const session = await getSession({ req });
                console.log('CONTEXT SESSION', session)

                return {session: session};
            },
        })
    );


    await new Promise<void>((resolve) => httpServer.listen({port: 4000}, resolve));
    console.log(`🚀 Server ready at http://localhost:4000`);
};
main().catch((err) => console.log(err));