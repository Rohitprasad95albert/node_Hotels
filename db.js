const mongoose = require('mongoose');

// Define the MongoDB connection URL
const mongoURL = ' mongodb://127.0.0.1:27017/hotels'   // in last addded database name allready created or to be created on that name

// set up MongoDB connection
mongoose.connect("mongodb://localhost:27017/hotels", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})



//Get the default connection
//Mongoose maintains a default connection object representing the mongoDB connection.

const db = mongoose.connection;

// define event listeners for database connection

db.on('connected',() => {
    console.log("Connected to MongoDB Server");
});

db.on('error',() => {
    console.log("MongoDB connection errror");
});

db.on('disconnected',() => {
    console.log("MongoDB disconnected");
});

// Export the database connection
module.exports = db;