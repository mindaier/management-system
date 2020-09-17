import _fetch from "./request.js";

// 学科列表api
function getSubjectList(params) {
	return _fetch({
		url: "/subject/list",
		params: params,
	});
}

// 状态设置
function setSubjectStatus(data) {
	return _fetch({
		url: "/subject/status",
		method: "post",
		data,
	});
}

// 新增学科
function addSubject(data) {
	return _fetch({
		url: "/subject/add",
		method: "post",
		data,
	});
}

// 学科编辑
function editSubject(data) {
	return _fetch({
		url: "/subject/edit",
		method: "post",
		data,
	});
}

// 学科删除
function deleteSubject(data) {
	return _fetch({
		url: "/subject/remove",
		method: "post",
		data,
	});
}

export {
	getSubjectList,
	setSubjectStatus,
	addSubject,
	editSubject,
	deleteSubject,
};
