const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('./auth');

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body
const PORT = process.env.PORT || 3000;




//  Middleware Function
const logrequest = (req,res,next) => {
console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
next(); // move to next phase
}
app.use(logrequest);      //using this all router logrequest implement, kuch aisa hi.



app.use(passport.initialize());  

const localAuthMiddleware = passport.authenticate('local',{session: false})
app.get('/',function (req, res)  {
  res.send('Welcome to my hotel')
})










// import the router files
const personRoutes = require('./routes/personRoutes');
const MenuItemRoutes = require('./routes/MenuItemRoutes')

// Use the routers
app.use('/person',personRoutes);
app.use('/menu',MenuItemRoutes);

const port = 3000



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


