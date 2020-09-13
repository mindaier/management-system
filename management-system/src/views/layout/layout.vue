<template>
	<el-container class="layout">
		<el-header class="header">
			<div class="header-main" v-if="userInfo != ''">
				<i class="el-icon-s-fold t1" @click="collapse = !collapse"></i>
				<img src="@/assets/img/layout_logo.png" alt="" class="t2" />
				<span class="t3">黑马面面</span>
				<img :src="baseUrl + '/' + userInfo.avatar" alt="" class="t4" />
				<span class="t5">{{ userInfo.username }},您好</span>
				<el-button class="t6" type="primary" @click="exit">退出</el-button>
			</div>
		</el-header>
		<el-container>
			<el-aside width="200px">
				<el-menu
					:default-active="$route.path"
					:collapse="collapse"
					class="el-menu-vertical-demo"
					:router="true"
				>
					<el-menu-item index="/layout/chart/chart">
						<i class="el-icon-pie-chart"></i>
						<span slot="title" class="title">数据概览</span>
					</el-menu-item>
					<el-menu-item index="/layout/user/user">
						<i class="el-icon-user"></i>
						<span slot="title" class="title">用户列表</span>
					</el-menu-item>
					<el-menu-item index="/layout/question/question">
						<i class="el-icon-edit-outline"></i>
						<span slot="title" class="title">题库列表</span>
					</el-menu-item>
					<el-menu-item index="/layout/company/company">
						<i class="el-icon-office-building"></i>
						<span slot="title" class="title">企业列表</span>
					</el-menu-item>
					<el-menu-item index="/layout/subject/subject">
						<i class="el-icon-notebook-2"></i>
						<span slot="title" class="title">学科列表</span>
					</el-menu-item>
				</el-menu>
			</el-aside>
			<el-container>
				<el-main class="main">
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</el-container>
</template>

<script>
import { getUserInfo } from "@/api/layout.js";
import { getLocal, removeLocal } from "@/utils/local.js";
import { logout } from "@/api/layout.js";

export default {
	data() {
		return {
			userInfo: "",
			baseUrl: process.env.VUE_APP_URL,
			collapse: false,
		};
	},
	created() {
		// 如果没有token 就跳转至登录页
		if (!getLocal("token")) {
			this.$router.push("/login");
		}
		getUserInfo().then((res) => {
			this.userInfo = res.data.data;
			// console.log("用户信息", res);
		});
	},
	mounted() {},
	methods: {
		exit() {
			// 在调用退出接口成功后执行,
			// 清除token
			// 跳转到登录页
			this.$confirm("您正在退出登录,是否继续?", "友情提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(() => {
					logout().then(() => {
						removeLocal("token");
						this.$router.push("/login");
					});
				})
				.catch(() => {});
		},
	},
};
</script>

<style lang="less">
.layout {
	height: 100%;
	.header .header-main {
		display: flex;
		align-items: center;
		.t1 {
			font-size: 40px;
			margin-right: 22px;
		}

		.t3 {
			flex: 1;
			font-size: 22px;
			font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
			font-weight: bold;
			text-align: left;
			color: #49a1ff;
			letter-spacing: 1px;
			margin-left: 10px;
		}
		.t4 {
			width: 43px;
			height: 43px;
		}
		.t5 {
			font-size: 14px;
			font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
			font-weight: bold;
			text-align: left;
			color: #636363;
			letter-spacing: 0px;
			margin: 0 38px 0 9px;
		}
	}
	.main {
		background: #e8e9ec;
	}
	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 160px;
	}
	.el-menu-vertical-demo .title {
		width: 160px;
	}
	.el-aside {
		border-right: 0;
		width: 160px !important;
	}
}
</style>
