<template name="center">
	<view>
		<cu-custom bgColor="bg-blue-one" :isBack="false" :isR="false">
			<block slot="content">我的</block>
		</cu-custom>
		<view class="page-body">
			<view class="cu-list menu margin-top-xs">
				<view class="cu-item arrow" @tap="ShowRz">
					<view class="content">
						<image src="../../static/drawable-xhdpi/wode_icon1.png" class="png" mode="aspectFit"></image>
						<text class="text-grey">用户认证</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<image src="../../static/drawable-xhdpi/wode_icon2.png" class="png" mode="aspectFit"></image>
						<text class="text-grey">我的车辆</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<image src="../../static/drawable-xhdpi/wode_icon3.png" class="png" mode="aspectFit"></image>
						<text class="text-grey">检查更新</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<image src="../../static/drawable-xhdpi/wode_icon4.png" class="png" mode="aspectFit"></image>
						<text class="text-grey">修改密码</text>
					</view>
				</view>
			</view>
			<view class="cu-list menu margin-top-xs">
				<view class="cu-item arrow">
					<view class="content">
						<image src="../../static/drawable-xhdpi/wode_icon5.png" class="png" mode="aspectFit"></image>
						<text class="text-grey">各分厂客服电话</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<image src="../../static/drawable-xhdpi/wode_icon6.png" class="png" mode="aspectFit"></image>
						<text class="text-grey">车辆续费</text>
					</view>
				</view>
			</view>
		</view>
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-blue-one lg" @click="goLogin">退出</button>
		</view>
	</view>
</template>

<script>
	import util from '@/common/util.js';
	export default {
		data() {
			return {

			}
		},
		methods: {
			ShowRz() {
				uni.navigateTo({
					url: '/pages/center/rz'
				});
			},
			goLogin() {
				uni.showModal({
					title: '提示',
					content: '确定退出登录吗？',
					success: function(res) {
						if (res.confirm) {
							setTimeout(() => {
								util.removeToken()
								util.removeUserData()
								uni.navigateTo({
									url: '../login/login'
								})
							}, 1000)
						} else if (res.cancel) {
							return
						}
					}
				});
			}
		}
	}
</script>

<style>
	.page {
		height: 100vh;
	}

	.padding {
		margin-top: 50px;
	}

	.text-grey {
		color: #000;
		padding-left: 20px;
		font-size: 16px;
	}
</style>
