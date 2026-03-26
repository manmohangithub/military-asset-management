
import React,{useEffect,useState} from "react";
import API from "../api";

export default function Logs(){
 const [logs,setLogs]=useState([]);

 useEffect(()=>{
  API.get("/api/logs").then(res=>setLogs(res.data));
 },[]);

 return (
  <div>
   <h2>Logs</h2>
   {logs.map((l,i)=>(
    <div key={i}>{l.action} - {l.details}</div>
   ))}
  </div>
 );
}
