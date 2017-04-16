require('shelljs/global')
const path = require('path')
const config = require('../tools/config')
const ora = require('ora')
const webpack = require('webpack')
const webpackConfig = require('../tools/config/webpack.prod.conf')
const assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
const spinner = ora('building for production...')
env.NODE_ENV = 'production'

console.log(
    '  Tip:\n' +
    '  Built files are meant to be served over an HTTP server.\n' +
    '  Opening index.html over file:// won\'t work.\n'
)

spinner.start()
rm('-rf', assetsPath)
mkdir('-p', assetsPath)
cp('-R', 'static/*', assetsPath)

webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n')
})
