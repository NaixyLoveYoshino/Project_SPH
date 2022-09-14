//search模块的仓库
import { reqGetSearchInfo } from "@/api"
//state:仓库,存储数据
const state = {
    // 仓库初始状态
    searchList: {},
}
//mutations: 修改state的唯一手段
const mutations = {
    GETSEARCHINFO(state, searchList) {
        state.searchList = searchList
    }
}
//action: 处理action,可以书写自己的业务逻辑,也可以处理异步
const actions = {
    //可以书写业务逻辑,但是不能修改state
    async getSearchList({ commit }, params = {}) {
        // reqGetSearchInfo在调用获取服务器数据的时候,至少传递一个参数(空队对象)
        // params参数 是当用户派发action的时候,第二个参数传递过来,至少是个空对象
        let result = await reqGetSearchInfo(params)
        if (result.code == 200) {
            commit("GETSEARCHINFO", result.data)
        }
    }
}
//getters:理解为计算属性,用于简化仓库数据,让组件获取仓库的数据更加方便
// 可以把将来在组件当中需要用到的数据简化一下
const getters = {
    goodsList(state) {  //此处的state是当前仓库的state,而不是store仓库的state
        return state.searchList.goodsList || []
    },
    trademarkList(state) {
        return state.searchList.trademarkList || []
    },
    attrsList(state) {
        return state.searchList.attrsList || []
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}