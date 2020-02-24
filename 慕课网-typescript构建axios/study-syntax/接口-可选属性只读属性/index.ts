interface Square {
  color: string,
  area: number
}
//? 表示 可选属性（属性拼写错误是很容易发现的；可以对其做预定义）
interface SquareConfig {
  color?: string,
  width?: number
}

function createSqure(squreConfigObj: SquareConfig): Square{
  let newSqure = {color: "red",area: 100};
  if(squreConfigObj.color){
    newSqure.color = squreConfigObj.color
  }
  if(squreConfigObj.width){
    newSqure.area = squreConfigObj.width * squreConfigObj.width;
  }
  return newSqure
}
let squreObj = createSqure({color: "yellow",width: 4});
console.log(squreObj)

let squreObj1 = createSqure({color: "blue"});
console.log(squreObj1)

//readonly 表示只读属性
interface Point {
  readonly x: number,
  readonly y: number
}
let p1: Point = {x: 4, y: 8};
// p1.x = 7 报错