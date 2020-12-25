import { ApolloProvider } from "@apollo/client";
import { useApollo } from "./apollo";

const WithApolloClient = (Component) => ({
  initialApolloState = {},
  ...pageProps
}) => {
  const apolloClient = useApollo(initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default WithApolloClient;
