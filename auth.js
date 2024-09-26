const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const Person=require('./models/Person');


passport.use(new LocalStrategy(async (username, password, done)=>{
    // Authentication logic here
    try
    {
       // console.log('Recieved credentials:', USERNAME,password);
        const user=await Person.findOne({username});
        if(!user) 
            return done(null, false, {message:'Incorrect Username:'});
        

        const isPasswrdMatch=await user.comparePassword(password); 
        if(isPasswrdMatch)
            return done(null, user);
        else
            return done(null, false, {message:'Incorrect Password:'});
        
    }
    catch(error){
        return done(error);
        
        
    }
}))

module.exports=passport; //Export configured passport