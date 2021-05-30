<template>
	<view>
		<cu-custom bgColor="bg-blue-one" :isBack="false" :isR="false">
			<block slot="content">订单</block>
		</cu-custom>
		
		<swiper class="card-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="500" @change="cardSwiper" indicator-color="#8799a3"
		 indicator-active-color="#0081ff">
			<swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
				<view class="swiper-item">
					<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
				</view>
			</swiper-item>
		</swiper>
		
		<view>
			<view class="grid col-4 text-center margin-top-xl">
				<view class="cu-item text-center" @tap="showCarList(0)">
					<view class="cuIcon-cu-image">
						<image class="icon_tb" src="../../static/gys/drawable-xxhdpi/1.png"></image>
					</view>
					<view>全部订单</view>
					<view>数量</view>
				</view> 
				<view class="cu-item text-center" @tap="showCarList(1)"> 
					<view class="cuIcon-cu-image">
						<image class="icon_tb" src="../../static/gys/drawable-xxhdpi/2.png"></image>
					</view>
					<view>全部订单</view> 
					<view>重量</view>
				</view>
				<view class="cu-item text-center" @tap="showCarList(2)"> 
					<view class="cuIcon-cu-image">
						<image class="icon_tb" src="../../static/gys/drawable-xxhdpi/dingdan_icon3.png"></image>
					</view>
					<view>未完成订单</view>
					<view>数量</view>
				</view>
				<view class="cu-item text-center" @tap="showCarList(3)">
					<view class="cuIcon-cu-image">
						<image class="icon_tb" src="../../static/gys/drawable-xxhdpi/dingdan_icon4.png"></image>
					</view>
					<view>未完成订单</view>
					<view>数量</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cardCur: 0,
				swiperList: [{
					id: 0,
					type: 'image',
					url: '../../static/gys/drawable-xxhdpi/faxian_banner.png'
				},{
					id: 1,
					type: 'image',
					url: '../../static/gys/drawable-xxhdpi/dingdan_bannner.png'
				}],
				dotStyle: false,
				towerStart: 0,
				direction: ''
			};
		},
		onLoad() {
			this.TowerSwiper('swiperList');
		},
		methods: {
			DotStyle(e) {
				this.dotStyle = e.detail.value
			},
			// cardSwiper
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			// towerSwiper
			// 初始化towerSwiper
			TowerSwiper(name) {
				let list = this[name];
				for (let i = 0; i < list.length; i++) {
					list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
					list[i].mLeft = i - parseInt(list.length / 2)
				}
				this.swiperList = list
			},
	
			// towerSwiper触摸开始
			TowerStart(e) {
				this.towerStart = e.touches[0].pageX
			},
	
			// towerSwiper计算方向
			TowerMove(e) {
				this.direction = e.touches[0].pageX - this.towerStart > 0 ? 'right' : 'left'
			},
	
			// towerSwiper计算滚动
			TowerEnd(e) {
				let direction = this.direction;
				let list = this.swiperList;
				if (direction == 'right') {
					let mLeft = list[0].mLeft;
					let zIndex = list[0].zIndex;
					for (let i = 1; i < this.swiperList.length; i++) {
						this.swiperList[i - 1].mLeft = this.swiperList[i].mLeft
						this.swiperList[i - 1].zIndex = this.swiperList[i].zIndex
					}
					this.swiperList[list.length - 1].mLeft = mLeft;
					this.swiperList[list.length - 1].zIndex = zIndex;
				} else {
					let mLeft = list[list.length - 1].mLeft;
					let zIndex = list[list.length - 1].zIndex;
					for (let i = this.swiperList.length - 1; i > 0; i--) {
						this.swiperList[i].mLeft = this.swiperList[i - 1].mLeft
						this.swiperList[i].zIndex = this.swiperList[i - 1].zIndex
					}
					this.swiperList[0].mLeft = mLeft;
					this.swiperList[0].zIndex = zIndex;
				}
				this.direction = ""
				this.swiperList = this.swiperList
			},
			showCarList(tab){
				uni.navigateTo({
					url: '/pages/order/index'
				});
			}
		}
	}
</script>

<style>
	.tower-swiper .tower-item {
		transform: scale(calc(0.5 + var(--index) / 10));
		margin-left: calc(var(--left) * 100upx - 150upx);
		z-index: var(--index);
	}
	.icon_tb{ 
		width: 64px;
		height: 64px;
	}
</style>
