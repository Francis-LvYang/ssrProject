<template>
    <div class="login">
        <i-card
            style="width:450px; margin: 100px auto;"
            dis-hover
        >
            <h3 slot="title">登录</h3>
            <i-form
                :model="user"
                :rules="rules"
                ref="form"
            >
                <i-form-item
                    prop="email"
                    label="邮箱："
                >
                    <i-input
                        v-model="user.email"
                        type="text"
                        placeholder="请输入邮箱"
                        size="large"
                    >
                    </i-input>
                </i-form-item>
                <i-form-item
                    prop="password"
                    label="密码："
                >
                    <i-input
                        v-model="user.password"
                        type="password"
                        placeholder="请输入密码"
                    >
                    </i-input>
                </i-form-item>
                <i-form-item
                    prop="code"
                    label="验证码："
                >
                    <i-input
                        v-model="user.code"
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
                    <i-button
                        type="primary"
                        long
                        @click="log"
                        style="margin-top: 20px"
                    >登录</i-button>
                    <i-button
                        type="success"
                        long
                        @click="regist"
                        style="margin-top: 20px"
                    >注册</i-button>
                </i-form-item>
            </i-form>
        </i-card>
    </div>
</template>
<script>
import ajax from '@/assets/scripts/ajax'
import { mapState, mapActions, mapMutations } from 'vuex'
import { verifyPassword, verifyEmail, verifyUsername } from '~/assets/libs/validate'
import { encrypt } from '~/utils/crypto'

export default {
    name: 'BaseLogin',
    layout: 'base',
    data() {
        return {
            codeSrc: '/api/code',
            moredCodeSrc: '/api/code?v=1',
            user: {
                email: '',
                password: '',
                code: '',
            },
            rules: {
                password: verifyPassword(),
                email: verifyEmail(),
                code: {
                    required: true,
                    min: 4,
                    trigger: 'blur',
                    message: '请正确输入验证码',
                },
            },
        }
    },
    computed: {
        ...mapState('global', ['siteName']),
    },
    created() {
        if (!Object.keys(this.$store.state.user.user).length) {
            this.handleCode()
        }
    },
    methods: {
        ...mapActions('user', [
            'login',
        ]),
        log() {
            this.$refs.form.validate(async (valid) => {
                if (valid) {
                    const data = await this.login({
                        email: this.user.email,
                        password: encrypt(this.user.password),
                        code: this.user.code,
                    })
                    if (data) {
                        this.$router.push('/')
                    } else {
                        this.handleCode()
                    }
                }
            })
        },
        regist() {
            this.$Modal.confirm({
                title: '提示',
                content: '请问是用户登录还是编辑者登录?',
                onOk: () => {
                    this.$router.push('/admin/register')
                },
                onCancel: () => {},
            })
        },
        async handleCode() {
            this.codeSrc = `${this.codeSrc}?v=${Date.now()}`
        },
    },
}
</script>
<style lang="less">
.login {
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
