//带注释的快速排序
function quickSort(nums) {
	if (nums.length <= 1) {
		return nums;
	}
	var left = [];
	var right = [];
	var pivot = nums.pop();
	var len = nums.length;
	for (var i = 0; i < len; i++) {
		if (nums[i] < pivot) {
			left.push(nums[i]);
		} else {
			right.push(nums[i]);
		}
	}
	return quickSort(left).concat(pivot, quickSort(right));
}
