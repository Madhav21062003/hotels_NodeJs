console.log('notes page loaded');
var age = 24

const addNumber = function(a,b){
    return a + b
}




module.exports = {
    age, addNumber
}



// converting JSON to String
/*
const jsonString = '{"name":"Madhav", "age":21, "city":"Aligarh"}'
const jsonObject = JSON.parse(jsonString)

console.log(jsonObject.name);
console.log(jsonObject.age); 
*/


// Convert  Object Into JSON

const objectToCoonvert = {
    name: "Madhav",
    age:25
}
const json = JSON.stringify(objectToCoonvert);
console.log(json);