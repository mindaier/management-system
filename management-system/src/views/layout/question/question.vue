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
								<el-option label="区域一" value="shanghai"></el-option>
								<el-option label="区域二" value="beijing"></el-option>
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
			<el-table :data="tableData" border style="width: 100%">
				<el-table-column label="序号" v-slot="scope">
					{{ scope.$index + 1 }}
				</el-table-column>
				<el-table-column prop="form.title" label="题目"> </el-table-column>
				<el-table-column prop="form.step" label="学科.阶段"> </el-table-column>
				<el-table-column prop="form.enterprise" label="企业"> </el-table-column>
				<el-table-column prop="form.username" label="创建者"> </el-table-column>
				<el-table-column prop="form.status" label="状态"> </el-table-column>
				<el-table-column prop="address" label="访问量"> </el-table-column>
				<el-table-column prop="address" label="操作">
					<el-button type="text">编辑</el-button>
					<el-button type="text">启用</el-button>
					<el-button type="text">删除</el-button>
				</el-table-column>
			</el-table>
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
				subject: "", // 	否	int	学科id
				enterprise: "", // 	否	int	企业id
				type: "", // 	否	int	题目类型:1(单选),2(多选),3(简答)
				step: "", // 	否	string	题目阶段:1(初级),2(中级),3(高级)
				username: "", // 	否	string	作者
				status: "", // 	否	int	状态:0(禁用),1(启用)
				difficulty: "", // 	否	int	题目难度: 1(简单),2(一般),3(困难)
				create_date: "", // 	否	string	创建日期
				page: "", // 	否	string	页码 默认为1
				limit: "", // 	否	string	页尺寸 默认为10
			},
			tableData: [
				{
					date: "2016-05-02",
					name: "王小虎",
					address: "上海市普陀区金沙江路 1518 弄",
				},
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
		getQuestionList(this.form).then((res) => {
			console.log(res);
			this.tableData = res.data.data.items;
		});
	},
	mounted() {},
	methods: {},
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
}
</style>
