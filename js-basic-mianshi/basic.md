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

a.bind(obj, '1', '2')();//要自己调用 
```

```js
// 事件模型
    // 冒泡：(从里往外)
    // 捕获：(从外往里)
    // 既有冒泡又有捕获的话，就是先捕获再冒泡

//false 冒泡     true 捕获(ie不支持捕获)

<body id="body">
  <div id="div1">
    <div id="div2">
      <div id="div3"></div>
    </div>
  </div>
</body>

var oDiv1 = document.getElementById('div1');
var oDiv2 = document.getElementById('div2');
var oDiv3 = document.getElementById('div3');

oDiv1.addEventListener('click', function(){
  console.log('div1冒泡');
},false); //false 冒泡     true 捕获(ie不支持捕获)

oDiv2.addEventListener('click', function(){
  console.log('div2冒泡');
},false);

oDiv3.addEventListener('click', function(){
  console.log('div3冒泡');
},false);
// div3冒泡
// div2冒泡
// div1冒泡

oDiv1.addEventListener('click', function(){
  console.log('div1捕获');
},true); //false 冒泡     true 捕获(ie不支持捕获)

oDiv2.addEventListener('click', function(){
  console.log('div2捕获');
},true);

oDiv3.addEventListener('click', function(){
  console.log('div3捕获');
},true);
// div1捕获
// div2捕获
// div3捕获

//给元素绑定多个事件
//onclick只能绑定一个，后面的会冲掉前面的
oDiv1.onclick = function(){
  console.log(111)
}
oDiv1.onclick = function(){
  console.log(222)
}
//用事件监听 绑定多个事件
oDiv1.addEventListener('click', function(){
  console.log(111);
},false);
oDiv1.addEventListener('click', function(){
  console.log(222);
},false);
```

```js
// 事件源

<div id="div1">
  <div id="div2"></div>
</div>

var oDiv1 = document.getElementById('div1');
var oDiv2 = document.getElementById('div2');

oDiv1.onclick = function(e){
  console.log(111)
  console.log(e.target);//事件源 点击谁 触发的事件 就是谁 点击div2就是<div id="div2"></div>

  console.log(this)//谁的事件就是谁
  //<div id="div1">
    //<div id="div2"></div>
  //<div>

  console.log(e.currentTarget)//等同于this                            
}

oDiv2.onclick = function(e){
  console.log(222)
  e.stopPropagation();//阻止冒泡
  e.cancelBubble = true;//ie阻止冒泡
  e.preventDefault();//阻止默认行为
  e.returnValue = false;//ie阻止默认行为
  return false;//阻止默认行为
}

```

```js
// 事件委托

<button id="btn">click</button>
<ul>
  <li>1</li>
  <li>2</li>
</ul>

var oBtn = document.getElementById('btn');
var aLi = document.getElementsByTagName('li');
var oUl = document.getElementsByTagName('ul')[0];

for(var i = 0; i < aLi.length; i++){
  aLi[i].onclick = function(){
    console.log(this.innerHTML);
  }
}

oBtn.onclick = function(){
  var oLi = document.createElement('li');
  oLi.innerHTML = Math.random();
  oUl.appendChild(oLi);
}

//事件委托 解决后生成元素的事件绑定问题
//把事件绑定在父元素身上
//点击子元素的时候 通过事件冒泡 会触发父元素的点击事件
oUl.onclick = function(e){
  if(e.target.tagName == 'LI'){
    console.log(e.target.innerHTML)
  }
}


//jquery中的.on()支持事件委托
$('li').on('click',fucntion(){
  console.log($(this).html())
})

$('ul').on('click','li',fucntion(){
  console.log($(this).html())
})


```