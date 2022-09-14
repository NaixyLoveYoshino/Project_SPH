//home模块的仓库

import { reqCategoryList, reqGetBannerList } from "@/api"

//state:仓库,存储数据
const state = {
    //state中的数据默认初始值设置为空,服务器返回的值是根据接口返回值初始化的
    categoryList: [],
    bannerList: [],
}
//mutations: 修改state的唯一手段
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    GERBANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    }
}
//action: 处理action,可以书写自己的业务逻辑,也可以处理异步
const actions = {
    //可以书写业务逻辑,但是不能修改state
    //通过api里面的接口函数调用,向服务器发送请求,获取服务器数据
    async categoryList({ commit }) {
        let result = await reqCategoryList()
        // console.log(result);
        if (result.code == 200) {
            commit("CATEGORYLIST", result.data.slice(0, 15))
        }
    },

    // 获取首页轮播图数据
    async getBannerList({ commit }) {
        let result = await reqGetBannerList()
        if (result.code == 200) {
            commit('GERBANNERLIST', result.data)
        }
    }
}
//getters:理解为计算属性,用于简化仓库数据,让组件获取仓库的数据更加方便
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}