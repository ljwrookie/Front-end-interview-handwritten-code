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
function PromiseAll(promises) {
	return new myPromise(function (resolve, reject) {
		let result = [];
		let count = 0;
		if (promises.length === 0) {
			resolve(result);
		}
		promises.forEach((promise, index) => {
			promise.then(
				function (value) {
					result[index] = value;
					count++;
					if (count === promises.length) {
						resolve(result);
					}
				},
				function (reason) {
					reject(reason);
				}
			);
		});
	});
}
//实现myPromise.race
myPromise.race = function(promises){
    if()
}
