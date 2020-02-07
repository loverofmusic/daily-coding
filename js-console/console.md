```js
var a = 10;
function test(){
    a = 100;
    console.log(a);
    console.log(this.a)
    var a; //这个a是var定义的，会被提升到test函数的最开始（let定义的变量不会被提升）
    console.log(a);
}
test();
// 考察点：作用域 this 变量提升
```

```js
(function(){
    var a=b=3;//这个b没有var，所以会挂到全局window上；a是函数作用域里面的，外面拿不到，会报错
})()
console.log(a);
console.log(b);
// 考察点：自执行 作用域 预解析（b在非严格模式下）
```

```js
for(var i = 1; i <= 3; i++){
    setTimeout(function(){
        console.log(i)
    }, 0)
}
// 考察点： 单线程  异步 等待队列 事件循环
//主线程for----异步setTimeout--放等待队列----
//继续执行for----一共要放3次----
//for执行完--i=4----从等待队列中拿出执行
```

```js
for(let i = 1; i <= 3; i++){
    setTimeout(function(){
        console.log(i)
    }, 0)
}
// 考察点：作用域----函数作用域 全局作用域 块级作用域
// let 有块级作用域，可以将三次i隔离开来，var没有，只能共用一个i，后面的i会将之前的i改掉
```

```js
function fun(n){
    // 变量提升 var n = undefined; n=n;
    console.log(n); //123
    var n = 456; //修改n
    console.log(n); //456
}
var n = 123;
fun(n);
//考察点：作用域 变量提升 参数
```

```js
function fun(){
    // 变量提升 var n = undefined; 
    console.log(n); //undefined
    var n = 456; //修改n
    console.log(n);//456
}
var n = 123;
fun(n);
//考察点：作用域 变量提升
```

```js
function fun(){
    // n会找到全局的n 123
    console.log(n); //123
    n = 456; 
    console.log(n); //456
}
var n = 123;
fun(n);
//考察点：作用域
```

```js
function fun(){
    // 全局的n会先提升 值为undefined；
    console.log(n); //值为undefined
    n = 456; 
    console.log(n); //456
}
fun(n);
var n = 123;
//考察点：作用域 变量提升
```

```js
function fun(){
    // 这里 函数名 和 变量名 相同，
    //它们都有变量提升，并且函数提升 优先级高于 变量提升，
    console.log(fun); //值为函数
    fun = 456; 
    console.log(fun); //456
}
fun();
var fun = 123;
//考察点：作用域 变量提升
```

```js
var fun = 123;
function fun(){
    console.log(fun); 
    fun = 456; 
    console.log(fun); 
}
fun(); 
// fun is not a function
//考察点：作用域 变量提升

// 预解析里面 函数 优先级高于 var
// var fun = undefined;
// function fun = function;
// 就相当于 ：
var fun = undefined;
function fun(){
    console.log(fun); 
    fun = 456; 
    console.log(fun); 
}
fun = 123;
fun();// fun is not a function

```


```js
var n = 123;
function f1(){
    console.log(n);
}
function f2(){
    var n = 456;
    f1();//f1 在 f2 中执行 作用域 无调者 f1 作用域是window
}
f2(); //无调者 window
console.log(n);
// 考察点：预解析 作用域
```

```js
function test(){
    console.log(arguments)
}
test(1,2,3,a,b,c)

//arguments--js内置对象 参数数组 对象 只有函数中有该对象
var length = 100;
function f1(){
    console.log(this.length);//this会变
}
var obj = {
    x = 10,
    f2: function(f1){
        console.log(this) // this == obj
        f1(); // 无调用者 this == window 100
        arguments[0](); //arguments[0]==f1 无调用者 作用域arguments对象 所以是参数数组长度 为 2
    }
}
obj.f2(f1, 1);
// 考察点：预解析 作用域 arguments
```

```js
function f(){
    console.log(this.a);
}
var obj = {
    a: 2,
    f: f
}
var f2 = obj.f;
var a = 'hello';
f2(); //无调用者 this == window
obj.f(); // 调用者obj
//考察点：预解析 字面量 作用域
```

```js

//apply执行一个函数
var o = {name: 'abc'}
function test (){
    console.log(this.name)
}
test();
test.apply(o);

// apply call
function f(s){
    console.log(this.a, s)
    return this.a + s;
}
var obj = {
    a: 2
}
var f2 = function () {
    return f.apply(obj, arguments);
}
var b = f2(3);
console.log(b);
//考察点：预解析 字面量 apply arguments 作用域
```


