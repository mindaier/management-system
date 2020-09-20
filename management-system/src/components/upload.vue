<template>
	<el-upload
		class="avatar-uploader"
		:action="baseUrl + '/question/upload'"
		name="file"
		:show-file-list="false"
		:before-upload="beforeAvatarUpload"
		:on-success="handleAvatarSuccess"
	>
		<div v-if="type == 'img'">
			<img v-if="value" :src="baseUrl + '/' + value" class="avatar" />
			<i v-else class="el-icon-plus avatar-uploader-icon"></i>
		</div>

		<div v-else>
			<video v-if="value" :src="baseUrl + '/' + value" class="avatar" controls></video>
			<i v-else class="el-icon-plus avatar-uploader-icon"></i>
		</div>
	</el-upload>
</template>
<script>
export default {
	props: ["value", "type"],
	data() {
		return {
			//   type: 'img',   //img表示图片  video表示 视频  没有值表示 图片
			baseUrl: process.env.VUE_APP_URL,
		};
	},
	methods: {
		handleAvatarSuccess(res) {
			// window.console.log("上传成功：", res);
			// 传递图片路径
			this.$emit("input", res.data.url);
		},
		beforeAvatarUpload(file) {
			if (this.type == "img") {
				const isJPG = file.type === "image/jpeg" || file.type === "image/png";
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
					this.$message.error("上传头像图片只能是 JPG 格式!");
				}
				if (!isLt2M) {
					this.$message.error("上传头像图片大小不能超过 2MB!");
				}
				return isJPG && isLt2M;
			} else {
				//这里就是上传视频
				const isVideo = file.type === "video/mp4" || file.type === "video/gif";
				const isLt4M = file.size / 1024 / 1024 < 4;

				if (!isVideo) {
					this.$message.error("上传视频只能是 MP4 格式!");
				}
				if (!isLt4M) {
					this.$message.error("上传视频大小不能超过 4MB!");
				}
				return isVideo && isLt4M;
			}
		},
	},
};
</script>
<style>
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
</style>
