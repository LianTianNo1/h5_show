import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		// 存放用户的信息
		userInfo: {},
		userInfoMysql: {},
		baseUrl: 'http://localhost:8080',
	},
	mutations: {
		saveUsuerInfo(state, params) {
			state.userInfo = params
			const info = uni.getStorageSync('userInfo')
			if (!info) {
				// 同时存到缓存中
				uni.setStorageSync('userInfo', JSON.stringify(params));
			}
		},
		saveUsuerInfoMysql(state, params) {
			state.userInfoMysql = params
			// console.log('需要保存的数据:', params);
			// 同时存到/更新缓存中
			uni.setStorageSync('userInfoMysql', JSON.stringify(params));
		}
	},
	actions: {}
})
export default store
