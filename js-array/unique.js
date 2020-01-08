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

/*
 * 方案三：
 * 比较优秀的方法（基于对象）
 */
let ary2 = [3, 6, 2, 9, 4, 3, 4];
// 1.创建一个空对象
let obj = {};
// 2.循环数组中的每一项，把每一项向对象中存储 =》 item : item
for (let i = 0; i < ary2.length; i++) {
  let item = ary2[i];

  // if (obj[item] === undefined){
  //   obj[item] = item;
  //   continue;
  // }
  // ary2.splice(i, 1);
  // i--;

  // 3.每一次存储之前进行判断：验证obj中是否存在这一项
  if (obj[item] !== undefined) {
    // 已经存在这一项
    // ary2.splice(i, 1);
    // 基于splice实现删除性能不好，当前项被删除后，后面每一项的索引都要向前提一位，如果后面内容过多，一定影响性能
    ary2[i] = ary2[ary2.length - 1];
    ary2.length--;
    i--;
    continue;
  }
  obj[item] = item;
}
console.log(ary2);

/*
 * unique: 实现数组去重的方法
 * @params
 *    ary [Array] 要去重的数组
 * @return
 *    [Array] 去重后的数组
 * by xxx on 20200108
 */
function unique (ary){
  let obj = {};
  for (let i = 0; i < ary.length; i++) {
    let item = ary[i];
    if (obj[item] !== undefined) {
      ary[i] = ary[ary.length - 1];
      ary.length--;
      i--;
      continue;
    }
    obj[item] = item;
  }
  return ary;
}

console.log(unique([12,4,34,4,7,12]))


//基于es6
let array1 = [12,4,34,4,7,12];
array1 = [...new Set(array1)];
console.log(array1)