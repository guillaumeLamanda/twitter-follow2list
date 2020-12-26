// graphql.config.js
module.exports = {
  projects: {
    app: {
      schema: ["src/graphql/typeDefs.graphqls", "**/*.graphqls"],
      documents: ["**/*.{graphql,js,ts,jsx,tsx}"],
      extensions: {
        endpoints: {
          default: {
            url: "http://localhost:3000/api/graphql",
          },
        },
      }
    },
  }
}