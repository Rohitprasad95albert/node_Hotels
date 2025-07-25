const express = require('express')
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body






const port = 3000

app.get('/', (req, res) => {
  res.send('Welcome to my hotel')
})










// import the router files
const personRoutes = require('./routes/personRoutes');
const MenuItemRoutes = require('./routes/MenuItemRoutes')

// Use the routers
app.use('/person',personRoutes);
app.use('/menu',MenuItemRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


