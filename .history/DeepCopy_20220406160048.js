//手写深拷贝
function deepClone(obj = {}, map = new Map()) {
	if (typeof obj !== "object") return obj;
	if (map.get(obj)) return map.get(obj);
	let newObj = Array.isArray(obj) ? [] : {};
	map.set(obj, newObj);
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			newObj[key] = deepClone(obj[key], map);
		}
	}
	return newObj;
}
//让普通对象变成可迭代对象
function toIterable(obj) {
	let arr = [];
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			arr.push(obj[key]);
		}
	}
	return arr;
}
