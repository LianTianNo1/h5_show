<template>
	<view class="box">
		<view class="head_tip">
			本功能用于交易项目市场监控，您可以为您关注的公告所开启提醒
		</view>
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item :key="item.id" v-for="(item,index)  in marketList" :arrow="false" :title="item.name">
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
				marketList: [{
						id: 1,
						// 项目API
						name: 'huobi',
						value: 'huobi_market',
						// 使用情况
						isActive: false
					},

					// {
					// 	id: 2,
					// 	// 项目API
					// 	name: 'gate',
					// 	value: 'gate_market',
					// 	// 使用情况
					// 	isActive: false
					// }
				]
			}
		},
		computed: {
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
						if (res.statusCode !== 200) return uni.showToast({
							title: '修改订阅信息失败'
						})

					},
				})
			},
			// 获取用户在数据中的数据
			getInfo(that, openid) {
				uni.request({
					url: that.baseUrl + '/getUserAllInfo',
					data: {
						openid
					},
					method: 'POST',
					success(res) {
						console.log('更新后获取用户信息', res);
						if (res.statusCode !== 200) return uni.showToast({
							title: '获取用户信息失败'
						})
						// 保存mysql 中用户的数据
						that.saveUsuerInfoMysql(res.data[0])
					}
				})
			}
		},
		onUnload() {
			console.log('页面销毁更新数据');
			// 更新数据本地
			this.getInfo(this, this.userInfo.openid)
		},
		// 页面每次出现在屏幕上都触发
		async onShow() {
			// 先判断缓存中是否有信息
			let info = uni.getStorageSync('userInfo')
			if (info) {
				// 保存到vuex中
				this.saveUsuerInfo(JSON.parse(info))
			}

			// 修改状态
			// 1.读取缓存
			let infoMysql = JSON.parse(uni.getStorageSync('userInfoMysql'))
			// console.log('infoMysql--->',infoMysql);
			// 2.判断是否为空，为空不进行操作
			if (infoMysql.subscribelist) {
				// console.log('进来修改状态');
				// 3.获取到订阅的列表
				const subscribelist = JSON.parse(infoMysql.subscribelist);
				// 4.找出订阅的项目，修改状态
				const subSet = new Set(subscribelist);
				this.marketList.forEach(item => {
					if (subSet.has(item.value)) {
						item.isActive = true;
					}
				})
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
