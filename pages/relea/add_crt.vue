<template>
	<view>
		<cu-custom bgColor="bg-blue-one" :isBack="true" :isR="false">
			<block slot="content">发布</block>
		</cu-custom>
		
		<view>
			<form>
				<view class="cu-form-group margin-top">
					<view class="title">标题</view>
					<input placeholder="两字短标题" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">联系人</view>
					<input placeholder="两字短标题" name="input"></input>
				</view>
				<view class="cu-form-group margin-top">
					<view class="title">联系电话</view>
					<input placeholder="两字短标题" name="input"></input>
				</view>
				<view class="cu-form-group align-start">
					<view class="title">内容</view>
					<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaBInput" style="min-height: 300px;" placeholder="多行文本输入框"></textarea>
				</view>
				
				<view class="cu-bar bg-white margin-top">
					<view class="action">
						图片上传
					</view> 
					<view class="action">
						{{imgList.length}}/9
					</view>
				</view>
				<view class="cu-form-group">
					<view class="grid col-4 grid-square flex-sub">
						<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
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
					<button class="cu-btn bg-blue-one lg">提交</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index: -1,
				imgList: [],
				modalName: null,
				textareaAValue: '',
				textareaBValue: ''
			};
		},
		methods: {
			ChooseImage() {
				uni.chooseImage({
					count: 9, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '删除图片',
					content: '是否删除图片？',
					cancelText: '确认',
					confirmText: '取消',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			textareaAInput(e) {
				this.textareaAValue = e.detail.value
			},
			textareaBInput(e) {
				this.textareaBValue = e.detail.value
			}
		}
	}
	
</script>

<style>
</style>
