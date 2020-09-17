<template>
	<div>
		<el-card>
			<el-form :model="form" label-width="70px">
				<el-row>
					<el-col :span="5">
						<el-form-item label="学科">
							<el-select v-model="form.subject" placeholder="请选择学科">
								<el-option label="区域一" value="shanghai"></el-option>
								<el-option label="区域二" value="beijing"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="5">
						<el-form-item label="阶段">
							<el-select v-model="form.enterprise" placeholder="请选择阶段">
								<el-option label="区域一" value="shanghai"></el-option>
								<el-option label="区域二" value="beijing"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="5">
						<el-form-item label="企业">
							<el-select v-model="form.enterprise" placeholder="请选择阶段">
								<el-option label="区域一" value="shanghai"></el-option>
								<el-option label="区域二" value="beijing"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="5">
						<el-form-item label="题型">
							<el-select v-model="form.enterprise" placeholder="请选择阶段">
								<el-option label="区域一" value="shanghai"></el-option>
								<el-option label="区域二" value="beijing"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>

				<el-row>
					<el-col :span="5">
						<el-form-item label="难度">
							<el-select v-model="form.enterprise" placeholder="请选择阶段">
								<el-option label="区域一" value="shanghai"></el-option>
								<el-option label="区域二" value="beijing"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="5">
						<el-form-item label="作者">
							<el-input v-model="form.title" placeholder=""></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="5">
						<el-form-item label="状态">
							<el-select v-model="form.enterprise" placeholder="请选择阶段">
								<el-option value="0" label="禁用"></el-option>
								<el-option value="1" label="启用"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="5">
						<el-form-item label="日期">
							<el-input v-model="form.title" placeholder=""></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="11">
						<el-form-item label="标题">
							<el-input v-model="form.title"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="9">
						<el-form-item>
							<el-button type="primary">搜索</el-button>
							<el-button>删除</el-button>
							<el-button type="primary">+新增试题</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-card>

		<el-card class="table">
			<el-table :data="questionList" border style="width: 100%">
				<el-table-column label="序号" v-slot="scope" width="80px">
					{{ scope.$index + 1 }}
				</el-table-column>
				<el-table-column prop="title" label="题目">
					<template v-slot="scope">
						<div v-html="scope.row.title"></div>
					</template>
				</el-table-column>
				<el-table-column prop="step" label="学科.阶段"> </el-table-column>
				<el-table-column prop="enterprise" label="企业"> </el-table-column>
				<el-table-column prop="username" label="创建者"> </el-table-column>
				<el-table-column prop="status" label="状态">
					<template v-slot="scope">
						{{ scope.row.status == 1 ? "启用" : "禁用" }}
					</template>
				</el-table-column>
				<el-table-column prop="address" label="访问量"> </el-table-column>
				<el-table-column label="操作" class="btns" width="140px">
					<template v-slot="scope">
						<el-button type="text" @click="edit(scope.row)">编辑</el-button>
						<el-button type="text" @click="status">启用</el-button>
						<el-button type="text">删除</el-button>
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
				>
				</el-pagination>
			</div>
		</el-card>
	</div>
</template>

<script>
import { getQuestionList } from "@/api/question.js";
export default {
	data() {
		return {
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
				pageSize: 2,
			},
		};
	},
	created() {
		getQuestionList().then((res) => {
			console.log(res.data.data.items);
			this.questionList = res.data.data.items;
		});
	},
	methods: {
		handleSizeChange(size) {
			console.log("size", size);
		},
		handleCurrentChange(page) {
			console.log("page", page);
		},
		// 编辑
		edit() {},
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
.table {
	margin-top: 20px;
	.btns .el-form-item__content {
		margin-left: 0;
	}
	.pagination {
		text-align: center;
		padding-top: 30px;
	}
}
</style>
