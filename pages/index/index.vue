<template name="home">
  <view>
    <cu-custom bgColor="bg-blue-one" isR="true" :addressInfo="addressInfo">
      <block slot="content">首页</block>
    </cu-custom>
    <view class="page-body">
      <view class="page-section page-section-gap">
        <map
          id="index_maps"
          style="width: 100%; height: 60vh"
          :latitude="latitude"
          :longitude="longitude"
          :markers="markers"
          :polyline="polylines"
        >
        </map>
        <view style="/*height: 40vh;*/">
          <view class="padding-lr bg-white">
            <!-- <view class="padding solid-bottom">当前订单：</view> -->
            <view class="padding">目的地：{{ customername }}</view>
            <view class="padding solid-bottom" @click="getlocal()"
              >当前位置：{{ address }}</view
            >
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
  data () {
    return {
      activeColor: "#fa3534", // 选中时的颜色
      inactiveColor: "#000",  // 未选中时的颜色
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
      addressInfo: []
    }
  },
  onShow () {
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
  onLoad () {
    this.getlocal();
    uni.showLoading({
      mask: true,
      title: "正在获取订单和轨迹，请稍后！"
    });
    this.orderInit()
    this.trackInit()
    // setTimeout(() => {
    // }, 3000);
  },
  methods: {
    //获取当前定位
    getlocal: function () {
      let _this = this;
      uni.getLocation({
        type: 'wgs84',
        geocode: true,
        success: function (res) {
          console.log(res);
          _this.addressInfo.push(res)
          _this.address = res.address.poiName;
          _this.longitude = res.longitude;
          _this.latitude = res.latitude;
          _this.markers.push({
            longitude: res.longitude,
            latitude: res.latitude,
            iconPath: '../../static/drawable-xhdpi/faxian_icon6_icon1.png',
            width: 30,
            height: 30
          });
        }
      })

      //显示当前位置
      var map = uni.createMapContext('index_maps', this).$getAppMap();
      // map.showUserLocation(true);
    },
    // 未完成订单
    orderInit () {
      util.myRequest({
        method: 'get',
        url: '/order/orderinfo/getOrderByCarNO',
        data: {
          carNo: this.carId
        },
        success: ({ data }) => {
          uni.hideLoading();
          if (data.success === true) {
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
    trackInit () {
      let that = this
      util.myRequest({
        method: 'get',
        url: '/track/track/getTrackByCarNo',
        data: {
          carNo: this.carNo,
          beginTime: '2020-12-27 12:00:00',
          endTime: '2021-01-27 12:10:00'
        },
        success: ({ data }) => {
          uni.hideLoading();
          if (data.success === true) {
            const points = []
            data.result.forEach(item => {
              points.push({
                latitude: item.lat,
                longitude: item.lng
              })
            });
            that.polylines = [
              {
                points: points,
                arrowLine: true,
                dottedLine: true,
                width: 8,
                color: "C070F0"
              }
            ]
            that.markers = [{
              latitude: points[0].latitude,
              longitude: points[0].longitude,
              iconPath: '../../static/drawable-xhdpi/faxian_icon9_qi.png',
              width: 30,
              height: 30
            }];
            that.markers = [...that.markers, {
              longitude: points[points.length - 1].longitude,
              latitude: points[points.length - 1].latitude,
              iconPath: '../../static/drawable-xhdpi/faxian_icon9_zhong.png',
              width: 30,
              height: 30
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
    }
  }
}
</script>

<style>
.page {
  height: 100vh;
}
</style>
