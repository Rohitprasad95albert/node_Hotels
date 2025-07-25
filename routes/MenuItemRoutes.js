const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');




// POST method for menuitem

router.post('/',async(req,res) =>{
    try{
        const data = req.body // Assuming the request body contains the person data

        // Create a new Person document using the mongoose model
        const newitem = new MenuItem(data);

        // save the new person to the database
        const response = await newitem.save();
        console.log('data saved');
        res.status(200).json(response);

    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})

// GET method for menuitem
router.get('/',async (req,res) =>{
    try{
        const data = await MenuItem.find();
        console.log('data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server error"});
    }
})

//GET method for taste data
router.get('/:tasteType', async (req,res) =>{
    try{
        const tasteType = req.params.tasteType; // extarct the taste type from the URL parameter
        if(tasteType =='sweet' || tasteType == 'sour' || tasteType == 'spicy'){
            const response = await MenuItem.find({taste:tasteType});
            console.log('respone fetched');
            res.status(200).json(response);
        
        }else{
            res.status(404).json({error:"Invalid taste type"});
        }

    
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server error"});
    }
})


module.exports = router;