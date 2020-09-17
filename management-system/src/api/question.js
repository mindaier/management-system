import _fetch from "./request.js";

// 题库列表api
function getQuestionList(params) {
	return _fetch({
		url: "/question/list",
		params: params,
	});
}

// 状态设置
function setQuestionStatus(data) {
	return _fetch({
		url: "/question/status",
		method: "post",
		data,
	});
}

// 删除题目
function delQuestion(data) {
	return _fetch({
		url: "/question/remove",
		method: "post",
		data,
	});
}

// 编辑题目
function editQuestion(data) {
	return _fetch({
		url: "/question/edit",
		method: "post",
		data,
	});
}

// 上传文件
function uploadFiles(data) {
	return _fetch({
		url: "/question/upload",
		method: "post",
		data,
	});
}

// 获取题目信息
function getQuestion(data) {
	return _fetch({
		url: "/question/one",
		method: "post",
		data,
	});
}

// 发布题目
function addQuestion(data) {
	return _fetch({
		url: "/question/add",
		method: "post",
		data,
	});
}

export {
	getQuestionList,
	setQuestionStatus,
	delQuestion,
	editQuestion,
	uploadFiles,
	getQuestion,
	addQuestion,
};
