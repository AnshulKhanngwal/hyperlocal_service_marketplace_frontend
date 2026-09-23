import axios from "axios";

const token = localStorage.getItem("token");

export const getApiCall = async (endpoint) =>{
    console.log("base url", import.meta.env.VITE_BASE_URL);
    console.log("Token before api", token);
    try{
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/${endpoint}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); 
      return response;
      } catch (err) {
      return err;
      }
  }

export const postApiCall = async (endpoint, data) =>{
    try{
      
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/${endpoint}`,
        data,
        {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const res = response?.data?.data;
      console.log("Res Data", res)
      } catch (err) {
      return err;
      }
  }
