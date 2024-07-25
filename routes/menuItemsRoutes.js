const express = require('express')
const router = express.Router()

const MenuItem = require('./../models/MenuItem')

// APIS for Menu Items

router.post('/', async (req, res) =>{
    
    try {
        const data = req.body

        const newMenuItem = new MenuItem(data)

        const response = await newMenuItem.save()
        console.log('data saved');
        res.status(200).json(response)
    } catch (error) {
        
        console.log(error);
        res.status(500).json({error:'Internal Server error'})
    }

})

router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find()
        console.log('data feteched');
        res.status(200).json(data)
    } catch (error) {
        console.log('Error occured', error);
        res.status(500).json({error:'Internal Server error'})
    }
})


module.exports = router