
const router=require("express").Router();
const {Op}=require("sequelize");
const Purchase=require("../models/Purchase");
const Log=require("../models/Log");
const auth=require("../middleware/auth");

router.get("/",auth,async(req,res)=>{
 let filter={};
 if(req.user.role==="Base Commander") filter.base=req.user.base;
 const data=await Purchase.findAll({where:filter});
 res.json({rows:data});
});

router.post("/",auth,async(req,res)=>{
 const p=await Purchase.create({...req.body,date:new Date()});
 await Log.create({action:"purchase",details:JSON.stringify(p)});
 res.json(p);
});
module.exports=router;
