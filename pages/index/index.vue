<template name="home">
	<view>
		<cu-custom bgColor="bg-blue-one">
			<block slot="content">首页</block>
		</cu-custom>
		<view class="page-body">
			<view class="page-section page-section-gap">
				<map id="index_maps" ref="index_maps" style="width: 100%; height: 60vh" :latitude="latitude"
					:longitude="longitude" :markers="markers" :polyline="polylines" :show-location="true"
					:enable-rotate="true" :show-compass="true">
				</map>
				<view class="nav-bottom">
					<view class="padding-lr bg-white">
						<view class="padding-top">目的地：{{ customername }}</view>
						<view class="padding-top solid-bottom" @click="getlocal()">当前位置：{{ address }}</view>
						<view class="button-group">
							<!-- <button @click="trackInit" size="mini" type="primary">
                查看轨迹
                </button> -->
							<button @click="AddPage" style="
                  background-color: #275c9f;
                  color: #fff;
                  font-size: 16px;
                  width: 220px;
                ">
								<text class="cuIcon-camera text-df padding-right"></text>怕照上报
							</button>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import util from '@/common/util.js';
	import tabItemTap from '@/common/tabItemTap.js'
	export default {
		mixins: [tabItemTap],
		data() {
			return {
				activeColor: "#fa3534", // 选中时的颜色
				inactiveColor: "#000", // 未选中时的颜色
				title: 'map',
				carId: util.getcarInfo().id,
				carNo: util.getcarInfo().carno,
				latitude: '',
				longitude: '',
				address: '',
				customername: '',
				markers: [],
				polylines: [],
				carNoList: [],
				addressInfo: [],
				startTime: '',
				endTime: '',
				seconds: 1
			}
		},
		onShow() {
			var account_type = util.readUserData().accountType
			if (account_type === '2') {
				uni.setTabBarItem({
					index: 0,
					pagePath: "/pages/index/priverIndex",
					text: "首页",
					iconPath: "/static/drawable-xxhdpi/home.png",
					selectedIconPath: "/static/drawable-xxhdpi/home_cur.png"
				})
			} else if (account_type === '1') {
				uni.setTabBarItem({
					index: 0,
					pagePath: "/pages/index/index",
					text: "首页",
					iconPath: "/static/drawable-xxhdpi/home.png",
					selectedIconPath: "/static/drawable-xxhdpi/home_cur.png"
				})
			}
		},
		onLoad() {
			this.getlocal();
			this.orderInit()
			setTimeout(() => {
				this.trackInit()
			}, 3000);
		},
		methods: {
			wgs84togcj02: function(lng, lat) {
				var that = this

				var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
				var PI = 3.1415926535897932384626;
				var a = 6378245.0;
				var ee = 0.00669342162296594323;
				if (that.out_of_china(lng, lat)) {
					return [lng, lat]
				} else {
					var dlat = that.transformlat(lng - 105.0, lat - 35.0);
					var dlng = that.transformlng(lng - 105.0, lat - 35.0);
					var radlat = lat / 180.0 * PI;
					var magic = Math.sin(radlat);
					magic = 1 - ee * magic * magic;
					var sqrtmagic = Math.sqrt(magic);
					dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
					dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
					var mglat = lat + dlat;
					var mglng = lng + dlng;
					return [mglng, mglat]
				}
			},
			transformlat: function(lng, lat) {
				var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
				var PI = 3.1415926535897932384626;
				var a = 6378245.0;
				var ee = 0.00669342162296594323;
				var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math
					.abs(lng));
				ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
				ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
				ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
				return ret
			},

			transformlng: function(lng, lat) {
				var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
				var PI = 3.1415926535897932384626;
				var a = 6378245.0;
				var ee = 0.00669342162296594323;
				var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
				ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
				ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
				ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
				return ret
			},
			getCity() {
				var that = this
				let countdown = setInterval(() => {
					that.seconds--;
					uni.getLocation({
						type: 'wgs84',
						geocode: true, //设置该参数为true可直接获取经纬度及城市信息
						success: function(res) {
							// wgs84转百度坐标系
							var ssws = that.wgs84togcj02(res.longitude, res.latitude)
							// that.covers[0].longitude = ssws[0]
							// that.covers[0].latitude = ssws[1]
							if (that.longitude == '') {
								that.longitude = ssws[0]
								that.latitude = ssws[1]
							}
						},
						error: ({
							err
						}) => {
							console.log(err)
						}
					});
					if (that.seconds <= 0) {
						that.seconds = 1
						clearInterval(countdown);
					}
				}, 1000);
			},
			//获取当前定位
			getlocal: function() {
				let _this = this;
				uni.getLocation({
					type: 'wgs84 ',
					geocode: true,
					success: function(res) {
						_this.addressInfo.push(res)
						_this.address = res.address.poiName;
						_this.longitude = res.longitude;
						_this.latitude = res.latitude;
						_this.markers.push({
							id: 'local-tion',
							longitude: res.longitude,
							latitude: res.latitude,
							// iconPath: '../../static/drawable-xhdpi/faxian_icon6_icon1.png'
							iconPath: '../../static/drawable-xxhdpi/my_fangxiang.png',
							rotate: 45
						});
					}
				})

				//显示当前位置
				// var maps = uni.createMapContext('index_maps',this).$getAppMap();
				// console.log(maps);
				// maps.showUserLocation(true);
			},
			// 未完成订单
			orderInit() {
				util.myRequest({
					method: 'get',
					url: '/order/orderinfo/getOrderByCarNO',
					data: {
						carNo: this.carId
					},
					success: ({
						data
					}) => {
						uni.hideLoading();
						if (data.success) {
							if (data.result.length === 0) {
								uni.showToast({
									duration: 2000,
									icon: 'none',
									title: '当前没有未完成订单'
								});
								this.markers = []
								this.polylines = []
								this.customername = '当前没有未完成订单'
								uni.setStorageSync('order_list', data.result);
							} else {
								this.customername = data.result[0].customername
								this.startTime = data.result[0].ordertime
								uni.setStorageSync('order_list', data.result);
							}
						} else {
							uni.showToast({
								duration: 2000,
								icon: 'none',
								title: data.message
							});
						}
					}
				})
			},
			// 轨迹列表
			trackInit() {
				let that = this
				util.myRequest({
					method: 'get',
					url: '/track/track/getTrackByCarNo',
					data: {
						carNo: this.carNo,
						beginTime: this.startTime,
						endTime: util.getNowTime()
					},
					success: ({
						data
					}) => {
						uni.hideLoading();
						if (data.success) {
							if (data.result.length === 0) {
								uni.showToast({
									icon: 'none',
									position: 'center',
									title: '未查询到轨迹！'
								});
								return
							}
							const points = []
							data.result.forEach(item => {
								points.push({
									latitude: item.lat,
									longitude: item.lng
								})
							});
							that.latitude = points[0].latitude
							that.longitude = points[0].longitude
							that.polylines = [{
								points: points,
								arrowLine: true,
								dottedLine: true,
								width: 8,
								color: "C070F0"
							}]
							that.markers = [{
								latitude: points[0].latitude,
								longitude: points[0].longitude,
								iconPath: '../../static/drawable-xhdpi/faxian_icon9_qi.png',
								width: 50,
								height: 50
							}];
							that.markers = [...that.markers, {
								longitude: points[points.length - 1].longitude,
								latitude: points[points.length - 1].latitude,
								iconPath: '../../static/drawable-xhdpi/faxian_icon9_zhong.png',
								width: 50,
								height: 50
							}];
						} else {
							uni.showToast({
								duration: 2000,
								icon: 'none',
								title: data.message
							});
						}
					}
				})
			},
			AddPage() {
				const orderstatus = uni.getStorageSync('order_list').length
				if (orderstatus === 0) {
					uni.showToast({
						duration: 2000,
						icon: 'none',
						title: '当前没有未完成订单，暂不可提交订单！',
						// success: () => {
						//   uni.navigateBack({
						//     delta: 1
						//   });
						// }
					});
				} else {
					uni.navigateTo({
						url: '/pages/index/add',
						success: () => {
							setInterval(() => {
								uni.$emit("append", this.addressInfo);
								uni.$off('append')
							}, 1000);
						}
					});
				}
			},
		}
	}
</script>

<style>
	.page {
		height: 100vh;
	}

	.button-group {
		padding: 15px;
	}

	button {
		width: 220px;
		background-color: #275c9f;
		font-size: 16px;
	}

	.nav-bottom {
		bottom: 0;
		position: absolute;
		left: 0;
		width: 100%;
	}
</style>
