function createSqure(squreConfigObj) {
    var newSqure = { color: "red", area: 100 };
    if (squreConfigObj.color) {
        newSqure.color = squreConfigObj.color;
    }
    if (squreConfigObj.width) {
        newSqure.area = squreConfigObj.width * squreConfigObj.width;
    }
    return newSqure;
}
var squreObj = createSqure({ color: "yellow", width: 4 });
console.log(squreObj);
var squreObj1 = createSqure({ color: "blue" });
console.log(squreObj1);
