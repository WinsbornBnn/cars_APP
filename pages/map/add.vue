<template>
	<view>
		<cu-custom bgColor="bg-blue-one" isBack="true">
			<block slot="content">上传照片</block>
		</cu-custom>
		<view class="padding">
			<view class="padding-xl radius shadow shadow-lg bg-white ">车牌号：</view>
			
			<view class="padding-xl radius shadow shadow-lg bg-white margin-top">
				<text>车辆到货地点照片（需包含车辆）</text>
				<image @tap="addImage" src="../../static/drawable-xxhdpi/add_img.png" style="width: 100%;height: 300upx;"></image>
			</view>
			
			<view class="padding-xl radius shadow shadow-lg bg-white margin-top">
				<text>车辆正面照片</text>
				<image @tap="addImage" src="../../static/drawable-xxhdpi/add_img.png" style="width: 100%;height: 300upx;"></image>
			</view>

		</view>
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-blue-one lg">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onShow() {
			
		},
		methods: {
			addImage(e) { 
				uni.chooseImage({
				    count: 1,
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album','camera'], //album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项
				    success: function (res) {
						uni.getImageInfo({
							src: res.tempFilePaths,
							success: function (image) {
								console.log(image)
							}
						});
				    }
				});
			}
		}
	}
</script>

<style>
</style>
