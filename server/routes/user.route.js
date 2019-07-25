const router = require('express').Router()
const svgCaptcha = require('svg-captcha')
const user = require('../controllers/user.controller')
const check = require('../middlewares/check.middleware')

router
    .get('/users',
        check.auth('token'),
        user.getUsers)
    .get('/user',
        check.auth('token'),
        user.getUserInfo)
    .get('/user-base/:id',
        user.getUserInfo)
    .post('/user',
        check.formData(['username', 'email', 'password']),
        user.postUser) // 注册
    .patch('/user/validetephonenum',
        check.formData(['phone']),
        user.patchPhone) // 验证手机号
    .patch('/user',
        check.auth('token'),
        user.patchUserInfo)
    .patch('/user/password',
        check.formData(['oldPassword', 'newPassword']),
        check.auth('token'),
        user.patchPassword)
    .post('/login',
        check.formData(['email', 'password', 'code']),
        user.login)
    .post('/logout',
        check.auth('token'),
        user.logout)
    .get('/get-img-verify', check.auth('token'), (req, res) => {
        const code = svgCaptcha.create({
            size: 5,
            ignoreChars: '0o1i',
            noise: 2,
            color: true,
            background: '#cc9966',
            mathMin: 4,
            mathMax: 6,
        })
        try {
            res.send({
                data: code.data,
            })
        } catch (error) {
            res.send({
                data: error,
            })
        }
    })

module.exports = router
