import { ApolloServer } from "apollo-server-micro";
import schema from "graphql/schema";
import { getContextFromRequest } from "graphql/context";

const apolloServer = new ApolloServer({
  schema,
  context: ({ req }) => getContextFromRequest(req),
  tracing: true,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
