const express=require('express');
const router=express.Router();
const MenuItem=require('./../models/MenuItem');


// To Add the Menu Item in database
router.post('/', async (req,res) =>{

    try{
 
          const data= req.body  //Assuming the request body contains the person data
 
          // Create a new person document using the Mangoose model
         const newItem=new MenuItem(data);
 
         // Save the new person to the database.
        const response= await newItem.save();
        console.log('Menu Data saved:');
        res.status(200).json(response);
 
    }
    catch(err){
         console.log(err);
         res.status(500).json({error: 'Internal server error:'});
    }
   
 })

// To get the data of Menu Items
router.get('/',async (req,res)=>{

    try{
        const data=await MenuItem.find();
        console.log('Data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error:'});
   }
})


// Get data of specific Teste Type
router.get('/:tasteType', async(req,res)=>{

    try{
        const tasteType = req.params.tasteType;    // Extract the work type from the url parameter
        if(tasteType=='spicy'|| tasteType =='sweet'||tasteType =='sour')
            {
                const response= await MenuItem.find({taste:tasteType});
                console.log('Response fetched:');
                res.status(200).json(response);
            }
            else{
                res.status(404).json({error:'Invalid taste:'});
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
        const menuId=req.params.id; //Extract the id from the URL peramenter
        const updatedMenuData=req.body; //Update data from person
        const response= await MenuItem.findByIdAndUpdate(menuId, updatedMenuData,{
            new:true, //Return the update document
            runValidators:true ///Run mongoose validation
        })
        if(!response)
        {
            return res.status(404).json({ error: 'Item not found:'});
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
            const itemId=req.params.id; //Extract the id from the URL peramenter
            
            //Assuming you have a person model
            const response=await MenuItem.findByIdAndDelete(itemId);
            if(!response)
                {
                    return res.status(404).json({ error: 'Item not found:'});
                }
                console.log('Data Deleted:');
                res.status(200).json({message:'Item deleted successfully:'});

        }
        catch(err){
            console.log(err);
        res.status(500).json({error: 'Internal server error:'});
        }
})

module.exports=router;