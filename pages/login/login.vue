<template>
	<view>
		<view style="padding-top:260rpx;">
			<view style="text-align: center;">
				<image src="../../static/yx-login/logo.png" style="width: 472upx;height: 191upx; "></image>
			</view>
			<view class="nav">
				<view style="width: 85%;margin: 0px auto;">
					<view class="cu-form-group">
						<view class="title">
							<text style="font-size: 20px;" class="text-xl text-gray cuIcon-deliver_fill">
							</text>
						</view>
						<view class="center" style="margin-right: 30px;" @click="nameChange">
							{{driverName}}
							<image src="../../static/drawable-xhdpi/faxian_icon1_jiantouxia.png" mode=""></image>
						</view>
						<view class="center" @click="childChange">
							{{childName}}
							<image src="../../static/drawable-xhdpi/faxian_icon1_jiantouxia.png" mode=""></image>
						</view>

						<!-- <picker mode="multiSelector" @change="MultiChange" :value="multiIndex" :range="multiArray">
							<view class="picker">
								{{multiArray[0][multiIndex[0]]}}，{{multiArray[1][multiIndex[1]]}}
							</view>
						</picker> -->
					</view>
				</view>
				<view>
					<view class="login-input">
						<image src="../../static/yx-login/user.png"></image>
						<input type="text" placeholder="请输入车牌/账号" v-model="From.UserName"
							placeholder-style="color:#C6C5CA" />
					</view>
				</view>
				<view>
					<view class="login-input">
						<image src="../../static/yx-login/password.png"></image>
						<input type="password" placeholder="请输入密码" v-model="From.PassWord"
							placeholder-style="color:#C6C5CA" v-if="SwiTch" />
						<input type="text" placeholder="请输入密码" placeholder-style="color:#C6C5CA" v-model="From.PassWord"
							v-else />
						<image src="../../static/yx-login/b_yanjing.png" class="switch" @click="Switch()" v-if="SwiTch">
						</image>

						<image src="../../static/yx-login/yanjing.png" class="switch" @click="Switch()" v-else></image>
					</view>
				</view>

				<button @click="login"
					style="width: 88%;background-color: #2B64A7;color: #FFFFFF;margin-top: 40upx;">登录</button>
				<button @click="register"
					style="width: 88%;background-color: #CDDAEA;color: #FFFFFF;margin-top: 20upx;">注册</button>
				<text @click="verify" class="verify">验证码登录</text>
				<!-- <button 
					style="width: 88%;background-color: #CDDAEA;color: #FFFFFF;margin-top: 20upx;"></button> -->
			</view>
			<view class="login-button text-center margin-top-xl" style="margin-top: 40px;">
				<radio :checked="checked" @click="clickchecked" class="blue radio">&nbsp;&nbsp;&nbsp;&nbsp;记住密码</radio>
			</view>

		</view>
	</view>

	</view>
</template>

<script>
import util from '@/common/util.js';
var _this;
/* 本图标全部使用阿里图标,图标目录static yx-login */
export default {
  data () {
    return {
      driverName: '司机',
      childName: '服务器1',
      childList: [],
      multiIndex: [0, 0],
      From: {
        UserName: '', //账号
        PassWord: '123456', //密码
      },
      checked: false, //单选框
      SwiTch: true
    }
  },
  // 读取本地存储密码及账号
  onShow () {
    _this = this
    uni.getStorage({
      key: 'UserInfo',
      success: (e) => {
        this.From.UserName = e.data.UserName
        this.From.PassWord = e.data.PassWord
      }
    })
  },
  methods: {
    // 选择司机或者供应商
    nameChange () {
      const itemList = ['司机', '供应商']
      uni.showActionSheet({
        itemList,
        success: (res) => {
          this.driverName = itemList[res.tapIndex]
          if (res.tapIndex === 0) {
            // 请求车牌号列表
            this.childList = []
            util.myRequest({
              method: 'get',
              url: '/carinfo/carinfo/listNotoken',
              success: ({ data }) => {
                data.result.records.forEach(item => {
                  this.childList.push(item.carno)
                });
                this.childName = this.childList[0]
              }
            })
            this.From.UserName = '13577777777'
            this.From.PassWord = '123456'
          } else {

            this.childList = []
            this.From.UserName = '15566666666'
            this.From.PassWord = '159456'
            this.childList = ['供应商1', '供应商2', '供应商3', '供应商4', '供应商5']
            this.childName = this.childList[0]
          }
        }
      });
    },
    // 选择车牌号或者手机号
    childChange () {
      if (this.childList.length === 0) {
        uni.showToast({
          icon: 'none',
          position: 'bottom',
          title: '请先选择登录方式'
        });
      } else {
        const itemList = this.childList
        uni.showActionSheet({
          itemList,
          success: (res) => {
            this.childName = itemList[res.tapIndex]
          }
        });
      }
    },
    MultiChange (e) {
      this.multiIndex = e.detail.value
    },
    /* 
    登录逻辑部分
     */
    login () {
      var that = this
      switch (that.driverName) {
        case '司机':
          const driverinfo = {
            username: this.From.UserName,
            password: this.From.PassWord,
            carno: this.childName
          }
          // uni.reLaunch({
          //   url: '/pages/index/index'
          // });
          // 验证登录方式
          if (that.childList.length === 0) {
            uni.showToast({
              icon: 'none',
              position: 'bottom',
              title: '请先选择登录方式?'
            });
          } else {
            // 验证账号密码
            if (that.From.UserName && that.From.PassWord) {
              util.myRequest({
                method: 'post',
                url: '/sys/login',
                data: driverinfo,
                success: ({
                  data
                }) => {
                  if (data.success === true) {
                    util.setToken(data.result.token)
                    util.setcarInfo(data.result.carInfo)
                    util.saveUserData(data.result.userInfo)
                    /* 验证成功跳转目标页面 */
                    // uni.showToast({
                    //   icon: 'success',
                    //   position: 'center',
                    //   title: data.message
                    // });
                    setTimeout(() => {
                      uni.reLaunch({
                        url: '/pages/relea/index'
                      });
                    }, 500)
                  } else {
                    uni.showToast({
                      icon: 'none',
                      position: 'bottom',
                      title: data.message
                    });
                  }
                }
              })
            } else {
              uni.showToast({
                icon: 'none',
                position: 'bottom',
                title: '用户名或密码不能为空'
              });
            }
          }
          break;
        case '供应商':
          const supplier = {
            username: this.From.UserName,
            password: this.From.PassWord
          }
          if (that.From.UserName && that.From.PassWord) {
            util.myRequest({
              method: 'post',
              url: '/sys/login',
              data: supplier,
              success: ({
                data
              }) => {
                if (data.success === true) {
                  util.setToken(data.result.token)
                  util.saveUserData(data.result.userInfo)
                  /* 验证成功跳转目标页面 */
                  // uni.showToast({
                  //   icon: 'success',
                  //   position: 'center',
                  //   title: data.message
                  // });
                  setTimeout(() => {
                    uni.reLaunch({
                      url: '/pages/relea/index'
                    });
                  }, 500)
                } else {
                  uni.showToast({
                    icon: 'none',
                    position: 'bottom',
                    title: data.message
                  });
                }
              }
            })

          } else {
            uni.showToast({
              icon: 'none',
              position: 'bottom',
              title: '用户名或密码不能为空'
            });
          }
          break;
        default:
          break;
      }

    },
    /* 记住密码用户第二次进入页面直接填充 */
    clickchecked () {
      var that = this
      this.checked = !this.checked
      if (that.checked == true) {
        if (that.From.UserName && that.From.PassWord) {
          uni.setStorage({
            key: 'UserInfo',
            data: that.From
          })
        }
      }
    },
    // 验证码登录
    verify () {
      uni.reLaunch({
        url: '/pages/login/verify'
      })
    },
    // 注册
    register () {
      uni.reLaunch({
        url: '/pages/login/register'
      })
    },
    Switch () {
      this.SwiTch = !this.SwiTch
    }
  }
}
</script>

<style lang="less">
.nav {
  width: 88%;
  height: 680upx;
  background-color: #ffffff;
  margin: 0 auto;
  margin-top: 40upx;
  border-radius: 10px;
  padding-top: 10px;
  position: relative;
}

.verify {
  position: absolute;
  right: 20upx;
  bottom: 20upx;
  color: #000;
  font-size: 32upx;
}

.center {
  width: 40%;
  padding-bottom: 20upx;
  display: flex;
  justify-content: space-between;
  border-bottom: 1upx solid #c6c5ca;

  image {
    width: 30upx;
    height: 20upx;
    margin-top: 10upx;
    color: #000000;
  }
}

/* 背景图设置 */
page {
  width: 100%;
  height: 100%;
  background-image: url(../../static/yx-login/bg.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

uni-radio .wx-radio-input,
uni-checkbox .wx-checkbox-input,
uni-radio .uni-radio-input,
uni-checkbox .uni-checkbox-input {
  margin: 0;
  width: 36upx;
  height: 36upx;
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

.login-button {
  width: 85%;
  margin: 0px auto;

  radio {
    font-size: 14px;
    color: rgb(255, 255, 255);
  }
}

.active {
  color: rgb(245, 8, 8);
  border-bottom: 1px solid rgb(245, 8, 8);
}

.tips {
  color: rgb(245, 8, 8);
  font-size: 12px;
  display: initial;
  float: right;
  padding-right: 30px;
}
</style>
