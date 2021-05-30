<template>
	<view>
		<cu-custom bgColor="bg-blue-one" :isBack="true" :isR="false">
			<block slot="content">用户认证</block>
		</cu-custom>
		
		<form>
			
			<view class="grid col-3 text-center margin-top-xl bg-white padding-bottom-xl">
				<view class="cu-item" @tap="ShowFindFond()"> 
					<view class="cuIcon-cu-image padding">
						<image class="icon_tb" src="../../static/drawable-xhdpi/wode_icon1_pic.png"></image>
					</view>
					<text>身份证</text> 
				</view>   
				<view class="cu-item" @tap="ShowFind()">
					<view class="cuIcon-cu-image padding">
						<image class="icon_tb" src="../../static/drawable-xhdpi/wode_icon1_pic.png"></image>
					</view>
					<text>行驶证</text>
				</view>
				<view class="cu-item" @tap="ShowFindWork()">
					<view class="cuIcon-cu-image padding">
						<image class="icon_tb" src="../../static/drawable-xhdpi/wode_icon1_pic.png"></image>
					</view>
					<text>驾驶证</text>
				</view>
			</view>
			
			<view class="cu-form-group margin-top">
				<view class="title">姓名</view>
				<input placeholder="两字短标题" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">身份证</view>
				<input placeholder="三字标题" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">手机号</view>
				<input placeholder="三字标题" name="input"></input>
			</view>
			
			<view class="cu-form-group">
				<view class="title">车牌号</view>
				<input placeholder="三字标题" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">车架号</view>
				<input placeholder="三字标题" name="input"></input>
			</view>
			
		</form>
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-blue-one lg">提交</button>
		</view>
	</view>
	
	
	
</template>

<script>
</script>

<style>
	.icon_tb{
		height: 60px;
	}
</style>
