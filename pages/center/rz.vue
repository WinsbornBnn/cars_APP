<template>
	<view>
		<cu-custom bgColor="bg-blue-one" :isBackTo="true">
			<block slot="content">用户认证</block>
		</cu-custom>
		<form @submit="formSubmit">
			<view class="grid col-3 text-center margin-top-xl bg-white padding-bottom-xl">
				<view class="cu-item" @tap="addIdCardImage()">
					<view class="cuIcon-cu-image padding">
						<image class="icon_tb" :src="IdImageUrl"></image>
					</view>
					<text>身份证人像照</text>
				</view>
				<view class="cu-item" @tap="addDrivingImage()">
					<view class="cuIcon-cu-image padding">
						<image class="icon_tb" :src="DrivingImageUrl"></image>
					</view>
					<text>行驶证正业</text>
				</view>
				<view class="cu-item" @tap="addDriverImage()">
					<view class="cuIcon-cu-image padding">
						<image class="icon_tb" :src="DriverImageUrl"></image>
					</view>
					<text>驾驶证正业</text>
				</view>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">姓名</view>
				<input style="padding-left: 60px;" placeholder="上传照片自动获取" name="input" v-model="username"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">身份证</view>
				<input style="padding-left: 45px;" placeholder="上传照片自动获取" name="input" v-model="Idcard"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">车牌号</view>
				<input style="padding-left: 45px;" placeholder="上传照片自动获取" name="input" v-model="PlateNum"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">车辆识别代号</view>
				<input placeholder="上传照片自动获取" name="input" v-model="vehicleNum"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">手机号</view>
				<input style="padding-left: 45px;" name="input" v-model="TellNum" maxlength="11"></input>
			</view>
			<view class="padding flex flex-direction" style="padding-top: 80upx;">
				<button class="cu-btn bg-blue-one lg" form-type="submit">提交</button>
			</view>
		</form>
	</view>
</template>

<script>
import util from '@/common/util.js';
var that

export default {
  data () {
    return {
      IdImageUrl: '../../static/drawable-xhdpi/wode_icon1_pic.png',
      DriverImageUrl: '../../static/drawable-xhdpi/wode_icon1_pic.png',
      DrivingImageUrl: '../../static/drawable-xhdpi/wode_icon1_pic.png',
      username: '',
      Idcard: '',
      PlateNum: '',
      vehicleNum: '',
      TellNum: '',
      userId: util.readUserData().id,
      deviceId: null
    }
  },
  onLoad () {
    that = this;
    uni.getSystemInfo({
      success: function (res) {
        // console.log(res.model);
        // console.log(res.pixelRatio);
        // console.log(res.windowWidth);
        // console.log(res.windowHeight);
        // console.log(res.language);
        // console.log(res.version);
        // console.log(res.platform);
        // console.log(res.deviceId);
        that.deviceId = res.deviceId
      }
    });
  },
  methods: {
    formSubmit () {
      let iphoneReg = /^[1][3,4,5,7,8,9][0-9]{9}$/
      const sysAuthentication = {
        bycarNumber: this.vehicleNum,
        carNumber: this.PlateNum,
        idcard: this.Idcard,
        name: this.username,
        phone: this.TellNum,
        sid: this.userId,
        hardwarecode: that.deviceId
      }
      if (this.username === '' ||
        this.Idcard === '' ||
        this.PlateNum === '' ||
        this.vehicleNum === '') {
        uni.showToast({
          icon: 'none',
          position: 'center',
          title: '请先完善认证信息？'
        })
      } else {
        if (!iphoneReg.test(this.TellNum)) {
          uni.showToast({
            icon: 'none',
            position: 'center',
            title: '手机号码格式不对?'
          });
          return false
        } else {
          util.myRequest({
            url: '/baiduapi/sel/selectSysAuth',
            method: 'post',
            data: sysAuthentication,
            success: ({ data }) => {
              if (data.success) {
                var userInfo = util.readUserData();
                userInfo.thirdType = '1';
                util.saveUserData(userInfo);
                setTimeout(() => {
                  uni.reLaunch({
                    url: '/pages/center/index'
                  });
                }, 2000);
              } else {
                uni.showToast({
                  icon: 'none',
                  position: 'bottom',
                  title: '认证失败请重试？'
                });
              }
            }
          })
        }
      }
    },
    // 身份证
    addIdCardImage () {
      uni.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          const tempFilePaths = res.tempFilePaths;
          uni.uploadFile({
            url: util.getSysUrl() + '/sys/common/upload',
            fileType: "image",
            filePath: tempFilePaths[0],
            name: 'file',
            header: {
              'X-Access-Token': util.getToken(),
              'Accept': 'aplication/json,text/plain,*/*'
            },
            success: (uploadFileRes) => {
              let imgData = JSON.parse(uploadFileRes.data)
              let uploadUrl = imgData.message
              that.IdImageUrl = util.getSysImgUrl() + imgData.message
              util.myRequest({
                url: '/baiduapi/sel/selectIdcard',
                method: 'get',
                data: {
                  images: uploadUrl
                },
                success: ({ data }) => {
                  if (data.success) {
                    that.username = data.result.name
                    that.Idcard = data.result.idNumber
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
          });
        }
      });
    },
    // 驾驶证
    addDriverImage () {
      var that = this
      uni.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          const tempFilePaths = res.tempFilePaths;
          // that.DriverImageUrl = tempFilePaths[0]
          uni.uploadFile({
            url: util.getSysUrl() + '/sys/common/upload',
            fileType: "image",
            filePath: tempFilePaths[0],
            name: 'file',
            header: {
              'X-Access-Token': util.getToken(),
              'Accept': 'aplication/json,text/plain,*/*'
            },
            success: (uploadFileRes) => {
              let imgData = JSON.parse(uploadFileRes.data)
              let uploadUrl = imgData.message
              that.DriverImageUrl = util.getSysImgUrl() + imgData.message
              util.myRequest({
                url: '/baiduapi/sel/selectDriving',
                method: 'get',
                data: {
                  images: uploadUrl
                },
                success: ({ data }) => {
                  if (data.success) {
                    uni.showToast({
                      icon: 'success',
                      position: 'center',
                      title: data.message
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
          });
        }
      });
    },
    // 行驶证
    addDrivingImage () {
      var that = this
      uni.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          const tempFilePaths = res.tempFilePaths;
          // that.DrivingImageUrl = tempFilePaths[0]
          uni.uploadFile({
            url: util.getSysUrl() + '/sys/common/upload',
            fileType: "image",
            filePath: tempFilePaths[0],
            name: 'file',
            header: {
              'X-Access-Token': util.getToken(),
              'Accept': 'aplication/json,text/plain,*/*'
            },
            success: (uploadFileRes) => {
              let imgData = JSON.parse(uploadFileRes.data)
              let uploadUrl = imgData.message
              that.DrivingImageUrl = util.getSysImgUrl() + imgData.message
              util.myRequest({
                url: '/baiduapi/sel/selectVehicle',
                method: 'get',
                data: {
                  images: uploadUrl
                },
                success: ({ data }) => {
                  that.PlateNum = data.result.plateNumber
                  that.vehicleNum = data.result.carNumber
                  if (data.success) {
                    uni.showToast({
                      icon: 'success',
                      position: 'center',
                      title: data.message
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
          });
        }
      });
    }
  },
  mounted() {
    var thirdType = util.readUserData().thirdType
    if (thirdType === '1') {
      uni.showToast({
        duration: 2000,
        icon: 'none',
        title: '您已认证过了！'
      });
      setTimeout(() => {
        uni.reLaunch({
          url: '/pages/center/index'
        });
      }, 500);
    }
  },
}
</script>

<style>
.icon_tb {
  height: 60px;
}

.title {
  color: #000;
  font-weight: 700;
}

.cu-item > text {
  color: #000;
  font-weight: 700;
}
button {
  border-radius: 10px;
}
</style>
