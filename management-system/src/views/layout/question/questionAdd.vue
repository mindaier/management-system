<template>
	<div class="questionAdd">
		<!-- fullscreen 是否全屏显示 -->
		<el-dialog class="subjectAdd" fullscreen :visible.sync="isShow">
			<div slot="title" class="title">{{ mode == "add" ? "新增题库" : "编辑题库" }}</div>

			<div class="content">
				<el-form label-width="80px" :model="form" :rules="rules" ref="form">
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
					<el-form-item label="阶段" prop="step">
						<el-select v-model="form.step" placeholder="请选择阶段">
							<el-option v-for="(value, key, index) in stepObj" :key="index" :label="value" :value="+key"></el-option>
						</el-select>
					</el-form-item>
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
					<el-form-item label="城市" prop="city">
						<!-- 将选中的字段名 显示为label对应的值 否则会是编号 -->
						<!-- 级联选择器 -->
						<el-cascader
							class="city"
							v-model="form.city"
							:options="options"
							:props="{ value: 'label' }"
							@change="changeCity"
						></el-cascader>
					</el-form-item>
					<el-form-item label="题型" prop="type">
						<el-radio-group v-model="form.type">
							<el-radio v-for="(value, key, index) in typeObj" :key="index" :label="+key">{{ value }}</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="难度" prop="difficulty">
						<el-radio
							v-model="form.difficulty"
							v-for="(value, key, index) in diffObj"
							:key="index"
							:label="+key"
						>{{ value }}</el-radio>
					</el-form-item>
					<hr />

					<el-form-item label="试题标题" class="setTop" prop="title">
						<!-- 富文本有二个东西 v-model="双向绑定" @change="当输入内容改变时执行"-->
						<quillEditor v-model="form.title" @change="editorChange('title')"></quillEditor>
					</el-form-item>

					<el-form-item :label="typeObj[form.type]" :prop="selectCheck[form.type]">
						<!-- 写单选/多选/简答组件 -->
						<selectItem :form="form" @sonItem="editorChange"></selectItem>
					</el-form-item>

					<el-form-item label="视频解析" prop="video">
						<upload v-model="form.video" type="video"></upload>
						<span>只能上传视频格式文件</span>
					</el-form-item>
					<hr />
					<el-form-item label="答案解析" class="setTop" prop="answer_analyze">
						<quillEditor v-model="form.answer_analyze" @change="editorChange('answer_analyze')"></quillEditor>
					</el-form-item>
					<hr />
					<el-form-item label="试题备注" class="remark" prop="remark">
						<el-input type="textarea" v-model="form.remark" :rows="4"></el-input>
					</el-form-item>
				</el-form>
			</div>

			<div slot="footer" class="footer">
				<el-button @click="isShow = false">取消</el-button>
				<el-button type="primary" @click="submit">确定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
// 导入单选/多选/简答组件
import selectItem from "./selectItem";
import upload from "@/components/upload.vue";
import { addQuestion, editQuestion } from "@/api/question.js";
// 导入富文本文件
import { quillEditor } from "vue-quill-editor";
// 城市数据安装  npm i element-china-area-data
import { regionData } from "element-china-area-data";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
	props: [
		"subjectList",
		"stepObj",
		"businessList",
		"typeObj",
		"diffObj",
		"mode",
	],
	components: {
		quillEditor, // 富文本组件
		selectItem, // 单选多选组件
		upload, // 文件上传组件
	},
	watch: {
		isShow(newVal) {
			// 如果新增窗口关闭
			if (newVal == false) {
				this.form = JSON.parse(JSON.stringify(this.initForm));
				this.$nextTick(() => {
					// 移除表单校验效果
					this.$refs.form.clearValidate();
				});
			}
		},
	},
	data() {
		return {
			isShow: false,
			options: regionData,
			initForm: "",
			selectCheck: {
				1: "single_select_answer",
				2: "multiple_select_answer",
				3: "short_answer",
			},
			form: {
				subject: "", //	是	int	学科id标识
				step: "", //	是	int	阶段1、初级 2、中级 3、高级
				enterprise: "", //	是	int	企业id标识
				city: [], //	是	array	[省、市、区县]
				type: 1, //	是	string	题型 1单选 、2多选 、3简答
				difficulty: 1, //	是	int	题目难度 1简单 、2一般 、3困难
				title: "", //	是	string	标题
				single_select_answer: "", //	是	string	单选题答案
				video: "", //	否	string	解析视频地址
				remark: "", //	是	string	答案备注
				multiple_select_answer: ["A"], //	是	array	多选题答案
				short_answer: "", //	是	string	简答题答案
				answer_analyze: "", //	是	string	答案解析
				// select_options: "", //	是	array	选项，介绍，图片介绍
				select_options: [
					{
						label: "A",
						text: "",
						image: "",
					},
					{
						label: "B",
						text: "",
						image: "",
					},
					{
						label: "C",
						text: "",
						image: "",
					},
					{
						label: "D",
						text: "",
						image: "",
					},
				],
			},
			rules: {
				subject: [{ required: true, message: "必填哦", trigger: "change" }], //nt	学科id标识
				step: [{ required: true, message: "必填哦", trigger: "change" }], //nt	阶段1、初级 2、中级 3、高级
				enterprise: [{ required: true, message: "必填哦", trigger: "change" }], //nt	企业id标识
				city: [{ required: true, message: "必填哦", trigger: "change" }], //rray	[省、市、区县]
				title: [{ required: true, message: "必填哦", trigger: "change" }], //tring	标题
				type: [{ required: true, message: "必填哦", trigger: "change" }], //int	题型 1单选 、2多选 、3简答
				difficulty: [{ required: true, message: "必填哦", trigger: "change" }], //int	题目难度 1简单 、2一般 、3困难
				single_select_answer: [
					{ required: true, message: "必填哦", trigger: "change" },
				], //	string	单选题答案
				multiple_select_answer: [
					{ required: true, message: "必填哦", trigger: "change" },
				], //	是	array	多选题答案
				short_answer: [
					{ required: true, message: "必填哦", trigger: "change" },
				], //tring	简答题答案
				answer_analyze: [
					{ required: true, message: "必填哦", trigger: "change" },
				], //tring	答案解析
				remark: [{ required: true, message: "必填哦", trigger: "change" }], //tring	答案备注
				select_options: [
					{ required: true, message: "必填哦", trigger: "change" },
				],
			},
		};
	},
	created() {
		this.initForm = JSON.parse(JSON.stringify(this.form));
	},
	mounted() {},
	methods: {
		submit() {
			this.$refs.form.validate((result) => {
				if (result) {
					if (this.mode == "add") {
						addQuestion(this.form).then(() => {
							this.$message.success("新增成功");
							this.isShow = false;
							// this.$parent.search();
							this.$emit("refreshList");
						});
					} else {
						editQuestion(this.form).then(() => {
							this.$message.success("编辑成功");
							this.isShow = false;
							this.$emit("getData");
						});
					}
				} else {
					this.$message.error("验证失败");
				}
			});
		},
		editorChange(msg) {
			this.$refs.form.validateField([msg]);
			console.log(msg);
		},
		changeCity() {},
	},
};
</script>

<style lang="less">
.questionAdd {
	.el-dialog__header {
		.title {
			padding-left: 15px;
			color: #fff;
			background: linear-gradient(to right, #01c5fa, #1394fa);
			text-align: left;
		}
	}
	.content {
		width: 850px;
		margin: 0 auto;
		.el-select,
		.city {
			width: 365px;
		}
		.el-form-item__label {
			text-align: left;
		}
		.setTop {
			.el-form-item__content {
				margin-left: 0 !important;
				margin-top: 50px;
			}
		}
		.remark {
			margin-top: 30px;
		}
	}
	.el-dialog__footer {
		text-align: center;
	}
}
</style>
