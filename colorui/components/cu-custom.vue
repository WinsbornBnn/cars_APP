<template>
  <view>
    <view class="cu-custom" :style="[{ height: CustomBar + 'px' }]">
      <view
        class="cu-bar fixed"
        :style="style"
        :class="[bgImage != '' ? 'none-bg text-white bg-img' : '', bgColor]"
      >
        <view class="action" @tap="BackPage" v-if="isBack">
          <text class="cuIcon-back"></text>
          <slot name="backText"></slot>
        </view>
        <view class="action" v-if="isR"> </view>

        <view class="content" :style="[{ top: StatusBar + 'px' }]">
          <slot name="content"></slot>
        </view>
        <view class="action" @tap="AddPage" v-if="isR">
          <text class="cuIcon-camera text-df"></text>
        </view>
        <view class="action" @tap="AddAct" v-if="isAdd">
          <text class="cuIcon-edit text-df"></text>
        </view>
        <view class="action" @tap="AddJob" v-if="isAddJob">
          <text class="cuIcon-edit text-df"></text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      StatusBar: this.StatusBar,
      CustomBar: this.CustomBar
    };
  },
  name: 'cu-custom',
  computed: {
    style () {
      var StatusBar = this.StatusBar;
      var CustomBar = this.CustomBar;
      var bgImage = this.bgImage;
      var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
      if (this.bgImage) {
        style = `${style}background-image:url(${bgImage});`;
      }
      return style
    }
  },
  props: {
    bgColor: {
      type: String,
      default: ''
    },
    isBack: {
      type: [Boolean, String],
      default: false
    },
    isR: {
      type: [Boolean, String],
      default: false
    },
    isAdd: {
      type: [Boolean, String],
      default: false
    },
    isAddJob: {
      type: [Boolean, String],
      default: false
    },
    bgImage: {
      type: String,
      default: ''
    },
    addressInfo: {},
    tabNav: {}
  },
  methods: {
    BackPage () {
      uni.navigateBack({
        delta: 1
      });
    },
    AddPage () {
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
            uni.$emit("test", this.addressInfo);
          }
        });
      }
    },
    AddAct () {
      const itemList = this.tabNav
      uni.showActionSheet({
        itemList,
        success: (res) => {
          uni.navigateTo({
            url: '/pages/relea/add_crt',
            success:()=>{
              uni.$emit('test',itemList[res.tapIndex])
            }
          });
        }
      })
    },
    AddJob () {
      uni.navigateTo({
        url: '/pages/relea/add_job'
      });
    }
  }
}
</script>

<style>
</style>
