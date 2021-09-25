<script>
	export default {
		data() {
			return {
			}
		},
		computed:{
			// 目标地址
			baseUrl(){
				return  'http://localhost:8080'
			}
		},
		methods: {
			getUserInfo() {
				console.log('进来获取信息了');
				const url_params = Object.fromEntries(window.location.search.slice(1).split('&').map(v=>v.split('=')))
				console.log(url_params);
				uni.request({
					url: this.baseUrl+'/getUserInfo',
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
				console.log('开始获取Code');
				uni.request({
					url: this.baseUrl+'/getCode',
					method: 'GET',
					success(res) {
						console.log('getCode：',res);
						window.location.href = res.data
					}
				})
			}, 
			isCode() {
				console.log('判断是否是Code',window);
				// 判断是否url有code
				return window.location.search.includes('code=')
				
			}
		},
		onLaunch: function() {
			console.log('是否启动');
			// 判断是否有code，用来获取用户信息
			if (this.isCode()) {
				this.getUserInfo()
			} else {
				// 重新获取
				this.getCode();
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

<style>
	/*每个页面公共css */
</style>
