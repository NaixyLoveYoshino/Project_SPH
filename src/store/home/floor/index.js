//home-floor模块的仓库
import { reqFloorList } from "@/api"

//state:仓库,存储数据
const state = {
    //state中的数据默认初始值设置为空,服务器返回的值是根据接口返回值初始化的
    floorList: []
}
//mutations: 修改state的唯一手段
const mutations = {
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList
    }
}
//action: 处理action,可以书写自己的业务逻辑,也可以处理异步
const actions = {
    //可以书写业务逻辑,但是不能修改state
    //通过api里面的接口函数调用,向服务器发送请求,获取服务器数据
    // 获取floor数据
    async getFloorList({ commit }) {
        let result = await reqFloorList()
        if (result.code == 200) {
            //提交mutation
            commit("GETFLOORLIST", result.data)
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