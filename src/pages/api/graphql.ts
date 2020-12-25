import { ApolloServer, gql } from "apollo-server-micro";

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      hello: () => `Hello World`,
    },
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
