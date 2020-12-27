import authLink from "./auth";
import httpLink from "./http";

const link = authLink.concat(httpLink);

export default link;
