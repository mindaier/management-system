<template>
	<div class="login">
		<!-- 左侧登录表单 -->
		<div class="left">
			<div class="top">
				<img class="login-logo" src="@/assets/login-logo.png" alt="" />
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
							<img class="code" alt="" />
						</el-col>
					</el-row>
				</el-form-item>
				<el-form-item prop="isPass">
					<el-checkbox v-model="form.isPass">
						我已阅读并同意<el-link type="primary">用户协议</el-link>和<el-link
							type="primary"
							>隐私条款</el-link
						>
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
		<img src="@/assets/login-right.png" class="right" />
	</div>
</template>

<script>
export default {
	data() {
		return {
			form: {
				phone: "",
				password: "",
				code: "",
				isPass: false,
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
				],
			},
		};
	},
	created() {},
	mounted() {},
	methods: {
		toLogin() {
			this.$refs.form.validate((result) => {
				if (result) {
					this.$message.success("验证通过");
				} else {
					this.$message.success("验证失败");
				}
			});
		},
		cancelEvent() {},
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
		/* .btn-login {
			width: 394px;
			height: 40px;
			border-radius: 4px;
			margin-bottom: 26px;
		}
		.btn-register {
			width: 394px;
			height: 40px;
			border-radius: 4px;
		}
		.el-form-item__content {
			margin-left: 0 !import;
		} */
		.code {
			/* width: 100%; */
			height: 40px;
		}
		.form {
			margin-top: 30px;
		}
		.btn {
			display: block;
			width: 100%;
		}
	}
}
</style>
