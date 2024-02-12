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
  chainWebpack: (config) => {
    config.module
      .rule('html')
      .test(/\.html$/)
      .use('html-loader')
      .loader('html-loader')
  },
  runtimeCompiler: true,
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.output.filename = 'js/[name].[contenthash:8].min.js'
      config.output.chunkFilename = 'js/[name].[contenthash:8].min.js'
    } else {
      config.output.filename = 'js/[name].js'
      config.output.chunkFilename = 'js/[name].js'
    }
  },
}
