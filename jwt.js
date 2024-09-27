const jwt=require('jsonwebtoken');
const jwtAuthMiddleware=(req,res,next)=>{
    //First check the request user has authorization or not
    const authorization=req.headers.authorization
    if(!authorization) return res.status(401).json({error: "Token is  not Found"});

    // Extrect the jwt token form the request header
    const token=req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error: "Unauthorized"});

    try{

        // Verify the JWT token
       const decoded= jwt.verify(token, process.env.JWT_SECRERT)

       //Attach user information to the request object
       req.user=decoded
       next();
    
    }catch(err)
    {
        console.error(err);
        res.status(401).json({error:'Invalid token'})
    }
}

// Function to generate JWT Token
const generateToken=(userData)=>{
    //Generate a new JWT token using user data
    return jwt.sign(userData,process.env.JWT_SECRERT, {expiresIn:999990000});

}

module.exports= {jwtAuthMiddleware, generateToken};