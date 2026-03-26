
import React, { useState, useEffect } from "react";
import API from "../api";

export default function Dashboard() {
  const [data,setData]=useState({});
  const [filters,setFilters]=useState({});
  const [show,setShow]=useState(false);

  const load=async()=>{
    const res=await API.get("/api/dashboard",{params:filters});
    setData(res.data);
  };

  useEffect(()=>{ load(); },[]);

  return (
    <div>
      <h2>Dashboard</h2>

      <input type="date" onChange={e=>setFilters({...filters,startDate:e.target.value})}/>
      <input type="date" onChange={e=>setFilters({...filters,endDate:e.target.value})}/>
      <button onClick={load}>Apply</button>

      <div>
        <p>Opening: {data.opening}</p>
        <p>Closing: {data.closing}</p>
        <p onClick={()=>setShow(true)}>Net: {data.net}</p>
        <p>Assigned: {data.assigned}</p>
        <p>Expended: {data.expended}</p>
      </div>

      {show && (
        <div style={{background:"white",padding:20}}>
          <p>Purchases: {data.purchases}</p>
          <p>Transfer In: {data.transferIn}</p>
          <p>Transfer Out: {data.transferOut}</p>
          <button onClick={()=>setShow(false)}>Close</button>
        </div>
      )}
    </div>
  );
}
