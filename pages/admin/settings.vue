<template>
    <div class="admin-setting container-admin">
        <h3 slot="title">密码修改</h3>
        <i-cord dis-hover>
            <i-form :model="updateUserPas" :rules="rules" ref="form">
                <i-form-item
                    prop="password"
                    label="原始密码："
                >
                    <i-input
                        type="text"
                        placeholder="请输入原始密码"
                        size="large"
                        v-model="updateUserPas.oldPassword"
                    >
                    </i-input>
                </i-form-item>
                <i-form-item
                    prop="fixpassword"
                    label="修改密码："
                >
                    <i-input
                        type="text"
                        placeholder="请输入修改密码"
                        size="large"
                        v-model="updateUserPas.newPassword"
                    >
                    </i-input>
                </i-form-item>
                <i-form-item>
                    <i-button type="primary" long style="margin-top: 20px;" @click="updatePassword">
                        确认
                    </i-button>
                </i-form-item>
            </i-form>
        </i-cord>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { verifyPassword } from '~/assets/libs/validate'

export default {
    name: 'AdminSettings',
    layout: 'admin',
    middleware: 'admin',
    data: () => ({
        updateUserPas: {
            oldPassword: '',
            newPassword: '',
        },
        rules: {
            oldPassword: verifyPassword(),
            newPassword: verifyPassword(),
        },
    }),
    methods: {
        ...mapActions('user', ['patchPassword']),
        updatePassword() {
            this.$refs.form.validate(async (valid) => {
                if (valid) {
                    this.patchPassword(this.updateUserPas).then((res) => {
                        if (res) {
                            this.$Message.success({
                                content: '修改密码成功!',
                            })
                        }
                    })
                }
            })
        },
    },
}
</script>
<style lang="less">
    .admin-setting {
        width:400px;
        margin: 100px auto;
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
