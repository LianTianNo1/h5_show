<template>
	<view class="box">
		<view class="head_title">
			公告中心
		</view>
		<view class="wrap">
			<u-time-line v-if="announceList.length!==0">

				<!-- 公告信息展示 -->
				<u-time-line-item :key="item.id" v-for="(item,index) in announceList">
					<template v-slot:content>
						<view>
							<view class="title u-m-t-20 u-m-b-20">{{item.type}}</view>
							<view class="u-order-desc u-m-t-20 u-m-b-20" v-if="item.annocedata && item.annocedata.length>2">
								{{Object.keys(JSON.parse(item.annocedata))[0]}}
							</view>
							<view class="u-order-desc u-m-t-20 u-m-b-20" v-else>{{item.market}}交易对{{item.type}}了
							</view>
							<u-link class="u-order-desc  u-m-t-20 u-m-b-20" v-if="item.annocedata && item.annocedata.length>2"
								:href="Object.values(JSON.parse(item.annocedata))[0]">
								{{Object.values(JSON.parse(item.annocedata))[0]}}
							</u-link>

							<view class="tags u-m-t-20 u-m-b-20">
								<u-tag :bg-color="getColor()" class="u-m-r-10" :key="index2" v-if="item2!==''"
									v-for="(item2,index2) in item.tags.split(' ')" :text="item2" mode="dark" />
							</view>

							<view class="u-order-time">{{item.createTime}}</view>
						</view>
					</template>
				</u-time-line-item>
			</u-time-line>
			<u-empty v-else text="暂时没有新的公告消息" mode="list"></u-empty>
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
			// 处理标签颜色
			getColor() {
				return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
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
		onShow() {
			// 页面每次出现都先判断公告信息是否存在，存在就不用重新获取获取下公告消息
			if (!this.announceList.length) {
				// 开始就获取下公告消息
				this.getAnnounceList();
			}

		},
		onLoad() {

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
