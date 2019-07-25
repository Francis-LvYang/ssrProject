import CryptoJS from 'crypto-js'

const key = CryptoJS.enc.Utf8.parse(CryptoJS.MD5('auther123').toString())
const iv = CryptoJS.enc.Utf8.parse(CryptoJS.MD5(key).toString().substr(0, 16))


// 加密方法
export const encrypt = (data) => {
    let encrypted = ''
    if (typeof (data) === 'string') {
        encrypted = CryptoJS.AES.encrypt(data, key, {
            iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.ZeroPadding,
        })
    } else if (typeof (data) === 'object') {
        data = JSON.stringify(data)
        encrypted = CryptoJS.AES.encrypt(data, key, {
            iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.ZeroPadding,
        })
    }
    return encrypted.toString()
}
// AES解密
export const decrypt = (data) => {
    let decrypted = ''
    decrypted = CryptoJS.AES.decrypt(data, key, {
        iv,
        mode: CryptoJS.AES.CBC,
        padding: CryptoJS.pad.ZeroPadding,
    })
    return decrypted.toString(CryptoJS.enc.Utf8)
}
