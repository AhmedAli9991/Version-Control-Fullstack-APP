var jwt=require("jsonwebtoken")
module.exports.createjwts = (user,key,time) => {
    const Token = jwt.sign({_id:user._id,Email:user.Email,Password:user.Password}, key, {expiresIn: time})
    return Token
};
module.exports.verifyjwts = (token,key) => {
    try{
        const decoded = jwt.verify(token,key) 
        return decoded
    }catch(err){
        return null
    }
};
