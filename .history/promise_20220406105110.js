//手写promise
function myPromise(executor) {
	let self = this;
	self.status = "pending";
	self.value = undefined;
	self.reason = undefined;
	self.onResolvedCallback = [];
	self.onRejectedCallback = [];
	function resolve(value) {
		if (self.status === "pending") {
			self.status = "resolved";
			self.value = value;
			self.onResolvedCallback.forEach((fn) => fn());
		}
	}
	function reject(reason) {
		if (self.status === "pending") {
			self.status = "rejected";
			self.reason = reason;
			self.onRejectedCallback.forEach((fn) => fn());
		}
	}
	try {
		executor(resolve, reject);
	} catch (e) {
		reject(e);
	}
}
myPromise.prototype.then = function (onResolved, onRejected) {
	let self = this;
	onResolved =
		typeof onResolved === "function"
			? onResolved
			: function (value) {
					return value;
			  };
	onRejected =
		typeof onRejected === "function"
			? onRejected
			: function (reason) {
					throw reason;
			  };
	if (self.status === "resolved") {
		setTimeout(function () {
			onResolved(self.value);
		}, 0);
	}
	if (self.status === "rejected") {
		setTimeout(function () {
			onRejected(self.reason);
		}, 0);
	}
	if (self.status === "pending") {
		return new myPromise(function (resolve, reject) {
			self.onResolvedCallback.push(function () {
				try {
					let x = onResolved(self.value);
					resolvePromise(x, resolve, reject);
				} catch (e) {
					reject(e);
				}
			});
			self.onRejectedCallback.push(function () {
				try {
					let x = onRejected(self.reason);
					resolvePromise(x, resolve, reject);
				} catch (e) {
					reject(e);
				}
			});
		});
	}
};
myPromise.prototype.catch = function (onRejected) {
	return this.then(null, onRejected);
};
function resolvePromise(x, resolve, reject) {
	if (x instanceof myPromise) {
		x.then(resolve, reject);
	} else if (x !== null && (typeof x === "object" || typeof x === "function")) {
		let then = x.then;
		if (typeof then === "function") {
			then.call(x, resolve, reject);
		} else {
			resolve(x);
		}
	} else {
		resolve(x);
	}
}
//Promise.all
function promiseAll(promises) {
	return new Promise(function (resolve, reject) {
		if (!Array.isArray(promises)) {
			throw new TypeError(`argument must be a array`);
		}
		var resolvedCounter = 0;
		var promiseNum = promises.length;
		var resolvedResult = [];
		for (let i = 0; i < promiseNum; i++) {
			Promise.resolve(promises[i]).then(
				(value) => {
					resolvedCounter++;
					resolvedResult[i] = value;
					if (resolvedCounter == promiseNum) {
						return resolve(resolvedResult);
					}
				},
				(error) => {
					return reject(error);
				}
			);
		}
	});
}

//实现myPromise.race
Promise.race = function (promises) {
	if (!Array.isArray(promises)) {
		return reject(new TypeError(`arguments must be Array`));
	}
	return new Promise((resolve, reject) => {
		for (let i = 0; i < promises.length; i++) {
			Promise.resolve(promises[i]).then(
				(value) => {
					// 期间只要有一个promise实例resolved就直接在race的promise里 resolve,即使循环还在继续也没事,因为race的promise的状态只会改变一次
					resolve(value);
				},
				(reason) => {
					reject(reason);
				}
			);
		}
	});
};
