import { HttpLink } from "@apollo/client";

const httpLink = new HttpLink({
  uri: "/api/graphql",
  credentials: "same-origin",
});

export default httpLink;
