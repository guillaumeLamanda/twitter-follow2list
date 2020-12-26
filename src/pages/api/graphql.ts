import { ApolloServer, gql } from "apollo-server-micro";
import { context } from "graphql/context";
import schema from "graphql/schema";

const apolloServer = new ApolloServer({
  schema,
  context,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
