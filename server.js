const express= require('express');
const app=express();
const db=require('./db');
const bodyParser=require('body-parser');
require('dotenv').config();
const PORT= process.env.PORT || 3000;

app.use(bodyParser.json()); // req.body

app.get('/', function(req,res){
    res.send('Hello Pakistan')
})





//Import the Router files
const personRoutes=require('./routes/personRoutes');
const menuRoutes=require('./routes/menuRoutes');

//Use the routes
app.use('/person', personRoutes);
app.use('/menu', menuRoutes);

app.listen(PORT,()=>{console.log('Listening on port');})