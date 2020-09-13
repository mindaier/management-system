import _fetch from "./request.js";

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
