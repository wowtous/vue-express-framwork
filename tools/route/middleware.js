let webpackConfig = process.env.NODE_ENV === 'testing' ? require('../config/webpack.prod.conf') : require('../config/webpack.dev.conf')
let webpack = require('webpack')
let request = require('request')
let chaf = require('connect-history-api-fallback')()
let compiler = webpack(webpackConfig)
let hotMiddleware = require('webpack-hot-middleware')(compiler)

let devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
        colors: true,
        chunks: false
    }
})

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', (compilation) => {
    compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
        hotMiddleware.publish({
            action: 'reload'
        })
        cb()
    })
})

module.exports = {
    'connect-history-api-fallback': chaf,
    'dev-middle-ware': devMiddleware,
    'hot-middle-ware': hotMiddleware
}
