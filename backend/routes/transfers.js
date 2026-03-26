
const router=require("express").Router();
const Transfer=require("../models/Transfer");
const Log=require("../models/Log");
const auth=require("../middleware/auth");

router.post("/",auth,async(req,res)=>{
 const t=await Transfer.create({...req.body,date:new Date()});
 await Log.create({action:"transfer",details:JSON.stringify(t)});
 res.json(t);
});
module.exports=router;
