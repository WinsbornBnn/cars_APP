<template name="home">
	<view>
		<cu-custom bgColor="bg-blue-one" isR="true">
			<block slot="content">首页</block>
		</cu-custom>
		<view class="page-body">
			<view class="page-section page-section-gap">
				<map id="index_maps" style="width: 100%; height: 60vh;" :latitude="latitude" :longitude="longitude" :markers="covers">
				</map>
				<view style="/*height: 40vh;*/">
					<view class="padding-lr bg-white ">
						<!-- <view class="padding solid-bottom">当前订单：</view> -->
						<view class="padding " @click="getlocal()">目的地：</view>
						<view class="padding solid-bottom">当前位置：{{address}}</view>
						
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'map',
				latitude: '',
				longitude: '',
				address:'',
				covers: [{
					latitude: 39.909,
					longitude: 116.39742,
					iconPath: '../../../static/location.png'
				}, {
					latitude: 39.90,
					longitude: 116.39,
					iconPath: '../../../static/location.png'
				}]
			}
		},
		onReady() {
			//调用的函数放到onReady里面
			this.getlocal();
		},
		onLoad() {
			this.getlocal();
		},
		onShow() {
			this.getlocal();
		},
		methods: {
			getlocal: function() {
				let _this = this;
				//显示当前位置
				var map = uni.createMapContext('index_maps', this).$getAppMap();
				map.showUserLocation(true);
				//获取当前定位
				uni.getLocation({
					type: 'wgs84',
					geocode:true, 
					success: function(res) {
						_this.address = res.address.poiName;
						_this.longitude = res.longitude;
						_this.latitude = res.latitude;
					}
				})
			}
		}
	}
</script>

<style>
	.page {
		height: 100vh;
	}
</style>
