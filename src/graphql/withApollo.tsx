import { ApolloProvider } from "@apollo/client";
import { useApollo } from "./apollo";

const withApolloClient = (Component) =>
  function WithApolloClient({ initialApolloState = {}, ...pageProps }) {
    const apolloClient = useApollo(initialApolloState);

    return (
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    );
  };

export default withApolloClient;
