import Vue from "vue";
import VueRouter from "vue-router";
// 导入nprogress插件与样式
import NProgress from "nprogress";
import "nprogress/nprogress.css";

Vue.use(VueRouter);

import store from "@/store/index.js";
import { Message } from "element-ui";
import { removeLocal } from "@/utils/local.js";

import login from "@/views/login.vue";
import layout from "@/views/layout/layout.vue";
import chart from "@/views/layout/chart/chart.vue";
import user from "@/views/layout/user/user.vue";
import question from "@/views/layout/question/question.vue";
import business from "@/views/layout/business/business.vue";
import subject from "@/views/layout/subject/subject.vue";

// 实例化
const router = new VueRouter({
	routes: [
		{
			path: "/",
			redirect: "/login",
		},
		{
			path: "/login",
			component: login,
			meta: {
				roles: ["超级管理员", "管理员", "老师", "学生"],
			},
		},
		{
			path: "/layout",
			component: layout,
			redirect: "/layout/chart",
			children: [
				{
					path: "/layout/chart",
					component: chart,
					meta: {
						title: "数据概览",
						roles: ["超级管理员", "管理员", "老师", "学生"],
						icon: "el-icon-pie-chart",
					},
				},
				{
					path: "/layout/user",
					component: user,
					meta: {
						title: "用户列表",
						roles: ["超级管理员", "管理员"],
						icon: "el-icon-user",
					},
				},
				{
					path: "/layout/question",
					component: question,
					meta: {
						title: "题库列表",
						roles: ["超级管理员", "管理员", "老师"],
						icon: "el-icon-edit-outline",
					},
				},
				{
					path: "/layout/business",
					component: business,
					meta: {
						title: "企业列表",
						roles: ["超级管理员", "管理员"],
						icon: "el-icon-office-building",
					},
				},
				{
					path: "/layout/subject",
					component: subject,
					meta: {
						title: "学科列表",
						roles: ["超级管理员", "管理员", "老师", "学生"],
						icon: "el-icon-notebook-2",
					},
				},
			],
		},
	],
});

// 路由导航守卫
// 路由前置守卫(还没进入目标路由)
// 路由拦截处理
router.beforeEach((to, from, next) => {
	// to: 去的路由信息 $route
	// form: 从哪里来的路由信息 $route
	// console.log(to);
	// console.log("form:", from);
	console.log(to.meta);
	NProgress.start();

	// 当前要to的路由中的路由元 是否包含当前登录人角色
	if (to.meta.roles.includes(store.state.role)) {
		// 允许通过 next()  不允许通过next('path')
		next();
	} else {
		Message.error("您无权访问该页面");
		// 删除token
		removeLocal("token");
		// 跳转到登录页
		next("/login");
	}
});

// 路由后置守卫(已进入目标路由)
router.afterEach((to) => {
	// console.log("to:", to);
	// console.log("from:", from);
	// 修改标签页title内容
	// document.getElementById("title").innerText = "数据概览";
	document.title = to.meta.title;

	// setTimeout(() => {
	// 结束进度
	NProgress.done();
	// }, 10000);
});

export default router;
