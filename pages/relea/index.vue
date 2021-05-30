<template name="fx">
	<view style="width: 100%;">
		<cu-custom bgColor="bg-blue-one" :isBack="false" :isR="false">
			<block slot="content">发布</block>
		</cu-custom>
		<view class="page-body">
			<swiper class="screen-swiper square-dot"  :indicator-dots="true" :circular="true"
			 :autoplay="true" interval="5000" duration="500">
				<swiper-item v-for="(item,index) in swiperList" :key="index">
					<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
					<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
				</swiper-item>
			</swiper>
			
			<view class="margin-bottom-xl" style="margin-bottom: 120upx;">
				<view class="padding-xl radius shadow bg-white margin-top">
					<text class="text-black text-bold" > 厂区公告</text>
					
					<view class="grid col-3 text-center margin-top-xl">
						<view class="cu-item" @tap="showCarList(0)">
							<view class="cuIcon-cu-image">
								<image class="icon_tb" src="../../static/drawable-xhdpi/faxian_icon1.png"></image>
							</view>
							<text>车辆排队</text>
						</view> 
						<view class="cu-item" @tap="showCarList(1)"> 
							<view class="cuIcon-cu-image">
								<image class="icon_tb" src="../../static/drawable-xhdpi/faxian_icon2.png"></image>
							</view>
							<text>公告查看</text>
						</view>
					</view>
					
				</view> 
				
				<view class="padding-xl radius shadow bg-white margin-top">
					<text class="text-black text-bold" > 信息发布</text>
					<view class="grid col-3 text-center margin-top-xl">
						<view class="cu-item" @tap="ShowFindFond()"> 
							<view class="cuIcon-cu-image">
								<image class="icon_tb" src="../../static/drawable-xhdpi/faxian_icon3.png"></image>
							</view>
							<text>找车找货</text> 
						</view>  
						<view class="cu-item" @tap="ShowFind()">
							<view class="cuIcon-cu-image">
								<image class="icon_tb" src="../../static/drawable-xhdpi/faxian_icon4.png"></image>
							</view>
							<text>买卖二手车</text>
						</view>
						<view class="cu-item" @tap="ShowFindWork()">
							<view class="cuIcon-cu-image">
								<image class="icon_tb" src="../../static/drawable-xhdpi/faxian_icon5.png"></image>
							</view>
							<text>招聘求职</text>
						</view>
					</view>
				</view> 
				
				<view class="padding-xl radius shadow bg-white margin-top">
					<text class="text-black text-bold" > 查车地图</text>
					<view class="grid col-3 text-center margin-top-xl">
						<view class="cu-item" @tap="ShowPostion(0)">
							<view class="cuIcon-cu-image">
								<image class="icon_tb" src="../../static/drawable-xhdpi/faxian_icon6.png"></image>
							</view>
							<text>附近查车</text>
						</view> 
						<view class="cu-item" @tap="ShowPostion(1)">
							<view class="cuIcon-cu-image">
								<image class="icon_tb" src="../../static/drawable-xhdpi/faxian_icon7.png"></image>
							</view>
							<text>上报查车</text>
						</view>
						<view class="cu-item" @tap="ShowPostion(2)">
							<view class="cuIcon-cu-image">
								<image class="icon_tb" src="../../static/drawable-xhdpi/faxian_icon8.png"></image>
							</view>
							<text>上报事故点</text>
						</view>
					</view>
				</view>
				
				<view class="padding-xl radius shadow bg-white margin-top">
					<text class="text-black text-bold" > 实时监控</text>
					<view class="grid col-3 text-center margin-top-xl">
						<view class="cu-item" @tap="ShowMon()">
							<view class="cuIcon-cu-image">
								<image class="icon_tb" src="../../static/drawable-xhdpi/faxian_icon9.png"></image>
							</view>
							<text>实时监控</text>
						</view> 
						
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
				swiperList: [{
					id: 0,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
				}, {
					id: 1,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
				}, {
					id: 2,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
				}, {
					id: 3,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				}, {
					id: 4,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
				}, {
					id: 5,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
				}, {
					id: 6,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
				}],
				dotStyle: false,
				towerStart: 0,
				direction: ''
			}
		},
		onShow(){ 
		},
		methods: {
			showCarList(tab){
				uni.navigateTo({
					url: '/pages/relea/car_list?tab='+tab
				});
			},
			ShowPostion(tab){
				uni.navigateTo({
					url: '/pages/relea/postion?tab='+tab
				});
			},
			ShowMon(){
				uni.navigateTo({
					url: '/pages/relea/monitoring'
				});
			},
			ShowFind(){
				uni.navigateTo({
					url: '/pages/relea/find_car'
				});
			},
			ShowFindFond(){
				uni.navigateTo({
					url: '/pages/relea/find_car'
				});
			},
			ShowFindWork(){
				uni.navigateTo({
					url: '/pages/relea/find_car'
				});
			},
		}
	}
</script>

<style>
	.page {
		height: 100vh;
	}
	
	.icon_tb{
		width: 64upx;
		height: 64upx;
	}
</style>
