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
      config.output.filename = `js/[name].${process.env.npm_package_version}.min.js`
      config.output.chunkFilename = `js/[name].${process.env.npm_package_version}.min.js`
    } else {
      config.output.filename = 'js/[name].[fullhash].js'
      config.output.chunkFilename = 'js/[name].[fullhash].js'
    }
  },
}
