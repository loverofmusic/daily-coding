function curry (fn){
  return function (){
    var args = arguments;
    console.log(...arguments) //1,2
    return function (){
      console.log(...arguments)
      return fn(...args, ...arguments)
    }
  }
}

function fun (a, b, c, d){
  return a + b + c + d;
}
 
fun = curry(fun);//左边的fun拿到了curry函数体内的最外层return =>
// function (){
//   var args = arguments;
//   console.log(...arguments) //1,2
//   return function (){
//     console.log(...arguments)
//     return fn(...args, ...arguments)
//   }
// }

var fn = fun(1, 2);//fn拿到fun函数体内的return => 
// function (){
//   console.log(...arguments)
//   return fn(...args, ...arguments)
// }
console.log(fn(4, 5));