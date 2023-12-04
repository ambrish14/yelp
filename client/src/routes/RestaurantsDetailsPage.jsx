import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { RestaurantContext } from '../context/RestaurantContext';
import RestaurantFinder from '../apis/RestaurantFinder';

export default function RestaurantsDetailsPage() {
  const {id}=useParams();
  const {selectedRestaurants,setSelectedRestaurants}=useContext(RestaurantContext);
  useEffect(()=>{
const fetchData=async ()=>{
try{
  const response  =await RestaurantFinder.get(`/${id}`);
    setSelectedRestaurants(response.data.data.restaurant)
}
catch(err){
console.log(err);
}
  
}
fetchData(); 
  }
 ,[])
   
  return (
    <div>
    {selectedRestaurants.name}
    </div>
  )
}
