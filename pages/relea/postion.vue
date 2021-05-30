<template>
	<view class="page">
		<cu-custom bgColor="bg-blue-one" :isBack="true" :isR="false">
			<block slot="content">查车地图</block>
		</cu-custom>
		<scroll-view scroll-x class="bg-white nav fixed "  :style="[{top:CustomBar + 'px'}]">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in tabNav" :key="index" @tap="tabSelect" :data-id="index">
					{{tabNav[index]}} 
				</view>
			</view> 
		</scroll-view>
		<block v-if="TabCur==0">
			<view class="page-body">
				<view class="page-section page-section-gap">
					<map style="width: 100%; height: 100vh;" :latitude="latitude" :longitude="longitude" :markers="covers">
					</map>
				</view>
				
			</view>
		</block>
		
		<block v-if="TabCur==1">
			<view class="page-body">
				<view class="page-section page-section-gap">
					<map style="width: 100%; height: 56vh;" :latitude="latitude" :longitude="longitude" :markers="covers">
					</map>
					<view class="cu-form-group align-start">
						<view class="title">备注</view>
						<textarea maxlength="-1" @input="textareaBInput" placeholder="请输入说明"></textarea>
					</view>
					<view class="padding flex flex-direction">
						<button class="cu-btn bg-blue-one lg">直接上报</button>
					</view>
				</view>
			</view>
		</block>
		
		<block v-if="TabCur==2">
			<view class="page-body">
				<view class="page-section page-section-gap">
					<map style="width: 100%; height: 56vh;" :latitude="latitude" :longitude="longitude" :markers="covers">
					</map>
					<view class="cu-form-group align-start">
						<view class="title">备注</view>
						<textarea maxlength="-1" @input="textareaBInput" placeholder="请输入说明"></textarea>
					</view>
					<view class="padding flex flex-direction">
						<button class="cu-btn bg-blue-one lg">直接上报</button>
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
				tabNav: ['附近查车', '上报查车','上报事故点'],
				latitude: 39.909,
				longitude: 116.39742,
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
		onLoad(option) {
			this.TabCur = option.tab
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
	.page{
		height: 100vh;
		background-color: #FFFFFF;
	}
</style>
