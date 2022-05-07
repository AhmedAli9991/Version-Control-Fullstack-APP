const Versionodoc=require("../Models/Version")
module.exports.Add= async (req,res)=>{
    try {
        const user = req.user
        if(!user) return res.status("401").json("unAutherized")   
        const Version = await Versionodoc.create(req.body) 
        console.log("Version",Version)
        await res.status("201").json(Version)
    }
    catch(err){
        await res.status("400").json(err)
    }
}
module.exports.ViewAll= async (req,res)=>{
    try{    
        const user = req.user
        if(!user) return res.status("401").json("unAutherized")      
        const Version = await Versionodoc.find({Repository:req.params.id}) 
        console.log("Version",Version)
        await res.status("200").json(Version)
    }
    catch(err){
        await res.status("400").json(err)
    }
}
module.exports.ViewOne= async (req,res)=>{
    try{    
        const user = req.user
        if(!user) return res.status("401").json("unAutherized")      
        const Version = await Versionodoc.findOne({_id:req.params.id}) 
        console.log("Version",Version)
        await res.status("200").json(Version)
    }
    catch(err){
        await res.status("400").json(err)
    }
}
