import axios from "axios";
import { Message } from "element-ui";
let _fetch = axios.create({
	baseURL: process.env.VUE_APP_URL,
	withCredentials: true,
});

// 添加请求拦截器
_fetch.interceptors.request.use(
	function(config) {
		// 在发送请求之前做些什么
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

// 获取手机验证码 接口
function getPhoneCodeApi(data) {
	return _fetch({
		url: "/sendsms",
		method: "post",
		withCredentials: true,
		data: data,
		// {
		// 封装后 不能从register获取this,改为参数形式
		// code: this.form.code,
		// phone: this.form.phone,
		// },
	});
}

// 注册api
function registerUserApi(data) {
	return _fetch({
		url: "/register",
		method: "post",
		data,
	});
}

export { getPhoneCodeApi, registerUserApi };
