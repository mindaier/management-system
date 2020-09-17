<template>
	<div class="subject">
		<el-card>
			<el-form :model="form" :inline="true" ref="form">
				<el-form-item label="学科编号" prop="rid">
					<el-input v-model="form.rid" class="w100"></el-input>
				</el-form-item>
				<el-form-item label="学科名称" prop="name">
					<el-input v-model="form.name" class="w149"></el-input>
				</el-form-item>
				<el-form-item label="创建者" prop="username">
					<el-input v-model="form.username" class="w100"></el-input>
				</el-form-item>
				<el-form-item label="状态" prop="status">
					<el-select v-model="form.status" class="w149">
						<el-option value="0" label="禁用"></el-option>
						<el-option value="1" label="启用"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" class="search" @click="search"
						>搜索</el-button
					>
					<el-button class="clear" @click="reset">清除</el-button>
					<el-button type="primary" class="add" @click="add"
						>+新增学科</el-button
					>
				</el-form-item>
			</el-form>
		</el-card>

		<el-card class="table-card">
			<el-table :data="list">
				<el-table-column label="序号" width="50px">
					<template slot-scope="scope">{{
						(pagination.currentPage - 1) * pagination.pageSize +
							scope.$index +
							1
					}}</template>
				</el-table-column>
				<el-table-column label="学科编号" prop="rid"></el-table-column>
				<el-table-column label="学科名称" prop="name"></el-table-column>
				<el-table-column label="简称" prop="short_name"></el-table-column>
				<el-table-column label="创建者" prop="username"></el-table-column>
				<el-table-column label="创建日期" prop="create_time"></el-table-column>
				<el-table-column label="状态" width="50px">
					<template v-slot="scope">
						<span :class="{ red: scope.row.status == 0 }">
							{{ scope.row.status == 0 ? "禁用" : "启用" }}
						</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="300px">
					<template slot-scope="scope">
						<el-button type="text" @click="edit(scope.row)">编辑</el-button>
						<el-button type="text" @click="setStatus(scope.row.id)">{{
							scope.row.status == 1 ? "禁用" : "启用"
						}}</el-button>
						<el-button type="text" @click="delRow(scope.row.id)"
							>删除</el-button
						>
					</template>
				</el-table-column>
			</el-table>
			<div class="page">
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="pagination.currentPage"
					:page-sizes="[1, 3, 5, 10, 20, 30]"
					:page-size="pagination.pageSize"
					layout="total, sizes, prev, pager, next, jumper"
					:total="pagination.total"
				>
				</el-pagination>
			</div>
		</el-card>

		<!-- 新增表单页面 -->
		<subjectAdd ref="form_add"></subjectAdd>
	</div>
</template>

<script>
import {
	getSubjectList,
	setSubjectStatus,
	deleteSubject,
} from "@/api/subject.js";
import subjectAdd from "./subjectAdd";
export default {
	components: {
		subjectAdd,
	},
	data() {
		return {
			pagination: {
				currentPage: 1,
				pageSize: 3, // 页容量
				total: 100,
			},
			list: [],
			form: {
				rid: "", //  	否	string	学科编号
				name: "", //  	否	string	学科名称
				username: "", //  否	string	创建者用户名
				status: "", //  	否	string	状态 0(禁用) 1(启用)
				page: "", //  	否	string	页码 默认为1
				limit: "", //  	否	string	页尺寸 默认为10
			},
			number: 0,
		};
	},
	created() {
		// 将pagination和form的值合并
		this.getData();
	},
	mounted() {},
	methods: {
		// 调用接口获取列表数据
		getData() {
			let _query = {
				...this.form,
				page: this.pagination.currentPage,
				limit: this.pagination.pageSize,
			};

			// 进入页面获取列表数据
			getSubjectList(_query).then((res) => {
				// console.log(res);
				this.list = res.data.data.items;
				// 修改总页数 总页数与每一页显示的数量关联
				this.pagination.total = res.data.data.pagination.total;
			});
		},
		// 页容量改变 每页显示的条数
		handleSizeChange(size) {
			// console.log("当前页容量", size);
			this.pagination.pageSize = size;
			// 改变每页显示的总条数的时候 如果不在第一页操作的
			// 容易出现接口调用两次
			// 解决: 将页面回到第一页
			this.pagination.currentPage = 1;
			this.getData();
		},
		// 页码改变 切换页码
		handleCurrentChange(page) {
			// console.log("页码改变", page);
			this.pagination.currentPage = page;
			// console.log(this.pagination.currentPage);
			this.getData();
		},
		// 搜索功能
		search() {
			this.pagination.currentPage = 1;
			this.getData();
		},
		// 清除
		reset() {
			// console.log("清除");
			this.$refs.form.resetFields();
			this.search();
		},
		// 状态设置
		setStatus(id) {
			setSubjectStatus({ id }).then(() => {
				this.$message.success("修改状态成功");
				// 刷新数据
				this.getData();
			});
		},
		// 新增
		add() {
			this.$refs.form_add.form_add = {
				rid: "", //学科编号
				name: "", //学科名称
				short_name: "", //学科简称
				intro: "", //学科简介
				remark: "", //备注
			};

			this.$refs.form_add.dialogFormVisible = true;
			this.$refs.form_add.mode = "add";
		},
		// 编辑
		edit(row) {
			// 获取当前的行的索引 和 当前行的所有内容
			this.$refs.form_add.form_add = JSON.parse(JSON.stringify(row));
			this.$refs.form_add.dialogFormVisible = true;
			this.$refs.form_add.mode = "edit";
		},
		// 删除
		delRow(id) {
			console.log(id);
			// 提示
			this.$confirm("您确定要删除吗", "提示", {
				confirmButtonText: "确定删除",
				cancelButtonText: "取消删除",
				type: "warning",
			})
				.then(() => {
					deleteSubject({ id }).then(() => {
						this.$message.success("删除成功");
						// 刷新数据
						this.getData();
						this.search();
					});
				})
				.catch(() => {});
		},
	},
};
</script>

<style lang="less">
.subject {
	.w100 {
		width: 100px;
	}
	.w149 {
		width: 145px;
	}
	.el-button {
		padding: 12px;
	}
	.el-button.search,
	.el-button.clear {
		width: 55px;
	}
	.el-button.add {
		width: 80px;
	}
}
.el-form-item__content {
	margin-left: 0;
}
.table-card {
	margin-top: 20px;
	.page {
		text-align: center;
		padding-top: 30px;
	}
}
.el-table .cell {
	text-align: center;
}
.red {
	color: red;
}

.dialog__footer {
	text-align: center;
}
</style>
