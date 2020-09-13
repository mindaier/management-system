import axios from "axios";
import { Message } from "element-ui";
import { getLocal, removeLocal } from "@/utils/local.js";
import router from "@/router/index.js";
let _fetch = axios.create({
	baseURL: process.env.VUE_APP_URL,
	withCredentials: true,
});

// 添加请求拦截器
_fetch.interceptors.request.use(
	function(config) {
		// 在发送请求之前做些什么
		// 统一在请求拦截上加上请求头
		config.headers.token = getLocal("token");
		// console.log("请求拦截:", config);
		return config;
	},
	function(error) {
		// 对请求错误做些什么
		return Promise.reject(error);
	}
);

// 添加响应拦截器
_fetch.interceptors.response.use(
	function(response) {
		// 对响应数据做点什么
		// 把所有错误同意处理
		if (response.data.code == 200) {
			// 成功处理
			return response;
		} else if (response.data.code == 206) {
			// token错误,要么token失效 非法调用 回至登录页(清除token 跳转至登录页)
			removeLocal("token");
			Message.error(response.data.message);
			router.push("/login");
			// 终止后面的.then 执行跳转至.catch执行
			return Promise.reject(response.data.message);
		} else {
			Message.error(response.data.message);
			// 对响应错误做点什么
			return Promise.reject(response.data.message);
		}
	},
	function(error) {
		// 对响应错误做点什么
		return Promise.reject(error);
	}
);

export default _fetch;
