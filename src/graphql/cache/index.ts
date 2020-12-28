import { InMemoryCache } from "@apollo/client";

export default new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        friends: {
          keyArgs: false,
          merge: (existing, incoming) => {
            if (!existing) return incoming;

            return {
              ...incoming,
              nodes: [...existing.nodes, ...incoming.nodes],
            };
          },
        },
      },
    },
  },
});
