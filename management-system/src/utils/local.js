// 工具型方法 保存 localStorage
function saveLocal(key, value) {
	window.localStorage.setItem(key, value);
}

function getLocal(key) {
	return window.localStorage.getItem(key);
}

function removeLocal(key) {
	window.localStorage.removeItem(key);
}

export { saveLocal, getLocal, removeLocal };
