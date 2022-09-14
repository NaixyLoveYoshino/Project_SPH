
import { reqGetCode, reqUserLogin, reqUserRegister, reqUserInfo, reqLogout } from "@/api"
import { setToken, getToken, removeToken } from "@/utils/token"

const state = {
    code: '',
    token: getToken(),
    userInfo: {}
}
const mutations = {
    GERCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    CLEARUSER(state) {
        // 将仓库中相关信息清空
        state.token = '';
        state.userInfo = {};
        // 本地存储数据清空
        removeToken()

    }
}

const actions = {
    // 获取验证码:将验证码返回,正常情况是把验证码发到用户手机上[省钱]
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone)
        if (result.code == 200) {
            commit("GERCODE", result.data)
            return "ok"
        } else {
            return Promise.reject(new Error("faile"))
        }
    },
    // 用户注册
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user)
        if (result.code == 200) {
            return "ok"
        } else {
            return Promise.reject(new Error("faile"))
        }
    },
    // 用户登录[token]
    async userLogin({ commit }, user) {
        let result = await reqUserLogin(user)
        if (result.code == 200) {
            commit("USERLOGIN", result.data.token)
            // 本地持久化存储token
            setToken(result.data.token)
            return "ok"
        } else {
            console.log(result);
            return Promise.reject(new Error("faile"))
        }
    },
    // 获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo()
        if (result.code == 200) {
            commit("GETUSERINFO", result.data)
            return "ok"
        } else {
            return Promise.reject(new Error("faile"))
        }
    },
    // 退出登录
    async userLogout({ commit }) {
        // 向服务器发起一次请求,通知服务器清除token
        let result = await reqLogout()
        if (result.code == 200) {
            // action 里面不能操作state,需要提交到mutations修改state
            commit("CLEARUSER")
            return 'ok'
        } else {
            return Promise.reject(new Error("faile"))
        }
    }

}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}