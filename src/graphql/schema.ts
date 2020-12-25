import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { join } from "path";
import resolvers from "./resolvers";

const loadedFiles = loadFilesSync(
  join(process.cwd(), "src/graphql/type-defs.graphqls")
);
const typeDefs = mergeTypeDefs(loadedFiles);

export default makeExecutableSchema({
  typeDefs,
  resolvers,
});
