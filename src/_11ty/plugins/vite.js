export default {
  serverOptions: {
    module: "@11ty/eleventy-dev-server",
    domDiff: false,
  },

  // Defaults
  viteOptions: {
    publicDir: 'public',
    clearScreen: false,
    server: {
      mode: 'development',
      middlewareMode: true,
    },
    appType: 'custom',

    build: {
      mode: 'production',
    }
  },
}