<template>
	<el-dialog :visible.sync="isShow" width="600px" class="register" :show-close="false">
		<div class="title" slot="title">用户注册</div>
		<div class="footer">
			<el-button type="primary" @click="isShow=false">取消</el-button>
			<el-button type="primary">确定</el-button>
		</div>
	</el-dialog>
</template>

<script>
export default {
	data() {
		return {
			isShow: false,
		};
	},
	created() {},
	mounted() {},
	methods: {},
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
}
</style>
