import jwt from 'jsonwebtoken';

//admin auth midleware

const authAdmin=async(req,res,next)=>{
    try {
        const {atoken}=req.headers
        if(!atoken){
            return res.json({success:false,message:"not authorised login"})
        }

        const token_decode=jwt.verify(atoken,process.env.JWT_SECRET)

        if (token_decode.email !== process.env.ADMIN_EMAIL) {
    return res.status(403).json({ success: false, message: "Not authorized" });
}

        next()
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}
export default authAdmin