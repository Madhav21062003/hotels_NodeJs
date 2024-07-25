console.log('server file is running');

const { append } = require('express/lib/response');
// function add(a,b) {
//     return a + b
// }


// const ans = add(50,18)
// console.log(ans);

// Ubnserstanding Call back function
// function callback(){
//     console.log("I am calling a call back function");
// }

// const add = function(a,b, callback){
//     let result = a + b ;
//     console.log(a+b);
//     callback();
// }

// callint functions
// add(15,8,() => {
//     console.log("I am calling a call back function");
// })

// One more way
// add(10,3, ()=> console.log("Addition completed"))



// ================================== Core Node js ============================================

// var fs = require('fs')
// var os = require('os')

// let user =os.userInfo();
// console.log(user.username);

// fs.appendFile('greeting.txt','HI ' + user.username + ' !',() => console.log("file is created"));



//  reading content of another file 

// const notes = require('./notes.js')
// var age = notes.age
// console.log(age);

// console.log(notes.addNumber(100,14));