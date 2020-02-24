//额外属性检查
interface SquareConfig {
  color?: string,
  width?: number
  // [propName: string]: any
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

let squreObj1 = createSqure({color: "blue", coooo: "ffff"});
console.log(squreObj1)

let o = {color: "blue", coooo: "ffff"}
let squreObj = createSqure(o);
console.log(squreObj)