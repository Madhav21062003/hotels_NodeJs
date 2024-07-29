const express = require('express')
const app = express()
const db = require('./db')
require('dotenv').config()
const passport=  require('./auth')



const bodyParser = require('body-parser')
app.use(bodyParser.json())
const PORT = process.env.PORT || 3000

// Middleware Functions
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to: ${req.originalUrl}`);
    next();  // Move to the next middleware or route handler
};
app.use(bodyParser.json());
app.use(logRequest);
app.use(passport.initialize())


// Middleware to authenticate using passport
const localAuthMiddleware = passport.authenticate('local', { session: false });

app.get('/', (req, res) => {
    res.send('Welcome to Hotels project');
});

// Import the router files
const personRoutes = require('./routes/personRoutes');
app.use('/person',personRoutes)

const menuItemRoutes = require('./routes/menuItemsRoutes')
app.use('/menu',menuItemRoutes)



app.listen(PORT,()=>{
    console.log('listeneing on port 3000');
})
