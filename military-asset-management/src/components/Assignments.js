
import React,{useState} from "react";
import API from "../api";

export default function Assignments(){
 const [form,setForm]=useState({});

 const submit=async()=>{
  await API.post("/api/assignments",form);
 };

 return (
  <div>
   <h2>Assignments</h2>
   <input placeholder="Type" onChange={e=>setForm({...form,assetType:e.target.value})}/>
   <input placeholder="Qty" onChange={e=>setForm({...form,quantity:e.target.value})}/>
   <input placeholder="Base" onChange={e=>setForm({...form,base:e.target.value})}/>
   <button onClick={submit}>Assign</button>
  </div>
 );
}
