import { ApolloServer } from "@apollo/server";
import { Express } from "express";
import typeDefs from '@/main/graphql/schema';
import resolvers from "@/main/graphql/resolvers";
import { expressMiddleware } from "@apollo/server/express4";

export const setupApolloServer = async (app: Express): Promise<Express> => {
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  await server.start();

  app.use(
    '/graphql',
    expressMiddleware(server)
  );

  return app;
};
