const express = require('express')
const app = express()
const db = require('./db')
require('dotenv').config()

const bodyParser = require('body-parser')
app.use(bodyParser.json())
const PORT = process.env.PORT || 3000

// Import the router files
const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes)

const menuItemRoutes = require('./routes/menuItemsRoutes')
app.use('/menu', menuItemRoutes)



app.listen(PORT,()=>{
    console.log('listeneing on port 3000');
})
