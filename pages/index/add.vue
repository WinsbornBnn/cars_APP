<template>
  <view>
    <cu-custom bgColor="bg-blue-one" isBack="true">
      <block slot="content">上传照片</block>
    </cu-custom>
    <view class="padding">
      <view class="padding-xl radius shadow shadow-lg bg-white" id="shadow"
        >车牌号：
        <input type="text" v-model="carId" />
      </view>
      <view class="padding-xl radius shadow shadow-lg bg-white margin-top">
        <text>车辆到货地点照片（需包含车辆）</text>
        <image
          @tap="addLocalImages"
          :src="localImages"
          style="width: 100%; height: 300upx"
        ></image>
      </view>

      <view class="padding-xl radius shadow shadow-lg bg-white margin-top">
        <text>请添加车辆正面照片</text>
        <image
          @tap="addCarImages"
          :src="carImages"
          style="width: 100%; height: 300upx"
        ></image>
      </view>
    </view>
    <view class="padding flex flex-direction">
      <button class="cu-btn bg-blue-one lg" @click="submitInformation">
        提交
      </button>
    </view>
  </view>
</template>

<script>
import util from '@/common/util.js';
var that
export default {
  data () {
    return {
      carId: util.getcarInfo().carno,
      localImages: '../../static/drawable-xxhdpi/add_img.png', //车辆到货地点照片
      carImages: '../../static/drawable-xxhdpi/add_img.png', //车辆正面照片
      carCoordinate: {}, //车辆正面照片坐标
      localCoordinate: {}, //车辆到货地点坐标
      carNoList: uni.getStorageSync('order_list'),
      uploadcarimg: '',
      uploaddriverimg: '',
      phoneimei: 0,
      addressInfo: []
    }
  },
  mounted () {
    // if (this.carNoList.length === 0) {
    //   uni.showToast({
    //     duration: 2000,
    //     icon: 'none',
    //     title: '当前订单已完成，没有可提交订单！',
    //     success: () => {
    //       uni.navigateBack({
    //         delta: 1
    //       });
    //     }
    //   });
    // }
    uni.$on("test", (data) => {
      this.addressInfo = data
    })
    uni.getSystemInfo({
      success: function (res) {
        this.phoneimei = res.deviceId
      }
    });
  },
  methods: {
    addLocalImages (e) {
      var that = this
      uni.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], //album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项
        success: function (res) {
          const tempFilePaths = res.tempFilePaths;
          const uploadTask = uni.uploadFile({
            url: util.getSysUrl() + '/sys/common/uploadWithPos', //服务器地址
            fileType: "image", //ZFB必填,不然报错
            filePath: tempFilePaths[0], //这个就是我们上面拍照返回或者先中照片返回的数组
            name: 'file',
            header: {
              'X-Access-Token': util.getToken(),
              'Accept': 'aplication/json,text/plain,*/*'
            },
            success: (uploadFileRes) => {
              console.log(uploadFileRes);
              let imgData = JSON.parse(uploadFileRes.data)
              if (imgData.result === null) {
                uni.showToast({
                  icon: 'none',
                  title: '请选择或拍摄有位置的图片？'
                })
                that.localImages = '../../static/drawable-xxhdpi/add_img.png'
              } else {
                uni.showToast({
                  duration: 2000,
                  icon: 'success',
                  title: '上传成功'
                });
                that.localImages = util.getSysImgUrl() + imgData.message
                that.uploadcarimg = imgData.message
                that.localCoordinate.carlat = imgData.result.latitude
                that.localCoordinate.carlng = imgData.result.longitude
              }
            }
          });
        }
      });
    },
    addCarImages (e) {
      var that = this
      uni.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          const tempFilePaths = res.tempFilePaths;
          let uploadTask = uni.uploadFile({
            url: util.getSysUrl() + '/sys/common/uploadWithPos',
            fileType: "image",
            filePath: tempFilePaths[0],
            name: 'file',
            header: {
              'X-Access-Token': util.getToken(),
              'Accept': 'aplication/json,text/plain,*/*'
            },
            success: (uploadFileRes) => {
              console.log(uploadFileRes);
              let imgData = JSON.parse(uploadFileRes.data)
              if (imgData.result === null) {
                uni.showToast({
                  icon: 'none',
                  title: '请选择或拍摄有位置的图片？'
                })
                that.carImages = '../../static/drawable-xxhdpi/add_img.png'
              } else {
                uni.showToast({
                  duration: 2000,
                  icon: 'success',
                  title: '上传成功'
                });
                that.carImages = util.getSysImgUrl() + imgData.message
                that.uploaddriverimg = imgData.message
                that.carCoordinate.carlat = imgData.result.latitude
                that.carCoordinate.carlng = imgData.result.longitude
              }
            }
          });
        }
      });
    },
    submitInformation () {
      const orderupload = {
        caraddress: this.addressInfo[0].address.poiName,
        // carlat: this.carCoordinate.carlat,
        // carlng: this.carCoordinate.carlng,
        createTime: this.carNoList[0].createTime,
        id: this.carNoList[0].id,
        phoneimei: this.phoneimei,
        uploadaddress: this.addressInfo[0].address.street,
        uploadcarimg: this.uploadcarimg,
        uploaddriverimg: this.uploaddriverimg,
        uploadlat: this.carCoordinate.carlat,
        uploadlng: this.carCoordinate.carlng
      }
      if (this.uploaddriverimg === '' || this.uploadcarimg === '') {
        uni.showToast({
          duration: 2000,
          icon: 'none',
          title: '请完善上传信息！'
        });
      } else {
        util.myRequest({
          url: '/order/orderupload/add',
          method: 'post',
          data: orderupload,
          success: ({ data }) => {
            console.log(data);
            if (data.success === false) {
              uni.showToast({
                duration: 2000,
                icon: 'none',
                title: data.message
              });
            } else {
              uni.showToast({
                duration: 2000,
                icon: 'success',
                title: data.message
              });
              // that.carImages = '../../static/drawable-xxhdpi/add_img.png'
              // that.localImages = '../../static/drawable-xxhdpi/add_img.png'
              setTimeout(() => {
                uni.reLaunch({
                  url: '/pages/index/index'
                });
              }, 2000);
            }
          }
        })
      }

    }
  }
}
</script>

<style>
.shadow {
  box-shadow: 0 0 8upx 4upx rgb(26 26 26 / 20%);
  color: #000;
  font-weight: 700;
}
#shadow {
  padding: 30upx;
  display: flex;
  font-size: 30upx;
}
</style>
