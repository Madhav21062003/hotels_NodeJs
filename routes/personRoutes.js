const express = require('express')
const router = express.Router()

const Person = require('./../models/Person')

// Send  data to database
router.post('/', async (req, res) =>{

    try {
        const data = req.body   // Asuming the request body contains the person data

        // Create a new person document using the Mongoose model
        const newPerson = new Person(data)
    
        // save the new person to the database
        const response =  await newPerson.save()
        console.log('data saved');
        res.status(200).json(response)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal Server error'})
    }
})



// Get Method to get the person
router.get('/', async (req, res) =>{
    
    try {

        const data = await Person.find()
        console.log('data retrieved');
        res.status(200).json(data)

    } catch (error) {

        console.log(error);
        res.status(500).json({error:'Internal Server error'})
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