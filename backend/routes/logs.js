
const router=require("express").Router();
const Log=require("../models/Log");
const auth=require("../middleware/auth");

router.get("/",auth,async(req,res)=>{
 const logs=await Log.findAll();
 res.json(logs);
});
module.exports=router;
