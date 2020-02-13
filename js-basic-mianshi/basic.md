```js
// js数据类型
  // 基本数据类型 
    // number string boolean null undefined

    // 什么时候返回null：
      // document.getElementById("div1")

    // 什么时候返回undefined：
      // 1.变量定义了没赋值（还有变量提升）
          var a;
          console.log(a);
      // 2.访问数组中索引不存在的元素--比如数组越界
          var arr = [1,2,3];
          console.log(arr[5])
      // 3.访问对象下边属性不存在的值
          var obj = {
            name: 'zs'
          }
          console.log(obj.age)
      // 4.函数不给return，默认返回值
          function a(){
            console.log(a)
          }
          console.log(a())
    // typeof返回值打印
          console.log(typeof('abc')) //"string"
          console.log(typeof(123)) //"number"
          console.log(typeof(true)) //"boolean"
          console.log(typeof(null)) //"object" **********
          console.log(typeof(undefined)) //"undefined"
          console.log(typeof(a)) //"function"
          console.log(typeof([1,2,3])) //"object" *********
          console.log(typeof({name: 'zxcc'})) //"object"

  // 引用数据类型 array object

```


```js
//如何判断是Array还是Object
var arr = [1,2,3];
var obj = {
    name: 'vbhf'
}
console.log(arr.constructor == Array)//
console.log(obj.constructor == Object)//
console.log(arr instanceof Array)
console.log(Array.isArray(arr))
```