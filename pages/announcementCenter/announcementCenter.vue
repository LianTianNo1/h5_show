<template>
	<view class="box">
		<view class="head_title">
			公告中心
		</view>
		<view class="wrap">
			<u-time-line>

				<!-- 公告信息展示 -->
				<u-time-line-item :key="item.id" v-for="(item,index) in announceList">
					<template v-slot:content>
						<view>
							<view class="title u-m-t-20 u-m-b-20">{{item.type}}</view>
							<view class="u-order-desc u-m-t-20 u-m-b-20">{{Object.keys(JSON.parse(item.data))[0]}}
							</view>
							<u-link class="u-order-desc  u-m-t-20 u-m-b-20"
								:href="Object.values(JSON.parse(item.data))[0]">
								{{Object.values(JSON.parse(item.data))[0]}}</u-link>

							<view class="tags u-m-t-20 u-m-b-20">
								<u-tag :bg-color="handleColor(item2)" class="u-m-r-10" :key="index2"
									v-for="(item2,index2) in JSON.parse(item.tags) " :text="item2" mode="dark" />
							</view>
							
							<view class="u-order-time">{{item.create_time}}</view>
						</view>
					</template>
				</u-time-line-item>
			</u-time-line>
			<!-- 公告信息展示结束 -->

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
				announceList: [],
				tagColor: new Map()
			}
		},
		computed: {
			...mapState(['baseUrl']),

		},
		methods: {
			initTagColor() {
				this.tagColor.set('公告监控', 'rgb(109,122,138)');
				this.tagColor.set('Huobi', 'rgb(80,132,179)');
				this.tagColor.set('Mexc', 'rgb(84,203,200)');
				this.tagColor.set('项目监控', 'rgb(62,165,109)');
				this.tagColor.set('Gate', 'rgb(212,41,77)');
			},
			// 处理标签颜色
			handleColor(item) {
				return this.tagColor.get(item)
			},
			// 获取公告消息
			getAnnounceList() {
				const that = this;
				uni.request({
					url: that.baseUrl + '/queryAnnounceList',
					success(res) {
						console.log('看看公告信息:', res);
						if (res.statusCode !== 200) return uni.showToast({
							title: '获取公告信息失败'
						})
						uni.showToast({
							title: '获取公告信息成功'
						})
						that.announceList = res.data
					}
				})
			}
		},
		onLoad() {
			// 开始就获取下公告消息
			this.getAnnounceList();
			// 初始化颜色标签对应颜色
			this.initTagColor();
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

		.wrap {
			padding: 24rpx 24rpx 24rpx 40rpx;
			margin-top: 10rpx;
			background-color: #fff;

			.title {
				font-size: 25rpx;
				font-weight: bold;
			}
		}

		.u-order-desc {
			color: rgb(150, 150, 150);
			font-size: 28rpx;
			margin-bottom: 6rpx;
		}

		.u-order-time {
			color: rgb(200, 200, 200);
			font-size: 26rpx;
			padding-bottom: 40rpx;
			border-bottom: 1rpx solid #e6e6ff;
		}


	}
</style>
