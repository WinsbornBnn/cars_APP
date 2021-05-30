<template>
	<view>
		<home v-if="PageCur=='home'"></home>
		<dw v-if="PageCur=='dw'"></dw>
		<fx v-if="PageCur=='fx'"></fx>
		<sc v-if="PageCur=='sc'"></sc>
		<center v-if="PageCur=='center'"></center>
		<order v-if="PageCur == 'order'"></order>

		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="home">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/drawable-xxhdpi/home' + [PageCur=='home'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='home'?'text-sel':'text-df'">首页</view>
			</view>
			<view class="action" @click="NavChange" data-cur="dw">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/drawable-xxhdpi/dw' + [PageCur=='dw'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='dw'?'text-sel':'text-df'">订单</view>
			</view>
			<view class="action add-action" @click="NavChange" data-cur="fx">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/drawable-xxhdpi/fx' + [PageCur=='fx'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='fx'?'text-sel':'text-df'">发布</view>
			</view>
			<view class="action" @click="NavChange" data-cur="sc">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/drawable-xxhdpi/sc' + [PageCur=='sc'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='sc'?'text-sel':'text-df'">商场</view>
			</view>
			<view class="action" @click="NavChange" data-cur="center">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/drawable-xxhdpi/center' + [PageCur=='center'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='center'?'text-sel':'text-df'">我的</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				PageCur: 'home'
			}
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
				// if (e.currentTarget.dataset.cur == 'dw') {
				// 	this.PageCur = 'dw'
				// } else {
				// 	this.PageCur = e.currentTarget.dataset.cur
				// }
			}
		}
	}
</script>

<style>
	.text-sel {
		color: #275C9F;
	}

	.text-df {
		color: #000000;
	}
</style>
