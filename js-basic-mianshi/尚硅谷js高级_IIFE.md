```js
// 匿名函数自调用（IIFE--立即执行函数表达式）
//作用：
//隐藏实现
//不会污染外部（全局）命名空间
//用它来编码js模块
(function(){
  var a= 1;
  function test (){
    console.log(++a);
  }
  function test2(){
    console.log('ddd');
  }
  window.$ = function(){//向外暴露一个全局函数
    return {
      test: test
    }
  }
})();
$().test();//$ 是函数名
```