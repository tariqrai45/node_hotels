const express= require('express');
const app=express();
const db=require('./db');
const bodyParser=require('body-parser');

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

app.listen(3000,()=>{console.log('Listening on port');})