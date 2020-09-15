import _fetch from "./request.js";

// 题库列表api
function getQuestionList(params) {
	return _fetch({
		url: "/question/list",
		params: params,
	});
}

export { getQuestionList };
