<template>
	<div class="login">
		<!-- 左侧登录表单 -->
		<div class="left">
			<div class="top">
				<img class="login-logo" src="@/assets/img/login-logo.png" alt />
				<span class="t1">黑马面面</span>
				<div class="line"></div>
				<span class="t2">用户登录</span>
			</div>
			<el-form ref="form" :model="form" :rules="rules">
				<el-form-item prop="phone">
					<el-input
						icon="el-icon-user"
						placeholder="请输入手机号"
						v-model="form.phone"
					></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input
						placeholder="请输入密码"
						icon="el-icon-lock"
						show-password
						v-model="form.password"
					></el-input>
				</el-form-item>
				<el-form-item prop="code">
					<el-row>
						<el-col :span="16">
							<el-input
								prefix-icon="el-icon-key"
								placeholder="请输入验证码"
								v-model="form.code"
							></el-input>
						</el-col>
						<el-col :span="8">
							<img class="code" :src="codeImg" @click="refreshCode" />
						</el-col>
					</el-row>
				</el-form-item>
				<el-form-item prop="isPass">
					<el-checkbox v-model="form.isPass">
						我已阅读并同意
						<el-link type="primary">用户协议</el-link>和
						<el-link type="primary">隐私条款</el-link>
					</el-checkbox>
				</el-form-item>
				<el-form-item>
					<el-button class="btn btn-login" type="primary" @click="toLogin"
						>登陆</el-button
					>
					<br />
					<el-button
						class="btn btn-register"
						type="primary"
						@click="cancelEvent"
						>注册</el-button
					>
				</el-form-item>
			</el-form>
		</div>
		<!-- 右侧图片 -->
		<img src="@/assets/img/login-right.png" class="right" />
		<register ref="register"></register>
	</div>
</template>

<script>
import register from "./register.vue";
import { userLogin } from "@/api/login.js";
import { saveLocal, getLocal } from "@/utils/local.js";
export default {
	components: {
		register,
	},
	data() {
		return {
			codeImg: process.env.VUE_APP_URL + "/captcha?type=login",
			form: {
				phone: "",
				password: "",
				code: "",
				isPass: [],
			},
			rules: {
				phone: [
					{
						required: true,
						message: "请输入用户名",
						trigger: "blur",
					},
					{
						min: 6,
						max: 12,
						message: "请输入长度为6-12位字符",
						trigger: "blur",
					},
					{
						validator: (rule, value, callback) => {
							// 自定义表单验证
							let _reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
							if (_reg.test(value)) {
								callback();
							} else {
								callback(new Error("请正确输入手机号"));
							}
						},
						trigger: "change",
					},
				],
				password: [
					{
						require: true,
						message: "请输入密码",
						trigger: "blur",
					},
					{
						min: 6,
						max: 12,
						message: "请输入6-12位密码",
						trigger: "change",
					},
				],
				code: [
					{
						required: true,
						message: "请输入验证码",
						trigger: "change",
					},
					{
						min: 4,
						max: 4,
						message: "请输入4位验证码",
						trigger: "change",
					},
				],
				isPass: [
					{
						required: true,
						message: "请勾选协议",
						trigger: "change",
					},
					{
						validator: (rule, value, callback) => {
							if (value) {
								callback();
							} else {
								callback(new Error("请勾选协议"));
							}
						},
					},
				],
			},
		};
	},
	created() {
		// 判断是否有token 有就跳转至layout 没有就不做处理
		if (getLocal("token")) {
			this.$router.push("/layout");
		}
	},
	mounted() {},
	methods: {
		toLogin() {
			this.$refs.form.validate((result) => {
				if (result) {
					// this.$message.success("验证通过");
					userLogin(this.form).then((res) => {
						console.log(res);
						this.$message.success("登录成功");
						// window.localStorage.setItem("token", res.data.data.token);
						saveLocal("token", res.data.data.token);
						this.$router.push("/layout");
					});
				} else {
					this.$message.err("验证失败");
				}
			});
		},
		cancelEvent() {
			// 点击注册按钮 弹出注册框
			// 访问注册组件的this 通过this访问isShow = true
			this.$refs.register.isShow = true;
		},
		refreshCode() {
			// 验证码刷新
			this.codeImg =
				process.env.VUE_APP_URL + "/captcha?type=login&abc=" + Date.now();
		},
	},
};
</script>

<style lang="less">
.login {
	background: linear-gradient(#1493fa 28%, #01c6fa 96%);
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-around;
	.left {
		width: 478px;
		height: 550px;
		background-color: #f5f5f5;
		padding: 42px;
		.top {
			display: flex;
			align-items: center;
			margin-bottom: 20px;
			.login-logo {
				width: 22px;
				height: 17px;
			}
			.t1 {
				font-size: 24px;
				font-family: SourceHanSansCN Regular, SourceHanSansCN Regular-Regular;
				font-weight: 400;
				text-align: left;
				color: #0c0c0c;
				margin: 0 15px;
			}
			.line {
				width: 1px;
				height: 28px;
				background: #c7c7c7;
			}
			.t2 {
				margin-left: 15px;
				font-size: 22px;
				font-family: PingFangSC Regular, PingFangSC Regular-Regular;
				font-weight: 400;
				text-align: left;
				color: #0c0c0c;
			}
		}

		.code {
			width: 100%;
			height: 40px;
		}
		.form {
			margin-top: 3 0px;
		}
		.btn {
			display: block;
			width: 100%;
		}
	}
}
</style>
