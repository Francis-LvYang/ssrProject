<template>
    <div class="register">
        <i-card style="width: 450px;margin: 100px auto;">
            <h3 slot="title">用户注册</h3>
            <i-form :model="registerUser" :rules="rules" ref="form">
                <i-form-item prop="username" label="用户名：">
                    <i-input v-model="registerUser.username" type="text" placeholder="请输入用户名" size="large"></i-input>
                </i-form-item>
                <i-form-item prop="email" label="邮箱：">
                    <i-input v-model="registerUser.email" type="text" placeholder="请输入邮箱"></i-input>
                </i-form-item>
                <i-form-item prop="password" label="密码：">
                    <i-input v-model="registerUser.password" type="text" placeholder="请输入密码"></i-input>
                </i-form-item>
                <i-form-item prop="phone" label="电话号码：">
                    <i-input v-model="registerUser.phone" type="text" placeholder="请输入电话号码"></i-input>
                </i-form-item>
                <i-form-item
                    prop="code"
                    label="验证码："
                >
                    <i-input
                        v-model="registerUser.code"
                        placeholder="请输入验证码"
                    >
                        <p slot="append">
                            <img
                                :src="codeSrc"
                                alt="code"
                                @click="handleCode"
                            >
                        </p>
                    </i-input>
                </i-form-item>
                <i-form-item>
                    <i-button type="primary" long @click.native="registerforUser">注册</i-button>
                </i-form-item>
            </i-form>
        </i-card>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import {
    verifyPassword, verifyEmail, verifyUsername, verifyPhome,
} from '~/assets/libs/validate'

export default {
    name: 'Register',
    layout: 'base',
    data() {
        return {
            codeSrc: '/api/code',
            registerUser: {
                role: 'user',
                username: '',
                email: '',
                password: '',
                phone: '',
                loginMode: 'register',
            },
            rules: {
                username: verifyUsername(),
                email: verifyEmail(),
                password: verifyPassword(),
                phone: verifyPhome(),
                code: {
                    required: true,
                    min: 4,
                    trigger: 'blur',
                    message: '请正确输入验证码',
                },
            },
        }
    },
    methods: {
        ...mapActions('user', [
            'register',
        ]),
        registerforUser() {
            this.$refs.form.validate(async (valide) => {
                if (valide) {
                    await this.register(this.registerUser)
                    this.$Message.info(`感谢${this.registerUser.username}支持！`)
                    this.$router.push('/login')
                }
            })
        },
        handleCode() {
            this.codeSrc = `${this.codeSrc}?v=${Date.now()}`
        },
    },
}
</script>
<style lang="less">
 .register{
     .ivu-input-group-append {
         padding: 0 !important;
         img {
             display: block;
             width: 80px;
             height: 38px;
         }
     }
     .ivu-input-large {
         height: 40px;
     }
 }
</style>
