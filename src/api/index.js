//当前模块: 所有的API接口进行统一的管理
import requests from './request'
import mockRequest from './mock_Ajax'
//三级联动的接口
// /api/product/getBaseCategoryList get 无参数
//发请求:axios 发请求返回的结果是promise对象
export const reqCategoryList = () => requests({
    url: '/product/getBaseCategoryList',
    method: 'get',
})
// 获取banner (Home首页轮播图插图接口)
export const reqGetBannerList = () => mockRequest.get('/banner')
// 获取floor数据
export const reqFloorList = () => mockRequest.get('/floor')
// 获取Search模块的数据  地址:/api/list 请求方式:post 需要带参数
// #region 例: {
//     "category3Id": "61",
//     "categoryName": "手机",
//     "keyword": "小米",
//     "order": "1:desc",
//     "pageNo": 1,
//     "pageSize": 10,
//     "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
//     "trademark": "4:小米"
//    }
// #endregion
// 当前这个函数需要接收外部传递的参数
// 当前这个接口(获取搜索模块的数据),给服务器传递参数params,至少是一个空对象
export const reqGetSearchInfo = (params) => requests({
    url: "/list",
    method: "post",
    data: params,
})
// 获取商品详情信息的接口   URL:/api/item/{ skuId }   get   需要带参数
export const reqGoodsInfo = (skuId) => requests({
    url: `/item/${skuId}`,
    methods: "get",
})
// 将产品添加到购物车当中(获取更新某一个产品的个数)  post
// /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: "post"
})
// 获取购物车列表的数据接口 URL:/api/cart/cartList  get
export const reqCartList = () => requests({
    url: "/cart/cartList",
    method: "get"
})

// /api/cart/deleteCart/{skuId}  delete
// 删除购物车商品的接口
export const reqDeleteCartById = (skuId) => requests({
    url: `/cart/deleteCart/${skuId}`,
    method: 'delete'
})

// /api/cart/checkCart/{skuId}/{isChecked}  get
// 修改购物车商品选中状态
export const reqUpdataCheckedById = (skuId, isChecked) => requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'get'
})

// 获取验证码 /api/user/passport/sendCode/{phone}   get
export const reqGetCode = (phone) => requests({
    url: `/user/passport/sendCode/${phone}`,
    method: 'get'
})

// /api/user/passport/register  post   phone code password
// 用户注册
export const reqUserRegister = (data) => requests({
    url: `/user/passport/register `,
    data,
    method: "post"
})

// /api/user/passport/login  post  phone password
// 用户登录
export const reqUserLogin = (data) => requests({ url: "/user/passport/login", data, method: 'post' })

// 获取用户信息[需要带着用户token向服务器要用户信息]
// /api/user/passport/auth/getUserInfo  get
export const reqUserInfo = () => requests({
    url: '/user/passport/auth/getUserInfo',
    method: 'get'
})

// 退出登录
// /api/user/passport/logout  get 
export const reqLogout = () => requests({
    url: '/user/passport/logout',
    method: 'get'
})

// 获取用户地址信息 /api/user/userAddress/auth/findUserAddressList  get
export const reqAddressInfo = () => requests({
    url: '/user/userAddress/auth/findUserAddressList',
    method: 'get'
})

// 获取订单交易页信息
// /api/order/auth/trade  get'
export const reqOrderInfo = () => requests({
    url: '/order/auth/trade',
    method: 'get'
})

// /api/order/auth/submitOrder?tradeNo={tradeNo}  post
// 提交订单
export const reqSubmitOrder = (tradeNo, data) => requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data,
    method: 'post'
})

// /api/payment/weixin/createNative/{orderId} get
// 获取订单支付信息
export const reqPayInfo = (orderId) => requests({
    url: `/payment/weixin/createNative/${orderId}`,
    method: 'get'
})

// /api/payment/weixin/queryPayStatus/{orderId}  get
// 获取订单支付状态
export const reqPayStatus = (orderId) => requests({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: 'get'
})

// /api/order/auth/{page}/{limit} get
// 获取我的订单列表
export const reqMyOrdrtList = (page, limit) => requests({
    url: `/order/auth/${page}/${limit}`,
    method: 'get'
})