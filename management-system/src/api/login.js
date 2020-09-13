import _fetch from "./request.js";

// 登录api
function userLogin(data) {
	return _fetch({
		url: "/login",
		method: "post",
		data: data,
	});
}

export { userLogin };
