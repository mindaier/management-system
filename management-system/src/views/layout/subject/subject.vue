<template>
	<div class="subject">
		<el-card>
			<el-form :model="form" :inline="true">
				<el-form-item label="学科编号">
					<el-input v-model="form.rid" class="w100"></el-input>
				</el-form-item>
				<el-form-item label="学科名称">
					<el-input v-model="form.name" class="w149"></el-input>
				</el-form-item>
				<el-form-item label="创建者">
					<el-input v-model="form.username" class="w100"></el-input>
				</el-form-item>
				<el-form-item label="状态">
					<el-select v-model="form.status" class="w149">
						<el-option value="0" label="禁用"></el-option>
						<el-option value="1" label="启用"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" class="search">搜索</el-button>
					<el-button class="clear">清除</el-button>
					<el-button type="primary" class="add">+新增学科</el-button>
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
						<span :class="{ red: scope.row.status == 1 }">
							{{ scope.row.status == 0 ? "禁用" : "启用" }}
						</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="300px">
					<template slot-scope="scope">
						<el-button type="text" @click="edit(scope.row)">编辑</el-button>
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
					:page-sizes="[1, 2, 3]"
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
				total: 0,
			},
			list: [],
			form: {
				rid: "", //  	否	string	学科编号
				name: "", //  	否	string	学科名称
				username: "", //  否	string	创建者用户名
				status: "1", //  	否	string	状态 0(禁用) 1(启用)
				page: "", //  	否	string	页码 默认为1
				limit: "", //  	否	string	页尺寸 默认为10
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
				console.log(res);
				this.list = res.data.data.items;
				// 修改总页数 总页数与每一页显示的数量关联
				this.pagination.total = res.data.data.pagination.total;
			});
		},
		edit(index, row) {
			// 获取当前的行的索引 和 当前行的所有内容
			console.log("index", index);
			console.log("row", row);
		},
		// 页码数量改变 每页显示的条数
		handleSizeChange(size) {
			// console.log("当前页容量", size);
			this.pagination.pageSize = size;
			// 改变每页显示的总条数的时候 如果不将其回到首页
			// 容易出现没有数据的情况
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
</style>
