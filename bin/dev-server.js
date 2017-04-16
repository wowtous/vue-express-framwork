const path = require('path')
const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const app = express()
const opn = require('opn')
const route = require('../tools/route')
const config = require('../tools/config')
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory) // serve pure static assets
const port = process.env.PORT || config.dev.port // default port where dev server listens for incoming traffic

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.text({ type: 'text/*' }))
app.use(cookieParser())
app.use(session({
    secret: 'darebeat',
    cookie: {
        maxAge: 864000000
    }, //这个是以毫秒为单位的时间 1800000000
    resave: false,
    saveUninitialized: true
}))
app.use(route.mw['connect-history-api-fallback']) // handle fallback for HTML5 history API
app.use(route.mw['dev-middle-ware']) // serve webpack bundle output
app.use(route.mw['hot-middle-ware']) // enable hot-reload and state-preserving compilation error display
app.use(staticPath, express.static('./static'))

app.use('/api', route.action.auth)
app.use('/api/profile', route.action.profile)
app.use('/api/logout', route.action.logout)
app.use('/api/*', route.action.common)

module.exports = app.listen(port, function(err) {
    if (err) {
        console.log(err)
        return
    }
    let uri = 'http://localhost:' + port
    console.log('Listening at ' + uri + '\n')

    // when env is testing, don't need open it
    if (process.env.NODE_ENV !== 'testing') {
        opn(uri)
    }
})
