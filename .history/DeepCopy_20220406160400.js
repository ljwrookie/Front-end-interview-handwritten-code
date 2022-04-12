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

//通过symbol.iterator方法将普通对象转换为可迭代对象
function toIterable(obj) {
	if (typeof obj[Symbol.iterator] === "function") {
		return obj;
	}
	let arr = [];
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			arr.push(obj[key]);
		}
	}
	return arr[Symbol.iterator]();
}
