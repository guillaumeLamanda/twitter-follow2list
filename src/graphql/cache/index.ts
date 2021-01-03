import { InMemoryCache } from "@apollo/client";

export default new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        friends: {
          keyArgs: false,
          merge: (existing, incoming, { readField }) => {
            if (!existing) return incoming;

            const firstIncomingNodeId = readField("id", incoming.nodes[0]);
            const offset = existing.nodes.some(
              (item) => readField("id", item) === firstIncomingNodeId
            )
              ? existing.nodes.indexOf(firstIncomingNodeId)
              : existing.nodes.length;

            const mergedNodes = existing.nodes.slice(0);

            for (let i = 0; i < incoming.nodes.length; ++i) {
              mergedNodes[offset + i] = incoming.nodes[i];
            }

            return {
              ...incoming,
              nodes: mergedNodes,
            };
          },
        },
      },
    },
  },
});
