const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const babel = require("@babel/core");

let ID = 0;

// 单个文件处理后的结果
function createAsset(filePath) {

  //读取    入口文件内容
  const content = fs.readFileSync(filePath, "utf-8"); //sync 同步
  // console.log("------------------------------------entry file content");
  // console.log(content);

  //通过 @babel/parser 解析出 入口文件内容的    AST
  const AST = parser.parse(content, {
    sourceType: "module"
  }); //parse 默认不支持模块化代码，所以要给定 sourceType
  // console.log("------------------------------------AST");
  // console.log(AST); //将AST 比喻成划分好各个部位的猪

  const dependencies = [];
  // 处理多个依赖

  //通过 @babel/traverse 操作AST，去分析出    依赖文件
  traverse(AST, {
    ImportDeclaration: ({ node }) => {
      // console.log("--------------------------------ImportDeclaration first params");
      // console.log(node.source.value);
      dependencies.push(node.source.value);
    }
  });
  // console.log("------------------------------------dependencies");
  // console.log(dependencies);
  // 将traverse 比喻成杀猪刀
  // 第二个参数 对象 术语叫visitor，里面传什么：
  // 对我们需要处理的节点（五花肉那一部分） 添加类型同名的一个回调函数，
  // 在遍历的过程中 ，进入对应的节点时，执行该回调，并且把相关的一些节点信息传过来
  // 比如：import info from './info.js';分析这一行，
  // 先找到import这个关键字对应的节点对象=ImportDeclaration，
  // 再找到'./info.js'对应的节点=StringLiteral，然后该对象下面有个value属性，值就是"./info.js"
  // 即：当 traverse 遍历遇到 ImportDeclaration 这个节点，就执行传入的回调函数！！！！！！！

  // 通过 @babel/core 操作AST，去将es6转换成es5    浏览器可识别的语法
  const { code } = babel.transformFromAstSync(AST, "", {
    presets: ["@babel/preset-env"] //套餐
    //plugins:[]//单点
  });
  //第三个参数就像我们在babel文件里面配置的一样，用到哪些插件
  // console.log("------------------------------------浏览器可识别的语法");
  // console.log(code);

  let id = ID++;
  return { id, filePath, code, dependencies };
}

// graph 文件依赖图
function createGraph(entry) {
  const mainAsset = createAsset(entry);
  const queue = [mainAsset];

  for (const asset of queue) {
    const dirname = path.dirname(asset.filePath);

    asset.mapping = {}
    asset.dependencies.forEach(relativePath => {
      
      const absolutePath = path.join(dirname, relativePath);
      const childAsset = createAsset(absolutePath);
      asset.mapping[relativePath] = childAsset.id;
      queue.push(childAsset);
    });
  }
  return queue;
}

const graph = createGraph("./src/index.js");

function bundle(graph){
  let modules = '';

  graph.forEach(mod => {
    modules += `
      ${mod.id}: [
        function (require, module, exports){
            ${mod.code}
        },
        ${JSON.stringify(mod.mapping)}
      ],
    `
  })
  const result = `
    (function(modules){
      function require(id) {
        const [fn, mapping] = modules[id];

        function localRequire(relativePath){
          return require(mapping[relativePath]);
        }

        const module = {
          exports: {}
        }

        fn(localRequire, module, module.exports);

        return module.exports
      }

      require(0);

    })({${modules}})
  `
  return result

}

const result = bundle(graph);

console.log("---------------------------------------result");
console.log(result);
