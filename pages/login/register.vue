<template>
  <view>
    <view style="padding-top: 260rpx">
      <view style="text-align: center">
        <image
          src="../../static/yx-login/logo.png"
          style="width: 472upx; height: 191upx"
        ></image>
      </view>
      <view
        style="
          width: 88%;
          height: 550upx;
          background-color: #ffffff;
          margin: 0 auto;
          margin-top: 40upx;
          border-radius: 10px;
          padding-top: 10px;
        "
      >
        <view>
          <view class="login-input">
            <image src="../../static/drawable-xxhdpi/phone.png"></image>
            <input
              type="text"
              placeholder="手机号码"
              v-model="From.UserName"
              placeholder-style="color:#C6C5CA"
            />
          </view>
        </view>

        <view>
          <view class="login-input">
            <image src="../../static/drawable-xxhdpi/phone.png"></image>
            <input
              type="text"
              placeholder="车牌号"
              v-model="From.UserName"
              placeholder-style="color:#C6C5CA"
            />
          </view>
        </view>

        <button
          @click="submitRegist"
          style="
            width: 88%;
            background-color: #2b64a7;
            color: #ffffff;
            margin-top: 60upx;
          "
        >
          提交
        </button>
        <button
          @click="goLogin"
          style="
            width: 88%;
            background-color: #cddaea;
            color: #ffffff;
            margin-top: 20upx;
          "
        >
          已有账号去登录
        </button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      From: {
        UserName: '123456'
      }
    }
  },
  methods: {
    submitRegist () {

    },
    goLogin () {
      uni.navigateTo({
        url: './login'
      })
    }
  },
}
</script>

<style lang="less">
/* 背景图设置 */
page {
  width: 100%;
  height: 100%;
  background-image: url(../../static/yx-login/bg.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.title {
  text-align: justify;
  padding-right: 30upx;
  font-size: 30upx;
  position: relative;
  height: 60upx;
  line-height: 60upx;
}

picker {
  flex: 1;
  padding-right: 40upx;
  overflow: hidden;
  position: relative;
}

picker .picker {
  line-height: 100upx;
  font-size: 28upx;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
  text-align: left;
  color: #c6c5ca;
}

picker::after {
  font-family: cuIcon;
  display: block;
  content: '\e6a3';
  position: absolute;
  font-size: 34upx;
  color: #8799a3;
  line-height: 100upx;
  width: 60upx;
  text-align: center;
  top: 0;
  bottom: 0;
  right: -20upx;
  margin: auto;
}

.cu-form-group picker .picker {
  line-height: 100rpx;
  font-size: 28rpx;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
  text-align: left;
}

.cu-form-group {
  padding: 0px !important;
}

.login-input {
  width: 85%;
  // height: 63px;
  margin: 0px auto;
  border-bottom: 1px solid #c6c5ca;
  display: flex;

  input {
    width: 91%;
    border: none;
    height: 40px;
    color: #c6c5ca;
    padding-left: 15px;
    padding-right: 15px;
    font-size: 14px;
    margin-top: 15px;
    outline: none;
    -webkit-appearance: none;
    /*去除系统默认的样式*/
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    /* 点击高亮的颜色*/
  }

  image {
    width: 20px;
    height: 20px;
    margin-top: 25px;
  }

  .delete {
    width: 20px;
    height: 20px;
    margin-left: -20px;
  }

  .switch {
    width: 23px;
    height: 14px;
    padding-top: 3px;
  }
}
</style>
