<template>
	<div class="chart">
		<el-card>
			<ul class="count">
				<li class="item">
					<div class="circle">{{ countList.increment_questions }}</div>
					<div>今日新增用户</div>
				</li>
				<li class="item">
					<div class="circle">{{ countList.increment_users }}</div>
					<div>今日新增用户</div>
				</li>
				<li class="item">
					<div class="circle">{{ countList.personal_questions }}</div>
					<div>用户总量</div>
				</li>
				<li class="item">
					<div class="circle">{{ countList.total_done_questions }}</div>
					<div>新增试题</div>
				</li>
				<li class="item">
					<div class="circle">{{ countList.total_questions }}</div>
					<div>总试题量</div>
				</li>
				<li class="item">
					<div class="circle">{{ countList.total_users }}</div>
					<div>总刷题量</div>
				</li>
			</ul>
		</el-card>

		<el-card class="chart_show">
			<div class="echarts" ref="echarts"></div>
		</el-card>
	</div>
</template>

<script>
import { getChartTitle, getStatistics } from "@/api/chart.js";
import echarts from "echarts";
export default {
	data() {
		return {
			countList: "",
			list: [],
			nameArr: [],
		};
	},
	created() {
		getChartTitle().then((res) => {
			this.countList = res.data.data;
		});

		//create里面的所有异步都是一定会在mounted后执行
		getStatistics().then((res) => {
			window.console.log("getStatistics:", res);
			this.list = res.data.data;
			this.list.forEach((item) => {
				this.nameArr.push(item.name);
			});
			window.console.log("数据:", this.nameArr);
			let myechart = echarts.init(this.$refs.echarts);
			let option = {
				tooltip: {
					trigger: "item",
					formatter: "{a} <br/>{b}: {c} ({d}%)",
				},
				legend: {
					orient: "vertical",
					right: 10,
					data: this.nameArr,
				},
				series: [
					{
						name: "访问来源",
						type: "pie",
						radius: ["50%", "70%"],
						avoidLabelOverlap: false,
						label: {
							show: false,
							position: "center",
						},
						emphasis: {
							label: {
								show: true,
								fontSize: "30",
								fontWeight: "bold",
							},
						},
						labelLine: {
							show: false,
						},
						data: this.list,
					},
				],
			};
			myechart.setOption(option);
		});
	},
	mounted() {},
	methods: {},
};
</script>

<style lang="less">
.chart {
	.count {
		display: flex;
		align-items: center;
		justify-content: space-around;
		margin-bottom: 30px;
		.item {
			color: #666;
			text-align: center;
			.circle {
				width: 100px;
				height: 100px;
				line-height: 100px;
				text-align: center;
				border: 2px solid #0086fa;
				border-radius: 50%;
				margin-bottom: 10px;
				font-size: 35px;
				color: #0086fa;
			}
		}
	}
	.chart_show {
		margin-top: 30px;
	}
	.echarts {
		height: 500px;
	}
}
</style>
