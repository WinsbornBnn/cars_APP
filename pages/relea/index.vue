<template name="fx">
	<view style="width: 100%">
		<cu-custom bgColor="bg-blue-one" :isBack="false" :isR="false">
			<block slot="content">发布</block>
		</cu-custom>
		<view class="page-body">
			<view class="swiper">
				<view class="swiper-box radius shadow bg-white">
					<swiper class="square-dot" :circular="true" :autoplay="true" :indicator-dots="true" interval="5000"
						duration="500">
						<swiper-item v-for="(item, index) in swiperList" :key="index">
							<image :data-url="item.url" @click="ViewImage" style="border-radius: 15px" :src="item.url"
								mode="aspectFill" v-if="item.type == 'image'"></image>
							<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false"
								objectFit="cover" v-if="item.type == 'video'"></video>
						</swiper-item>
					</swiper>
				</view>
			</view>
			<view class="padding-xl radius shadow bg-white margin-top">
				<text class="text-black text-bold"> 厂区公告</text>

				<view class="grid col-3 text-center margin-top-xl">
					<view class="cu-item" @tap="showCarList(0)">
						<view class="cuIcon-cu-image">
							<image class="icon_tb" src="../../static/drawable-xhdpi/faxian_icon1.png"></image>
						</view>
						<text>车辆排队</text>
					</view>
					<view class="cu-item" @tap="showCarList(1)">
						<view class="cuIcon-cu-image">
							<uni-badge size="small" :text="text > 99 ? '99+' : text" type="error"
								custom-style="[{border-radius:50%}]" class="unibadge">
							</uni-badge>
							<image class="icon_tb" src="../../static/drawable-xhdpi/faxian_icon2.png"></image>
						</view>
						<text>公告查看</text>
					</view>
				</view>
			</view>
			<view class="padding-xl radius shadow bg-white margin-top">
				<text class="text-black text-bold"> 信息发布</text>
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
			<template v-if="accountShow">
				<view class="padding-xl radius shadow bg-white margin-top">
					<text class="text-black text-bold"> 查车地图</text>
					<view class="grid col-3 text-center margin-top-xl">
						<view class="cu-item" @tap="ShowPostion(0, '/inspection/scancar/list')">
							<view class="cuIcon-cu-image">
								<image class="icon_tb" src="../../static/drawable-xhdpi/faxian_icon6.png"></image>
							</view>
							<text>附近查车</text>
						</view>
						<view class="cu-item" @tap="ShowPostion(1, '/order/orderupload/add')">
							<view class="cuIcon-cu-image">
								<image class="icon_tb" src="../../static/drawable-xhdpi/faxian_icon7.png"></image>
							</view>
							<text>上报查车</text>
						</view>
						<view class="cu-item" @tap="ShowPostion(2, '/inspection/accident/add')">
							<view class="cuIcon-cu-image">
								<image class="icon_tb" src="../../static/drawable-xhdpi/faxian_icon8.png"></image>
							</view>
							<text>上报事故点</text>
						</view>
					</view>
				</view>
			</template>
			<template v-if="accountShow">
				<view class="padding-xl radius shadow bg-white margin-top">
					<text class="text-black text-bold"> 实时监控</text>
					<view class="grid col-3 text-center margin-top-xl">
						<view class="cu-item" @tap="ShowMon()">
							<view class="cuIcon-cu-image">
								<image class="icon_tb" src="../../static/drawable-xhdpi/faxian_icon9.png"></image>
							</view>
							<text>实时监控</text>
						</view>
					</view>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
	import util from '@/common/util.js';
	import {
		ListMoreDataMixin
	} from '@/common/public-mixin.js'
	export default {
		mixins: [ListMoreDataMixin],
		data() {
			return {
				swiperList: [],
				dotStyle: false,
				towerStart: 0,
				text: 9,
				direction: '',
				accountType: util.readUserData().accountType,
				accountShow: false
			}
		},
		onShow() {
			this.accountShow = this.accountType === '2' ? false : true
		},
		onLoad() {
			// this.getSwiperList()
			// this.getAnnountCement()
		},
		methods: {
			showCarList(tab) {
				uni.navigateTo({
					url: '/pages/relea/car_list?tab=' + tab
				});
			},
			ShowPostion(tab, url) {
				uni.navigateTo({
					url: '/pages/relea/postion?tab=' + tab,
					success: function() {
						uni.$emit("releaPostion", url);
						uni.$off("releaPostion");
					}
				});
			},
			ShowMon() {
				uni.navigateTo({
					url: '/pages/relea/monitoring'
				});
			},
			ShowFind() {
				uni.navigateTo({
					url: '/pages/relea/find_car'
				});
			},
			ShowFindFond() {
				uni.navigateTo({
					url: '/pages/relea/find_food'
				});
			},
			ShowFindWork() {
				uni.navigateTo({
					url: '/pages/relea/find_work'
				});
			},
			getSwiperList() {
				util.myRequest({
					url: '/sysPicture/sysPicture/list',
					method: 'get',
					success: ({
						data
					}) => {
						console.log(data);
						if (data.success) {
							const newSwiperList = []
							data.result.records.forEach(item => {
								if (item.picturetwo === '发现') {
									newSwiperList.push({
										id: item.id,
										type: 'image',
										url: util.getSysImgUrl() + item.pictureone
									})
								}
							});
							this.swiperList = newSwiperList
						} else {
							uni.showToast({
								icon: 'none',
								position: 'center',
								title: data.message
							});
						}
					}
				})
			},
			// *有问题
			ViewImage(e) {
				const arr = []
				this.swiperList.forEach(item => {
					if (item.url) {
						arr.push(item.url)
					}
				});
				let index = arr.findIndex(value => value == e.currentTarget.dataset.url)
				uni.previewImage({
					urls: arr,
					current: index,
					indicator: 'default'
				});
			},
			// todo: 待完善的公告数量
			getAnnountCement() {
				util.myRequest({
					method: 'get',
					url: '/sys/annountCement/list',
					success: ({
						data
					}) => {
						if (data.success) {
							console.log(data);
							this.text = data.result.total
						} else {
							uni.showToast({
								icon: 'none',
								position: 'center',
								title: data.message
							});
						}
					}
				})
			}
		},
		mounted() {
			if (!this.isThirdType()) {
				uni.showToast({
					icon: 'none',
					position: 'center',
					title: '需完成认证后才能访问？'
				})
				setTimeout(() => {
					uni.reLaunch({
						url: '/pages/center/rz',
						success: () => {
							setInterval(() => {
								uni.$emit("thridType", 'relea');
								uni.$off('thridType')
							}, 1000);
						}
					});
				}, 500);
			} else {
				this.getSwiperList()
				this.getAnnountCement()
			}
		}
	}
</script>

<style lang="scss">
	.page {
		height: 100vh;
	}

	.icon_tb {
		width: 64upx;
		height: 64upx;
	}

	/* .swiper-box {
  width: 92%;
  height: 30.7vw;
} */
	.radius {
		width: 90%;
		margin: 15px auto;
		border-radius: 15px;
	}

	.cuIcon-cu-image {
		position: relative;
	}

	.unibadge {
		position: absolute;
		top: -10px;
		right: 10px;
		z-index: 1;
	}

	.swiper {
		width: 100%;
		margin-top: 10upx;
		display: flex;
		justify-content: center;

		.swiper-box {
			width: 92%;
			height: 40.7vw;
			overflow: hidden;
			border-radius: 15upx;
			box-shadow: 0upx 8upx 25upx rgba(0, 0, 0, 0.2);
			position: relative;
			z-index: 1;

			swiper {
				width: 100%;
				height: 40.7vw;

				swiper-item {
					image {
						width: 100%;
						height: 40.7vw;
					}
				}
			}
		}
	}
</style>
