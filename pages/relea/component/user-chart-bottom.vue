<template>
	<view class="user-chat-bottom u-f-ac">
		<input type="text" placeholder="我来回答..." v-model="text" />
		<view class="cuIcon-forwardfill" @tap="submit"></view>
		<view class="cuIcon-dianhua" @tap="callPhone"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				text: ""
			}
		},
		methods: {
			submit() {
				this.$emit('submit',this.text)
				this.text = ""
			},
      callPhone() {
				this.$emit('callPhone')
			}
		}
	}
</script>
<style lang="less" scoped>
	.user-chat-bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 100upx;
		padding: 0 20upx;
		background-color: #fff;
		border-top: 1upx solid #ccc;

		input {
			flex: 1;
			margin-right: 20upx;
			background-color: #f7f7f7;
			padding: 10upx 20upx;
			border-radius: 10upx;
      height: 80upx;
		}

		view {
			width: 80upx;
			font-size: 50upx;
		}
	}
</style>
