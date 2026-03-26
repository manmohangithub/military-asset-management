
import React,{useState} from "react";
import API from "../api";

export default function Transfers(){
 const [form,setForm]=useState({});

 const submit=async()=>{
  await API.post("/api/transfers",form);
 };

 return (
  <div>
   <h2>Transfers</h2>
   <input placeholder="Type" onChange={e=>setForm({...form,assetType:e.target.value})}/>
   <input placeholder="Qty" onChange={e=>setForm({...form,quantity:e.target.value})}/>
   <input placeholder="From" onChange={e=>setForm({...form,fromBase:e.target.value})}/>
   <input placeholder="To" onChange={e=>setForm({...form,toBase:e.target.value})}/>
   <button onClick={submit}>Transfer</button>
  </div>
 );
}
