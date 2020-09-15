import _fetch from "./request.js";

// 学科列表api
function getSubjectList(params) {
	return _fetch({
		url: "/subject/list",
		params: params,
	});
}

export { getSubjectList };
