const express = require('express')
const app = express()
const db = require('./db')


const bodyParser = require('body-parser')
app.use(bodyParser.json())


// Import the router files
const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes)

const menuItemRoutes = require('./routes/menuItemsRoutes')
app.use('/menu', menuItemRoutes)

app.listen(3000,()=>{
    console.log('listeneing on port 3000');
})
