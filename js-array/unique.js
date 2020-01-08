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
