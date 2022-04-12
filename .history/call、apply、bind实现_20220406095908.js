//实现call
Function.prototype.myCall = function (context) {
  context = context || window;
  context.fn = this;
  var args = [].slice.call(arguments, 1);
  var result = context.fn(...args);
  delete context.fn;
  return result;
};
//实现apply
Function.prototype.myApply = function (context, arr) {
  context = context || window;
  context.fn = this;
  var result;
  if (arr) {
    result = context.fn(...arr);
  } else {
    result = context.fn();
  }
  delete context.fn;
  return result;
};
//实现bind
Function.prototype.myBind = function (context) {
  var self = this;
  var args = [].slice.call(arguments, 1);
  return function () {
    var bindArgs = [].slice.call(arguments);
    return self.apply(context, args.concat(bindArgs));
  };
};
