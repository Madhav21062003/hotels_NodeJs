const mongoose = require('mongoose')

// Define the MongoDb Url
const  mongoUrl = 'mongodb://localhost:27017/hotels' 

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