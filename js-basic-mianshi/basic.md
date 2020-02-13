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