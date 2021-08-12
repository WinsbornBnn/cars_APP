<template>
  <view>
    <cu-custom bgColor="bg-blue-one">
      <block slot="content">首页</block>
    </cu-custom>
    <view class="page-body">
      <view class="page-section page-section-gap">
        <map
          id="index_maps"
          style="width: 100%; height: 100vh"
          :latitude="latitude"
          :longitude="longitude"
          :markers="markers"
        >
        </map>
      </view>
    </view>
  </view>
</template>

<script>
import util from '@/common/util.js';
export default {
  data () {
    return {
      markers: [],
      latitude: '',
      longitude: '',
    }
  },
  onLoad () {
    this.getlocal();
    this.getHomeVehicle()
  },
  onShow () {
    uni.setTabBarItem({
      index: 0,
      pagePath: "/pages/index/priverIndex",
      text: "首页",
      iconPath: "/static/drawable-xxhdpi/home.png",
      selectedIconPath: "/static/drawable-xxhdpi/home_cur.png"
    })
  },
  methods: {
    //获取当前定位
    getlocal: function () {
      let _this = this;
      uni.getLocation({
        type: 'wgs84',
        geocode: true,
        success: function (res) {
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
    getHomeVehicle () {
      util.myRequest({
        url: '/supplier/supplier/getHomeVehicle',
        method: 'get',
        data: {
          supplierId: util.getUserId()
        },
        success: ({ data }) => {
          if (data.success === true) {
            data.result.forEach(item => {
              this.markers.push({
                latitude: item.lat,
                longitude: item.lng,
                iconPath: '../../static/gys/drawable-xhdpi/shouye_che.png',
                width: 40,
                height: 40
              })
            });
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
  }
}
</script>

<style>
</style>