<template name="dw">
	<view>
		<cu-custom bgColor="bg-blue-one" :isBack="false" :isR="false">
			<block slot="content">订单</block>
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
			
			<view class="padding" style="margin-top: 40px;margin-bottom: 90px;">
				
				<view class=" radius shadow shadow-lg orader margin-top-xl" v-for=" index in 5">
					<view class="flex">
						<view class="flex-treble margin-xs radius text-lg padding-sx">
							北京 <text class="cuIcon-forwardfill text-grey" style="padding-left:10px ;padding-right:10px ;"></text> 广东
						</view>
						<view class="flex-sub  margin-xs radius padding-sx">
							<view class='cu-tag round bg-blue light'>已送达</view>
						</view>
					</view>
					<view>
						<view class="cu-item padding-or">
							<view class="content">
								<text class="cuIcon-deliver_fill text-grey"></text>
								<text class="text-grey">运单号：202010202132133625</text>
							</view>
						</view>
					</view>
					
					<view class="cu-list menu margin-top-xl">
						<view class="cu-item">
							<view class="content">
								<text class="text-grey text-sm">车牌号</text>
							</view>
							<view class="action">
								<text class="text-black">小目标还没有实现！</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey text-sm">公司</text>
							</view>
							<view class="action">
								<text class="text-black">小目标还没有实现！</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey  text-sm">装车时间</text>
							</view>
							<view class="action">
								<text class="text-black">小目标还没有实现！</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey text-sm">出厂时间</text>
							</view>
							<view class="action">
								<text class="text-black">小目标还没有实现！</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey text-sm">完成时间</text>
							</view>
							<view class="action">
								<text class="text-black">小目标还没有实现！</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey text-sm">规格</text>
							</view>
							<view class="action">
								<text class="text-black">小目标还没有实现！</text>
							</view>
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
				CustomBar: this.CustomBar,
				InputBottom:''
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
	.page {
		height: 100vh;
	}
	.orader{
		background-image: url(../../static/drawable-xxhdpi/order_bg.png);
		background-size:100% 100%;
		height: 620upx;
	}
	.padding-sx{
		padding-left: 14px;
		padding-top: 14px;
	}
	.padding-or{
		padding-left: 18px;
		padding-top: 6px; 
	}
	.cu-list.menu>.cu-item{
		min-height: 30px !important;
		background-color:transparent !important;
	}
	.cu-list.menu-avatar>.cu-item:after, .cu-list.menu>.cu-item:after {
	    position: absolute;
	    top: 0;
	    left: 0;
	    -webkit-box-sizing: border-box;
	    box-sizing: border-box;
	    width: 200%;
	    height: 200%;
	   border-bottom: 0px solid #ddd;
	    -webkit-border-radius: inherit;
	    border-radius: inherit;
	    content: " ";
	    -webkit-transform: scale(.5);
	    transform: scale(.5);
	    -webkit-transform-origin: 0 0;
	    transform-origin: 0 0;
	    pointer-events: none;
	}
</style>
