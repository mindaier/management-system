import Vue from "vue";
import App from "./App.vue";
// 导入element-ui
import ElementUI from "element-ui";
// 导入css
import "element-ui/lib/theme-chalk/index.css";
// 注册
Vue.use(ElementUI);

Vue.config.productionTip = false;

// 导入router
import router from "./router";

new Vue({
	router,
	render: (h) => h(App),
}).$mount("#app");
