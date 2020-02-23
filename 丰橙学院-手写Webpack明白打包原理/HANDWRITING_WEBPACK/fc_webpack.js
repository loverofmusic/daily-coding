const fs = require("fs");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;

function createAsset(filePath) {

  //读取    入口文件内容
  const content = fs.readFileSync(filePath, "utf-8"); //sync 同步
  console.log("------------------------------------entry file content");
  console.log(content);

  //通过 @babel/parser 解析出 入口文件内容的    AST
  const AST = parser.parse(content, {
    sourceType: "module"
  }); //parse 默认不支持模块化代码，所以要给定 sourceType
  console.log("------------------------------------AST");
  console.log(AST);//将AST 比喻成划分好各个部位的猪

  //通过 @babel/traverse 操作AST，去分析出    依赖文件
  traverse(AST, {

  })
  // 将traverse 比喻成杀猪刀
  // 第二个参数 对象 术语叫visitor，里面传什么：
      // 对我们需要处理的节点（五花肉那一部分） 添加类型同名的一个回调函数，
      // 在遍历的过程中 ，进入对应的节点时，执行该回调，并且把相关的一些节点信息传过来
      // 比如：import info from './info.js';分析这一行，
          // 先找到import这个关键字对应的节点对象=ImportDeclaration，
          // 再找到'./info.js'对应的节点=StringLiteral，然后该对象下面有个value属性，值就是"./info.js"
}

createAsset("./src/index.js");
