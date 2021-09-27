import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		// 存放用户的信息
		userInfo: {},
		baseUrl:'http://localhost:8080',
	},
	mutations: {
		saveUsuerInfo(state, params) {
			state.userInfo = params
			const info = uni.getStorageSync('userInfo')
			if (!info) {
				// 同时存到缓存中
				uni.setStorageSync('userInfo', JSON.stringify(params));
			}
			// console.log('info:', info);
		}
	},
	actions: {}
})
export default store
