<template>
	<view>
		<cu-custom bgColor="bg-blue-one" :isBack="true">
			<block slot="content">发布招聘</block>
		</cu-custom>
		<!-- <view> -->
		<form @submit="formSubmit">
			<view class="paddinglt radius shadow bg-white margin-top">
				<view class="cu-form-group">
					<view class="title">职位</view>
					<input class="input" placeholder="上传照片自动获取" name="input" v-model="postPosition"></input>
				</view>
        <view class="cu-form-group">
					<view class="title">工作年限</view>
					<input placeholder="上传照片自动获取" name="input" v-model="workingYear"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">学历</view>
					<input class="input" placeholder="上传照片自动获取" name="input" v-model="education"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">住址</view>
					<input class="input" placeholder="上传照片自动获取" name="input" v-model="address"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">手机号</view>
					<input style="padding-left: 20px; color: #c3c3c3;" name="input" v-model="TellNum"></input>
				</view>
			</view>
			<view class="radius shadow bg-white margin-top">
        <view class="paddinglt u-f">
          <view class="left" @tap="addPostImage()">
			  <image :src="postImageUrl" mode=""></image>
		  </view>
          <view class="right">上传照片自动获取</view>
        </view>
      </view>
			<view class="padding flex flex-direction" style="padding-top: 60upx;">
				<button class="cu-btn bg-blue-one lg" form-type="submit">提交</button>
			</view>
		</form>
	</view>
</template>

<script>
export default {
  data () {
    return {
      postPosition: '',
      workingYear: '',
      workingYear: '',
      education: '',
      address: '',
      TellNum: '',
      postImageUrl: '../../static/drawable-xhdpi/tianjia.png'
    }
  },
  methods: {
    addPostImage () {
      var that = this
      uni.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          const tempFilePaths = res.tempFilePaths;
          that.postImageUrl = tempFilePaths[0]
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
    formSubmit () {
      console.log(111);
    }
  },
}
</script>

<style lang="less">
.radius {
  width: 90%;
  margin: 15px auto;
  border-radius: 15px;
}
.paddinglt {
  padding: 20px;
}
.input {
  color: #c3c3c3;
  padding-left: 30px;
}
.title {
  color: #000;
}
.left {
  width: 120px;
  height: 100px;
  background-color: #f5f6f8;
  border-radius: 10px;
  image {
    // height: 100px;
    width: 100%;
    height: 100%;
  }
}
.right {
  color: #c3c3c3;
  height: 100px;
  line-height: 100px;
  padding-left: 5px;
}
button{
  border-radius: 10px;
}
</style>
