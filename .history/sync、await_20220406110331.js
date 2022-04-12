//实现async
//1.async函数的返回值是一个Promise对象
//2.async函数的参数是一个函数，该函数的返回值是一个Promise对象
let async = function(fn) {
    return function() {
        var args = Array.prototype.slice.call(arguments);
        return new Promise(function(resolve, reject) {
            args.push(function(err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
            fn.apply(this, args);
        });
    };
}
//实现await
let await = function(promise) {
    //判断promise是否是一个Promise对象,如果不是将其转换为Promise对象
    if (!promise || !promise.then) {
        promise = Promise.resolve(promise);
    }
    return promise.then(function(data) {
        return data;
    }).catch(function(err) {
        throw err;
    });
}
