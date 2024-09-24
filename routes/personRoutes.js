const express=require('express');
const router=express.Router();
const Person=require('./../models/Person');

// Post route to add a person
router.post('/', async (req,res) =>{

    try{
 
          const data= req.body  //Assuming the request body contains the person data
 
          // Create a new person document using the Mangoose model
         const newPerson=new Person(data);
 
         // Save the new person to the database.
        const response= await newPerson.save();
        console.log('Person Data saved:');
        res.status(200).json(response);
 
    }
    catch(err){
         console.log(err);
         res.status(500).json({error: 'Internal server error:'});
    }
   
 })

// T0 get the data of person
router.get('/',async (req,res)=>{

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