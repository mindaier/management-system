import _fetch from "./request.js";

function getChartTitle() {
	return _fetch({
		url: "/data/title",
		method: "post",
	});
}
// 获取echarts数据
function getStatistics() {
	return _fetch({
		url: "/data/statistics",
		method: "post",
	});
}
export { getChartTitle, getStatistics };
