//const { defineConfig } = require('@vue/cli-service')

module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "@/assets/styles/global.scss";',
      },
    },
    sourceMap: process.env.NODE_ENV === 'development',
  },
  transpileDependencies: ['vuetify'],
}
