<template>
	<view class="box">
		<view class="head_title">
			监控设置
		</view>
		<view class="head_tip">
			【Fly量化】服务号监控设置，您可以进入具体的功能界面，选择自己关注的信息开启提醒
		</view>
		<view class="content u-m-t-10">
			<!-- 6个位置 -->
			<view :key="item.id" @click="gotoUrl(item.url)" v-for="(item,index) in listData" class="content_item">
				<view class="item_top">
					<text>{{item.title}}</text>
					<u-icon :name="item.icon" color="white" size="48"></u-icon>
				</view>
				<view class="item_bottom">
					<text>{{item.name}}</text>
					<view class="item_bottom_right">
						<view class="item_bottom_right_one"></view>
						<view class="item_bottom_right_two"></view>
					</view>
				</view>
			</view>
			<!-- 6个位置结束 -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listData: [{
						id: 1,
						title: '公告监控',
						url: '../announcement/announcement',
						icon: 'volume-up',
						name: 'Notice'
					},
					{
						id: 2,
						title: '币种监控',
						url: '../currency/currency',
						icon: 'rmb-circle',
						name: 'Coin'
					},
					{
						id: 3,
						title: '市场监控',
						url: '../market/market',
						icon: 'photo',
						name: 'Market'
					},
					{
						id: 4,
						title: '合约大V',
						url: '/gonggao',
						icon: 'level',
						name: 'Firm-Contract'
					},
					{
						id: 5,
						title: '推特监控',
						url: '/gonggao',
						icon: 'twitter',
						name: 'Twitter'
					},
					{
						id: 6,
						title: '后期开发',
						url: '/gonggao',
						icon: 'clock',
						name: 'Null'
					},

				]
			}
		},
		onLoad() {

		},
		methods: {
			// 跳转具体链接
			gotoUrl(url) {
				console.log(url);
				// 跳转页面
				uni.navigateTo({
					url,
					success(res) {
						console.log(res);
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		font-family: "arial narrow";
		width: 100vw;
		height: 100vh;
		background-color: rgb(234, 234, 234);

		.head_title {
			letter-spacing: 4rpx;
			width: 100%;
			padding: 20rpx 0;
			display: flex;
			justify-content: center;
			align-items: center;
			color: white;
			background-image: linear-gradient(90deg, rgb(5, 135, 244), rgb(27, 182, 185));
		}

		.head_tip {
			letter-spacing: 4rpx;
			padding: 20rpx 30rpx;
			background-color: rgb(241, 241, 241);
		}

		.content {
			background-color: rgb(241, 241, 241);
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			padding: 30rpx 0 0 0;

			.content_item {
				height: 150rpx;
				width: 40%;
				padding: 25rpx;
				margin: 15rpx 0 15rpx 40rpx;
				// background-color: rgb(58,179,73);
				border-radius: 10rpx;

				.item_top {
					display: flex;
					justify-content: space-between;

					text {
						color: white;
						letter-spacing: 6rpx;
					}

					text::first-letter {
						font-size: 38rpx;
					}

					margin-bottom: 10rpx;
				}

				.item_bottom {
					display: flex;
					justify-content: space-between;
					position: relative;

					text {
						color: white;
						display: block;
						position: absolute;
						left: 0;
						z-index: 2;
					}

					text::first-letter {
						font-size: 38rpx;
						font-weight: bold;
						letter-spacing: 6rpx;
					}

					.item_bottom_right {
						position: absolute;
						right: 0;
						z-index: 2;
						width: 55%;
						height: 46rpx;
						box-sizing: border-box;

						.item_bottom_right_one {
							height: 100%;
							width: 70%;
							float: left;
							border-bottom: 2rpx solid rgba(255, 255, 255, 0.8);
						}

						.item_bottom_right_two {
							width: 30%;
							height: 100%;
							float: left;
							border-bottom: 8rpx solid rgba(255, 255, 255, 0.8);
						}
					}
				}
			}

		}

		.content .content_item:nth-child(2n) {
			margin: 15rpx 40rpx 15rpx 0rpx;
		}

		// 监控设置的背景颜色
		.content .content_item:nth-child(1) {
			background-color: rgb(135, 153, 163);
		}

		.content .content_item:nth-child(2) {
			background-color: rgb(137, 198, 59);
		}

		.content .content_item:nth-child(3) {
			background-color: rgb(58, 179, 73);
		}

		.content .content_item:nth-child(4) {
			background-color: rgb(243, 122, 31);
		}

		.content .content_item:nth-child(5) {
			background-color: rgb(25, 190, 181);
		}

		.content .content_item:nth-child(6) {
			background-color: rgb(190, 28, 147);
		}
	}
</style>
