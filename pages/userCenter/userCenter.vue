<template>
	<view>
		<!-- 用户信息 -->
		<view class="u-flex user-box u-p-l-40 u-p-t-40 u-p-r-20 u-p-b-30">
			<view class="u-m-r-10">
				<u-avatar :src="userInfo.headimgurl" size="140"></u-avatar>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20">{{userInfo.nickname}}</view>
			</view>
		</view>
		<!-- 用户信息结束 -->

		<!-- 一些功能 -->
		<view class="u-m-t-20">
			<u-cell-group>
				<!-- <u-cell-item title="会员中心">
					<u-icon class="u-m-r-30 u-m-l-10" slot="icon" size="32" custom-prefix="custom-icon" name="huiyuan">
					</u-icon>
					<text>金币种免费、专属策略、更多特权</text>
				</u-cell-item>
				<u-cell-item title="我的BLB">
					<u-icon class="u-m-r-30 u-m-l-10" slot="icon" size="32" custom-prefix="custom-icon" name="yinle">
					</u-icon>
				</u-cell-item> -->
				<!-- <u-cell-item title="赠送好友">
					<u-icon class="u-m-r-30 u-m-l-10" slot="icon" size="32" custom-prefix="custom-icon" name="zengsong">
					</u-icon>
				</u-cell-item> -->
				<u-cell-item :arrow="false" title="勿扰模式">
					<u-icon class="u-m-r-30 u-m-l-10" slot="icon" size="32" custom-prefix="custom-icon"
						name="wuraomoshi"></u-icon>
					<text class="u-m-r-30">开启将暂停接收推送</text>
					<u-switch slot="right-icon" @change="changeStatus()" v-model="status"></u-switch>
				</u-cell-item>
				<u-cell-item title="使用说明">
					<u-icon class="u-m-r-30 u-m-l-10" slot="icon" size="32" custom-prefix="custom-icon" name="paper">
					</u-icon>
				</u-cell-item>

			</u-cell-group>
		</view>
		<!-- 一些功能结束 -->
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
				show: true,
				// 关闭推送
				status: false
			}
		},
		computed: {
			...mapState(['userInfo', 'baseUrl', 'userInfoMysql']),
		},
		// 页面每次出现在屏幕上都触发
		async onShow() {
			// 先判断缓存中是否有信息
			let info = uni.getStorageSync('userInfo')
			if (info) {
				// 保存到vuex中
				this.saveUsuerInfo(JSON.parse(info))
			}
			// 获取用户的信息
			await this.getInfo();
			
		},
		onLoad() {
			

		},
		methods: {
			...mapMutations(['saveUsuerInfoMysql', 'saveUsuerInfo']),
			// 是否打开勿扰
			async changeStatus() {
				let tempStatus = !JSON.parse(this.userInfoMysql.status)
				console.log('数据库保存的状态',this.userInfoMysql.status,'我将要改变的状态',tempStatus);
				const that = this;
				const openid = this.userInfo.openid;
				uni.request({
					url: that.baseUrl + '/changeStatus',
					data: {
						openid,
						status: tempStatus
					},
					method: 'POST',
					async success(res) {
						if (res.statusCode !== 200) return uni.showToast({
							title: '改变用户的勿扰状态失败'
						})
						// 成功后更新数据
						await that.getInfo();
						that.status = JSON.parse(that.userInfoMysql.status)
					},
					fail(err) {
						console.log(err);
					}
				})
				
				

			},
			// 获取用户在数据中的数据
			getInfo() {
				const that = this;
				const openid = this.userInfo.openid;
				uni.request({
					url: that.baseUrl + '/getUserAllInfo',
					data: {
						openid
					},
					method: 'POST',
					success(res) {
						// console.log('获取用户信息返回的结果', res);
						if (res.statusCode !== 200) return uni.showToast({
							title: '获取用户信息失败'
						})
						// 勿扰状态为数据库状态
						that.status = JSON.parse(res.data[0].status);
						// 保存mysql 中用户的数据
						that.saveUsuerInfoMysql(res.data[0])
					},
					fail(err) {
						console.log(err);
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
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
