import ajax from '@/assets/scripts/ajax'

export const verifyPassword = message => ({
    required: true,
    min: 6,
    max: 15,
    trigger: 'blur',
    message: message || '请正确输入密码',
})

export const verifyUsername = message => ({
    required: true,
    min: 2,
    max: 10,
    message: '请输入正确的用户名',
    pattern: /^([0-9a-zA-Z]|[\u4e00-\u9fa5]){2,10}$/,
    trigger: 'blur',
})

export const verifyEmail = message => ({
    required: true,
    type: 'email',
    trigger: 'blur',
    message: message || '请正确输入邮箱',
})

const validatePass = async (rule, value, callback) => {
    const reg = /^1[34578]\d{9}$/
    if (!new RegExp(reg).test(value)) {
        callback(new Error('请正确输入电话号码'))
    } else {
        const { success } = await ajax.patch('/user/validetephonenum', { phone: value })
        if (!success) {
            callback(new Error('该手机号已被注册,请更换手机号'))
        } else {
            callback()
        }
    }
}

export const verifyPhome = message => ({
    required: true,
    max: 11,
    trigger: 'blur',
    validator: validatePass,
})
