import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios';

const SignOut = () => {
  console.log("Token before sign out", localStorage.getItem("token"));
  const navigate = useNavigate();
  useEffect(()=>{
    localStorage.removeItem("token");
    localStorage.clear();
    delete axios.defaults.headers.common["Authorization"];
    console.log(
      "AXIOS DEFAULT:",
      axios.defaults.headers.common["Authorization"]
    );
    console.log("Token after sign out", localStorage.getItem("token"))
    navigate("/");
  })
  return (
    <div>SignOut</div>
  )
}

export default SignOut