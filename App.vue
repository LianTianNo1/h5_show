<script>
	import {
		mapMutations,
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				userInfo2: {}
			}
		},
		computed: {
			...mapState(['userInfo','baseUrl']),
			// 目标地址
			// baseUrl() {
			// 	return 'http://localhost:8080'
			// }
		},
		methods: {
			...mapMutations(['saveUsuerInfo']),
			getUserInfo() {
				console.log('进来获取信息了');
				const url_params = Object.fromEntries(window.location.search.slice(1).split('&').map(v => v.split('=')))
				// console.log(url_params);
				const that = this
				uni.request({
					url: this.baseUrl + '/getUserInfo',
					method: 'POST',
					data: {
						code: url_params.code
					},
					success(res) {
						// 从后端拿到用户信息
						// 把用户的数据保存到Vuex 和 本地缓存中
						console.log(res.data);
						// 获取信息失败就不执行
						if (!res.data.openid) return
						// 保存到vuex中
						that.saveUsuerInfo(res.data)
					}
				})
			},
			getCode() {
				console.log('开始获取Code');
				uni.request({
					url: this.baseUrl + '/getCode',
					method: 'GET',
					success(res) {
						console.log('getCode：', res);
						window.location.href = res.data
					}
				})
			},
			isCode() {
				// 判断是否url有code
				return window.location.search.includes('code=')
			}
		},
		onLaunch: function() {
			// if (this.isCode()) {
			// 	this.getUserInfo()
			// } else {
			// 	// 重新获取
			// 	this.getCode();
			// 	this.getUserInfo()
			// }
			先判断缓存中是否有信息
			let info = uni.getStorageSync('userInfo')
			if (info&&info.length>2) {
				// // 判断是否有code，用来获取用户信息			
				console.log('缓存中存在用户信息不用再请求', JSON.parse(info));
				info = JSON.parse(info)
				// 保存到vuex中
				this.saveUsuerInfo(info)
				
				
				// 判断是否有code，用来获取用户信息
				if (this.isCode()) {
					this.getUserInfo()
				} else {
					// 重新获取
					this.getCode();
				}
				
			} else {
				// 判断是否有code，用来获取用户信息
				if (this.isCode()) {
					this.getUserInfo()
				} else {
					// 重新获取
					this.getCode();
					// this.getUserInfo()
				}
			}
		},
		onShow: function() {
			console.log('App  Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";

	@import "~@/static/font/iconfont.css";
</style>
