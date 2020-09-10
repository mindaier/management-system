<template>
	<el-dialog :visible.sync="isShow" width="600px" class="register" :show-close="false">
		<!-- 表单验证 el-form model rules -->
		<!-- 在需要验证的项el-form-item上 加上一个prop="需要验证的字段名" -->

		<div class="title" slot="title">用户注册</div>
		<el-form :model="form" :rules="rules" label-width="70px" ref="form">
			<el-form-item prop="avatar" label="头像">
				<!-- 头像上传文件域 action接口地址 name参数 show-file-list是否显示上传文件列表 
				before-upload 上传前回调函数  on-success上传成功-->
				<el-upload
					class="avatar-uploader"
					:action="baseUrl + '/uploads'"
					name="image"
					:show-file-list="false"
					:before-upload="beforeUpload"
					:on-success="uploadSuccess"
				>
					<img v-if="form.avatar" :src="baseUrl + '/' + form.avatar" class="avatar" />
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>

			<el-form-item prop="username" label="昵称">
				<el-input v-model="form.username"></el-input>
			</el-form-item>
			<el-form-item prop="email" label="邮箱">
				<el-input v-model="form.email"></el-input>
			</el-form-item>
			<el-form-item prop="phone" label="手机">
				<el-input v-model="form.phone"></el-input>
			</el-form-item>
			<el-form-item prop="password" label="密码" show-password>
				<el-input v-model="form.password"></el-input>
			</el-form-item>
			<el-form-item prop="code" label="图形码">
				<el-row>
					<el-col :span="15">
						<el-input v-model="form.code"></el-input>
					</el-col>
					<el-col :span="8" :offset="1">
						<img class="register-code" :src="codeSrc" @click="changeCode" />
					</el-col>
				</el-row>
			</el-form-item>
			<el-form-item label="验证码" prop="rcode">
				<el-row>
					<el-col :span="15">
						<el-input v-model="form.rcode"></el-input>
					</el-col>
					<el-col :span="8" :offset="1">
						<!-- 点击后开始倒计时 并禁止该按钮 -->
						<el-button :disabled="totalTime!=5" @click="getPhoneCode">获取用户验证码{{totalTime}}s</el-button>
					</el-col>
				</el-row>
			</el-form-item>
		</el-form>
		<div class="footer">
			<el-button @click="isShow = false">取消</el-button>
			<el-button type="primary" @click="submit">确定</el-button>
		</div>
	</el-dialog>
</template>

<script>
// 导入手机验证码API
import { getPhoneCodeApi, registerUserApi } from "@/api/register.js";

export default {
	isShow(newVal) {
		if (newVal == false) {
			// 清空表单
			this.$refs.form.resetFields();
		}
	},
	data() {
		return {
			baseUrl: process.env.VUE_APP_URL,
			codeSrc: process.env.VUE_APP_URL + "/captcha?type=sendsms",
			isShow: false,
			// imageUrl: "",
			totalTime: 5,
			form: {
				username: "", // 是	string	用户名
				phone: "", // 是	string	手机号
				email: "", // 是	string	邮箱
				avatar: "", // 是	string	头像地址
				password: "", // 是	string	密码
				code: "", // 是	string	图形验证码
				rcode: "", // 是 string 手机验证码
			},
			rules: {
				username: [
					{ required: true, message: "请输入用户名", trigger: "change" },
				],
				phone: [
					{ required: true, message: "请输入手机号", trigger: "change" },
					{
						validator: (rule, value, callback) => {
							let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
							if (reg.test(value)) {
								callback();
							} else {
								callback(new Error("请正确输入手机号"));
							}
						},
						trigger: "change",
					},
				],
				email: [
					{ required: true, message: "请输入邮箱", trigger: "change" },
					{
						validator: (rule, value, callback) => {
							let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
							if (reg.test(value)) {
								callback();
							} else {
								callback(new Error("请正确输入邮箱"));
							}
						},
						trigger: "change",
					},
				],
				avatar: [
					{ required: true, message: "请输入头像地址", trigger: "change" },
				],
				password: [
					{ required: true, message: "请输入密码", trigger: "change" },
				],
				code: [{ required: true, message: "请输入验证码", trigger: "change" }],
				rcode: [{ required: true, message: "请输入验证码", trigger: "change" }],
			},
		};
	},
	created() {},
	mounted() {},
	methods: {
		uploadSuccess(res) {
			// console.log(res);
			this.form.avatar = res.data.file_path;
			// this.imageUrl = res.data.file_path;
			// 上传成功后 由于该组件内部没有执行它表单验证 所以我们要认为触发
			this.$refs.form.validateField(["avatar"]);
		},
		beforeUpload(file) {
			const isJPG = file.type === "image/jpeg" || file.type === "image/png";
			const isLt2M = file.size / 1024 / 1024 < 2;

			if (!isJPG) {
				this.$message.error("上传头像图片只能是 JPG,PNG 格式!");
			}
			if (!isLt2M) {
				this.$message.error("上传头像图片大小不能超过 2MB!");
			}
			return isJPG && isLt2M;
		},
		submit() {
			// console.log(this.$refs.form);
			this.$refs.form.validate((result) => {
				// console.log(this.$refs.form);
				if (result) {
					// this.$message.success("注册成功");
					registerUserApi(this.form).then((res) => {
						console.log(res);
						// if (res.data.code == 200) {
						this.$message.success("注册成功");
						this.isShow = false;
						// }
					});
				} else {
					this.$message.error("注册失败");
				}
			});
		},
		// 修改验证码
		changeCode() {
			this.codeSrc =
				process.env.VUE_APP_URL + "/captcha?type=sendsms&abc=" + Date.now();
		},
		// 获取手机验证码
		getPhoneCode() {
			// 需要手机号与图形码都验证成功,需要调用el-form里的validateField方法
			// 验证码错误的几种情况:
			// 接口地址错误
			// 新版本谷歌浏览器不能获取cookie
			// 传递cookie到后端 axios 跨域情况下 cookie不会通过接口传递给后端
			// 需要设置一个 widthCredentials: true 设置跨域情况下是否可以传递cookie
			let _num = 0;
			this.$refs.form.validateField(["phone", "code"], (errorMessage) => {
				// errorMessage为空 说名验证成功
				if (errorMessage == "") {
					_num++;
				}
			});
			if (_num == 2) {
				// this.$message.success("验证通过");
				// 手机号和图形验证码都通过
				// 调用接口获取验证码
				let timer = setInterval(() => {
					this.totalTime--;
					// 当到倒计时到0的时候 清除定时器
					if (this.totalTime < 0) {
						clearInterval(timer);
						this.totalTime = 5;
					}
				}, 1000);
				// this.$axios({
				// 	url: "/sendsms",
				// 	method: "post",
				// 	withCredentials: true,
				// 	data: {
				// 		code: this.form.code,
				// 		phone: this.form.phone,
				// 	},
				// })
				getPhoneCodeApi({
					code: this.form.code,
					phone: this.form.phone,
				})
					.then((res) => {
						// 成功处理函数 获取验证码
						alert(res.data.data.captcha);
					})
					.catch((error) => {
						// 失败处理函数
						console.log(error);
					});
			} else {
				this.$message.error("验证失败");
			}
			// alert(_num);
		},
	},
};
</script>

<style lang="less">
.el-dialog__header {
	padding: 0;
}
.register {
	.title {
		height: 53px;
		line-height: 53px;
		color: #fff;
		background: linear-gradient(to right, #01c4fa, #1394fa);
		text-align: center;
	}
	.footer {
		text-align: center;
	}
	.avatar-uploader {
		text-align: center;
	}
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	.avatar-uploader .el-upload:hover {
		border-color: #409eff;
	}
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}
	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
	.register-code {
		width: 100%;
		height: 40px;
	}
}
</style>
