import { reqCartList, reqDeleteCartById, reqUpdataCheckedById } from "@/api"

const state = {
    cartList: []
}
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
}

const actions = {
    // 获取购物车列表
    async getCartList({ commit }) {
        let result = await reqCartList()
        if (result.code == 200) {
            commit("GETCARTLIST", result.data)
        }
    },
    // 删除购物车某一个产品
    async deleteCartListBySkuId({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId)
        if (result.code == 200) {
            return "ok"
        } else {
            Promise.reject(new Error("faile"))
        }
    },
    // 修改购物车商品选中状态
    async updataCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdataCheckedById(skuId, isChecked)
        if (result.code == 200) {
            return "ok"
        } else {
            return Promise.reject(new Error("'faile"))
        }
    },
    // 删除全部勾选的商品
    deleteAllCheckedCart({ dispatch, getters, state, commit }) {
        // console.log(context); 
        // context可以理解为小仓库,commit:[提交mutations修改state],getters:[计算属性],dispatch:[派发actions],state:[当前仓库数据]
        // 获取购物车当中全部的商品(是一个数组)
        let PromiseAll = [];
        getters.cartList.cartInfoList.forEach(item => {
            let pormise = item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : '';
            // 将每一次的Promise返回值添加到数组中
            PromiseAll.push(pormise)
        })
        // 只要全部单位都成功.则返回成功,如果有一个失败,返回的结果即为失败
        return Promise.all(PromiseAll)
    },
    // 修改全部产品的状态
    updataAllCartIsChecked({ dispatch, state }, isChecked) {
        let promiseAll = []
        state.cartList[0].cartInfoList.forEach(item => {
            let promise = dispatch('updataCheckedById', { skuId: item.skuId, isChecked })
            promiseAll.push(promise)
        })
        // 最终返回结果
        return Promise.all(promiseAll)
    }
}
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    },
    // 计算出啦的购物车数据
    // cartInfoList(state){
    //     return state.
    // }
}

export default {
    state,
    mutations,
    actions,
    getters
}