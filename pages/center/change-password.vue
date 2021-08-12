<template>
  <view>
    <cu-custom bgColor="bg-blue-one" :isBack="true" :isR="false">
      <block slot="content">修改密码</block>
    </cu-custom>
    <view>
			<form @submit="formSubmit">
				<view class="cu-form-group margin-top">
					<view class="title">原密码</view>
					<input placeholder="请输入原密码" name="input" v-model="OldPassword"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">新密码</view>
					<input placeholder="请输入新密码" name="input" v-model="NewPassword"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">确认密码</view>
					<input placeholder="请再次输入新密码" name="input" v-model="SurePassword"></input>
				</view>
        <view class="padding flex flex-direction">
					<button class="cu-btn bg-blue-one lg" form-type="submit">提交</button>
				</view>
      </form>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      OldPassword: '',
      NewPassword: '',
      SurePassword: ''
    }
  },
  methods: {
    formSubmit () { }
  },
}
</script>

<style>
</style>