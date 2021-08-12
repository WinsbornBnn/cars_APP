<template>
  <view class="page">
    <cu-custom bgColor="bg-blue-one" :isBack="true" :isR="false">
      <block slot="content">查车地图</block>
    </cu-custom>
    <scroll-view
      scroll-x
      class="bg-white nav fixed"
      :style="[{ top: CustomBar + 'px' }]"
    >
      <view class="flex text-center">
        <view
          class="cu-item flex-sub"
          :class="index == TabCur ? 'text-blue cur' : ''"
          v-for="(item, index) in tabNav"
          :key="index"
          @tap="tabSelect"
          :data-id="index"
        >
          {{ tabNav[index] }}
        </view>
      </view>
    </scroll-view>
    <block v-if="TabCur == 0">
      <view class="page-body">
        <view class="page-section page-section-gap">
          <map
            style="width: 100%; height: 100vh; margin-top: 45px"
            :latitude="latitude"
            :longitude="longitude"
            :markers="scancarMarkers"
          >
          </map>
        </view>
      </view>
    </block>

    <block v-if="TabCur == 1">
      <view class="page-body">
        <view class="page-section page-section-gap">
          <map
            style="width: 100%; height: 56vh; margin-top: 45px"
            :latitude="latitude"
            :longitude="longitude"
            :markers="orderMarkers"
            @tap="uploadLocation"
          >
          </map>
          <view class="cu-form-group align-start">
            <view class="title">备注</view>
            <textarea
              maxlength="-1"
              v-model="textarea"
              placeholder="请输入说明"
            ></textarea>
          </view>
          <view class="padding flex flex-direction">
            <button @click="postOrderupLoad" class="cu-btn bg-blue-one lg">
              直接上报
            </button>
          </view>
        </view>
      </view>
    </block>

    <block v-if="TabCur == 2">
      <!-- 报警 -->
      <view class="page-body">
        <view class="page-section page-section-gap">
          <map
            style="width: 100%; height: 56vh; margin-top: 45px"
            :latitude="latitude"
            :longitude="longitude"
            :markers="orderMarkers"
            @tap="uploadLocation"
          >
          </map>
          <view class="cu-form-group align-start">
            <view class="title">备注</view>
            <textarea
              maxlength="-1"
              v-model="textarea"
              placeholder="请输入说明"
            ></textarea>
          </view>
          <view class="padding flex flex-direction">
            <button class="cu-btn bg-blue-one lg" @click="postOrderupLoad">
              直接上报
            </button>
          </view>
        </view>
      </view>
    </block>
  </view>
</template>

<script>
import util from '@/common/util.js';
var that
export default {
  data () {
    return {
      CustomBar: this.CustomBar,
      TabCur: 0,
      tabNav: ['附近查车', '上报查车', '上报事故点'],
      latitude: 39.909,
      longitude: 116.39742,
      orderMarkers: [], // 标记点数组
      scancarMarkers: [],
      accidentMarkers: [],
      url: '/inspection/scancar/list',
      textarea: '',
      address: '',
      textareaBInput: ''
    }
  },
  onLoad (option) {
    that = this
    this.TabCur = option.tab
    if (option.tab === '0') {
      this.url = '/inspection/scancar/list'
      this.getScancarList()
    } else if (option.tab === '1') {
      this.url = '/inspection/scancar/add'
    } else {
      this.url = '/inspection/accident/add'
      this.textarea = this.textareaBInput
    }
    uni.$on("releaPostion", (data) => {
      this.url = data
    })
    uni.getLocation({
      type: 'wgs84',
      geocode: true,
      success: function (res) {
        that.address = res.address.poiName;
        that.longitude = res.longitude;
        that.latitude = res.latitude;
      }
    })
  },
  methods: {
    tabSelect (e) {
      if (e.currentTarget.dataset.id === 0) {
        that.url = '/inspection/scancar/list'
        this.getScancarList()
      } else if (e.currentTarget.dataset.id === 1) {
        that.url = '/inspection/scancar/add'
      } else {
        that.url = '/inspection/accident/add'
        // this.textarea = this.textareaBInput
      }
      this.TabCur = e.currentTarget.dataset.id;
      this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
    },
    uploadLocation (e) {
      var that = this;
      that.orderMarkers = []
      uni.chooseLocation({
        success: (res) => {
          console.log(res);
          this.address = res.name
          this.latitude = res.latitude
          this.longitude = res.longitude
          var markers = {
            longitude: res.longitude,
            latitude: res.latitude,
            iconPath: '../../static/drawable-xhdpi/faxian_icon6_icon1.png',
            width: 50,
            height: 50,
            callout: {
              content: `从“${res.name}”上报`,
              display: 'ALWAYS',
              bgColor: '#FFFFFF',
              color: '#000000',
              padding: 4,
              fontSize: 25
            }
          }
          that.orderMarkers.push(markers)
        }
      })
    },
    getScancarList () {
      util.myRequest({
        method: 'get',
        url: this.url,
        success: ({ data }) => {
          let markers = []
          data.result.records.forEach(item => {
            markers.push({
              longitude: item.lng,
              latitude: item.lat,
              iconPath: '../../static/drawable-xhdpi/faxian_icon6_icon1.png',
              width: 50,
              height: 50,
              callout: {
                content: `${item.description}\t\t${item.createTime}\n${item.name}`,
                display: 'ALWAYS',
                bgColor: '#FFFFFF',
                color: '#000000',
                padding: 4,
                fontSize: 25
              }
            })
          });
          that.scancarMarkers = markers
        }
      })
    },
    postOrderupLoad () {
      if (this.textarea === '' || this.orderMarkers.length === 0) {
        uni.showToast({
          duration: 2000,
          icon: 'none',
          title: '请完善上报信息？'
        });
      } else {
        util.myRequest({
          method: 'post',
          url: this.url,
          data: {
            description: this.textarea,
            lat: that.latitude,
            lng: that.longitude,
            name: this.address
          },
          success: (data) => {
            console.log(data);
          }
        })
        this.textarea = ''
      }
    }
  }
}
</script>

<style>
.page {
  height: 100vh;
  background-color: #ffffff;
}
</style>
