import { useEffect } from "react";
import React from 'react'
import api from "../app/api/apiSlice";
import { selectFirstName, setUser } from "./authSlice";
import { useDispatch, useSelector } from "react-redux";

const Me = () => {
    const dispatch = useDispatch();
    // setUs());
    const u = useSelector(selectFirstName);
    console.log(u);
   useEffect(()=>{
    getUser();
  });
  const getUser = async()=>{
     let res = await api.get('/me');
      console.log(res.data);
      dispatch(setUser(res.data.name));
 }
 
  
  return (
    <div>
      {u? <>Hi {u}</> : <p>you are not loging in</p>}

    </div>
  )
}

export default Me;