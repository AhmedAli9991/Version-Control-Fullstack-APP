const Repodoc=require("../Models/Repos")

module.exports.Add= async (req,res)=>{
    try {
        const user = req.user
        if(!user) return res.status("401").json("unAutherized")   
        const obj = {
            Title:req.body.Title,
            Desc:req.body.Desc,
            User:req.user._id
        }
        const old = await Repodoc.findOne({ Title:obj.Title });
        if (old) {
          return await res.status("409").json("already exists");
        }   
        const Repo = await Repodoc.create(obj) 
        console.log("Repo",Repo)
        await res.status("201").json(Repo)
    }
    catch(err){
        await res.status("400").json(err)
    }
}
module.exports.ViewAll= async (req,res)=>{
    try{    
        const user = req.user
        if(!user) return res.status("401").json("unAutherized")      
        const Repo = await Repodoc.find({User:req.user._id}) 
        console.log("Repo",Repo)
        await res.status("200").json(Repo)
    }
    catch(err){
        await res.status("400").json(err)
    }
}
module.exports.ViewOne= async (req,res)=>{
    try{    
        const user = req.user
        if(!user) return res.status("401").json("unAutherized")      
        const Repo = await Repodoc.findOne({_id:req.params.id}) 
        console.log("Repo",Repo)
        await res.status("200").json(Repo)
    }
    catch(err){
        await res.status("400").json(err)
    }
}
module.exports.delete= async (req,res)=>{
    try{    
        const user = req.user
        if(!user) return res.status("401").json("unAutherized")
        
        const old = await Repodoc.findOne({ _id:req.params.id });
        if (!old) {
          return await res.status("404").json("does not exists");
        }
        const Repo = await Repodoc.deleteOne({_id:req.params.id}) 
        await res.status("200").json(Repo)
    }
    catch(err){
        await res.status("400").json(err)
    }
}
module.exports.update= async (req,res)=>{
    try{
        const user = req.user
        if(!user) return res.status("401").json("unAutherized")      
        const old = await Repodoc.findOne({ _id:req.params.id });
        if (!old) {
          return await res.status("404").json("does not exists");
        }
        const obj = {
            Title:req.body.Title,
            Desc:req.body.Desc,
            User:req.user._id
        }
        const old1= await Repodoc.findOne({ Title:obj.Title });
        
        if (old1&&old1._id!=req.params.id) {
          return await res.status("409").json("already exists");
        }   
 
        const Repo = await Repodoc.findOneAndUpdate({ _id: req.params.id },obj)
        console.log("Repo",Repo)
        await res.status("200").json(Repo)
    }
    catch(err){
        await res.status("400").json(err)
    }
}