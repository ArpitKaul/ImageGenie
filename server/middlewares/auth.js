// Find the user id from the token and it will add the user id in the request body

import jwt from 'jsonwebtoken'


const userAuth = async (req , res, next)=>{
    const {token} = req.headers;

    if(!token){
       return res.json({success:false , message: 'Not Authorized. Login again'}); 
    }

    try{
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if(tokenDecode.id){
            req.user = {userId:tokenDecode.id};

        }else{
            return res.json({sucess: false, message: 'Not Authrized. Login Again'});
        }

        next();
    }catch (error){
        res.json({sucess: false, message: error.message});
    }
}

export default userAuth;