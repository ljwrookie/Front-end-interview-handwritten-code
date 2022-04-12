//单调栈实现接雨水问题
//思路：
//1.创建单调栈，栈中存储的是每一个坑的高度
//2.遍历数组，如果当前值大于栈顶元素，则将当前值入栈，否则出栈，并计算当前值与栈顶元素的差值
//3.最后返回栈中元素的和
//
//接雨水问题具体代码实现：

function trap(height) {
	let stack = [];
	let result = 0;
	for (let i = 0; i < height.length; i++) {
		while (stack.length && height[i] > height[stack[stack.length - 1]]) {
			let top = stack.pop();
			if (stack.length) {
				result +=
					(Math.min(height[i], height[stack[stack.length - 1]]) - height[top]) *
					(i - stack[stack.length - 1] - 1);
			}
		}
		stack.push(i);
	}
	return result;
}
