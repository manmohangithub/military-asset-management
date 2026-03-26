
const router=require("express").Router();
const Assignment=require("../models/Assignment");
const Log=require("../models/Log");
const auth=require("../middleware/auth");

router.post("/",auth,async(req,res)=>{
 let base=req.body.base;
 if(req.user.role==="Base Commander") base=req.user.base;
 const a=await Assignment.create({...req.body,base,date:new Date()});
 await Log.create({action:"assignment",details:JSON.stringify(a)});
 res.json(a);
});
module.exports=router;
