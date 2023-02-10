import { reqGoodsInfo , reqAddOrUpdateShopCart } from "@/api";
// 封装游客身份模块uuid---》生成一个随机字符串（不能改变）
import { getUUID } from '@/utils/uuid_token'

const state = {
    goodInfo: {},
    // 游客的临时身份
    uuid_token: getUUID()
}
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo
    }
};
const actions = {
    // 获取产品信息的action
    async getGoodInfo({ commit }, skuid) {
        let result = await reqGoodsInfo(skuid)
        if (result.code == 200) {
            commit('GETGOODINFO', result.data)
        }
    },
    // 将产品添加到购物车中 || 修改一个产品的个数
    async addOrUpdateShopCart({commit}, {skuId,skuNum}){
        // 加入购物车返回的解构
        // 加入购物车以后（发请求），前台将参数带给服务器
        // 服务器写入数据成功，并没有返回其他的数据，只是返回code=200,代表这次访问成功
        // 因为服务器没有返回数据，因此不需要存储数据
        let result = await reqAddOrUpdateShopCart(skuId,skuNum);
        if(result.code == 200){
            return 'OK'
        }else{
            return Promise.reject(new Error('faile'))
        }
    }
};
const getters = {
    // 路径导航
    categoryView(){
        return state.goodInfo.categoryView || {};
    },
    // 产品信息
    skuInfo(){
        return state.goodInfo.skuInfo || {};
    },
    // 产品售卖属性
    spuSaleAttrList(){
        return state.goodInfo.spuSaleAttrList || [];
    }
};
export default {
    state,
    mutations,
    actions,
    getters
}