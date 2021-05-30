<template>
	<view>
		<cu-custom bgColor="bg-blue-one" :isBack="true" :isR="false">
			<block slot="content">厂区公告</block>
		</cu-custom>
		<scroll-view scroll-x class="bg-white nav fixed"  :style="[{top:CustomBar + 'px'}]">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in tabNav" :key="index" @tap="tabSelect" :data-id="index">
					{{tabNav[index]}} 
				</view>
			</view>
		</scroll-view>
		
		<block v-if="TabCur==0">
			
		<view style="margin-top: 50px;">

			<!-- 带图标 -->
			<uni-collapse>
			    <uni-collapse-item title="水泥分厂一"  num="3">
			        <view class="margin-bottom-sm">
			        	<view class="cu-list menu">
			        		<view class="cu-item">
			        			<view class="content">
			        				<text class="text-grey margin-left text-bold">川A51W1Q</text>
			        			</view>
			        			<view class="action">
			        				<text class="text-grey text-sm">2020-08-10 12:12:12</text>
			        			</view>
			        		</view>
			        	</view> 
			        </view>
			    </uni-collapse-item>
			    
				<uni-collapse-item title="水泥分厂一"  num="3">
				    <view class="margin-bottom-sm">
				    	<view class="cu-list menu">
				    		<view class="cu-item">
				    			<view class="content">
				    				<text class="text-grey margin-left text-bold">川A51W1Q</text>
				    			</view>
				    			<view class="action">
				    				<text class="text-grey text-sm">2020-08-10 12:12:12</text>
				    			</view>
				    		</view>
				    	</view> 
				    </view>
				</uni-collapse-item>
				
				<uni-collapse-item title="水泥分厂一"  num="3">
				    <view class="margin-bottom-sm">
				    	<view class="cu-list menu">
				    		<view class="cu-item">
				    			<view class="content">
				    				<text class="text-grey margin-left text-bold">川A51W1Q</text>
				    			</view>
				    			<view class="action">
				    				<text class="text-grey text-sm">2020-08-10 12:12:12</text>
				    			</view>
				    		</view>
				    	</view> 
				    </view>
				</uni-collapse-item>
				
				<uni-collapse-item title="水泥分厂一"  num="3">
				    <view class="margin-bottom-sm">
				    	<view class="cu-list menu">
				    		<view class="cu-item">
				    			<view class="content">
				    				<text class="text-grey margin-left text-bold">川A51W1Q</text>
				    			</view>
				    			<view class="action">
				    				<text class="text-grey text-sm">2020-08-10 12:12:12</text>
				    			</view>
				    		</view>
				    	</view> 
				    </view>
				</uni-collapse-item>
				
				
			</uni-collapse>
			
		</view>
			
		</block>
		
		<block v-if="TabCur==1">
			
			
			
			<view style="margin-top: 50px;">	
				<view class="margin-top-sm">
					<view class="text-center">
						<text>2020-10-10</text>
					</view>
					 
					<view class="cu-list menu" >
						
						<view class="cu-item margin-top-sm">
							<view class="content padding-tb-sm">
								<view class="text-black text-xl padding-bottom-xs"> 
									<text class="cuIcon-title text-orange "></text> 多行Item
								</view>
								<view class="text-gray text-l">
									小目标还没有实现！
								</view>
							</view>
						</view>
						<view class="cu-item arrow"  @tap="showModal" data-target="Image">
							<view class="content">
								<text class="text-grey ">查看详情</text>
							</view>
						</view>
						
						<view class="cu-item margin-top-sm">
							<view class="content padding-tb-sm">
								<view class="text-black text-xl padding-bottom-xs"> 
									<text class="cuIcon-title text-orange "></text> 多行Item
								</view>
								<view class="text-gray text-l">
									小目标还没有实现！
								</view>
							</view> 
						</view>
						<view class="cu-item arrow" @tap="showModal" data-target="Image">
							<view class="content">
								<text class="text-grey ">查看详情</text>
							</view>
						</view>
						
					</view>
					
				</view> 
				
				<view class="cu-modal" :class="modalName=='Image'?'show':''">
					<view class="cu-dialog">
						<view class="bg-img" style="background-image: url('../../static/drawable-xxhdpi/msg_bg.png');height:400px;background-size: 100% 100%;">
							<view class="cu-bar justify-end text-white">
								<view class="action" @tap="hideModal">
									<text class="cuIcon-close "></text>
								</view>
							</view>
							<view style="margin-top: 80px;">
								<view class="text-center">
									<view class="text-xl text-blue">系统公告</view>
									<view class="text-sm text-gray">2020-10-10 10:12:22</view>
								</view>
								<view class="padding">
									vue 页面 map 组件是基于高德地图实现的，如果您想自定义 polyline 的 箭头图标（对应 arrowIconPath ）请参考附件中提供的示例图片设计，该图片为高德官方示例图片，请按照此图片的尺寸切图。
								</view>
							</view>
						</view>
						<view class="cu-bar bg-blue-one">
							<view class="action margin-0 flex-sub  solid-left" @tap="hideModal">我知道了</view>
						</view>
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
				tabNav: ['车辆排队', '公告查看'],
				modalName:''
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
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			}
		}
	}
</script>

<style>
	.cu-dialog{
		background-color:transparent;
	}
</style>
