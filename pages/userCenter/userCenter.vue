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
					<u-switch slot="right-icon" v-model="checked"></u-switch>
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
				pic: 'https://uviewui.com/common/logo.png',
				show: true,
				// 关闭推送
				checked: false
			}
		},
		computed: {
			...mapState(['userInfo']),
		},
		onLoad() {

		},
		methods: {

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
