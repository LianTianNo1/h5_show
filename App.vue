<script>
	export default {
		data() {
			return {
				codeUrl: 'https://www.baidu.com:8080/'
			}
		},
		methods: {
			getUserInfo() {
				const url_params = Object.fromEntries(Window.location.search.slice(1).split('&').map(v=>v.split('=')))
				console.log(url_params);
				uni.request({
					url: this.codeUrl+'getUserInfo',
					method: 'POST',
					data:{
						code:url_params.code
					},
					success(res) {
						// 成功获取用户信息
						console.log(res.data);
					}
				})
			},
			getCode() {
				uni.request({
					url: this.codeUrl+'getCode',
					method: 'GET',
					success(res) {
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
			// 判断是否有code，用来获取用户信息
			if (this.isCode()) {
				this.getUserInfo()
			} else {
				// 重新获取
				this.getCode();
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
	
</script>

<style>
	/*每个页面公共css */
</style>
