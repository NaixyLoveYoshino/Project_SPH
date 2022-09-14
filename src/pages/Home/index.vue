<template>
    <div>
        <!-- 三级联动TypeNav已经注册为全局组件 -->
        <TypeNav></TypeNav>
        <ListContainer></ListContainer>
        <Recommend></Recommend>
        <Rank></Rank>
        <Like></Like>
        <Floor v-for="(floor) in floorList" :key="floor.id" :list="floor"></Floor>
        <Brand></Brand>
    </div>
</template>

<script>
import ListContainer from "./ListContainer";
import Recommend from "./Recommend";
import Rank from "./Rank";
import Like from "./Like";
import Floor from "./Floor";
import Brand from "./Brand";

import { mapState } from "vuex";

export default {
    name: "Home",
    components: { ListContainer, Recommend, Rank, Like, Floor, Brand },
    computed: {
        ...mapState({
            floorList: (state) => state.floor.floorList,
        }),
    },
    mounted() {
        // 派发action,获取Floor组件的数据
        this.$store.dispatch("getFloorList");
        // // 获取用户信息在首页展示
        // this.$store.dispatch("getUserInfo");
    },
};
</script>

<style>
</style>