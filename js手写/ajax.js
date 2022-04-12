//实现ajax请求
function ajax(url, data, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 200) {
			callback(xhr.responseText);
		}
	};
	xhr.send(data);
}
//使用promise封装ajax请求
function ajaxPromise(url, data) {
	return new Promise(function (resolve, reject) {
		ajax(url, data, function (res) {
			resolve(res);
		});
	});
}
