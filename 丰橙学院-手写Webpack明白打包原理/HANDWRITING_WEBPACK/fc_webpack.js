const fs = require("fs");
const parser = require("@babel/parser");

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
  console.log(AST);

  //操作AST，去分析出    依赖文件

}

createAsset("./src/index.js");
