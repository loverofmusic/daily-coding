//额外属性检查
interface SquareConfig {
  color?: string;
  width?: number;
  // [propName: string]: any
}

interface Square {
  color: string;
  area: number;
}

function createSquare(squreConfigObj: SquareConfig): Square {
  let newSqure = { color: "red", area: 100 };
  if (squreConfigObj.color) {
    newSqure.color = squreConfigObj.color;
  }
  if (squreConfigObj.width) {
    newSqure.area = squreConfigObj.width * squreConfigObj.width;
  }
  return newSqure;
}

let squreObj1 = createSquare({ color: "blue", coooo: "ffff" });
console.log(squreObj1);

let o = { color: "blue", coooo: "ffff" };
let squreObj = createSquare(o);
console.log(squreObj);

//函数类型检查
interface SearchFunc {
  (source: string, substring: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function(src: string, sub: string): boolean {
  let res = src.search(sub);
  return res > -1;
};
//
let mySearch2: SearchFunc;
mySearch2 = function(src, sub) {
  let res = src.search(sub);
  return res > -1;
};//ts会自动做推断的
