<template>
	<view class="box">
		<view class="head_tip">
			本功能用于监控交易项目公告，您可以为您关注的公告所开启提醒
		</view>
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item :key="item.id" v-for="(item,index)  in announcementList" :arrow="false" :title="item.name">
					<u-switch slot="right-icon"  v-model="item.checked" ></u-switch>
				</u-cell-item>	
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				announcementList:[
					{	
						id:1,
						// 项目API
						name : 'huobi',
						// 使用情况
						checked:false
					}
				]
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
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
	page{
		background-color: #ededed;
	}
	
	.camera{
		width: 54px;
		height: 44px;
		
		&:active{
			background-color: #ededed;
		}
	}
	.user-box{
		background-color: #fff;
	}
</style>
