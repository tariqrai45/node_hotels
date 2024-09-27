const express=require('express');
const router=express.Router();
const Person=require('./../models/Person');
const {jwtAuthMiddleware, generateToken}= require('./../jwt');

// SignUp route to add a person
router.post('/signup', async (req,res) =>{

    try{
 
          const data= req.body  //Assuming the request body contains the person data
 
          // Create a new person document using the Mangoose model
         const newPerson=new Person(data);
 
         // Save the new person to the database.
        const response= await newPerson.save();
        console.log('Person Data saved:');
        const payload={
            id:response.id,
            username:response.username

        }
        console.log(JSON.stringify(payload));
        const token=generateToken(payload);
        console.log('Token is:', token);
        res.status(200).json({response: response, token: token});
 
    }
    catch(err){
         console.log(err);
         res.status(500).json({error: 'Internal server error:'});
    }
   
 })

 // Login Router
 router.post('/login', async(req,res)=>{
    try
    {
        //Extract Username and Password form userbody
        const {username,password}=req.body;

        // Find the user by username
        const user= await Person.findOne({username: username});

        // If user is not exist or password not match
        if(!user||!(await user.comparePassword(password))){
            return res.status(401).json({error:'Invalid username or password'});
        }

        //Generaate token
        const payload={
            id:user.id,
            username:user.username
        }
        const token=generateToken(payload);
        
        //Return token as response
        res.json({token});
    }
    catch(err)
    {
        console.error(err);
        res.status(500).json({error:'Internal server error'});
    }
 })

 // Route for view profile of individual
 router.get('/profile', jwtAuthMiddleware, async(req, res)=>{
    try
    {
        const userData=req.user;
        console.log("User Data:", userData);
        const userId=userData.id;
        const user=await Person.findById(userId);
        res.status(200).json({user});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error:'});
   }
 })

// T0 get the data of all persons
router.get('/',jwtAuthMiddleware,async (req,res)=>{

    try{
        const data=await Person.find();
        console.log('Data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error:'});
   }
})

// Get data of specific Work Type
router.get('/:workType', async(req,res)=>{

    try{
        const workType = req.params.workType;    // Extract the work type from the url parameter
        if(workType =='chef'|| workType =='waiter'|| workType =='manager')
            {
                const response=await Person.find({work: workType});
                console.log('Response fetched:');
                res.status(200).json(response);
            }
            else{
                res.status(404).json({error:'Invalid work type:'});
            }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error:'});
    }  
})

//To update person Information
router.put('/:id',async(req,res)=>{
    try{
        const personId=req.params.id; //Extract the id from the URL peramenter
        const updatedPersonData=req.body; //Update data from person
        const response= await Person.findByIdAndUpdate(personId, updatedPersonData,{
            new:true, //Return the update document
            runValidators:true ///Run mongoose validation
        })
        if(!response)
        {
            return res.status(404).json({ error: 'Person not found:'});
        }

        console.log('Data updated:');
        res.status(200).json(response);

    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error:'});

    }

})

// For deletion of data
router.delete('/:id',async(req,res)=>{
        try{
            const personId=req.params.id; //Extract the id from the URL peramenter
            
            //Assuming you have a person model
            const response=await Person.findByIdAndDelete(personId);
            if(!response)
                {
                    return res.status(404).json({ error: 'Person not found:'});
                }
                console.log('Data Deleted:');
                res.status(200).json({message:'Person deleted successfully:'});

        }
        catch(err){
            console.log(err);
        res.status(500).json({error: 'Internal server error:'});
        }
})

module.exports=router;