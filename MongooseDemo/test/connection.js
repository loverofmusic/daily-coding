// 连接数据库

//1.引入mongoose模块
const mongoose = require("mongoose");

//2.连接mongodb
mongoose.connect("mongodb://localhost/test");

//3.测试数据库是否连接成功
mongoose.connection
  .once("open", () => {
    console.log("数据库连接成功");
  })
  .on("error", () => {
    console.log("连接失败", error);
  });
