<template>
    <div>
        <Header></Header>
        <!-- 路由组件出口的地方 -->
        <router-view></router-view>
        <Footer v-show="$route.meta.show"></Footer>
    </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
    name: "App",
    components: { Header, Footer },
    mounted() {
        // 派发action,获取商品分类三级联动的数据
        // 通知 Vuex 发请求,获取数据,存储于仓库当中
        this.$store.dispatch("categoryList");
    },
};
</script>

<style>
</style>
