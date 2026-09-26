import axios from "axios";


export const getApiCall = async (endpoint) =>{
    const token = localStorage.getItem("token");
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
  const token = localStorage.getItem("token");
    try{
      
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/${endpoint}`,
        data,
        {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const res = response?.data;
      console.log("Res Data", res)
      return res;
      } catch (err) {
      return err;
      }
  }
