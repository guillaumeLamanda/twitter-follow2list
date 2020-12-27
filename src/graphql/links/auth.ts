import { setContext } from "@apollo/client/link/context";

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const oauthToken = localStorage.getItem("oauthToken");
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

export default authLink;
