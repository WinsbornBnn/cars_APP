<template>
  <view>
    <cu-custom bgColor="bg-blue-one" :isBack="true" :isR="false">
      <block slot="content">实时监控</block>
    </cu-custom>

    <scroll-view
      scroll-x
      class="bg-white nav fixed"
      :style="[{ top: CustomBar + 'px' }]"
    >
      <view class="flex">
        <view class="flex-sub bg_grey margin-xs radius" @click="mapIsShow">
          <uni-datetime-picker
            type="datatime"
            :placeholder="'开始时间'"
            @change="startDateChange"
          ></uni-datetime-picker>
        </view>
        <view class="flex-sub bg_grey margin-xs radius" @click="mapIsShow">
          <uni-datetime-picker
            type="datatime"
            placeholder="结束时间"
            @change="endDateChange"
          ></uni-datetime-picker>
        </view>
      </view>
    </scroll-view>

    <view class="content" v-show="isShow">
      <!-- 在map标签绑定经纬度和标记点数组，以及连线数组 -->
      <map
        style="width: 100%; margin-top: 45px"
        :style="[{ height: mapHeight + 'vh' }]"
        id="maps"
        :latitude="latitude"
        :longitude="longitude"
        :markers="markers"
        :polyline="polylines"
        scale="10"
      ></map>
    </view>
  </view>
</template>

<script>
import util from '@/common/util.js';
export default {
  data () {
    return {
      CustomBar: this.CustomBar,
      latitude: '',//纬度
      longitude: '',//经度
      markers: [],//标记点数组
      polylines: [],//连续数组，
      startDate: '',
      endDate: '',
      mapHeight: 100,
      carNo: util.getcarInfo().id,
      isShow: true
    }
  },
  onReady () {
    //调用的函数放到onReady里面
    this.getlocal();
  },
  methods: {
    mapIsShow () {
      this.isShow = !this.isShow
    },
    startDateChange (startTime) {
      // this.isShow = !this.isShow
        this.startDate = startTime
      if (this.startDate !== '') {
        this.getTrack()
      }
    },
    endDateChange (endTime) {
      this.endDate = endTime
      if (this.startDate === '') {
        uni.showToast({
          duration: 2000,
          icon: 'none',
          title: '请选择开始时间？'
        });
      } else {
        this.getTrack()
        //  this.isShow = !this.isShow
      }
    },
    //定位方法;获取当前的经纬度，也可以通过经纬度来获取当前的地理位置，比如：xx省、xx市、xx镇
    getlocal: function () {
      let _this = this;
      uni.getLocation({
        type: 'wgs84',
        geocode: true,
        success: function (res) {
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
    getTrack () {
      uni.showLoading({
        mask: true,
        title: "正在获取订单和轨迹，请稍后！"
      });
      var that = this;
      util.myRequest({
        method: 'get',
        url: '/track/track/getTrackByCarNo',
        data: {
          carNo: '014535405096',
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
            this.latitude = points[0].latitude
            this.longitude = points[0].longitude
            // 可以理解成下面polylines里面的一个对象为一条线，每一条线都是独立的，可以设置不同的连续颜色
            //points[]里面是从第一个对象连到最后一个对象的经纬度成一条线
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
            //增加或者减少地图上的marker时，要重新赋值markers，
            //如果两个marker有遮盖，后添加的层级更高
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

<style scoped lang="scss">
.bg_grey {
  color: #000;
  background-color: #ecf0f9;
}
</style>