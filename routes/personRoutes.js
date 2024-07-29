const express = require('express')
const router = express.Router()
const  {jwtAuthMiddleware,genarateToken} = require('./../jwt')
const Person = require('./../models/Person')

// Send  data to database
router.post('/signup', async (req, res) =>{

    try {
        const data = req.body   // Asuming the request body contains the person data

        // Create a new person document using the Mongoose model
        const newPerson = new Person(data)
    
        // save the new person to the database
        const response =  await newPerson.save()
        console.log('data saved');

        const payload = {
            id:response.id,
            username:response.username
        }
        console.log(JSON.stringify(payload));
        const token = genarateToken(payload)
        console.log("Token is: ",token);

        res.status(200).json({response: response, token:token})
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal Server error'})
    }
})


// Login Route
router.post('/login',async(req, res) =>{
    try {
        // Extract usrname and pasword from request body
    const {username, password} = req.body

    // find user by username
    const user = await Person.findOne({username:username});

    // If user does not exist or password does not match , retuen error
    if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({error:'Invalid username or password'})
    }

    // Generate Token
    const payload = {
        id:user.id,
        username:user.username
    } 

    const token = genarateToken(payload)

    // return token as response
    res.json({token})
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal Server Error'})
    }
})


// Get Method to get the person
router.get('/', jwtAuthMiddleware,async (req, res) =>{
    
    try {

        const data = await Person.find()
        console.log('data retrieved');
        res.status(200).json(data)

    } catch (error) {

        console.log(error);
        res.status(500).json({error:'Internal Server error'})
    }

})

// Profile route
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try{
        const userData = req.user;
        console.log("User Data: ", userData);

        const userId = userData.id;
        const user = await Person.findById(userId);

        res.status(200).json({user});
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// Get The persons data according to their work
router.get('/:workType', async (req,res) =>{

    try {
        const workType = req.params.workType;

        if (workType == 'chef' || workType == 'waiter' || workType == 'manager') {
            const response = await Person.find({work:workType})
            console.log('response fetched');
            res.status(200).json(response)
        }
        else {
            res.status(404).json({error:'Invalid work type'})
        }

    } catch (error) {
        console.log(err);
        res.status(500).json({err:'Internal Server error'})
    }

})


// Update the data
router.put('/:id', async (req,res)=>{

    try {
        
        const personId = req.params.id;   // Extract the id ffrom the url parameter
        const updatedPrsonData = req.body // updated data for the person
        
        const response = await Person.findByIdAndUpdate(personId, updatedPrsonData,{
            new:true,            // return the updated content
            runValidators:true   // run mongoose validations
        })


        // If person from the given Id does exist
        if (!response) {
            return res.status(404).json({error:'Person Not Found'})
        }

        console.log('data updated')
        res.status(200).json(response)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal Server error'})
    }
})


// Delete the record
router.delete('/:id', async (req, res)=>{

    try {
        const personId = req.params.id; 

        const response = await Person.findByIdAndDelete(personId)

        if (!response) {
            return res.status(404).json({error:'Person Not found'})
        }

        console.log('data deleted');
        res.status(200).json({message: 'Person deleted successfully'})

    } catch (error) {
        console.log('data deleted');
        res.status(500).json({error:'Internal Server error'})
    }
})

module.exports = router