//collections 集合 model 数据模型

const mongoose = require('mongoose')

//获取规范类
const Schema = mongoose.Schema;

//规范数据格式
const zxccSchema = new Schema({
  name: String,
  weight: Number
});

//创建数据模型
const zxccModel = mongoose.model('zxcc', zxccSchema)

module.exports = zxccModel;