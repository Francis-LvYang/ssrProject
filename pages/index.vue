<template>
    <div class="index container">
        <!--<base-list></base-list>-->
        <!-- banner轮播 -->
        <div class="banner">
            <i-carousel :autoplay="true" :autoplay-speed="10000" :height="510" :loop="config.bannerList.length > 1">
                <CarouselItem v-for="(d, i) in config.bannerList" :key="i">
                    <!--  src="~./images/banner-缺省.png"  -->
                    <div :style="{ backgroundImage: `url(${d.pcImageUrl})` }" :class="`banner banner-${d.type}`" @click="toClickBanner(d)">
                        &nbsp;
                    </div>
                </CarouselItem>
            </i-carousel>
        </div>
        <!-- 讨论区(以及新产品) -->
        <div class="category">
            <div class="taolunqu">
                <h3>讨论区</h3>
            </div>
            <base-list></base-list>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
    name: 'Index',
    data() {
        return {
            config: {
                bannerList: [
                    {
                        appImageUrl: 'https://pre-maintain.s3.amazonaws.com/1/1/banner/8/76b82678bd7a4054a6363f44a7dcaeb1.jpg',
                        appUrl: '',
                        h5ImageUrl: 'https://pre-maintain.s3.amazonaws.com/1/1/banner/8/babe4a3548a84350bffc4f173339299a.jpg',
                        h5Url: '',
                        id: 167,
                        name: '11',
                        pcImageUrl: 'https://www.kangantu.com/uploads/191030/7-191030143ZO53.png',
                        pcUrl: '',
                        sortOrder: 1,
                        targetId: 0,
                        type: 0,
                    },
                    {
                        appImageUrl: 'https://pre-maintain.s3.amazonaws.com/1/1/banner/8/43d9db934d744773a43c9320f3c2b745.jpg',
                        appUrl: '',
                        h5ImageUrl: 'https://pre-maintain.s3.amazonaws.com/1/1/banner/8/4809b2ae39ad4240b454ead9e0ecd110.jpg',
                        h5Url: '',
                        id: 168,
                        name: '22',
                        pcImageUrl: 'https://pre-maintain.s3.amazonaws.com/1/1/banner/8/e99115678a904279affd1753f415bbc4.jpg',
                        pcUrl: '',
                        sortOrder: 2,
                        targetId: 0,
                        type: 0,
                    },
                    {
                        appImageUrl: 'https://pre-maintain.s3.amazonaws.com/1/1/banner/8/43d9db934d744773a43c9320f3c2b745.jpg',
                        appUrl: '',
                        h5ImageUrl: 'https://pre-maintain.s3.amazonaws.com/1/1/banner/8/4809b2ae39ad4240b454ead9e0ecd110.jpg',
                        h5Url: '',
                        id: 168,
                        name: '22',
                        pcImageUrl: 'https://www.kangantu.com/uploads/191030/7-191030135320517.png',
                        pcUrl: '',
                        sortOrder: 2,
                        targetId: 0,
                        type: 0,
                    },
                ],
            },
        }
    },
    async fetch({ store, route }) {
        const { article } = store.state
        store.commit('article/setArticlesNull')
        await Promise.all([
            store.dispatch('article/getArticles', { page: 1 }),
            store.dispatch('article/getArticlesTop'),
        ])
    },
    beforeRouteLeave(to, from, next) {
        this.$store.commit('article/setArticlesTopNull')
        next()
    },
}
</script>
<style lang="less" scoped>
.index {
    .banner {
        max-width: 1200px;
        height: 100%;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin: 0 auto;
        border-radius: 10px;
        &-0,
        &-1 {
            cursor: pointer;
        }
    }
    /deep/ .ivu-carousel-arrow {
        display: none;
    }
    /deep/ .ivu-carousel-dots {
        width: 310px;
        text-align: right;
        left: 50%;
        bottom: 20px;
        margin-left:10px;
        z-index: 1;

        display: flex;
        flex-wrap: nowrap;
        justify-content: flex-end;

        li {
            flex: 1 1 auto;
            max-width: 60px;
        }
        button {
            width: 100%;
            height: 8px;
            border-radius: 4px;
        }

        .ivu-carousel-active button {
            background-color: #fff;
        }
    }
    .category {
        .taolunqu {
            margin: 10px auto;
        }
        width: 980px;
        margin: 10px auto;
    }
    .article {
        margin-top: 30px;
        margin-bottom: 30px;
        .main {
            .content {
                margin-bottom: 15px;
            }
            .title {
                font-size: 14px;
                margin-bottom: 15px;
                text-align: right;
            }
        }
    }
}
</style>
