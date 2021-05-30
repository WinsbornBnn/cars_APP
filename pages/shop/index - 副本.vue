<template name="sc">
	<view>
		<cu-custom bgColor="bg-blue-one" :isBack="false" :isR="false">
			<block slot="content">发布</block>
		</cu-custom>
		<view class="page-body">
			<view class="cu-bar search bg-white fixed" :style="[{top:CustomBar + 'px'}]">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="搜索关键词" confirm-type="search"></input>
				</view>
				<view class="action">
					<button class="cu-btn bg-blue-one shadow-blur round">搜索</button>
				</view>
			</view>
			<view class="fixed" :style="[{top:CustomBar+ 120+ 'px'}]">
				<swiper class="screen-swiper square-dot"  :indicator-dots="true" :circular="true"
				 :autoplay="true" interval="5000" duration="500">
					<swiper-item v-for="(item,index) in swiperList" :key="index">
						<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
						<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
					</swiper-item>
				</swiper>
			</view>
			
			<view class="padding bg-white">
				<view class="flex">
					<view class="flex-sub bg-grey padding-sm margin-xs radius">
						<image style="width: 100%;" src="../../static/Android_logo/144.png"></image>
					</view>
					<view class="flex-sub bg-grey padding-sm margin-xs radius">
						<image src="../../static/Android_logo/144.png"></image>
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
				CustomBar: this.CustomBar,
				swiperList: [{
					id: 0,
					type: 'image',
					url: '../../static/gys/drawable-xxhdpi/faxian_banner.png'
				},{
					id: 1,
					type: 'image',
					url: '../../static/gys/drawable-xxhdpi/dingdan_bannner.png'
				}],
			}
		},
		onLoad() {
			this.TowerSwiper('swiperList');
		},
		methods:{
			
		}
	}
</script>  

<style>
	.page {
		height: 100vh;
	}
</style>
