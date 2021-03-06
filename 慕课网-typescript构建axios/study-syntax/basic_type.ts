//test
let f: string = "rrrr";
// console.log(f);

//**********************************************boolean类型
let isDone: boolean = false;

//**********************************************number
let decLiteral: number = 20;
let hexLiteral: number = 0x14;
let binaryLiteral: number = 0b10100;
let octalLiteral: number = 0o24;

//**********************************************string
let str: string = "zxcc";
str = "oiiuuuu";

let sentense = `
hello,${str}, how old r u? 

r u ${decLiteral} years old?
`;
// console.log(sentense);

//**********************************************数组：[]中括号 和 Array数组泛型
let arr: number[] = [1, 3, 5];
let arr2: Array<number> = [4, 6, 8];

//**********************************************tuple 元组 （关系型数据库表中的一条记录，融合了不同字段的）
let x: [string, number];
x = ["hello", 18];

//**********************************************enum 枚举 (为一组数值 赋予更友好的名字)
//获取枚举值, 默认从0开始；0 1 2
enum Color {
  Red,
  Green,
  Blue
}
let c: Color = Color.Green;
// console.log(c)

enum Color1 {
  Red = 1,
  Green,
  Blue
}
let c1: Color1 = Color1.Green;
// console.log(c1)

enum Color2 {
  Red = 3,
  Green = 5,
  Blue = 7
}
let c2: Color2 = Color2.Green;
// console.log(c2)

// 也可以通过 值  反查  名字
let colorName: string = Color2[7];
console.log(colorName);

//**********************************************any类型（用户输入，第三方代码库的动态内容 我们不确定是什么类型，并且 希望 不去做类型检查）
let notSure: any = 4;
notSure = "string instead";
notSure = true;

let list: any[] = [9, "sss", false];
list[1] = 5;

//**********************************************void类型
//函数无返回值
function userWarn(): void {
  console.log("this is a warning....");
}

//**********************************************never类型
// 是任何类型的子类型，可以赋值给任意类型
function error(message: string): never {
  throw new Error(message);
}

function fail() {
  return error("something error...");
}

function inifiniteLoop(): never {
  while (true) {}
}

//**********************************************object类型
declare function create(o: object | null): void;
create({ prop: 0 });
//create(null);

//++++++++++++++++++++++++++++++++++++++++++++++类型断言
let someValue: any = "xxxxxxxxxxxxxx";
let strLength:number = (<string>someValue).length;//1.
let strLength1:number = (someValue as string).length;//2. 支持JSX

//
