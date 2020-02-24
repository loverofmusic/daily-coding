//test
let f: string = "rrrr";
// console.log(f);

//boolean类型
let isDone: boolean = false;

//number
let decLiteral: number = 20;
let hexLiteral: number = 0x14;
let binaryLiteral: number = 0b10100;
let octalLiteral: number = 0o24;

//string
let str: string = "zxcc";
str = "oiiuuuu";

let sentense = `
hello,${str}, how old r u? 

r u ${decLiteral} years old?
`;
console.log(sentense);

//数组：[]中括号 和 Array数组泛型
let arr: number[] = [1, 3, 5];
let arr2: Array<number> = [4, 6, 8];

//tuple 元组 （关系型数据库表中的一条记录，融合了不同字段的）
let x: [string, number];
x = ["hello", 18];

//enum 枚举

