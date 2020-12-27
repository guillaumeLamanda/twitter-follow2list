import { IncomingMessage, ServerResponse } from "http";
import { useMemo } from "react";
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { Context } from "./context";

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

export type ResolverContext = {
  req?: IncomingMessage;
  res?: ServerResponse;
};

function createIsomorphLink(context?: Context): ApolloLink {
  if (typeof window === "undefined") {
    // if (!context) throw new Error("no context provided");
    const { SchemaLink } = require("@apollo/client/link/schema");
    const { default: schema } = require("./schema");
    return new SchemaLink({ schema, context });
  } else {
    const { HttpLink } = require("@apollo/client/link/http");
    const { setContext } = require("@apollo/client/link/context");
    const authLink = setContext((_, { headers }) => {
      // get the authentication token from local storage if it exists
      const oauthToken = localStorage.getItem("oauthToken");
      const oauthTokenSecret = localStorage.getItem("oauthTokenSecret");
      // return the headers to the context so httpLink can read them
      return {
        headers: {
          ...headers,
          ...(oauthToken && {
            authorization: oauthToken,
          }),
        },
      };
    });
    const httpLink = new HttpLink({
      uri: "/api/graphql",
      credentials: "same-origin",
    });

    return authLink.concat(httpLink);
  }
}

function createApolloClient(context?: Context) {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: createIsomorphLink(context),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(
  initialState: any = null,
  // Pages with Next.js data fetching methods, like `getStaticProps`, can send
  // a custom context which will be used by `SchemaLink` to server render pages
  context?: Context
) {
  const _apolloClient = apolloClient ?? createApolloClient(context);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState: any, context?: Context) {
  const store = useMemo(() => initializeApollo(initialState, context), [
    initialState,
  ]);
  return store;
}
