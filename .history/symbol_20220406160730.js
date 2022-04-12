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
let a = { c: 1, b: 2 };
let i = toIterable(a);
console.log(i);
