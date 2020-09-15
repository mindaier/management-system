<template>
	<div>
		<el-card class="card">
			<el-form :model="form" :inline="true">
				<el-form-item label="学科编号">
					<el-input v-model="form.rid"></el-input>
				</el-form-item>
				<el-form-item label="学科名称">
					<el-input v-model="form.name" class="w149"></el-input>
				</el-form-item>
				<el-form-item label="创建者">
					<el-input v-model="form.username"></el-input>
				</el-form-item>
				<el-form-item label="状态">
					<el-select v-model="form.status" class="w149">
						<el-option value="0" label="禁用"></el-option>
						<el-option value="1" label="启用"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary">搜索</el-button>
					<el-button>清除</el-button>
					<el-button type="primary">+新增学科</el-button>
				</el-form-item>
			</el-form>
		</el-card>

		<el-card class="table-card">
			<el-table :data="list">
				<el-table-column label="序号" width="50px">
					<template slot-scope="scope">{{ scope.$index + 1 }}</template>
				</el-table-column>
				<el-table-column label="学科编号" prop="rid"></el-table-column>
				<el-table-column label="学科名称" prop="name"></el-table-column>
				<el-table-column label="简称" prop="short_name"></el-table-column>
				<el-table-column label="创建者" prop="username"></el-table-column>
				<el-table-column label="创建日期" prop="create_time"></el-table-column>
				<el-table-column label="状态" width="50px">
					<template v-slot="scope">
						{{ scope.row.status == 0 ? "禁用" : "启用" }}
					</template>
				</el-table-column>
				<el-table-column label="操作" width="300px">
					<template slot-scope="scope">
						<el-button type="text">编辑</el-button>
						<el-button type="text">{{
							scope.row.status == 1 ? "禁用" : "启用"
						}}</el-button>
						<el-button type="text">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="page">
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="pagination.currentPage"
					:page-sizes="[10, 20, 30, 40]"
					:page-size="pagination.pageSize"
					layout="total, sizes, prev, pager, next, jumper"
					:total="pagination.total"
				>
				</el-pagination>
			</div>
		</el-card>
	</div>
</template>

<script>
import { getSubjectList } from "@/api/subject.js";
export default {
	data() {
		return {
			pagination: {
				currentPage: 1,
				pageSize: 1,
				total: 100,
			},
			list: [],
			form: {
				rid: "", //  	否	string	学科编号
				name: "", //  	否	string	学科名称
				username: "", //  否	string	创建者用户名
				status: "1", //  	否	string	状态 0(禁用) 1(启用)
				// page: "", //  	否	string	页码 默认为1
				// limit: "", //  	否	string	页尺寸 默认为10
			},
			number: 0,
			tableData: [
				// {
				//   rid,
				//   name,
				//   short_name,
				//   username,
				//   create_time
				// },
				{
					date: "2016-05-04",
					name: "王小虎",
					address: "上海市普陀区金沙江路 1517 弄",
				},
				{
					date: "2016-05-01",
					name: "王小虎",
					address: "上海市普陀区金沙江路 1519 弄",
				},
				{
					date: "2016-05-03",
					name: "王小虎",
					address: "上海市普陀区金沙江路 1516 弄",
				},
			],
		};
	},
	created() {
		// 将pagination和form的值合并
		let _query = {
			...this.form,
			page: this.pagination.currentPage,
			limit: this.pagination.pageSize,
		};

		// 进入页面获取列表数据
		getSubjectList(_query).then((res) => {
			console.log(res);
			this.list = res.data.data.items;
		});
	},
	mounted() {},
	methods: {
		edit(index, row) {
			// 获取当前的行的索引 和 当前行的所有内容
			console.log("index", index);
			console.log("row", row);
		},
		// 页码数量改变
		handleSizeChange(size) {
			console.log("当前页容量", size);
		},
		// 页码改变
		handleCurrentChange(page) {
			console.log("页码改变", page);
			this.pagination.currentPage = page;
			console.log(this.pagination.currentPage);
		},
	},
};
</script>

<style lang="less">
.card {
	.el-input__inner {
		width: 100px;
	}
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
</style>
