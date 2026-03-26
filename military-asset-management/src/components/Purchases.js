
import React,{useState,useEffect} from "react";
import API from "../api";

export default function Purchases(){
 const [form,setForm]=useState({});
 const [data,setData]=useState([]);

 const load=async()=>{
  const res=await API.get("/api/purchases");
  setData(res.data.rows);
 };

 useEffect(()=>{load();},[]);

 const submit=async()=>{
  await API.post("/api/purchases",form);
  load();
 };

 return (
  <div>
   <h2>Purchases</h2>
   <input placeholder="Type" onChange={e=>setForm({...form,assetType:e.target.value})}/>
   <input placeholder="Qty" onChange={e=>setForm({...form,quantity:e.target.value})}/>
   <input placeholder="Base" onChange={e=>setForm({...form,base:e.target.value})}/>
   <button onClick={submit}>Add</button>

   {data.map((d,i)=>(
    <div key={i}>{d.assetType} - {d.quantity} - {d.base}</div>
   ))}
  </div>
 );
}
