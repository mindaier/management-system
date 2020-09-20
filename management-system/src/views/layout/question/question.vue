<template>
	<div>
		<el-card>
			<el-form :model="form" label-width="80px" ref="form">
				<el-row>
					<el-col :span="5">
						<el-form-item label="学科" prop="subject">
							<el-select v-model="form.subject" placeholder="请选择学科">
								<el-option
									v-for="(item, index) in subjectList"
									:key="index"
									:label="item.rid"
									:value="item.name"
								></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="5">
						<el-form-item label="阶段" prop="step">
							<el-select v-model="form.step" placeholder="请选择阶段">
								<el-option v-for="(value, key, index) in stepObj" :key="index" :label="value" :value="+key"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="5">
						<el-form-item label="企业" prop="enterprise">
							<el-select v-model="form.enterprise" placeholder="请选择企业">
								<el-option
									v-for="(item, index) in businessList"
									:key="index"
									:label="item.name"
									:value="item.id"
								></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="5">
						<el-form-item label="题型" prop="type">
							<el-select v-model="form.type" placeholder="请选择题型">
								<el-option v-for="(value, key, index) in typeObj" :key="index" :label="value" :value="+key"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>

				<el-row>
					<el-col :span="5">
						<el-form-item label="难度" prop="difficulty">
							<el-select v-model="form.difficulty" placeholder="请选择难度">
								<el-option v-for="(value, key, index) in diffObj" :key="index" :label="value" :value="+key"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="5">
						<el-form-item label="作者" prop="username">
							<el-input v-model="form.username" placeholder></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="5">
						<el-form-item label="状态" prop="status">
							<el-select v-model="form.status" placeholder="请选择状态">
								<el-option
									v-for="(value, key, index) in statusObj"
									:key="index"
									:label="value"
									:value="+key"
								></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="5">
						<el-form-item label="日期" prop="create_date">
							<el-date-picker v-model="form.create_date" placeholder="请选择日期"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="4"></el-col>
				</el-row>

				<el-row>
					<el-col :span="10">
						<el-form-item label="标题" prop="title">
							<el-input v-model="form.title"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="14">
						<el-form-item label-width="15px">
							<el-button type="primary" @click="search">搜索</el-button>
							<el-button @click="reset">清除</el-button>
							<el-button type="primary" @click="add" v-if="$store.state.role != '学生'">+新增试题</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-card>

		<el-card class="table">
			<el-table :data="questionList" border style="width: 100%">
				<el-table-column label="序号" v-slot="scope" width="80px">
					{{
					scope.$index + 1
					}}
				</el-table-column>
				<el-table-column prop="title" label="题目">
					<template v-slot="scope">
						<div v-html="scope.row.title"></div>
					</template>
				</el-table-column>
				<el-table-column prop="step" label="学科.阶段">
					<template v-slot="scope">
						<div>{{ scope.row.subject_name }}.{{ stepObj[scope.row.step] }}</div>
					</template>
				</el-table-column>
				<el-table-column prop="enterprise" label="题型">
					<template v-slot="scope">
						<div>{{ typeObj[scope.row.type] }}</div>
					</template>
				</el-table-column>
				<el-table-column prop="enterprise" label="企业"></el-table-column>
				<el-table-column prop="username" label="创建者"></el-table-column>
				<el-table-column prop="status" label="状态">
					<template v-slot="scope">{{ statusObj[scope.row.status] }}</template>
				</el-table-column>
				<el-table-column prop="address" label="访问量"></el-table-column>
				<el-table-column label="操作" class="btns" width="140px" v-if="$store.state.role != '学生'">
					<template v-slot="scope">
						<el-button type="text" @click="edit(scope.row)">编辑</el-button>
						<el-button type="text" @click="status(scope.row.id)">
							{{
							statusObj[1 - scope.row.status]
							}}
						</el-button>
						<el-button
							type="text"
							v-if="$store.state.role.includes('管理员')"
							@click="remove(scope.row.id)"
						>删除</el-button>
					</template>
				</el-table-column>
			</el-table>

			<!-- 分页器 -->
			<div class="pagination">
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="pagination.currentPage"
					:page-sizes="[1, 2, 3, 5, 8]"
					:page-size="pagination.pageSize"
					layout="total, sizes, prev, pager, next, jumper"
					:total="pagination.total"
				></el-pagination>
			</div>
		</el-card>

		<!-- 发布题目 组件-->
		<questionAdd
			ref="questionAdd"
			:subjectList="subjectList"
			:stepObj="stepObj"
			:businessList="businessList"
			:typeObj="typeObj"
			:diffObj="diffObj"
			@refreshList="search"
			@getData="getData"
			:mode="mode"
		></questionAdd>
	</div>
</template>

<script>
import { getBusinessList } from "@/api/business.js";
import { getSubjectList } from "@/api/subject.js";
import {
	getQuestionList,
	setQuestionStatus,
	delQuestion,
} from "@/api/question.js";

import questionAdd from "./questionAdd";
export default {
	components: { questionAdd },
	data() {
		return {
			mode: "add",
			stepObj: {
				1: "初级",
				2: "中级",
				3: "高级",
			},
			typeObj: {
				1: "单选",
				2: "多选",
				3: "简答",
			},
			diffObj: {
				1: "简单",
				2: "一般",
				3: "困难",
			},
			statusObj: {
				0: "禁用",
				1: "启用",
			},
			form: {
				title: "", // 	否	string	标题名称
				step: "", // 	否	string	题目阶段:1(初级),2(中级),3(高级)
				enterprise: "", // 	否	int	企业id
				username: "", // 	否	string	作者
				subject: "", // 	否	int	学科id
				status: "", // 	否	int	状态:0(禁用),1(启用)
				type: "", // 	否	int	题目类型:1(单选),2(多选),3(简答)
				difficulty: "", // 	否	int	题目难度: 1(简单),2(一般),3(困难)
				create_date: "", // 	否	string	创建日期
				page: "", // 	否	string	页码 默认为1
				limit: "", // 	否	string	页尺寸 默认为10
			},
			questionList: [],
			pagination: {
				total: 100,
				currentPage: 1,
				pageSize: 5,
			},
			businessList: [],
			subjectList: [],
		};
	},
	created() {
		this.getData();
		// 获取企业列表
		getBusinessList({ limit: 10000 }).then((res) => {
			this.businessList = res.data.data.items;
		});
		// 学科列表
		getSubjectList({ limit: 10000 }).then((res) => {
			this.subjectList = res.data.data.items;
		});
	},
	methods: {
		// 获取列表数据
		getData() {
			let _query = {
				...this.form,
				limit: this.pagination.pageSize,
				page: this.pagination.currentPage,
			};
			getQuestionList(_query).then((res) => {
				// console.log(res);
				// this.questionList = res.data.data.items;
				this.pagination.total = res.data.data.pagination.total;
				// 处理获取的城市的数据字段 否则编辑的时候 子组件获取不到
				let _list = res.data.data.items;
				_list.forEach((item) => {
					item.city = item.city.split(",");
					item.multiple_select_answer = item.multiple_select_answer.split(",");
				});
				this.questionList = _list;
			});
		},

		handleSizeChange(size) {
			// console.log("size", size);
			this.pagination.pageSize = size;
			// 页容量改变 页码回到第一页
			this.pagination.currentPage = 1;
			this.getData();
		},
		handleCurrentChange(page) {
			// console.log("page", page);
			this.pagination.currentPage = page;
			this.getData();
		},
		// 编辑
		edit(res) {
			this.$refs.questionAdd.isShow = true;
			this.mode = "edit";
			console.log("编辑获取数据", res);
			this.$refs.questionAdd.form = JSON.parse(JSON.stringify(res));
		},
		status(id) {
			setQuestionStatus({ id }).then(() => {
				this.$message.success("状态设置成功");
				this.getData();
			});
		},

		// 搜索
		search() {
			this.pagination.currentPage = 1;
			this.getData();
		},

		// 新增
		add() {
			this.$refs.questionAdd.isShow = true;
			this.mode = "add";
		},

		// 清除
		reset() {
			this.$refs.form.resetFields();
		},

		// 删除
		remove(id) {
			// console.log(id);
			this.$confirm("您确定删除该条题目吗？", "提示", {
				confirmButtonText: "确定删除",
				cancelButtonText: "取消删除",
				type: "warning",
			})
				.then(() => {
					delQuestion({ id }).then(() => {
						this.$message.success("删除成功");
						this.search();
					});
				})
				.catch(() => {});
		},
	},
};
</script>

<style lang="less">
.el-form-item__label {
	text-align: center;
}
.el-form-item__content {
	margin-left: 30px;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
	width: auto;
}
.table {
	margin-top: 20px;
	.btns .el-form-item__content {
		margin-left: 0;
	}
	.pagination {
		text-align: center;
		margin-top: 30px;
	}
}
</style>
