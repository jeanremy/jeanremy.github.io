export default {
  // Options passed to the Eleventy Dev Server
  // Defaults
  serverOptions: {
    module: "@11ty/eleventy-dev-server",
    domDiff: false,
  },

  // Defaults
  viteOptions: {
    clearScreen: false,
    server: {
      mode: 'development',
      middlewareMode: true,
    },
    appType: 'custom',
    build: {
      mode: 'production',
      rollupOptions: {
        output: {
          experimentalMinChunkSize: 0,
          assetFileNames: 'assets/[name].[ext]',
        },
      },
    }
  },
}