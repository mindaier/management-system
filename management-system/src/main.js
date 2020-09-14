import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
// 导入element-ui
import ElementUI from "element-ui";
// 导入css
import "element-ui/lib/theme-chalk/index.css";
// 注册
Vue.use(ElementUI);

// 配置基地址
Vue.prototype.$axios = axios.create({
	baseURL: process.env.VUE_APP_URL,
});

Vue.config.productionTip = false;

// 导入router
import router from "./router";
import store from "./store";

new Vue({
	store,
	router,
	render: (h) => h(App),
}).$mount("#app");
