<template>
    <!-- 商品分类导航 -->
    <div class="type-nav">
        <div class="container">
            <div @mouseleave="leaveShow" @mouseenter="enterShow">
                <h2 class="all">全部商品分类</h2>
                <!-- 过度动画 -->
                <transition name="sort">
                    <!-- 三级联动 -->
                    <div class="sort" v-show="show">
                        <div class="all-sort-list2" @click="goSearch">
                            <!-- 一级分类 -->
                            <div
                                class="item"
                                v-for="(c1,index) in categoryList"
                                :key="c1.categoryId"
                                :class="{cur:currentIndex==index}"
                            >
                                <h3 @mouseenter="changeIndex(index)">
                                    <a
                                        :data-categoryName="c1.categoryName"
                                        :data-category1Id="c1.categoryId"
                                    >{{c1.categoryName}}</a>
                                </h3>
                                <!-- 二级,三级分类 -->
                                <div
                                    class="item-list clearfix"
                                    :style="{display:currentIndex == index?'block':'none'}"
                                >
                                    <div
                                        class="subitem"
                                        v-for="(c2) in c1.categoryChild"
                                        :key="c2.categoryId"
                                    >
                                        <dl class="fore">
                                            <dt>
                                                <a
                                                    :data-categoryName="c2.categoryName"
                                                    :data-category2Id="c2.categoryId"
                                                >{{c2.categoryName}}</a>
                                            </dt>
                                            <dd>
                                                <em
                                                    v-for="(c3) in c2.categoryChild"
                                                    :key="c3.categoryId"
                                                >
                                                    <a
                                                        :data-categoryName="c3.categoryName"
                                                        :data-category3Id="c3.categoryId"
                                                    >{{c3.categoryName}}</a>
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";
export default {
    name: "TypeNav",
    data() {
        return {
            //存储用户鼠标移动到哪一个一级分类
            currentIndex: -1,
            show: true,
        };
    },

    methods: {
        //鼠标进入修改响应式数据currentIndex属性
        // throttle回调函数别用箭头函数,可能出现上下文this
        changeIndex: throttle(function (index) {
            this.currentIndex = index;
        }, 50),

        //一级分类鼠标移出的事件回调
        leaveIndex() {
            //鼠标移出currentIndex的值变为-1
            setTimeout(() => {
                this.currentIndex = -1;
            }, 60);
        },

        // 进行路由跳转的方法
        goSearch(event) {
            //最好的解决方法: 变成是导航 + 事件委派
            // 存在的问题:事件委派,是把全部的子节点[h3,dt,dl,em]的事件委派给父节点
            // 点击a标签的时候,才会进行路由跳转[1.怎么能确定点击的一定是a标签][2.如何确定是某一级的a标签]
            // 1在子节点当中的a标签,加上自定义属性data-categoryName,其余的子节点没有
            let element = event.target;
            // 获取到当前触发事件的节点[h3,a,dt,dl],需要带有data-categoryName这样的节点[一定是a标签]
            // 节点有一个属性dataset, 可以获取节点的自定义属性与属性值
            // console.log(element.dataset);
            let {
                // 给 a 定义自定义属性:categoryname
                // 通过 categoryname 来区分是否是a标签
                categoryname,
                // 通过1/2/3id来区分是第几级的数据
                category1id,
                category2id,
                category3id,
            } = element.dataset;
            // 如果标签身上有categoryname属性, 则一定是a标签
            if (categoryname) {
                // 整理路由跳转的参数
                let location = { name: "search" };
                // 最终的路由跳转:
                // this.$router.push({name:'/search',query:{categoryName:'xxx',1id/2id:'xxx'}})
                // 不管是第几级的数据,都需要带name
                // 所以先定义location -> name
                // 因为无法区分用户点击的是几级标签,所以动态的添加
                let query = { categoryName: categoryname };

                if (category1id) {
                    query.category1Id = category1id;
                } else if (category2id) {
                    query.category2Id = category2id;
                } else if (category3id) {
                    query.category3Id = category3id;
                }
                // 判断:如果路由跳转的时候,带有params参数,也要一并传过去
                if (this.$route.params) {
                    // 整理参数
                    location.query = query;
                    location.params = this.$route.params;
                    // 此时的location格式为:
                    // location={
                    //     name:'search',
                    //     query:{
                    //         categoryName:'xxx',
                    //         category1Id:'xxx'
                    //     },
                    //     params:{
                    //         keyword: "xxx";
                    //      }
                    // }
                    // 路由跳转
                    this.$router.push(location);
                }
            }
        },

        // 当鼠标移入的时候让商品分类列表展示
        enterShow() {
            this.show = true;
        },

        //当鼠标离开的时候,让商品分类列表进行隐藏
        leaveShow() {
            this.currentIndex = -1;
            // 判断是Search组件的时候才会执行
            if (this.$route.path != "/home") {
                this.show = false;
            }
        },
    },

    //组件挂载完毕:可以向服务器发送请求
    mounted() {
        // 当组件挂载完毕,让show属性变为false
        // 如果不是home路由组件,将typeNav组件隐藏
        if (this.$route.path != "/home") {
            this.show = false;
        }
    },

    computed: {
        ...mapState({
            //对象的写法:右侧是一个函数,当时用这个计算属性的时候,右侧函数会立刻执行一次
            // 注入一个参数state,其实即为大仓库中的数据
            categoryList: (state) => {
                return state.home.categoryList;
            },
        }),
    },
};
</script>

<style lang="less" scoped>
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    // &:hover {
                    //     .item-list {
                    //         display: block;
                    //     }
                    // }
                }
                .cur {
                    background-color: skyblue;
                    a {
                        text-decoration: none;
                    }
                }
            }
        }

        // 过渡动画的样式
        // 过渡动画开始/结束
        .sort-enter,
        .sort-leave-to {
            height: 0px;
        }
        .sort-enter-to,
        .sort-leave {
            height: 461px;
        }
        // 动画事件,速率
        .sort-enter-active,
        .sort-leave-active {
            overflow: hidden;
            transition: all 0.15s linear;
        }
    }
}
</style>