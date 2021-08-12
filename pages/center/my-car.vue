<template>
  <view>
    <cu-custom bgColor="bg-blue-one" :isBack="true" :isR="false">
      <block slot="content">我的车辆</block>
    </cu-custom>

    <view>
      <uni-collapse accordion="true">
        <block v-for="(item, index) in myCarInfo" :key="index">
          <uni-collapse-item :title="item.carno" num="3">
            <view class="cu-list menu">
              <view class="cu-item" style="background-color: #f9f9f9">
                <view class="content">
                  <text class="text-grey margin-left text-bold">到期时间</text>
                </view>
                <view class="action">
                  <text class="text-grey text-sm">{{ item.expireddate }}</text>
                </view>
              </view>
            </view>
            <view class="cu-list menu">
              <view class="cu-item" style="background-color: #f9f9f9">
                <view class="content">
                  <text class="text-grey margin-left text-bold">车辆类型</text>
                </view>
                <view class="action">
                  <text class="text-grey text-sm">{{ item.cartype }}</text>
                </view>
              </view>
            </view>
            <view class="cu-list menu">
              <view class="cu-item" style="background-color: #f9f9f9">
                <view class="content">
                  <text class="text-grey margin-left text-bold">所属车队</text>
                </view>
                <view class="action">
                  <text class="text-grey text-sm">{{
                    item.motorcadename
                  }}</text>
                </view>
              </view>
            </view>
            <view class="cu-list menu">
              <view class="cu-item" style="background-color: #f9f9f9">
                <view class="content">
                  <text class="text-grey margin-left text-bold"
                    >临时到期时间</text
                  >
                </view>
                <view class="action">
                  <text class="text-grey text-sm">{{
                    item.tempexpiredtime
                  }}</text>
                </view>
              </view>
            </view>
          </uni-collapse-item>
        </block>
      </uni-collapse>
    </view>
  </view>
</template>

<script>
import util from '@/common/util.js'
export default {
  data () {
    return {
      myCarInfo: []
    }
  },
  onLoad () {
    this.getMyCarInfo()
  },
  methods: {
    getMyCarInfo () {
      util.myRequest({
        url: '/carinfo/carinfo/getMyCar',
        method: 'get',
        data: {
          id: util.getUserId()
        },
        success: ({ data }) => {
          console.log(data);
          if (data.success === true) {
            this.myCarInfo = data.result
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
}
</script>

<style>
</style>
