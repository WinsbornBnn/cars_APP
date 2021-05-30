<template>
	<view>
		<cu-custom bgColor="bg-blue-one" :isBack="true" :isR="false" :isAdd="true">
			<block slot="content">求职招聘</block>
		</cu-custom>
		<scroll-view scroll-x class="bg-white nav fixed"  :style="[{top:CustomBar + 'px'}]">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in tabNav" :key="index" @tap="tabSelect" :data-id="index">
					{{tabNav[index]}} 
				</view>
			</view>
		</scroll-view>
		
		<block v-if="TabCur==0">
			
			<view class="cu-card dynamic no-card margin-top" style="margin-top: 100upx;">
				 
				<view class="cu-item shadow margin-top-xl" v-for="k in 10">
					<view class="cu-list menu-avatar">
						<view class="cu-item">
							<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></view>
							<view class="content flex-sub">
								<view>凯尔</view>
								<view class="text-gray text-sm flex justify-between">
									2019年12月3日
								</view>
							</view>
						</view>
					</view>
					<view class="text-content">
						折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！
					</view>
					<view class="grid flex-sub padding-lr col-3 grid-square">
						<view class="bg-img"  style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"
						 v-for="(item,index) in 3" :key="index">
						</view>
					</view>
					<view class="text-gray text-sm text-right padding">
						<text class="cuIcon-attentionfill margin-lr-xs"></text> 10
						<text class="cuIcon-appreciatefill margin-lr-xs"></text> 20
						<text class="cuIcon-messagefill margin-lr-xs"></text> 30
						<text class="cuIcon-like margin-lr-xs"></text> 
					</view>
		
				</view>
				
				
			</view>
			
			
		</block>
		
		<block v-if="TabCur==1">
			<view class="cu-card dynamic no-card margin-top" style="margin-top: 100upx;">
				
				<view class="cu-item shadow margin-top-xl" v-for="k in 10">
					<view class="cu-list menu-avatar">
						<view class="cu-item">
							<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></view>
							<view class="content flex-sub">
								<view>凯尔</view>
								<view class="text-gray text-sm flex justify-between">
									2019年12月3日
								</view>
							</view>
						</view>
					</view>
					<view class="text-content">
						折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！
					</view>
					<view class="grid flex-sub padding-lr col-3 grid-square">
						<view class="bg-img"  style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"
						 v-for="(item,index) in 3" :key="index">
						</view>
					</view>
					<view class="text-gray text-sm text-right padding">
						<text class="cuIcon-attentionfill margin-lr-xs"></text> 10
						<text class="cuIcon-appreciatefill margin-lr-xs"></text> 20
						<text class="cuIcon-messagefill margin-lr-xs"></text> 30
						<text class="cuIcon-likefill margin-lr-xs text-orange"></text> 
					</view>
					
				</view>
				
			</view>
		</block>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				CustomBar: this.CustomBar,
				TabCur: 0,
				tabNav: ['求职', '招聘']
			}
		},
		onShow(){
			
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			}
		}
	}
</script>

<style>
	.margin-top-xl{
		margin-top: 20upx !important;
	}
</style>
