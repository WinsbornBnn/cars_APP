<template>
	<view>
		<cu-custom bgColor="bg-blue-one" :isBack="true" :isR="false">
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
				<input style="padding-left: 45px;" name="input" v-model="TellNum"></input>
			</view>
			<view class="padding flex flex-direction" style="padding-top: 80upx;">
				<button class="cu-btn bg-blue-one lg" form-type="submit">提交</button>
			</view>
		</form>
	</view>
</template>

<script>
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
      TellNum: ''
    }
  },
  onLoad () {
    that = this
  },
  methods: {
    formSubmit () {
      console.log('上传');
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
            url: '',
            fileType: "image",
            filePath: tempFilePaths[0],
            name: 'imgFile',
            success: (uploadFileRes) => {
              that.IdImageUrl = tempFilePaths[0]
              that.getIDCard()
              // let imgData = JSON.parse(uploadFileRes.data)
              // 上传图片后处理的逻辑
              // this.imagesUrl = imgData.data.imgUrl
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
          that.DriverImageUrl = tempFilePaths[0]
          uni.uploadFile({
            url: '',
            fileType: "image",
            filePath: tempFilePaths[0],
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
    // 行驶证
    addDrivingImage () {
      var that = this
      uni.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          const tempFilePaths = res.tempFilePaths;
          that.DrivingImageUrl = tempFilePaths[0]
          uni.uploadFile({
            url: '',
            fileType: "image",
            filePath: tempFilePaths[0],
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
