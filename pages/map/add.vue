<template>
  <view>
    <cu-custom bgColor="bg-blue-one" isBack="true">
      <block slot="content">上传照片</block>
    </cu-custom>
    <view class="padding">
      <view class="padding-xl radius shadow shadow-lg bg-white" id="shadow"
        >车牌号：
        <input type="text" v-model="carId"/>
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
      <button class="cu-btn bg-blue-one lg" @click="submit">提交</button>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      carId:'川A88888',
      localImages: '../../static/drawable-xxhdpi/add_img.png',
      carImages: '../../static/drawable-xxhdpi/add_img.png',
    }
  },
  onShow () {

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
          that.localImages = tempFilePaths[0]
          uni.uploadFile({
            url: '', //服务器地址
            fileType: "image", //ZFB必填,不然报错
            filePath: tempFilePaths[0], //这个就是我们上面拍照返回或者先中照片返回的数组
            name: 'imgFile',
            success: (uploadFileRes) => {
              // let imgData = JSON.parse(uploadFileRes.data)
              // 上传图片后处理的逻辑
              // this.imagesUrl = imgData.data.imgUrl
            }
          });
          uni.getImageInfo({
            src: res.tempFilePaths[0],
            success: function (image) {
              that.imagesUrl = image.path
            }
          });
        }
      });
    }, 
    addCarImages (e) {
      var that = this
      uni.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], //album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项
        success: function (res) {
          const tempFilePaths = res.tempFilePaths;
          that.carImages = tempFilePaths[0]
          uni.uploadFile({
            url: '', //服务器地址
            fileType: "image", //ZFB必填,不然报错
            filePath: tempFilePaths[0], //这个就是我们上面拍照返回或者先中照片返回的数组
            name: 'imgFile',
            success: (uploadFileRes) => {
              // let imgData = JSON.parse(uploadFileRes.data)
              // 上传图片后处理的逻辑
              // this.imagesUrl = imgData.data.imgUrl
            }
          });
        }
      });
    },
    submitInformation(){
      
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
