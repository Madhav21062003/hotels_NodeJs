const mongoose = require('mongoose')
require('dotenv').config()
// Define the MongoDb Url
// const mongoUrlLocal = process.env.DB_URL_LOCAL;
const mongoUrl = process.env.DB_URL
// Setup MongoDb Connection
mongoose.connect(mongoUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

// Get Default connection
// Mongoose mainatains a default connection object the MongoDB connection
const db = mongoose.connection

// Define event liteners for database connection
db.on('connected', ()=>{
    console.log('Connected to MongoDb Server');
})

db.on('error',(err)=>{
    console.log('Mongodb connection error',err);
})

db.on('disconnected', ()=>{
    console.log('MongoDB disconnected');
})

// export the database connection
module.exports = db