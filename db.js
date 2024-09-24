const mongoose=require('mongoose');
// Define the mongo connection URL
const mongoUrl='mongodb://localhost:27017/hotels'

// Set up mongo connection
mongoose.connect(mongoUrl,{useNewUrlParser:true,useUnifiedTopology:true})

// Get the default connection
// Mongoose maintains a default connection object representing the MongoDB connection.
const db=mongoose.connection;

// Define event listeners for database connection.
db.on('connected',()=>{console.log('Connected to MongoDB server:');})
db.on('error',(err)=>{console.log('Mongo connection error:',err);})
db.on('disconnected',()=>{console.log('MongoDB disconnected:');})

// Export the database connection
module.exports=db;