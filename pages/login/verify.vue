<template>
	<view>
		<view style="padding-top:260rpx;">
			<view style="text-align: center;">
				<image src="../../static/yx-login/logo.png" style="width: 472upx;height: 191upx; "></image>
			</view>

			<view
				style="width: 88%;height: 550upx;background-color: #FFFFFF;margin:0 auto;margin-top:40upx;border-radius:10px;padding-top: 10px;">

				<view>
					<view class="login-input">
						<image src="../../static/drawable-xxhdpi/phone.png"></image>
						<input type="number" maxlength="11" placeholder="手机号码" v-model="From.UserName"
							placeholder-style="color:#C6C5CA" />
					</view>
				</view>

				<view>
					<view class="login-input">
						<image src="../../static/yx-login/password.png"></image>
						<input style="width: 60%;" placeholder="请填写验证码" name="input"
							placeholder-style="color:#C6C5CA"></input>
						<button class='cu-btn line-blue' style="margin-top: 16px;">验证码</button>
					</view>
				</view>

				<button @click="login"
					style="width: 88%;background-color: #2B64A7;color: #FFFFFF;margin-top: 60upx;">登录</button>
					<button @click="register"
						style="width: 88%;background-color: #CDDAEA;color: #FFFFFF;margin-top: 20upx;">账号密码登录</button>
			</view>
		</view>

	</view>
</template>

<script>
	/* 本图标全部使用阿里图标,图标目录static yx-login */
	export default {
		data() {
			return {
				From: {
					UserName: '', //账号
					PassWord: '', //密码
				},
				checked: false, //单选框
				SwiTch: true
			}
		},
		// 读取本地存储密码及账号
		onShow() {
			uni.getStorage({
				key: 'UserInfo',
				success: (e) => {
					this.From.UserName = e.data.UserName
					this.From.PassWord = e.data.PassWord
				}
			})
		},
		methods: {
			MultiChange(e) {
				this.multiIndex = e.detail.value
			},
			/* 
			登录逻辑部分
			 */
			login() {
				var that = this
				if (that.From.UserName && that.From.PassWord) {
					if (that.From.UserName == "admin" && that.From.PassWord == "123") {
						/* 验证成功跳转目标页面 */
						uni.reLaunch({
							url: '/pages/index/index'
						});
					} else {
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: '用户名或密码错误'
						});
					}
				} else {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '用户名或密码不能为空'
					});
				}

			},
			/* 记住密码用户第二次进入页面直接填充 */
			clickchecked() {
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
			Delete() {
				this.From.UserName = ""
			},
			Delete2() {
				this.From.PassWord = ""
			},
			Jump() {
				uni.reLaunch({
					url: '../register/index'
				})
			},
			Switch() {
				this.SwiTch = !this.SwiTch
			},
			register(){
				uni.reLaunch({
					url:'./login'
				})
			}
		}
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
		color: #C6C5CA;
	}

	picker::after {
		font-family: cuIcon;
		display: block;
		content: "\e6a3";
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
		border-bottom: 1px solid #C6C5CA;
		display: flex;

		input {
			width: 91%;
			border: none;
			height: 40px;
			color: #C6C5CA;
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
