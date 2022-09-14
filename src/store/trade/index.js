
import { reqAddressInfo, reqOrderInfo } from "@/api"

const state = {
    address: [],
    order: {},
}
const mutations = {
    GETUSERADDRESS(state, address) {
        state.address = address || [{
            
        }]
    },
    GERORDERINFO(state, order) {
        state.order = order
    }
}

const actions = {
    // 获取用户地址信息
    async getUserAddressInfo({ commit }) {
        let result = await reqAddressInfo()
        if (result.code == 200) {
            commit("GETUSERADDRESS", result.data)
        }
    },
    // 获取商品清单的数据
    async getOrderInfo({ commit }) {
        let result = await reqOrderInfo()
        if (result.code == 200) {
            commit("GERORDERINFO", result.data)
        }
    }
}
const getters = {

}

export default {
    state,
    mutations,
    actions,
    getters
}