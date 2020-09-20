import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);
const store = new Vuex.Store({
	// 共享数据
	state: {
		msg: "测试vuex数据",
		userInfo: "",
		role: "超级管理员",
	},
});

export default store;
