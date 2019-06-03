const jwt = require('jsonwebtoken')
const globalConfig = require('../config/global.config')

const { secret, expiresIn, algorithm } = globalConfig.jwt
console.log(secret, expiresIn, algorithm, 111)

// {username: 'q', _id: 'asdf'} => token
exports.sign = (user) => {
    const token = jwt.sign({
        username: user.username,
        role: user.role,
        userId: user._id,
        createdAt: user.createdAt,
    }, secret, {
        expiresIn,
    })
    console.log(token)
    return token
}
// token => {username: 'q', userId: 'asdf'}
exports.verify = (token) => {
    const decoded = jwt.verify(token, secret)
    return decoded
}
