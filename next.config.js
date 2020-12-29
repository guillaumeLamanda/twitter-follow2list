module.exports = {
  /** @param {import('webpack').Configuration} config */
  webpack(config, options) {
    config.module.rules.push({
      test: /\.graphql$/,
      exclude: /node_modules/,
      use: [options.defaultLoaders.babel, { loader: 'graphql-let/loader' }],
    })

    config.module.rules.push({
      test: /\.graphqls$/,
      exclude: /node_modules/,
      use: [
        'graphql-let/schema/loader',
        /** 
         * TODO: Disable this 👇 when `loadFiles` work on serverless
         * @see schema.ts
         */
        'graphql-tag/loader'
      ],
    })

    config.module.rules.push({
      test: /\.ya?ml$/,
      type: 'json',
      use: 'yaml-loader',
    })

    return config
  },
}
