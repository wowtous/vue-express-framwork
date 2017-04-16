let config = require('../config')
let request = require('request')
let action = {}

// auth process
action.auth = (req, res, next) => {
    if (req.session && req.session.user) {
        // 进行各种权限参数的配置
        //  TODO
        next()
    } else if (req.path = '/login') {
        next()
    } else {
        res.json({
            error: 555,
            errorMsg: '没有登陆或登陆超时，请重新登陆'
        })
    }
}

// logout
action.logout = (req, res) => {
    // 退出登录， 则清空session
    req.session.destroy()
    res.json({
        error: 200,
        errorMsg: "退出登录成功"
    })
}

// user profile
action.profile = (req, res) => {
    if (req.session && req.session.user) {
        res.json({
            error: 200,
            data: req.session.user
        })
    } else {
        res.json({
            error: 555,
            errorMsg: '没有登陆或登陆超时，请重新登陆'
        })
    }
}

// common process action
action.common = (req, res) => {
    let contentType = req.get('Content-Type')
    let obj = {
        url: config['dev']['apiHost'] + ':' + config['dev']['apiPort'] + req.url,
        method: req.method,
        headers: {
            'Content-Type': contentType
        },
        form: contentType === 'text/html' ? undefined : req.body,
        body: contentType === 'text/html' ? req.body : undefined,
        qs: {}
    }
    console.log(obj)

    // 发起请求，并返回
    request(obj, (error, response, body) => {
        if (error) {
            console.log(error)
            res.json({
                error: 555,
                errorMsg: '严重错误(vueServer)'
            })
        } else {
            try {
                let json = JSON.parse(body)
                // 登陆成功就记录一下session
                if (req.path === '/login' && json.error === 200) {
                    req.session.user = json.data
                    console.log('session updated', JSON.stringify(json.data))
                }
                res.json(json)
            } catch (e) {
                console.log(e)
                res.json({
                    error: 555,
                    errorMsg: 'json编译出错'
                })
            }
        }
    })
};

module.exports = {
    mw: require('./middleware'),
    action: action
}
