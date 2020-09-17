<template>
	<el-dialog class="subjectAdd" width="600px" :visible.sync="dialogFormVisible">
		<div slot="title" class="title">
			{{ mode == "add" ? "新增学科" : "编辑学科" }}
		</div>
		<el-form
			label-width="100px"
			:model="form_add"
			:rules="rules"
			ref="form_add"
		>
			<el-form-item label="学科编号" prop="rid">
				<el-input v-model="form_add.rid"></el-input>
			</el-form-item>
			<el-form-item label="学科名称" prop="name">
				<el-input v-model="form_add.name"></el-input>
			</el-form-item>
			<el-form-item label="学科简称" prop="short_name">
				<el-input v-model="form_add.short_name"></el-input>
			</el-form-item>
			<el-form-item label="学科简介" prop="intro">
				<el-input v-model="form_add.intro"></el-input>
			</el-form-item>
			<el-form-item label="学科备注" prop="remark">
				<el-input v-model="form_add.remark"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="footer">
			<el-button @click="dialogFormVisible = false">取消</el-button>
			<el-button type="primary" @click="submitClick">确定</el-button>
		</div>
	</el-dialog>
</template>

<script>
import { addSubject, editSubject } from "@/api/subject.js";
export default {
	data() {
		return {
			mode: "add",
			dialogFormVisible: false,
			formLabelWidth: "120px",
			form_add: {
				rid: "", //学科编号
				name: "", //学科名称
				short_name: "", //学科简称
				intro: "", //学科简介
				remark: "", //备注
			},
			rules: {
				rid: [
					{ required: true, message: "请输入学科编号！", trigger: "change" },
				],
				name: [
					{ required: true, message: "请输入学科名称！", trigger: "change" },
				],
			},
		};
	},
	created() {},
	mounted() {},
	methods: {
		// 提交
		submitClick() {
			this.$refs.form_add.validate((result) => {
				if (result) {
					if (this.mode == "add") {
						addSubject(this.form_add).then(() => {
							this.$message.success("新增成功");
							this.dialogFormVisible = false;
							this.$parent.getData();
							this.$parent.search();
						});
					} else {
						editSubject(this.form_add).then(() => {
							this.$message.success("修改成功");
							this.dialogFormVisible = false;
							this.$parent.getData();
							this.$parent.search();
						});
					}
				} else {
					this.$message.error("验证失败");
				}
			});
		},
	},
	watch: {
		// 当关闭弹窗时 对form进行清空处理 注意将form_add的数据还原,
		// 再延时加上清除验证
		dialogFormVisible(newVal) {
			// newVal 当前值
			if (newVal == false) {
				// 清空数据
				// this.form_add = {
				// 	rid: "", //学科编号
				// 	name: "", //学科名称
				// 	short_name: "", //学科简称
				// 	intro: "", //学科简介
				// 	remark: "", //备注
				// };
				// // 上面数据执行改变到验证是需要一定时间的
				// this.$nextTick(() => {
				// 	this.$refs.form_add.clearValidate();
				// });
				// this.$refs.form_add.resetFields();
			} else {
				// 窗口打开的时候
				this.$nextTick(() => {
					this.$refs.form_add.clearValidate();
				});
			}
		},
	},
};
</script>

<style lang="less">
.el-dialog__header .title {
	width: 100%;
	background: linear-gradient(to right, #01c5fa, #1294fa);
	height: 53px;
	line-height: 53px;
	text-align: center;
	display: block;
	font-size: 18px;
	font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
	color: #ffffff;
	letter-spacing: 0px;
}
.el-dialog__headerbtn .el-dialog__close {
	color: #fff;
}
</style>
