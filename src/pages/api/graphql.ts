import { ApolloServer, gql } from "apollo-server-micro";
import schema from "graphql/schema";

const apolloServer = new ApolloServer({
  schema,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
