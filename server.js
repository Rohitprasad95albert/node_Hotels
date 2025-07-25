const express = require('express')
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body

const Person = require('./models/person');
const MenuItem = require('./models/menuItem');



const port = 3000

app.get('/', (req, res) => {
  res.send('Welcome to my hotel...How can i help u?,we have list of Menu')
})

// POST route to add a person
app.post('/person',async(req,res) =>{
    try{
        const data = req.body // Assuming the request body contains the person data

        // Create a new Person document using the mongoose model
        const newPerson = new Person(data);

        // save the new person to the database
        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);

    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})


// GET method to get the person
app.get('/person',async (req,res) =>{
    try{
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server error"});
    }
})

// writing API for person occupation 
app.get('/person/:workType', async (req,res) =>{
    try{
        const workType = req.params.workType; // extarct the work type from the URL parameter
        if(workType =='chef' || workType == 'manager' || workType == 'waiter'){
            const response = await Person.find({work:workType});
            console.log('respone fetched');
            res.status(200).json(response);
        
        }else{
            res.status(404).json({error:"Invalid work type"});
        }

    
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server error"});
    }
})



// POST method for menuitem

app.post('/menu',async(req,res) =>{
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
app.get('/menu',async (req,res) =>{
    try{
        const data = await MenuItem.find();
        console.log('data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server error"});
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


