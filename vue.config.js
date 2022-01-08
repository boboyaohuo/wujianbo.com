const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const isProd = process.env.NODE_ENV === 'production'

// const assetsCDN = {
// webpack build externals
// externals: {
//   Vue: 'Vue',
//   vueRouter: 'router',
//   // axios: 'axios', // 暂时注掉，目前外链时需要webpack处理 并不减少js体积
// },
// js: [
//   '//cdn.jsdelivr.net/npm/vue@3.0.0/dist/vue.global.min.js',
//   '//cdn.jsdelivr.net/npm/vue-router@4.0.0/dist/vue-router.global.min.js',
//   // '//cdn.jsdelivr.net/npm/axios@0.21.1/dist/axios.js',
// ]
// }

// const assetsCDN_dev = {}

// vue.config.js
const vueConfig = {
  publicPath: process.env.VUE_APP_BASE_URL,
  configureWebpack: {
    // webpack plugins
    plugins: [
      // G-zip设置
      // new compressionPlagin({
      //   test: /\.js$|\.css/, // 匹配文件名
      //   threshold: 10240, // 超过10k的数据进行压缩
      //   deleteOriginalAssets: false // 是否删除源文件
      // }),
    ],
    // if prod, add externals
    // externals: isProd ? assetsCDN.externals : {},
    devtool: isProd ? '#hidden-source-map' : '#cheap-module-eval-source-map'
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'))
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 10240 }))
      .end()
    config.module
      .rule('pug')
      .test(/\.pug$/)
      .use('pug-html-loader')
      .loader('pug-html-loader')
      .end()
    // if prod is on
    // assets require on cdn
    // if (isProd) {
    //   config.plugin('html').tap(args => {
    //     args[0].cdn = assetsCDN
    //     return args
    //   })
    // } else {
    //   config.plugin('html').tap(args => {
    //     args[0].cdn = assetsCDN_dev
    //     return args
    //   })
    // }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'stylus',
      patterns: [path.resolve(__dirname, 'src/assets/stylus/mixin.styl')]
    }
  },
  devServer: {
    // 启动服务后是否打开浏览器
    open: false,
    // development server port 8800
    port: 8800,
    proxy: {
      '/api': {
        // target: 'http://api.wujianbo.com/',
        target: 'http://localhost:3000/',
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  productionSourceMap: false
}

module.exports = vueConfig
