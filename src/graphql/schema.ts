import { makeExecutableSchema } from "@graphql-tools/schema";
import resolvers from "./resolvers";
import typeDefs from "./type-defs.graphqls";

/**
 * Disables because it doesn't load the schema on serverless
 * @see https://github.com/piglovesyou/graphql-let/issues/120#issuecomment-752102692
 */
// const loadedFiles =
//   loadFilesSync(join(process.cwd(), graphQLLetConfig.schema))
// const typeDefs = mergeTypeDefs(loadedFiles);

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
