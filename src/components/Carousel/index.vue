<template>
    <div class="floorBanner">
        <div class="swiper-container" ref="cur">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(carousel) in list" :key="carousel.id">
                    <img :src="carousel.imgUrl" />
                </div>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>
            <!-- 如果需要导航按钮 -->
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
        </div>
    </div>
</template>

<script>
import Swiper from "swiper";
export default {
    name: "Carousel",
    props: ["list"],
    watch: {
        list: {
            // 此处由于是父组件使用props传过来的数据,所以数据从未改变,则数据监视无法检测到变化,即无法运行下列函数,所以使用immediate,立即监听一次
            immediate: true, //立即监听一次
            handler(newValue, oldValue) {
                // 监听到数据已经有了,但是v-for动态渲染的结构还是没有办法确定,因此还是需要用到nextTick
                // 只有v-for执行完毕以后才有结构[目前watch中无法保证]
                // 所以使用nextTick:在下次DOM更新,循环结束(v-for结束)以后执行延迟回调,在修改数据后立刻立刻使用这个方法,获取更新后的数据
                this.$nextTick(() => {
                    // 当执行这个回调时,此时服务器数据已经获取到
                    var mySwiper = new Swiper(this.$refs.cur, {
                        // direction: 'vertical', // 垂直切换选项
                        loop: true, // 循环模式选项

                        // 如果需要分页器
                        pagination: {
                            el: ".swiper-pagination",
                            clickable: true,
                        },

                        // 如果需要前进后退按钮
                        navigation: {
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev",
                        },

                        // 如果需要滚动条
                        // scrollbar: {
                        //     el: '.swiper-scrollbar',
                        // },
                    });
                });
            },
        },
    },
};
</script>

<style>
</style>