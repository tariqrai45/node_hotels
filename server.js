const express= require('express');
const app=express();
const db=require('./db')
const passport=require('./auth');
const bodyParser=require('body-parser');
const PORT= process.env.PORT || 3000;
app.use(bodyParser.json()); // req.body
require('dotenv').config();

// Middleware Function
const logRequest= (req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] Request Made to: ${req.originalUrl}`);
    next(); //Move to the next phase
}
app.use(logRequest);


app.use(passport.initialize());

const localAuthMiddleware= passport.authenticate('local',{session:false});
app.get('/',function(req,res){
    res.send('Welcome to Hotel')
})

//Import the Router files
const personRoutes=require('./routes/personRoutes');
const menuRoutes=require('./routes/menuRoutes');

//Use the routes
app.use('/person', personRoutes);
app.use('/menu', menuRoutes);

app.listen(PORT,()=>{console.log('Listening on port');})