<template>
	<view>
		<cu-custom bgColor="bg-blue-one" :isBack="true" :isR="false">
			<block slot="content">商品详情</block>
		</cu-custom>
		<view>
			<swiper class="screen-swiper square-dot"  :indicator-dots="true" :circular="true"
			 :autoplay="true" interval="5000" duration="500">
				<swiper-item v-for="(item,index) in swiperList" :key="index">
					<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
					<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
				</swiper-item>
			</swiper>
		</view>
		<view>
			<view class="padding bg-white">
				<text class="text-bold text-lg">短款洋气西装女绿色格子小西服休闲外套小个子150cm上衣长袖春秋5</text>
				
				<view class="flex"> 
					<view class="flex-twice  padding-sm margin-xs radius"><text class="text-xxl text-red">$120</text><text>免运费</text></view>
					<view class="flex-sub  padding-sm margin-xs radius">已销售120002</view>
				</view>
			</view>
			
			<view class="margin-top  bg-white">
				<view class="flex">
					<view class="flex-sub padding-sm radius text-center">型号</view>
					<view class="flex-twice padding-sm radius text-black text-left">上课时考试考试</view>
				</view>
				
				<view class="flex">
					<view class="flex-sub padding-sm radius text-center">型号</view>
					<view class="flex-twice padding-sm radius text-black text-left">上课时考试考试</view>
				</view>
				
				<view class="flex">
					<view class="flex-sub padding-sm radius text-center">型号</view>
					<view class="flex-twice padding-sm radius text-black text-left">上课时考试考试</view>
				</view>
			</view>
			
			<view class="margin-top">
				<view class="cu-bar bg-white solid-bottom">
					<view class="action">
						<text class="cuIcon-titles text-blue"></text>详情说明
					</view>
				</view>
				<view>
					
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
				InputBottom:'',
				swiperList: [{
					id: 0, 
					type: 'image',
					url: '../../static/gys/drawable-xxhdpi/faxian_banner.png'
				},{
					id: 1,
					type: 'image',
					url: '../../static/gys/drawable-xxhdpi/dingdan_bannner.png'
				}]
			}
		},
		methods:{
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			}
		}
	}
</script>

<style>
	.page{
		background-color: #AAAAAA;
	}
</style>
