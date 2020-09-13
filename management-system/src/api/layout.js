import _fetch from "./request";

function getUserInfo() {
	return _fetch({
		url: "/info",
		// header: {
		// 	token: window.localStorage.getItem("token"),
		// },
	});
}

function logout() {
	return _fetch({
		url: "/logout",
	});
}

export { getUserInfo, logout };
