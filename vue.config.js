const path = require('path')
const webpack = require('webpack')
// const compressionPlagin = require('compression-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const isProd = process.env.NODE_ENV === 'production'

const assetsCDN = {
  // webpack build externals
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    // axios: 'axios', // 暂时注掉，目前外链时需要webpack处理 并不减少js体积
    'element-ui': 'ELEMENT'
  },
  js: [
    '//cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js',
    '//cdn.jsdelivr.net/npm/vue-router@3.1.3/dist/vue-router.min.js',
    '//cdn.jsdelivr.net/npm/vuex@3.1.2/dist/vuex.min.js',
    // '//cdn.jsdelivr.net/npm/axios@0.19.0/dist/axios.min.js',
    '//cdn.jsdelivr.net/npm/element-ui@2.13.0/lib/index.js'
  ]
}

const assetsCDN_dev = {
}

// vue.config.js
const vueConfig = {
  configureWebpack: {
    // webpack plugins
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
      // G-zip设置
      // new compressionPlagin({
      //   test: /\.js$|\.css/, // 匹配文件名
      //   threshold: 10240, // 超过10k的数据进行压缩
      //   deleteOriginalAssets: false // 是否删除源文件
      // })
    ],
    // if prod, add externals
    externals: isProd ? assetsCDN.externals : {},
    devtool: isProd ? '#hidden-source-map' : '#cheap-module-eval-source-map'
  },

  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src'))

    config.module
      .rule('pug')
      .test(/\.pug$/)
      .use('pug-html-loader')
      .loader('pug-html-loader')
      .end()

    // if prod is on
    // assets require on cdn
    if (isProd) {
      config.plugin('html').tap(args => {
        args[0].cdn = assetsCDN
        return args
      })
    } else {
      config.plugin('html').tap(args => {
        args[0].cdn = assetsCDN_dev
        return args
      })
    }
  },
  devServer: {
    // 启动服务后是否打开浏览器
    open: true,
    // development server port 8000
    port: 8000,
    // If you want to turn on the proxy, please remove the mockjs /src/main.jsL11
    proxy: 'http://api.wujianbo.com/'
  },
  productionSourceMap: false
}

module.exports = vueConfig
