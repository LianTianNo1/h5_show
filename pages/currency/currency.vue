<template>
	<view class="box">
		<view class="head_tip">
			本功能用于监控交易项目接口，您可以为您关注的交易所开启提醒
		</view>
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item :key="item.id" v-for="(item,index)  in currencyList" :arrow="false" :title="item.name">
					<u-switch @change="changeSub(item)" slot="right-icon" v-model="item.isActive"></u-switch>
				</u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				currencyList: [{
					id: 1,
					// 项目API
					name: 'huobi',
					value:'huobi_currency'
					// 使用情况
					isActive: false
				}]
			}
		},
		computed:{
			...mapState(['userInfo', 'baseUrl', 'userInfoMysql']),
		},
		methods: {
			...mapMutations(['saveUsuerInfoMysql', 'saveUsuerInfo']),
			// 改变订阅状态
			changeSub(sub) {
				const that = this;
				const openid = this.userInfo.openid;
				uni.request({
					url: that.baseUrl + '/opreationSub',
					data: {
						openid,
						sub
					},
					method: 'POST',
					success(res) {
						console.log('获取用户信息返回的结果', res);
						if (res.statusCode !== 200) return uni.showToast({
							title: '修改订阅信息失败'
						})
						// 勿扰状态为数据库状态
						// that.status = JSON.parse(res.data[0].status);
						// // 保存mysql 中用户的数据
						// that.saveUsuerInfoMysql(res.data[0])
					},
					fail(err) {
						console.log(err);
					}
				})
			}
		},
		// 页面每次出现在屏幕上都触发
		async onShow() {
			// 先判断缓存中是否有信息
			let info = uni.getStorageSync('userInfo')
			if (info) {
				console.log('缓存中存在用户信息不用再请求', JSON.parse(info));
				info = JSON.parse(info)
				// 保存到vuex中
				this.saveUsuerInfo(info)
			}
			
		},
	}
</script>

<style lang="scss" scoped>
	.box {
		font-family: "arial narrow";
		width: 100vw;
		height: 100vh;
		background-color: rgb(234, 234, 234);

		.head_tip {
			letter-spacing: 4rpx;
			padding: 20rpx 30rpx;
			background-color: #fff;
		}

	}

	page {
		background-color: #ededed;
	}

	.camera {
		width: 54px;
		height: 44px;

		&:active {
			background-color: #ededed;
		}
	}

	.user-box {
		background-color: #fff;
	}
</style>
