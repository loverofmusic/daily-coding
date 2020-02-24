interface LabelledValue {
  label: string
}
//该对象必须有一个label属性，并且是string类型 
function printLabel(labelledObj: LabelledValue){
  console.log(labelledObj.label)
}
let myObj = {size: 10, label: "yyy"}
printLabel(myObj)