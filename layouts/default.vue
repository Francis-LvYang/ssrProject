<template>
    <div class="default">
        <i-layout>
            <i-header>
                <div class="cui_hd_cont">
                    <div class="cui_hd">
                        <h1 class="line-titles">XXXXXX最新动态</h1>
                        <marquee class="marquee" direction="left" behavior="scroll" scrollamount="15" scrolldelay="200" onmouseover="this.stop();" onmouseout="this.start();">
                            <div style="font-size: 14px;">
                                <a style="color: #989292;font-family: '微软雅黑';margin-right: 100px;" href="https://www.kangantu.com/a/guanyuwomen/kangangonggao/2017/0111/74.html" target="_blank">
                                    康安途获得东方富海首轮1200万融资，医疗旅游康安途服务水平又上新台阶！</a>
                                <a style="color: #989292;font-family: '微软雅黑';margin-right: 100px;" href="https://www.kangantu.com/a/guanyuwomen/kangangonggao/2017/0421/599.html" target="_blank">
                                    印度吉三代MYHEP ALL震撼上市！最新价格用药指南抢先看</a>
                                <a style="color: #989292;font-family: '微软雅黑';margin-right: 100px;" href="https://www.kangantu.com/a/guanyuwomen/kangangonggao/2017/0112/121.html" target="_blank">
                                    为方便与患者进行面对面沟通，康安途招全国代理加盟，已经全球21个城市建立了办事处，业务咨询：4006-120-152 / 17717564881（微信） 加盟咨询：17191767406</a>
                            </div>
                        </marquee>
                    </div>
                    <div class="cui_btn" v-if="!user.id">
                        <i-button size="small" type="warning" @click="$router.push('/admin/posts')">登录</i-button>
                        <i-button size="small" type="success" @click="$router.push('/admin/register')">注册</i-button>
                    </div>
                    <div class="cui_btn" v-else>
                        <p>亲爱的{{ userName }}阁下，您好！</p>
                        <i-button size="small" type="error" @click.native="handleLogout">退出</i-button>
                    </div>
                </div>
                <div class="header">
                    <div class="header__left">
                        <nuxt-link to="/">{{ siteName }}欢迎{{ userName || '您！' }}</nuxt-link>
                    </div>
                    <div
                        class="header__center"
                        :class="showNav ? 'sm-show' : ''"
                    >
                        <div class="center_nav">
                            <ul>
                                <li v-for="(item, index) in navs" :key="index">
                                    <nuxt-link
                                        :to="item.path"
                                    >{{item.title}}</nuxt-link>
                                </li>
                            </ul>
                        </div>
                        <div class="center_search">
                            <i-input
                                :maxlength="30"
                                v-model="keywords"
                                style="width: 200px"
                                search
                                @on-search="handleSearch"
                                autocomplete="off"
                                placeholder="搜索"
                            ></i-input>
                        </div>
                    </div>
                    <div class="header__right">
                        <i-icon
                            type="md-menu"
                            @click.native="showNav = !showNav"
                        />
                    </div>
                </div>
            </i-header>
            <div style="height: 60px"></div>
            <i-content>
                <nuxt/>
            </i-content>
            <div class="footer-info">
                <ul>
                    <li>印度代购是出国看病的领导者,国内第一家赴印度治疗丙肝、乙肝的团队。印度丙肝新药索非布韦、达卡他韦，吉二代，吉印度Mylan产吉三代Hepbest已经在印度上市，治疗所有分型丙肝。印度乙肝TAF新方案，副作用小，价格低，Mylan产已经在印度上市。肿瘤癌症最新方案AZD9291,PD-1。糖尿病新药恩格列净。</li>
                    <li>Copyright © 2015-2019&nbsp; 康安途 - 上海柯棣健康管理咨询有限公司&nbsp; 版权所有 |<a href="http://www.miibeian.gov.cn/state/outPortal/loginPortal.action ">沪ICP备15022986号-1</a>
                        <!--<script type="text/javascript">-->
                        <!--var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://"); document.write(unescape("%3Cspan id='cnzz_stat_icon_1271884181'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s19.cnzz.com/z_stat.php%3Fid%3D1271884181%26show%3Dpic' type='text/javascript'%3E%3C/script%3E"));-->
                        <!--</script><span id="cnzz_stat_icon_1271884181"><a href="https://www.cnzz.com/stat/website.php?web_id=1271884181" target="_blank" title="站长统计"><img border="0" hspace="0" vspace="0" src="https://icon.cnzz.com/img/pic.gif"></a></span><script src=" https://s19.cnzz.com/z_stat.php?id=1271884181&amp;show=pic" type="text/javascript"></script><script src="https://c.cnzz.com/core.php?web_id=1271884181&amp;show=pic&amp;t=z" charset="utf-8" type="text/javascript"></script>-->
                    </li>
                </ul>
            </div>
            <!--<div class="write" @click="$router.push('/admin/posts')">-->
            <!--<span class="wmui icon-feather"></span>-->
            <!--</div>-->
        </i-layout>
    </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
    name: 'Default',
    head() {
        return {
            title: this.seo.title,
            meta: [
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: this.seo.keywords,
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: this.seo.description,
                },
            ],
        }
    },
    data() {
        return {
            keywords: this.$route.name === 'search-id' ? this.$route.params.id : '',
            showNav: false,
            userName: '',
        }
    },
    computed: {
        ...mapState('global', ['siteName', 'copyRight', 'seo']),
        ...mapState('user', ['user', 'users']),
        ...mapState('page', ['pages']),
        navs() {
            const pages = this.pages.map(i => ({
                title: i.name,
                path: `/pages/${i.id}`,
            }))
            return [
                {
                    title: '首页',
                    path: '/',
                },
                {
                    title: '分类',
                    path: '/categories',
                },
                {
                    title: '标签',
                    path: '/tags',
                },
                ...pages,
            ]
        },
    },
    watch: {
        $route() {
            this.showNav = false
        },
    },
    methods: {
        ...mapActions('user', [
            'logout',
            'login',
            'register',
            'getUser',
        ]),
        handleSearch(keywords) {
            if (keywords) {
                this.$router.push(`/search/${keywords}`)
            }
        },
        // 退出
        async handleLogout() {
            await this.logout()
            this.userName = ''
            this.$router.push('/')
        },
    },
    mounted() {
        this.userName = this.user.username
    },
}
</script>

<style lang="less">
.default {
    position: relative;
    .nuxt-link-exact-active {
        color: #64b587 !important;
    }
    .ivu-layout {
        background: #fff;
    }
    .cui_hd_cont {
        background: #f5f5f5;
        border-bottom: 1px solid #eee;
        height: 35px;
        width: 100%;
        position: relative;
        z-index: 10;
        display: flex;
        justify-content: center;
        .cui_hd {
            min-width: 960px;
            height: 35px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            .line-titles {
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 0 10px;
                height: 25px;
                background: #74a8ed;
                color: #fff;
                font-size: 12px;
                font-weight: bold;
                border-radius: 2px;
                line-height: 22px;
                margin-right: 20px;
            }
            .marquee {
                position: relative;
                width: 705px;
                float: right;
            }
        }
        .cui_btn {
            min-width: 100px;
            display: flex;
            align-items: center;
            justify-content: space-around;
            margin-right: 200px;
        }
    }
    .ivu-layout-header {
        background: #fff;
        height: 95px;
        line-height: 60px;
        padding: 0 15px;
        width: 100%;
        border-bottom: 1px solid #f3f3f3;
        position: fixed;
        z-index: 9;
    }
    .ivu-icon-md-menu {
        display: none;
    }
    .header {
        max-width: 960px;
        margin: 0 auto;
        font-size: 18px;

        .header__left {
            float: left;
            margin-right: 10px;
            a {
                color: #666 !important;
            }
        }
        .header__center {
            display: flex;
            justify-content: space-between;
            .center_nav {
                li {
                    display: inline-block;
                    list-style: none;
                    a {
                        display: block;
                        padding: 0 15px;
                        color: #666;
                    }
                }
            }
        }
        .header__right {
            float: right;
        }
    }
    .footer-info {
        max-width: 1200px;
        line-height: 24px;
        margin: 20px auto 0;
        color: #6c6c6c;
        text-align: center;
        position: fixed;
        bottom: 0;
        > ul {
            max-width: 1200px;
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            list-style: none;
            font-size: 12px;
            margin: 0 auto;
        }
    }
    .write {
        position: fixed;
        box-sizing: border-box;
        color: #64b587;
        right: 15px;
        bottom: 30px;
        font-weight: bolder;
        line-height: 1;
        padding: 10px;
        background: #fff;
        border-radius: 50%;
        box-shadow: 0 2px 2px #ccc;
        cursor: pointer;
        .icon-feather {
            font-size: 20px;
        }
    }
}

@media screen and (max-width: 900px) {
    .default {
        .ivu-icon-md-menu {
            font-size: 30px;
            display: inline-block !important;
        }
        .ivu-input-type {
            width: 100% !important;
        }
        .sm-show {
            display: block !important;
        }
        .header {
            .header__center {
                display: none;
                background: #fff;
                position: absolute;
                width: 100%;
                top: 60px;
                left: 0px;
                .center_nav {
                    border-bottom: 1px solid #eee;
                }

                .center_search {
                    padding: 0 15px;
                    margin-left: 0;
                    border-bottom: 1px solid #eee;
                }
            }
        }
    }
}
</style>
