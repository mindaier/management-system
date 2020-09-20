<template>
	<el-container class="layout">
		<el-header class="header">
			<div class="header-main" v-if="$store.state.userInfo != ''">
				<i class="el-icon-s-fold t1" @click="collapse = !collapse"></i>
				<img src="@/assets/img/layout_logo.png" alt="" class="t2" />
				<span class="t3">黑马面面</span>
				<img
					:src="baseUrl + '/' + $store.state.userInfo.avatar"
					alt=""
					class="t4"
				/>
				<span class="t5">{{ $store.state.userInfo.username }},您好</span>
				<el-button class="t6" type="primary" @click="exit">退出</el-button>
			</div>
		</el-header>
		<el-container>
			<el-aside width="auto">
				<el-menu
					:default-active="$route.path"
					:collapse="collapse"
					class="el-menu-vertical-demo"
					:router="true"
				>
					<template v-for="(item, index) in $router.options.routes[2].children">
						<el-menu-item
							:key="index"
							:index="item.path"
							v-if="item.meta.roles.includes($store.state.role)"
						>
							<i :class="item.meta.icon"></i>
							<span slot="title" class="title">{{ item.meta.title }}</span>
						</el-menu-item>
					</template>
					<!-- <el-menu-item index="/layout/user">
						<i class="el-icon-user"></i>
						<span slot="title" class="title">用户列表</span>
					</el-menu-item>
					<el-menu-item index="/layout/question">
						<i class="el-icon-edit-outline"></i>
						<span slot="title" class="title">题库列表</span>
					</el-menu-item>
					<el-menu-item index="/layout/business">
						<i class="el-icon-office-building"></i>
						<span slot="title" class="title">企业列表</span>
					</el-menu-item>
					<el-menu-item index="/layout/subject">
						<i class="el-icon-notebook-2"></i>
						<span slot="title" class="title">学科列表</span>
					</el-menu-item> -->
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
			// userInfo: "",
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
			// 使用vuex存储用户信息
			this.$store.state.userInfo = res.data.data;
			// this.userInfo = res.data.data;
			// console.log("用户信息", res);

			// 获取用户角色
			this.$store.state.role = res.data.data.role;
			// 如果账号被禁用
			if (res.data.data.status == 0) {
				this.$message.error("你的账号已经被禁用");
				removeLocal("token");
				this.$router.push("/login");
			} else if (!this.$route.meta.roles.includes(res.data.data.role)) {
				// 如果当前路由的路由元 的权限数组中不包含当前登录人角色
				this.$message.error("您无权访问该页面");
				removeLocal("token");
				this.$router.push("/login");
			} else {
				this.$message.success("登录成功");
			}
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
		width: 200px;
	}
	.el-aside {
		border-right: 0;
		// width: 160px !important;
	}
}
</style>
