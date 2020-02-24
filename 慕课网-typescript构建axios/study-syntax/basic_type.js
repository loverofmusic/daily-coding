//test
var f = "rrrr";
// console.log(f);
//boolean类型
var isDone = false;
//number
var decLiteral = 20;
var hexLiteral = 0x14;
var binaryLiteral = 20;
var octalLiteral = 20;
//string
var str = "zxcc";
str = "oiiuuuu";
var sentense = "\nhello," + str + ", how old r u? \n\nr u " + decLiteral + " years old?\n";
// console.log(sentense);
//数组：[]中括号 和 Array数组泛型
var arr = [1, 3, 5];
var arr2 = [4, 6, 8];
//tuple 元组 （关系型数据库表中的一条记录，融合了不同字段的）
var x;
x = ["hello", 18];
//enum 枚举 (为一组数值 赋予更友好的名字)
//获取枚举值, 默认从0开始；0 1 2
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
var c = Color.Green;
// console.log(c)
var Color1;
(function (Color1) {
    Color1[Color1["Red"] = 1] = "Red";
    Color1[Color1["Green"] = 2] = "Green";
    Color1[Color1["Blue"] = 3] = "Blue";
})(Color1 || (Color1 = {}));
var c1 = Color1.Green;
// console.log(c1)
var Color2;
(function (Color2) {
    Color2[Color2["Red"] = 3] = "Red";
    Color2[Color2["Green"] = 5] = "Green";
    Color2[Color2["Blue"] = 7] = "Blue";
})(Color2 || (Color2 = {}));
var c2 = Color2.Green;
// console.log(c2)
// 也可以通过 值  反查  名字
var colorName = Color2[7];
console.log(colorName);
//any类型（用户输入，第三方代码库的动态内容 我们不确定是什么类型，并且 希望 不去做类型检查）
