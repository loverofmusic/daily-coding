```js
// 1. undefined null区别

// undefined: 定义了但没有赋值
var a;
console.log(a);//undefined

//null: 定义了也赋值了，值就是null
a = null;
console.log(a);//null

// 2. 什么时候使用null

//起始
var b = null;//初始的时候赋值为null，表明将要赋值为对象
b = ['zxcc', 7]
//最后
b = null//让b指向的对象成为垃圾对象（被垃圾回收器回收）
```

