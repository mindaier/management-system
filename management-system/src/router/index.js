import Vue from "vue";
import VueRouter from "vue-router";
// 导入nprogress插件与样式
import NProgress from "nprogress";
import "nprogress/nprogress.css";

Vue.use(VueRouter);

import login from "@/views/login.vue";
import layout from "@/views/layout/layout.vue";
import chart from "@/views/layout/chart/chart.vue";
import user from "@/views/layout/user/user.vue";
import question from "@/views/layout/question/question.vue";
import company from "@/views/layout/company/company.vue";
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
		},
		{
			path: "/layout",
			component: layout,
			// redirect: "/layout/chart/chart",
			children: [
				{
					path: "/layout/chart/chart",
					component: chart,
				},
				{
					path: "/layout/user/user",
					component: user,
					meta: {
						title: "用户列表",
					},
				},
				{
					path: "/layout/question/question",
					component: question,
				},
				{
					path: "/layout/company/company",
					component: company,
				},
				{
					path: "/layout/subject/subject",
					component: subject,
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
	console.log(to);
	console.log("form:", from);
	NProgress.start();
	// 允许通过 next()  不允许通过next('path')
	next();
});

// 路由后置守卫
router.afterEach((to, from) => {
	console.log("to:", to);
	console.log("from:", from);

	if (to.path == "/layout/chart") {
		document.getElementById("title").innerText = "数据概览";
	} else if (to.path == "/layout/user") {
		document.getElementById("title").innerText = to.meta.title;
	}

	// setTimeout(() => {
	// 结束进度
	NProgress.done();
	// }, 10000);
});

export default router;
