/*
 * 方案一：
 * 比较low的方法
 * 循环原数组中的每一项，每拿到一项都往新数组中添加，
 * 添加之前验证新数组中是否存在这一项，不存在再添加
 */

let arr = [1, 2, 3, 1, 4, 6, 3];

let newArr = [];
for (let index = 0; index < arr.length; index++) {
  // 循环获取原数组中的每一项
  let item = arr[index];
  // 验证新数组中是否存在这一项
  if (newArr.includes(item)) {
    // 存在这一项， 不再增加到新数组中， 继续下一轮循环即可
    continue;
  }
  // 新数组中不存在这一项，我们加入进去
  newArr.push(item);
}
console.log(newArr);

let newArr2 = [];
arr.forEach(item => {
  if (newArr2.includes(item)) return;
  newArr2.push(item);
});
console.log(newArr2);

/*
 * 方案二：
 * 比较low的方法
 * 不用includes/indexOf(保证兼容性)
 */

var ary = [3, 6, 2, 9, 4, 3, 4];
for (var i = 0; i < ary.length; i++) {
  var item = ary[i];
  //让当前项和后面的每一项进行比较
  for (var j = i + 1; j < ary.length; j++) {
    var compare = ary[j];
    if (compare === item) {
      //从数组中移除
      ary.splice(j, 1);
      // 数组塌陷了，j后面的每一项都提前了一位，下一次要比较的应该还是j这个索引的内容
      j--;
    }
  }
}
console.log(ary);
