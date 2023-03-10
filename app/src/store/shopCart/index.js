import { reqCartList,reqDeleteCartById, reqUpdateCheckedById } from "@/api";
const state = {
    cartList:[]
};

const mutations = {
    GETCARTLIST(state,cartList){
        state.cartList = cartList;
    }
};

const actions = {
    // 获取购车列表数据
    async getCartList({ commit }) {
        let result = await reqCartList();
        if(result.code == 200){
            commit('GETCARTLIST',result.data);
        }
    },

    // 删除购物车某一个产品
    async deleteCartListBySkuId({commit},skuId){
        let result = await reqDeleteCartById(skuId);
        if(result.code == 200){
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'));
        }
    },

    // 修改购物车某一个产品的选中状态
    async updateCheckedById({commit},{skuId,isChecked}){
        let result = await reqUpdateCheckedById(skuId,isChecked)
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },

    // 删除购物车全部勾选的产品
    deleteAllCheckedCart({dispatch,getters}){
        // 获取购物车中全部的的产品（数组）
        let promiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
            if(item.isChecked){
                let promise = dispatch('deleteCartListBySkuId',item.skuId)
                promiseAll.push(promise);
            }
        });
        // 只要promiseAll里面所有的promise都成功，返回结果就是成功
        // 如果有一个失败，就返回失败的结果
        return Promise.all(promiseAll)
    },

    // 修改全部产品的状态
    updateAllCartChecked({dispatch,state},isChecked){
        let promiseAll = []
        state.cartList[0].cartInfoList.forEach(item => {
            let promise = dispatch('updateCheckedById',{skuId:item.skuId,isChecked})
            promiseAll.push(promise)
        });
        return Promise.all(promiseAll)
    }
};

const getters = {
    cartList(state){
        return state.cartList[0] || {}
    },
};

export default {
    state,
    mutations,
    actions,
    getters
}