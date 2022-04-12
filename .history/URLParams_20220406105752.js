//解析URL参数为对象
function parseParam(url) {
	var paramObj = {};
	var paramArr = url.split("?")[1].split("&");
	for (var i = 0; i < paramArr.length; i++) {
		var param = paramArr[i].split("=");
		paramObj[param[0]] = param[1];
	}
	return paramObj;
}
