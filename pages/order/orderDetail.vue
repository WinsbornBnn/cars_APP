<template>
	<view class="body">
		<cu-custom bgColor="bg-blue-one" :isBack="true">
			<block slot="content">订单</block>
		</cu-custom>
		<view class="page-body">
			<view class="page-section page-section-gap">
				<map id="index_maps" style="width: 100%; height: 100vh" :latitude="latitude" :longitude="longitude"
					:markers="markers" :polyline="polylines">
					<cover-view class="onUp"> </cover-view>
					<!-- <cover-image
            @click="goBack"
            class="goBack"
            src="../../static/drawable-xhdpi/dingdan_xiangqing_fanhui.png"
          > -->
					</cover-image>
					<cover-image class="midImage" src="../../static/drawable-xhdpi/dingdan_xiangqing_icon1.png">
					</cover-image>
					<cover-view class="orderstatus1">
						{{ orderList.carno_Text }}
					</cover-view>
					<cover-view class="orderstatus2">
						{{ orderList.orderstatus === 0 ? '已完成' : '运输中' }}
					</cover-view>
					<cover-view v-if="isOrderShow" class="onCenter">
					</cover-view>
					<cover-view v-if="isOrderShow" class="onClose" @click="onClose">×</cover-view>
					<cover-view v-if="isOrderShow" class="cutOff"></cover-view>
					<cover-view v-if="isOrderShow" class="order-detail-list">订单详情</cover-view>
					<cover-view 
          v-if="isOrderShow" 
          :style="[{ bottom: item1.leftTop + 'px' }]" 
          class="float-left"
					v-for="(item1, index1) in leftList" 
          :key="index1">
          {{ item1.name }}
          </cover-view>

					<!-- <cover-view 
          v-if="isOrderShow" 
          v-for="(item2, index2) in leftList" 
          :key="'i'+index2"
					:style="[{ bottom: item2.leftTop + 'px' }]" 
          class="float-right">
          {{ item2.name }}
          </cover-view> -->

            
					<cover-view v-if="isOrderShow" v-for="(item2, index2) in rightList" :key="index2"
						:style="[{ bottom: item2.rightTop + 'px' }]" class="float-right">{{ item2.type }}</cover-view>
					<cover-view class="bottom-left" @click="getTrack">
						获取轨迹
					</cover-view>
					<cover-view class="bottom-right" @click="findOrderDetail">
						订单详情
					</cover-view>

					<cover-view class="onDown p-fixed"> </cover-view>
					<!-- 待发车 -->
					<cover-view class="order_status1 p-fixed">待发车</cover-view>
					<cover-view class="order_from1 p-fixed">司机正在等待发车</cover-view>
					<cover-view class="order_time1 p-fixed">{{
            orderList.createTime ? orderList.createTime : '2021-06-21'
          }}</cover-view>
					<cover-image class="p-fixed" :class="[orderList.createTime ? 'after_image1' : 'order_image1']"
						:src="orderList.createTime ? beforeUrl1 : beforeUrl1"></cover-image>
					<!-- 运输中 -->
					<cover-view class="order_status2 p-fixed" :style="[
              { color: orderList.secondweighttime ? '#000' : '#b9b9b9' },
            ]">运输中</cover-view>
					<cover-view class="order_from2 p-fixed" :style="[
              { color: orderList.secondweighttime ? '#000' : '#b9b9b9' },
            ]">已离开{{ orderList.factoryname_Text }}，开往目的地</cover-view>
					<cover-view class="order_time2 p-fixed">{{
            orderList.secondweighttime
              ? orderList.secondweighttime
              : '2021-06-21'
          }}</cover-view>
					<cover-image class="p-fixed" :class="[
              orderList.secondweighttime ? 'after_image2' : 'order_image2',
            ]" :src="orderList.secondweighttime ? afterUrl2 : beforeUrl2"></cover-image>
					<!-- 已完成 -->
					<template v-if="orderStatus === 0 ? !isActivity : isActivity">
						<cover-view class="order_status3 p-fixed">已完成</cover-view>
						<cover-view class="order_from3 p-fixed">到达{{ orderList.customername_Text }}</cover-view>
						<cover-image class="p-fixed" :class="[orderList.finishtime ? 'after_image3' : 'order_image3']"
							:src="orderList.finishtime ? afterUrl3 : beforeUrl3"></cover-image>
						<cover-view class="order_time3 p-fixed">{{
              orderList.finishtime ? orderList.finishtime : '2021-06-21'
            }}</cover-view>
						<cover-view class="order_line2 p-fixed"></cover-view>
					</template>
					<cover-view class="order_line1 p-fixed"></cover-view>
				</map>
			</view>
		</view>
	</view>
</template>

<script>
import util from '@/common/util.js';
var that
export default {
  data () {
    return {
      leftList: [{
        name: '车牌号：',
        leftTop: 430
      },
      {
        name: '客户名称：',
        leftTop: 410
      },
      {
        name: '工厂名称：',
        leftTop: 390
      },
      {
        name: '送达地区：',
        leftTop: 370
      },
      {
        name: '物料名称：',
        leftTop: 350
      },
      {
        name: '订单承重：',
        leftTop: 330
      },
      {
        name: '开票时间：',
        leftTop: 310
      },
      {
        name: '二次过磅时间：',
        leftTop: 290
      },
      {
        name: '完成时间：',
        leftTop: 270
      },
      {
        name: '完成方式：',
        leftTop: 250
      },
      {
        name: '订单里程：',
        leftTop: 230
      }
      ],
      polylines: [],
      rightList: [],
      latitude: '23.043594',
      longitude: '113.160704',
      orderList: {},
      isActivity: false,
      isOrderShow: false,
      markers: [],
      carNo: util.getcarInfo().carno,
      orderStatus: 0,
      startTime: '',
      beforeUrl1: '../../static/drawable-xhdpi/dingdan_xiagnqing_dai.png',
      beforeUrl2: '../../static/drawable-xhdpi/dingdan_xiagnqing_yunshu.png',
      beforeUrl3: '../../static/drawable-xhdpi/dingdan_xiagnqing_shou.png',
      afterUrl1: '../../static/drawable-xhdpi/dingdan_xiagnqing_dai_fangda.png',
      afterUrl2: '../../static/drawable-xhdpi/dingdan_xiagnqing_yunshu_xuanzhong.png',
      afterUrl3: '../../static/drawable-xhdpi/dingdan_xiagnqing_shou_xuanzhogn.png'
    }
  },
  onLoad () {
    that = this
    uni.$on("orderDetail", (data) => {
      that.orderList = Object.assign(data)
      const orderList = Object.assign(data)
      that.rightList = [{
        type: orderList.carno_Text,
        rightTop: 430
      },
      {
        type: orderList.customername_Text,
        rightTop: 410
      },
      {
        type: orderList.factoryname_Text,
        rightTop: 390
      },
      {
        type: orderList.areaname,
        rightTop: 370
      },
      {
        type: orderList.goodsname_Text,
        rightTop: 350
      },
      {
        type: orderList.orderweight + '吨',
        rightTop: 330
      },
      {
        type: orderList.createTime,
        rightTop: 310
      },
      {
        type: orderList.secondweighttime,
        rightTop: 290
      },
      {
        type: orderList.secondweighttime,
        rightTop: 270
      },
      {
        type: orderList.finishtype,
        rightTop: 250
      },
      {
        type: '30Km',
        rightTop: 230
      }
      ]
      that.orderStatus = orderList.orderstatus
      that.startTime = orderList.ordertime
    });
  },
  onShow () { },
  methods: {
    goBack () {
      uni.navigateBack({
        delta: 1
      })
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
          carNo: this.carNo,
          beginTime: this.startTime,
          endTime: util.getNowTime()
        },
        success: ({
          data
        }) => {
          console.log(data)
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
            console.log(points)
            this.latitude = points[0].latitude
            this.longitude = points[0].longitude
            // 可以理解成下面polylines里面的一个对象为一条线，每一条线都是独立的，可以设置不同的连续颜色
            //points[]里面是从第一个对象连到最后一个对象的经纬度成一条线
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
    },
    findOrderDetail () {
      this.isOrderShow = true
    },
    onClose () {
      this.isOrderShow = false
    }
  }
}
</script>

<style lang="less">
.cutOff {
  // width: 98%;
  position: absolute;
  height: 1px;
  left: 25px;
  bottom: 470px;
  right: 25px;
  background-color: #ccc;
}

.onClose {
  position: absolute;
  width: 30px;
  height: 30px;
  font-size: 28px;
  right: 15px;
  bottom: 480px;
}
.order-detail-list{
  position: absolute;
  font-size: 16px;
  left:35px;
  bottom: 480px;
}

.page-body {
  position: relative;
  height: 100vh;
}

.onUp {
  position: absolute;
  display: flex;
  background-color: #fff;
  width: 92%;
  height: 100upx;
  top: 30upx;
  left: 30upx;
  box-shadow: 0 8upx 4upx rgb(26 26 26 / 20%);
  color: #000;
  font-weight: 700;
  border-radius: 15upx;
}

.goBack {
  height: 60upx;
  width: 40upx;
  margin-top: 50upx;
  margin-left: 50upx;
  display: none;
}

.midImage {
  width: 90upx;
  position: absolute;
  height: 88upx;
  left: 50upx;
  top: 40upx;
}

.orderstatus1 {
  position: absolute;
  top: 66upx;
  left: 240upx;
  color: #000;
  font-weight: 700;
  height: 100upx;
}

.orderstatus2 {
  width: 120upx;
  position: absolute;
  top: 66upx;
  height: 100upx;
  left: 360upx;
  padding-left: 15upx;
  color: #000;
  font-weight: 700;
}

.onCenter {
  position: absolute;
  box-shadow: 0 8upx 4upx rgb(26 26 26 / 20%);
  width: 92%;
  background-color: rgba(255, 255, 255, 1);
  height: 600upx;
  left: 30upx;
  border-radius: 15upx;
  bottom: 460upx;
}

.top {
  padding: 30upx;

  .u-f {
    display: flex;
    justify-content: space-between;

    &:last-child {
      margin-top: 20upx;
      height: 1upx;
      background-color: #999;
    }

    cover-view {
      margin: 4upx 0;
      color: #000;
      font-weight: 700;

      &:first-child {
        color: #999;
      }
    }
  }
}

.float-left {
  position: absolute;
  height: 70upx;
  left: 50upx;
  font-size: 32upx;
  color: #999;
}

.float-right {
  color: #000;
  position: absolute;
  float: right;
  right: 50upx;
  height: 70upx;
  // top: 290px;
  text-align: right;
  font-weight: 700;
}

.bottom-left {
  position: absolute;
  bottom: 220px;
  left: 116upx;
  background-color: #2b64a7;
  color: #ffffff;
  width: 30%;
  text-align: center;
  height: 100upx;
  line-height: 100upx;
  border-radius: 20upx;
  font-size: 40upx;
}

.bottom-right {
  position: absolute;
  bottom: 220px;
  right: 116upx;
  background-color: #2b64a7;
  color: #ffffff;
  width: 30%;
  text-align: center;
  height: 100upx;
  line-height: 100upx;
  border-radius: 20upx;
  font-size: 40upx;
}

.onDown {
  box-shadow: 0 8upx 4upx rgb(26 26 26 / 20%);
  background-color: #fff;
  width: 92%;
  height: 240upx;
  border-radius: 15upx;
  left: 30upx;
  bottom: 16upx;
}

.order_status1 {
  color: #b9b9b9;
  font-size: 14px;
  bottom: 27px;
  left: 60px;
}

.order_status2 {
  font-size: 14px;
  bottom: 62px;
  left: 60px;
}

.order_status3 {
  bottom: 98px;
  font-size: 14px;
  left: 60px;
}

.order_from1 {
  color: #b9b9b9;
  bottom: 13px;
  left: 60px;
  font-size: 12px;
}

.order_from2 {
  // right:20px;
  // overflow: hidden;
  font-size: 12px;
  bottom: 48px;
  left: 60px;
}

.order_from3 {
  font-size: 12px;
  bottom: 83px;
  left: 60px;
}

.order_time1 {
  bottom: 27px;
  right: 20px;
}

.order_time2 {
  bottom: 62px;
  right: 20px;
}

.order_time3 {
  bottom: 98px;
  right: 20px;
}

.order_image1 {
  bottom: 25px;
  left: 35px;
  width: 20px;
  height: 20px;
}

.order_image2 {
  width: 20px;
  height: 20px;
  bottom: 60px;
  left: 35px;
}

.order_image3 {
  width: 20px;
  height: 20px;
  bottom: 95px;
  left: 35px;
}

.order_line1 {
  height: 16px;
  width: 1px;
  bottom: 43px;
  left: 43px;
  border: 1px solid #a9a9a9;
}

.order_line2 {
  height: 16px;
  width: 1px;
  bottom: 78px;
  left: 43px;
  border: 1px solid #a9a9a9;
}

.after_image1 {
  width: 26px;
  height: 26px;
  bottom: 25px;
  left: 32px;
}

.after_image2 {
  width: 26px;
  height: 26px;
  bottom: 60px;
  left: 32px;
}

.after_image3 {
  width: 26px;
  height: 26px;
  bottom: 95px;
  left: 32px;
}
</style>
