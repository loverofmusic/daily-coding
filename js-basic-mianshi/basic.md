```js
// js数据类型
  // 基本数据类型 
    // number string boolean null undefined symbol

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
//typeof判断不了数据还是对象，如何判断是数组还是对象
var arr = [1,2,3];
var obj = {
    name: 'vbhf'
}
console.log(arr.constructor == Array)// 判断数组实例的 构造函数 是否等于Array
console.log(obj.constructor == Object)// 判断对象实例的 构造函数 是否等于Object
console.log(arr instanceof Array)// 判断arr是否是Array的实例
console.log(Array.isArray(arr))//ie8以上
```

```js
// 定义一个构造函数 当作 类（首字母一般大写）
function Person(name, age){
  this.name = name;
  this.age = age;
  // 这种定义方法 的方式 会在每次创建一个 新实例的时候 开辟新的内存空间 相当于new Function 一次，不推荐
  // this.eat = function(){
  //   console.log('...is eating')
  // }
}
//prototype原型对象 定义在原型对象下的所有属性和方法能被 所有的实例化对象 共享
Person.prototype.eat = function (){
  console.log(this.name + '...is eating');
}

var person1 = new Person('zxcc', 20);
person1.eat();

var person2 = new Person('lisi', 30);
person2.eat();

console.log(person1);
console.log(person2);
```

```js
  // 基本 数据类型存在 栈内存， 引用 数据类型存在 堆内存
  var a = 'abc';
  var b = a;
  b = 'aaa';
  console.log(a);

  var obj = {
    name: 'zs'
  }
  var obj2 = obj;
  console.log(obj2);
  obj2.name = 'lisi';
  console.log(obj);

```

```js
// 继承
//原型继承

function Animal(name, age){
  this.name = name;
  this.age = age;
}

Animal.prototype.eat = function(){
  console.log(this.name+"...is eating...");
}

//继承属性的方式：在构造函数中 .call()
function Cat(name, age){
  Animal.call(this, name, age);
}

//继承方法的方式：原型对象 = new 父类的实例化对象
Cat.prototype = new Animal();

console.log(Cat.prototype.constructor) //猫的原型指向动物去了
Cat.prototype.constructor = Cat.constructor;
console.log(Cat.prototype.constructor)

var cat1 = new Cat('xxx', 5);

var cat2 = new Cat('yyy', 15);

console.log(cat1);
console.log(cat2);
```


```js
// 普通函数this指向问题 : 谁调用指向谁

// 1.this在函数中 函数直接执行 => window
function a(){
  console.log(this)
}
a()

// 2.定时器中 => window
setInterval(function(){
  console.log(this)
}, 100)

// 3.对象方法中 => obj
obj = {
  name: 'zs',
  say: function(){
    console.log(this)
  }
}
obj.say();

// 4.事件中 => 执行点击的元素

// 5.类中 => 实例化对象

```

```js
// 改变this指向

function a(a, b){
  console.log(this, a, b)
}
obj = {
  name: 'zs'
}

// call() apply() bind()
a.call(obj, '1', '2'); 
a.apply(obj, ['1', '2']); 
```