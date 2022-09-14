// 引入mockjs模块
import Mock from "mockjs";
// 把JSON数据格式引入进来
// webpack默认对外暴露:图片,JSON数据格式
import banner from "./banner.json"
import floors from "./floor.json"

// 模拟首页轮播图数据
Mock.mock("/mock/banner", { code: 200, data: banner })
// 模拟楼层数据
Mock.mock("/mock/floor", { code: 200, data: floors })

// 最后需要在main.js中引入执行一次(至少执行一次)