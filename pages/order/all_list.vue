<template>
  <view>
    <cu-custom bgColor="bg-blue-one" :isBack="false" :isR="false">
      <block slot="content">订单</block>
    </cu-custom>

    <view class="page-body">
      <view class="radius shadow bg-white">
        <swiper
          class="screen-swiper square-dot"
          :indicator-dots="true"
          :circular="true"
          :autoplay="true"
          interval="5000"
          duration="500"
        >
          <swiper-item v-for="(item, index) in swiperList" :key="index">
            <image
              style="border-radius: 15px"
              :src="item.url"
              mode="aspectFill"
              v-if="item.type == 'image'"
            ></image>
            <video
              :src="item.url"
              autoplay
              loop
              muted
              :show-play-btn="false"
              :controls="false"
              objectFit="cover"
              v-if="item.type == 'video'"
            ></video>
          </swiper-item>
        </swiper>
      </view>
      <view class="grid col-4 text-center radius shadow bg-white"
      style="padding:15px;">
        <view class="cu-item text-center" @tap="showCarList(0)">
          <view class="cuIcon-cu-image">
            <uni-badge
              size="small"
              :text="fourTotal.orderAll > 99 ? '99+' : fourTotal.orderAll"
              type="error"
              custom-style="[{border-radius:50%}]"
              class="unibadge"
            >
            </uni-badge>
            <image
              class="icon_tb"
              src="../../static/gys/drawable-xxhdpi/1.png"
            ></image>
          </view>
          <view>全部订单</view>
          <view>数量</view>
        </view>
        <view class="cu-item text-center" @tap="showCarList(1)">
          <view class="cuIcon-cu-image">
            <uni-badge
              size="small"
              :text="
                fourTotal.orderAllWeight > 99 ? '99+' : fourTotal.orderAllWeight
              "
              type="error"
              class="unibadge"
            >
            </uni-badge>
            <image
              class="icon_tb"
              src="../../static/gys/drawable-xxhdpi/2.png"
            ></image>
          </view>
          <view>全部订单</view>
          <view>重量</view>
        </view>
        <view class="cu-item text-center" @tap="showCarList(2)">
          <view class="cuIcon-cu-image">
            <uni-badge
              size="small"
              :text="
                fourTotal.orderAllNoFinWeight > 99
                  ? '99+'
                  : fourTotal.orderAllNoFinWeight
              "
              type="error"
              class="unibadge"
            >
            </uni-badge>
            <image
              class="icon_tb"
              src="../../static/gys/drawable-xxhdpi/dingdan_icon3.png"
            ></image>
          </view>
          <view>未完成订单</view>
          <view>数量</view>
        </view>
        <view class="cu-item text-center" @tap="showCarList(3)">
          <view class="cuIcon-cu-image">
            <uni-badge
              size="small"
              :text="
                fourTotal.orderAllNoFin > 99 ? '99+' : fourTotal.orderAllNoFin
              "
              type="error"
              class="unibadge"
            >
            </uni-badge>
            <image
              class="icon_tb"
              src="../../static/gys/drawable-xxhdpi/dingdan_icon4.png"
            ></image>
          </view>
          <view>未完成订单</view>
          <view>重量</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import util from '@/common/util.js'
import tabItemTap from '@/common/tabItemTap.js'

export default {
  mixins: [tabItemTap],
  data () {
    return {
      cardCur: 0,
      text: 99999,
      currentSwiper: 0,
      swiperList: [{
        id: 0,
        type: 'image',
        url: '../../static/gys/drawable-xxhdpi/faxian_banner.png'
      }, {
        id: 1,
        type: 'image',
        url: '../../static/gys/drawable-xxhdpi/dingdan_bannner.png'
      }],
      dotStyle: false,
      towerStart: 0,
      direction: '',
      orderAll: 0,
      orderAllWeight: 0,
      orderAllNoFinWeight: 0,
      orderAllNoFin: 0,
      fourTotal: {}
    }
  },
  onLoad () {
    this.TowerSwiper('swiperList');
    this.getFourTotal()
    uni.navigateTo({
      url: './details'
    })
  },
  onShow () {
    uni.setTabBarItem({
      index: 1,
      pagePath: "/pages/order/all_list",
      text: "订单",
      iconPath: "/static/drawable-xxhdpi/dw.png",
      selectedIconPath: "/static/drawable-xxhdpi/dw_cur.png"
    })
  },
  methods: {
    DotStyle (e) {
      this.dotStyle = e.detail.value
    },
    // cardSwiper
    cardSwiper (e) {
      this.cardCur = e.detail.current
    },
    // towerSwiper
    // 初始化towerSwiper
    TowerSwiper (name) {
      let list = this[name];
      for (let i = 0; i < list.length; i++) {
        list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
        list[i].mLeft = i - parseInt(list.length / 2)
      }
      this.swiperList = list
    },

    // towerSwiper触摸开始
    TowerStart (e) {
      this.towerStart = e.touches[0].pageX
    },

    // towerSwiper计算方向
    TowerMove (e) {
      this.direction = e.touches[0].pageX - this.towerStart > 0 ? 'right' : 'left'
    },
    // towerSwiper计算滚动
    TowerEnd (e) {
      let direction = this.direction;
      let list = this.swiperList;
      if (direction == 'right') {
        let mLeft = list[0].mLeft;
        let zIndex = list[0].zIndex;
        for (let i = 1; i < this.swiperList.length; i++) {
          this.swiperList[i - 1].mLeft = this.swiperList[i].mLeft
          this.swiperList[i - 1].zIndex = this.swiperList[i].zIndex
        }
        this.swiperList[list.length - 1].mLeft = mLeft;
        this.swiperList[list.length - 1].zIndex = zIndex;
      } else {
        let mLeft = list[list.length - 1].mLeft;
        let zIndex = list[list.length - 1].zIndex;
        for (let i = this.swiperList.length - 1; i > 0; i--) {
          this.swiperList[i].mLeft = this.swiperList[i - 1].mLeft
          this.swiperList[i].zIndex = this.swiperList[i - 1].zIndex
        }
        this.swiperList[0].mLeft = mLeft;
        this.swiperList[0].zIndex = zIndex;
      }
      this.direction = ""
      this.swiperList = this.swiperList
    },
    showCarList (tab) {
      switch (tab) {
        case 0:
          uni.navigateTo({
            url: '/pages/order/order_list',
            success: () => {
              uni.$emit('test', { value: '全部订单数量', orderStatus: '' })
            }
          });
          break;
        case 1:

          break;
        case 2:
          uni.navigateTo({
            url: '/pages/order/order_list',
            success: () => {
              uni.$emit('test', { value: '未完成订单数量', orderStatus: 1 })
            }
          });
          break;
        case 3:

          break;

        default:
          break;
      }
    },
    getFourTotal () {
      util.myRequest({
        url: '/supplier/supplier/getFourTotal',
        method: 'get',
        data: {
          supplierId: util.getUserId()
        },
        success: ({ data }) => {
          if (data.success === true) {
            this.fourTotal = Object.assign(data.result)
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
  }
}
</script>

<style>
.tower-swiper .tower-item {
  transform: scale(calc(0.5 + var(--index) / 10));
  margin-left: calc(var(--left) * 100upx - 150upx);
  z-index: var(--index);
}

.icon_tb {
  width: 64px;
  height: 64px;
}

.swiper-box {
  width: 92%;
  height: 30.7vw;
}
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
  top: 5px;
  right: -5px;
  z-index: 9999;
}
</style>
