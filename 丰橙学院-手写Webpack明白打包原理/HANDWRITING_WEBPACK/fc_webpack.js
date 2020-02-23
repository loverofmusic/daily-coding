const fs = require("fs");

function createAsset(filePath) {
  const content = fs.readFileSync(filePath, "utf-8"); //sync 同步
  console.log(content);
}

createAsset("./src/index.js");
