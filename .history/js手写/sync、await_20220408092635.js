//实现async
//1.async函数的返回值是一个Promise对象
//2.async函数的参数是一个函数，该函数的返回值是一个Promise对象
function asyncToGenerator(generatorFunc){
  return function(){
    var gen = generatorFunc.apply(this, arguments);
    return new Promise(function(resolve, reject){
      function step(key, arg){
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function(value){
            step("next", value);
          }, function(err){
            step("throw", err);
          });
        }
      }
      return step("next");
    });
  };
}
