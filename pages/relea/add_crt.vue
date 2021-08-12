<template>
	<view>
		<cu-custom bgColor="bg-blue-one" :isBack="true" :isR="false">
			<block slot="content">发布</block>
		</cu-custom>

		<view>
			<form @submit="formSubmit">
				<view class="cu-form-group margin-top">
					<view class="title">标题</view>
					<input placeholder="请输入标题" name="input" v-model="addName"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">联系人</view>
					<input placeholder="请输入联系人" name="input" v-model="addUser"></input>
				</view>
				<view class="cu-form-group margin-top">
					<view class="title">联系电话</view>
					<input placeholder="请输入电话" name="input" v-model="addTel"></input>
				</view>
				<view class="cu-form-group align-start">
					<view class="title">内容</view>
					<textarea v-model="addContent" maxlength="-1" :disabled="modalName!=null" @input="textareaBInput"
						style="min-height: 300px;" placeholder="多行文本输入框"></textarea>
				</view>

				<view class="cu-bar bg-white margin-top">
					<view class="action">
						图片上传
					</view>
					<view class="action">
						{{imgList.length}}/4
					</view>
				</view>
				<view class="cu-form-group">
					<view class="grid col-4 grid-square flex-sub">
						<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage"
							:data-url="imgList[index]">
							<image :src="imgList[index]" mode="aspectFill"></image>
							<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
								<text class='cuIcon-close'></text>
							</view>
						</view>
						<view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
							<text class='cuIcon-cameraadd'></text>
						</view>
					</view>
				</view>

				<view class="padding flex flex-direction">
					<button class="cu-btn bg-blue-one lg" form-type="submit">提交</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
import util from '@/common/util.js';
var that
export default {
  behaviors: ['uni://form-field'],
  data () {
    return {
      index: -1,
      imgList: [],
      addImgList: '',
      newImgList: [],
      modalName: null,
      addName: '',
      addTel: '',
      addUser: '',
      addContent: '',
      addType: ''
    }
  },
  onLoad () {
    that = this
    uni.$on('addCrt', (data) => {
      that.addType = data
    })
  },
  methods: {
    ChooseImage () {
      uni.chooseImage({
        count: 4,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          const tempFilePaths = res.tempFilePaths;
          const newImgList = [];
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
              this.imgList.push(util.getSysImgUrl() + imgData.message)
              this.newImgList.push(imgData.message)
              this.addImgList = this.newImgList.toString()
            }
          });
        }
      });
    },
    formSubmit () {
      let iphoneReg = /^[1][3,4,5,7,8,9][0-9]{9}$/
      const release = {
        content: this.addContent,
        imgs: this.addImgList,
        description: this.addContent,
        name: this.addName,
        tel: this.addTel,
        type: this.addType,
        user: this.addUser
      }
      if (
        that.addName === '' ||
        that.addTel === '' ||
        that.addUser === '' ||
        that.addContent === '') {
        uni.showToast({
          icon: 'none',
          position: 'center',
          title: '请完善发布信息?'
        });
      } else {
        if (!iphoneReg.test(this.addTel)) {
          uni.showToast({
            icon: 'none',
            position: 'center',
            title: '手机号码格式不对?'
          });
          return false
        }
        else {
          util.myRequest({
            url: '/publish/release/add',
            method: 'post',
            data: release,
            success: res => {
              this.formReset()
            }
          })
        }
      }
    },
    formReset () {
      that.imgList = []
      that.addImgList = ''
      that.newImgList = []
      that.addName = ''
      that.addTel = ''
      that.addUser = ''
      that.addContent = ''
      that.addType = ''
    },
    ViewImage (e) {
      uni.previewImage({
        urls: this.imgList,
        current: e.currentTarget.dataset.url
      });
    },
    DelImg (e) {
      uni.showModal({
        title: '删除图片',
        content: '是否删除图片？',
        success: res => {
          if (res.confirm) {
            this.imgList.splice(e.currentTarget.dataset.index, 1)
            this.newImgList.splice(e.currentTarget.dataset.index, 1)
            this.addImgList = this.newImgList.toString()
          }
        }
      })
    },
    textareaBInput (e) {
      this.addContent = e.detail.value
    }
  }
}
</script>

<style>
</style>
