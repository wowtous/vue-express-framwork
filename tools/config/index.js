let path = require('path')
let projectRoot = path.resolve(__dirname, '../../');

module.exports = {
    build: {
        env: { NODE_ENV: '"production"' },
        index: path.resolve(projectRoot, 'dist/index.html'),
        assetsRoot: path.resolve(projectRoot, 'dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        productionSourceMap: false,
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        apiHost: "http://127.0.0.1",
        apiPort: 3000
    },
    dev: {
        env: { NODE_ENV: '"development"' },
        port: 8080,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {},
        cssSourceMap: false,
        apiHost: "http://127.0.0.1",
        apiPort: 3000
    },
    test: {
        env: { NODE_ENV: '"testing"' }
    },
    projectRoot: projectRoot
}
